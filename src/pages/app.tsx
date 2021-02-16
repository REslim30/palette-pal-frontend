import React, { useEffect } from 'react';
import App from '#src/scenes/App/index';
import TopLevelWrapper from "#src/components/TopLevelWrapper/index";


export default function AppPage(props: {}) {
  return <>
    <TopLevelWrapper>
      <App></App>
    </TopLevelWrapper>
  </>
}