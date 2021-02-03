import React, { useEffect } from 'react';
import { ThemeProvider } from "@material-ui/core/styles";
import theme from '#src/services/muiTheme';
import { Helmet } from "react-helmet";

import App from '#src/scenes/App/index';


export default function AppPage(props) {
  // Check if user is logged in
  useEffect(() => {
    if (!localStorage.getItem('jwt')) {
      window.location = '/login/'
    }
  });

  return <>
    <Helmet>
      <meta charSet="utf-8"/>
      <title>Palette Pal</title>
    </Helmet>
    <ThemeProvider theme={theme}>
      <App></App>
    </ThemeProvider>
  </>
}