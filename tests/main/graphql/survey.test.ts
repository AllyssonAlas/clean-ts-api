import { Collection } from 'mongodb';
import { createTestClient } from 'apollo-server-integration-testing';
import { ApolloServer, gql } from 'apollo-server-express';
import { sign } from 'jsonwebtoken';

import { MongoHelper } from '@/infra/db';
import env from '@/main/config/env';
import { makeApolloServer } from './helpers';

const makeAccessToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'Allysson',
    email: 'allysson.alas@gmail.com',
    password: '123',
    role: 'admin',
  });
  const id = res.ops[0]._id;
  const accessToken = sign({ id }, env.jwtSecret);
  await accountCollection.updateOne({ _id: id }, { $set: { accessToken } });

  return accessToken;
};

let accountCollection: Collection;
let surveyCollection: Collection;
let apolloServer: ApolloServer;

describe('Survey GraphQL', () => {
  beforeAll(async () => {
    apolloServer = makeApolloServer();
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys');
    await surveyCollection.deleteMany({});
    accountCollection = await MongoHelper.getCollection('accounts');
    await accountCollection.deleteMany({});
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  describe('Surveys Query', () => {
    const surveysQuery = gql`
      query surveys {
        surveys {
          id
          question
          answers {
            image
            answer
          }
          date
          didAnswer
        }
      }
    `;

    test('Should return Surveys', async () => {
      const accessToken = await makeAccessToken();
      const now = new Date();
      await surveyCollection.insertOne({
        question: 'any_question',
        answers: [{ answer: 'Answer 1', image: 'http://image-name.com' }, { answer: 'Answer 2' }],
        date: new Date(),
      });

      const { query } = createTestClient({
        apolloServer,
        extendMockRequest: { headers: { 'x-access-token': accessToken } },
      });
      const res: any = await query(surveysQuery);
      expect(res.data.surveys).toHaveLength(1);
      expect(res.data.surveys[0].id).toBeTruthy();
      expect(res.data.surveys[0].question).toBe('any_question');
      expect(res.data.surveys[0].date).toBe(now.toISOString());
      expect(res.data.surveys[0].didAnswer).toBe(false);
      expect(res.data.surveys[0].answers).toEqual([
        { answer: 'Answer 1', image: 'http://image-name.com' },
        { answer: 'Answer 2', image: null },
      ]);
    });
  });
});
