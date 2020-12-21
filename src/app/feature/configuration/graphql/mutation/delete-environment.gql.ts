import { gql } from 'apollo-angular';

export const DeleteEnvironmentGQL = gql`
  mutation deleteEnvironment($dto: DeleteEnvironmentDTO!) {
    deleteEnvironment(dto: $dto) {
      id
    }
  }
`;
