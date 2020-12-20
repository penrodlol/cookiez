import { gql } from 'apollo-angular';

export const AddEnvironmentGQL = gql`
  mutation addEnvironment($dto: AddEnvironmentDTO!) {
    addEnvironment(dto: $dto) {
      id
      name
    }
  }
`;
