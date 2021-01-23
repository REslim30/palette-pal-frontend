import React from 'react';
import { Router } from '@reach/router';

import MultiPalette from './scenes/MultiPalette/index.tsx';
import SinglePalette from './scenes/SinglePalette/index';
import CreatePalette from "./scenes/CreatePalette/index";

// App scene for implementation of business features
export default function App(props) {
  return <>
  <Router basepath="/app">
    <MultiPalette path="/palettes"/>
    <SinglePalette path="/palettes/:id"/>
    <CreatePalette path="/palettes/new"/>
  </Router>
  </>
};