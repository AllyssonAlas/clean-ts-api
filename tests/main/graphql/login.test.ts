import { hash } from 'bcrypt';
import { Collection } from 'mongodb';
import { createTestClient } from 'apollo-server-integration-testing';
import { ApolloServer, gql } from 'apollo-server-express';

import { MongoHelper } from '@/infra/db';
import { makeApolloServer } from './helpers';

let accountCollection: Collection;
let apolloServer: ApolloServer;

describe('Login GraphQL', () => {
  beforeAll(async () => {
    apolloServer = makeApolloServer();
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts');
    await accountCollection.deleteMany({});
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  describe('Login Query', () => {
    const loginQuery = gql`
      query login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          accessToken
          name
        }
      }
    `;

    test('Should return an account on valid credentials', async () => {
      const password = await hash('123', 12);
      await accountCollection.insertOne({
        name: 'Allysson',
        email: 'allysson.alas@gmail.com',
        password,
      });

      const { query } = createTestClient({ apolloServer });
      const res: any = await query(loginQuery, {
        variables: { email: 'allysson.alas@gmail.com', password: '123' },
      });
      expect(res.data.login.accessToken).toBeTruthy();
      expect(res.data.login.name).toBe('Allysson');
    });
  });
});
