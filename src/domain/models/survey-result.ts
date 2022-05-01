type SurveyResultAnswerModel = {
  answer: string;
  count: number;
  image?: string;
  percent: number;
  isCurrentAccountAnswer: boolean;
};

export type SurveyResultModel = {
  answers: SurveyResultAnswerModel[];
  date: Date;
  question: string;
  surveyId: string;
};
