import React from 'react';
import { ThemeProvider } from "@material-ui/core/styles";
import theme from '#src/services/muiTheme';

import LogIn from '#src/scenes/LogIn';
import SEO from "#src/components/SEO/index";

export default function LoginPage(props) {
  return <>
  <SEO title="Login"/>
  <ThemeProvider theme={theme}>
    <LogIn></LogIn>
  </ThemeProvider>
</>
}