import { gql } from "@apollo/client";

export type Palette = {
  id: number;
  name: string;
  colors: [{
    id: number,
    shades: string[]
  }]
};

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