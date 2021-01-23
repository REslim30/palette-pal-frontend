import React from "react"
import { ThemeProvider } from "@material-ui/core/styles";

import SEO from "#src/components/seo"
import "#src/services/tailwind.css"
import Home from "#src/scenes/Home/index"
import theme from '#src/services/muiTheme';



const IndexPage = () => (
  <>
    <SEO title="Home" />
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  </>
)

export default IndexPage
