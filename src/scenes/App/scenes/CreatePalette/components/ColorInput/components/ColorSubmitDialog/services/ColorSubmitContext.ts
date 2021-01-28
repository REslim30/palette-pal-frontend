// Context for ColorSubmitDialog
import React, { useContext } from "react";


const ColorSubmitContext = React.createContext({} as any);

export function useColorSubmitContext() {
  return useContext(ColorSubmitContext);
}

export default ColorSubmitContext;