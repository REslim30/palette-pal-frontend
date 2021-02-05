import React from 'react';

import TopLevelWrapper from "#src/components/TopLevelWrapper/index";

import LogIn from '#src/scenes/LogIn';
import SEO from "#src/components/SEO/index";

export default function LoginPage(props: {}) {
  return <>
  <SEO title="Login"/>
  <TopLevelWrapper>
    <LogIn></LogIn>
  </TopLevelWrapper>
</>
}