import React from 'react';
import { ThemeProvider } from "@material-ui/core/styles";
import theme from '#src/services/muiTheme';

import SignUp from '#src/scenes/SignUp/index';

export default function SignUpPage(props) {
  return <>
    <ThemeProvider theme={theme}>
      <SignUp></SignUp>
    </ThemeProvider>
  </>
}