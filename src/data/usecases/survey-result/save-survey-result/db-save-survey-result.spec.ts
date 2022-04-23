import MockDate from 'mockdate';

import { SaveSurveyResultRepository } from './db-save-survey-result-protocols';

import { mockSaveSurveyResultParams, mockSurveyResultModel, throwError } from '@/domain/test';
import { mockSaveSurveyResultRepository } from '@/data/test';

import { DbSaveSurveyResult } from './db-save-survey-result';

type SutTypes = {
  sut: DbSaveSurveyResult;
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository;
};

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = mockSaveSurveyResultRepository();
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub);

  return { sut, saveSurveyResultRepositoryStub };
};

describe('DbSaveSurveyResult Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('Should call SaveSurveyResultRepository with correct values', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut();
    const saveSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save');
    const surveyResultData = mockSaveSurveyResultParams();
    await sut.save(surveyResultData);
    expect(saveSpy).toHaveBeenCalledWith(surveyResultData);
  });

  test('Should throw AddAccountRepository throws', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut();
    jest.spyOn(saveSurveyResultRepositoryStub, 'save').mockImplementationOnce(throwError);
    const promise = sut.save(mockSaveSurveyResultParams());
    await expect(promise).rejects.toThrow();
  });

  test('Should return SurveySurvey on success', async () => {
    const { sut } = makeSut();
    const surveyResult = await sut.save(mockSaveSurveyResultParams());
    expect(surveyResult).toEqual(mockSurveyResultModel());
  });
});
