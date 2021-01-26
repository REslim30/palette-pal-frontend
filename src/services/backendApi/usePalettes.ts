import { useQuery, gql } from "@apollo/client";

const GET_PALETTES = gql`
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

export default function useMultiPalettes(): useBackendApiReturn {
  const {data, error, loading} = useQuery(GET_PALETTES);
  return { data, error, loading };
}