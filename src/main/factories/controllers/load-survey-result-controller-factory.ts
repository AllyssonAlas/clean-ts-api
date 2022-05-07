import { Controller } from '@/presentation/protocols';
import { LoadSurveyResultController } from '@/presentation/controllers';
import {
  makeLogControllerDecorator,
  makeDbCheckSurveyById,
  makeDbLoadSurveyResult,
} from '@/main/factories';

export const makeLoadSurveyResultController = (): Controller => {
  const controller = new LoadSurveyResultController(
    makeDbCheckSurveyById(),
    makeDbLoadSurveyResult(),
  );
  return makeLogControllerDecorator(controller);
};
