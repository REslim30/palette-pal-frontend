import { createContext, useContext } from "react";

type MultiPaletteContext = {
  leftDrawerOpen: Boolean,
  setLeftDrawerOpen: (input: boolean) => void,
  groupToEdit: 'new' | Group | null,
  setGroupToEdit: (input: 'new' | Group | null) => void,
}

const MultiPaletteContext = createContext({
  leftDrawerOpen: false,
  setLeftDrawerOpen: () => undefined,
  groupToEdit: null,
  setGroupToEdit: () => undefined,
} as MultiPaletteContext);

export function useMultiPaletteContext() {
  return useContext(MultiPaletteContext);
}

export default MultiPaletteContext;