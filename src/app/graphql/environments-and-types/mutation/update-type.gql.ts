import { gql } from 'apollo-angular';

export const UpdateTypeGQL = gql`
  mutation updateType($dto: UpdateTypeDTO!) {
    updateType(dto: $dto) {
      id
      name
    }
  }
`;
