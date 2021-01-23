import { gql } from "@apollo/client";

export default gql`
  mutation SubmitPalette($name: String!, $group: ID, $colors: [ID]) {
    createPalette(input: {
      data: {
        name: $name,
        group: $group,
        colors: $colors
      }
    }) {
      palette {
        id
      }
    }
  }
`;

