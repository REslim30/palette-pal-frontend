import { gql } from "@apollo/client";

export default gql`
  query GetPalettes {
    palettes {
      id
      name
      colors {
        id
        shades
      }
    }
  }
`;