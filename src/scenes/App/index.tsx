import React from 'react';
import { Router } from '@reach/router';

import MultiPalette from './scenes/MultiPalette/index';
import SinglePalette from './scenes/SinglePalette/index';
import CreateOrEditPalette from "./scenes/CreateOrEditPalette/index";
import { AppStoreProvider } from "../../services/app-state-store"

// Main UI
export default function App(props: {}) {
  return <>
    <AppStoreProvider>
      <Router basepath="/app">
        <MultiPalette path="/palettes"/>
        <SinglePalette path="/palettes/:id"/>
        <CreateOrEditPalette path="/palettes/new"/>
        <CreateOrEditPalette path="/palettes/edit/:id"/>
      </Router>
    </AppStoreProvider>
  </>
};