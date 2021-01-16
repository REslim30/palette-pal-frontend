import React from 'react';
import { ThemeProvider } from "@material-ui/core/styles";
import theme from '../services/muiTheme';

import LogIn from '../scenes/LogIn';

export default function LoginPage(props) {
  return <>
  <ThemeProvider theme={theme}>
    <LogIn></LogIn>
  </ThemeProvider>
</>
}