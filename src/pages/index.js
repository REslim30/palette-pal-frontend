import React from "react"
import { ThemeProvider } from "@material-ui/core/styles";

import "#src/services/tailwind.css"
import Home from "#src/scenes/Home/index"
import theme from '#src/services/muiTheme';
import SEO from "#src/components/SEO/index";


const IndexPage = () => (
  <>
    <SEO title="Home"/>
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  </>
)

export default IndexPage
