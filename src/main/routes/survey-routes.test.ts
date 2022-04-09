import { Collection } from 'mongodb';
import request from 'supertest';

import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper';

import app from '../config/app';

describe('Survey Routes', () => {
  let surveyCollection: Collection;

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys');
    await surveyCollection.deleteMany({});
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  describe('POST /surveys', () => {
    test('Should return 403 on add survey without accessToken', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'any_question',
          answers: [{ answer: 'Answer 1', image: 'http://image-name.com' }, { answer: 'Answer 2' }],
        })
        .expect(403);
    });
  });
});
