import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    _: String
  }

  type Mutation {
    _: String
  }
`;
