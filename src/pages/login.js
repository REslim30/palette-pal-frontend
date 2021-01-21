import React from 'react';
import { ThemeProvider } from "@material-ui/core/styles";
import theme from '#src/services/muiTheme';

import LogIn from '#src/scenes/LogIn';

export default function LoginPage(props) {
  return <>
  <ThemeProvider theme={theme}>
    <LogIn></LogIn>
  </ThemeProvider>
</>
}