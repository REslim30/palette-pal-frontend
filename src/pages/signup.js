import React from 'react';
import { ThemeProvider } from "@material-ui/core/styles";
import theme from '../services/muiTheme';

import SignUp from '../scenes/SignUp/index';

export default function SignUpPage(props) {
  return <>
    <ThemeProvider theme={theme}>
      <SignUp></SignUp>
    </ThemeProvider>
  </>
}