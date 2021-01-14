import React from "react"
import { Link } from "gatsby"
import { AppBar, ToolBar } from '@material-ui/core'

import SEO from "../components/seo"
import "../tailwind.css"
import Home from "../scenes/Home/index"


const IndexPage = () => (
  <>
    <SEO title="Home" />
    <Home />
  </>
)

export default IndexPage
