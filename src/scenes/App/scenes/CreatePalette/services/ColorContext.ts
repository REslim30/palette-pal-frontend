import { createContext } from "react";

//colors state that is global to entire CreatePalette tree
type ColorContext = [
  Color[],
  (colors: Color[]) => void
]

const colorContext: ColorContext = [
  [],
  (colors: Color[]) => {
    colorContext[0] = colors;
  }
]

export default createContext(colorContext);