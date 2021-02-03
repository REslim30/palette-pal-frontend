import React from 'react';
import { ThemeProvider } from "@material-ui/core/styles";
import theme from '#src/services/muiTheme';

import SignUp from '#src/scenes/SignUp/index';
import SEO from "#src/components/SEO/index";

export default function SignUpPage(props) {
  return <>
    <SEO title="Signup"/>
    <ThemeProvider theme={theme}>
      <SignUp></SignUp>
    </ThemeProvider>
  </>
}