import React from "react"
import { ThemeProvider } from "@material-ui/core/styles";

import SEO from "../components/seo"
import "../tailwind.css"
import Home from "../scenes/Home/index"
import theme from '../services/muiTheme';



const IndexPage = () => (
  <>
    <SEO title="Home" />
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  </>
)

export default IndexPage
