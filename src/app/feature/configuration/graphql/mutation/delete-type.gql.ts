import { gql } from 'apollo-angular';

export const DeleteTypeGQL = gql`
  mutation deleteType($dto: DeleteTypeDTO!) {
    deleteType(dto: $dto) {
      id
    }
  }
`;
