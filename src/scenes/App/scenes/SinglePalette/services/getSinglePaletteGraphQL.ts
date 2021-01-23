import { gql } from '@apollo/client';

export default gql`
  query GetSinglePalette($id: ID!) {
    palette(id: $id) {
      id
      name
      colors {
        id
        name
        shades
      }
    }
  }
`;