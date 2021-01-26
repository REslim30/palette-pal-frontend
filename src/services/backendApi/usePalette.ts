import { useQuery, gql } from '@apollo/client';

const GET_SINGLE_PALETTE = gql`
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

export default function useSinglePalette(id: number): useBackendApiReturn {
  const { data, loading, error } = useQuery(GET_SINGLE_PALETTE, {variables: {id}})
  return { data, loading, error };
}