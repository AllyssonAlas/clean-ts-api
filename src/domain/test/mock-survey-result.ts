import { SurveyResultModel } from '@/domain/models/survey-result';
import { SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result';

export const mockSaveSurveyResultParams = (): SaveSurveyResultParams => ({
  answer: 'any_answer',
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  date: new Date(),
});

export const mockSurveyResultModel = (): SurveyResultModel =>
  Object.assign({}, mockSaveSurveyResultParams(), { id: 'any_id' });
