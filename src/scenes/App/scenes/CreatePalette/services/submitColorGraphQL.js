import { gql } from "@apollo/client";

export default gql`
  mutation SubmitColor($name: String!, $shades: JSON) {
    createColor(input: {
      data: {
        name: $name
        shades: $shades
      }
    }) {
      color {
        id
      }
    }
  }
`;