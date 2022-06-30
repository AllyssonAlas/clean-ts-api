import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    surveyResult(surveyId: String!): SurveyResult! @auth
  }

  extend type Mutation {
    saveSurveyResult(surveyId: String!, answer: String!): SurveyResult! @auth
  }

  type Answer {
    answer: String!
    count: Int!
    image: String
    percent: Int!
    isCurrentAccountAnswer: Boolean!
  }

  type SurveyResult {
    answers: [Answer!]!
    date: DateTime!
    question: String!
    surveyId: String!
  }
`;
