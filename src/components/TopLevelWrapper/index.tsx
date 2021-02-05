import React from "react";

import muiTheme from "#src/services/muiTheme";
import { ThemeProvider } from "@material-ui/core/styles";


export default function TopLevelWrapper(props: { children: React.ReactNode }) {
  return <ThemeProvider theme={muiTheme}>
    {props.children}
  </ThemeProvider>
};