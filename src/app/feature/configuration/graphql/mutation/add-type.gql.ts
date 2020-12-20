import { gql } from 'apollo-angular';

export const AddTypeGQL = gql`
  mutation addType($dto: AddTypeDTO!) {
    addType(dto: $dto) {
      id
      name
    }
  }
`;
