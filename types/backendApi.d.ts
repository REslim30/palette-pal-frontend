// Types received from the backendAPI
declare type Palette = {
  id?: number,
  name: string,
  colors: Color[]
};

declare type Color = {
  id?: number,
  name: string,
  shades: string[]
}

declare type Group = {
  id?: number,
  name: group,
  palettes?: Palette[]
}

// The return type for custom api hooks. E.g. useSinglePalette
declare interface useBackendApiReturn {
  data: any | undefined, 
  loading: boolean, 
  error: ApolloError | undefined
}