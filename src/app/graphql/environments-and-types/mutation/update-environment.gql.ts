import { gql } from 'apollo-angular';

export const UpdateEnvironmentGQL = gql`
  mutation updateEnvironment($dto: UpdateEnvironmentDTO!) {
    updateEnvironment(dto: $dto) {
      id
      name
    }
  }
`;
