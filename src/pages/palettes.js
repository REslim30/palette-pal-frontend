import React from 'react';
import { ThemeProvider } from "@material-ui/core/styles";
import theme from '../services/muiTheme';

import PaletteView from '../scenes/PaletteView/index';

export default function SignUpPage(props) {
  return <>
    <ThemeProvider theme={theme}>
      <PaletteView></PaletteView>
    </ThemeProvider>
  </>
}