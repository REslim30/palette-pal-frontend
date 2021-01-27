import React, { useEffect } from 'react';
import { ThemeProvider } from "@material-ui/core/styles";
import theme from '#src/services/muiTheme';

import App from '#src/scenes/App/index';


export default function AppPage(props) {
  // Check if user is logged in
  useEffect(() => {
    if (!localStorage.getItem('jwt')) {
      window.location = '/login/'
    }
  });

  return <>
    <ThemeProvider theme={theme}>
      <App></App>
    </ThemeProvider>
  </>
}