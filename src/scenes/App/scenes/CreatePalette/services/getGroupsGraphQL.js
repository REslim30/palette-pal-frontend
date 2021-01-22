import { gql } from "@apollo/client";

export default gql`
  query GetGroups {
    groups {
      id
      name
    }
  }
`;