import React from 'react';
import TopLevelWrapper from "#src/components/TopLevelWrapper/index";

import SignUp from '#src/scenes/SignUp/index';
import SEO from "#src/components/SEO/index";

export default function SignUpPage(props: {}) {
  return <>
    <SEO title="Signup"/>
    <TopLevelWrapper>
      <SignUp></SignUp>
    </TopLevelWrapper>
  </>
}