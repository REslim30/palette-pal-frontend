import { gql, useQuery } from "@apollo/client";

const GET_GROUPS = gql`
  query GetGroups {
    groups {
      id
      name
    }
  }
`;

export default function useGroups() {
  const { loading, error, data } = useQuery(GET_GROUPS);
  return { loading, error, data };
}