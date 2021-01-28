import { createContext, useContext } from "react";

const MultiPaletteContext = createContext({} as any);

export function useMultiPaletteContext() {
  return useContext(MultiPaletteContext);
}

export default MultiPaletteContext;