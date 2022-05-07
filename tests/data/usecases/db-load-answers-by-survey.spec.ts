import faker from 'faker';

import { DbLoadAnswersBySurvey } from '@/data/usecases';

import { LoadSurveyByIdRepositorySpy } from '@/tests/data/mocks';
import { throwError } from '@/tests/domain/mocks';

type SutTypes = {
  sut: DbLoadAnswersBySurvey;
  loadSurveyByIdRepositorySpy: LoadSurveyByIdRepositorySpy;
};

const makeSut = (): SutTypes => {
  const loadSurveyByIdRepositorySpy = new LoadSurveyByIdRepositorySpy();
  const sut = new DbLoadAnswersBySurvey(loadSurveyByIdRepositorySpy);
  return { sut, loadSurveyByIdRepositorySpy };
};

let surveyId: string;

describe('DbLoadAnswersBySurvey', () => {
  beforeEach(() => {
    surveyId = faker.random.uuid();
  });

  test('Should call LoadSurveyByIdRepository', async () => {
    const { sut, loadSurveyByIdRepositorySpy } = makeSut();
    await sut.loadAnswers(surveyId);
    expect(loadSurveyByIdRepositorySpy.id).toBe(surveyId);
  });

  test('Should return answers on success', async () => {
    const { sut, loadSurveyByIdRepositorySpy } = makeSut();
    const amswers = await sut.loadAnswers(surveyId);
    expect(amswers).toEqual([
      loadSurveyByIdRepositorySpy.result.answers[0].answer,
      loadSurveyByIdRepositorySpy.result.answers[1].answer,
    ]);
  });

  test('Should return empty array if LoadSurveyByIdRepository returns null', async () => {
    const { sut, loadSurveyByIdRepositorySpy } = makeSut();
    loadSurveyByIdRepositorySpy.result = null;
    const amswers = await sut.loadAnswers(surveyId);
    expect(amswers).toEqual([]);
  });

  test('Should throw if LoadSurveyByIdRepository throws', async () => {
    const { sut, loadSurveyByIdRepositorySpy } = makeSut();
    jest.spyOn(loadSurveyByIdRepositorySpy, 'loadById').mockImplementationOnce(throwError);
    const promise = sut.loadAnswers(surveyId);
    await expect(promise).rejects.toThrow();
  });
});
