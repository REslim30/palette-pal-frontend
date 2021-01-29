import { createContext, useContext } from "react";

//colors state that is global to entire CreateOrEditPalette tree
type CreateOrEditPaletteContext = {
  colors: Color[],
  setColors: (colors: Color[]) => void,
  name: string,
  setName: (name: string) => void,
  group: number | null,
  setGroup: (group: number | null) => void,
  id: number | undefined
}

const CONTEXT: CreateOrEditPaletteContext = {
  colors: [],
  setColors: () => undefined,
  name: '',
  setName: () => undefined,
  group: null,
  setGroup: () => undefined,
  id: undefined
}

const CreateOrEditPaletteContext = createContext(CONTEXT);

export function useCreateOrEditPaletteContext() {
  return useContext(CreateOrEditPaletteContext);
}

export default CreateOrEditPaletteContext;