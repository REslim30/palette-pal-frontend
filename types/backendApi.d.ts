// Types received from the graphql backendAPI
declare type Palette = {
  id: number,
  name: string,
  colors: Color[]
};

declare type Color = {
  id: number,
  name: string,
  shades: string[]
}

declare type Group = {
  id: number,
  name: group
}