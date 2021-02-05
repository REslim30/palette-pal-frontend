import React, { useEffect } from 'react';
import App from '#src/scenes/App/index';
import TopLevelWrapper from "#src/components/TopLevelWrapper/index";


export default function AppPage(props: {}) {
  // Check if user is logged in
  useEffect(() => {
    if (!localStorage.getItem('jwt')) {
      window.location.href = '/login/'
    }
  });

  return <>
    <TopLevelWrapper>
      <App></App>
    </TopLevelWrapper>
  </>
}