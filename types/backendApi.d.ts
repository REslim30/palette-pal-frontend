// Types received from the backendAPI
declare type Palette = {
  id?: number,
  name: string,
  colors: Color[],
  group?: Group
};

declare type Color = {
  id?: number,
  name: string,
  shades: string[]
}

declare type Group = {
  id?: number,
  name: group,
  iconColor?: string,
  palettes?: Palette[]
}