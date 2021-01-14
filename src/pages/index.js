import React from "react"
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import SEO from "../components/seo"
import "../tailwind.css"
import Home from "../scenes/Home/index"

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#BC0A6F'
    }
  }
});

const IndexPage = () => (
  <>
    <SEO title="Home" />
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  </>
)

export default IndexPage
