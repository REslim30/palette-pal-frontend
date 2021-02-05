import React from "react"

import "#src/services/tailwind.css"
import Home from "#src/scenes/Home/index"
import SEO from "#src/components/SEO/index";
import TopLevelWrapper from "#src/components/TopLevelWrapper/index";


const IndexPage = () => (
  <>
    <SEO title="Home"/>
    <TopLevelWrapper>
      <Home />
    </TopLevelWrapper>
  </>
)

export default IndexPage
