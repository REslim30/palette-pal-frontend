import { createContext } from "react";

//colors state that is global to entire CreatePalette tree
type ColorContext = [
  Color[],
  (colors: Color[]) => void
]

const colorContext: ColorContext = [
  [],
  () => {}
]

export default createContext(colorContext);