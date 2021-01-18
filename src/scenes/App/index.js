import React from 'react';
import { Router } from '@reach/router';

import MultiPalette from './scenes/MultiPalette/index';
import SinglePalette from './scenes/SinglePalette/index';

export default function App(props) {
  return <Router>
    <MultiPalette path="/palettes"/>
    <SinglePalette path="/palettes/:id"/>
  </Router>
};