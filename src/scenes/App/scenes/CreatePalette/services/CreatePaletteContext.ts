import { createContext, useContext } from "react";

//colors state that is global to entire CreatePalette tree
type CreatePaletteContext = {
  colors: Color[],
  setColors: (colors: Color[]) => void,
  name: string,
  setName: (name: string) => void,
  group: number | null,
  setGroup: (group: number | null) => void,
}

const CONTEXT: CreatePaletteContext = {
  colors: [],
  setColors: () => undefined,
  name: '',
  setName: () => undefined,
  group: null,
  setGroup: () => undefined,
}

const CreatePaletteContext = createContext(CONTEXT);

export function useCreatePaletteContext() {
  return useContext(CreatePaletteContext);
}

export default CreatePaletteContext;