import React from 'react';
import { Router } from '@reach/router';

import MultiPalette from './scenes/MultiPalette/index';
import SinglePalette from './scenes/SinglePalette/index';
import CreatePalette from "./scenes/CreatePalette/index";

export default function App(props) {
  return <>
  <Router basepath="/app">
    <MultiPalette path="/palettes"/>
    <SinglePalette path="/palettes/:id"/>
    <CreatePalette path="/palettes/new"/>
  </Router>
  </>
};