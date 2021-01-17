import React, { useEffect } from 'react';
import { ThemeProvider } from "@material-ui/core/styles";
import theme from '../services/muiTheme';

import PaletteView from '../scenes/PaletteView/index';

export default function SignUpPage(props) {

  useEffect(() => {
    // Check if user is logged in
    if (!localStorage.getItem('jwt')) {
      window.location = '/login/'
    }
  });

  return <>
    <ThemeProvider theme={theme}>
      <PaletteView></PaletteView>
    </ThemeProvider>
  </>
}