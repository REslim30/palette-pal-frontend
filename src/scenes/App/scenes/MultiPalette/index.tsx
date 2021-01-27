import React, { useState, useEffect } from 'react';
import PaletteCard from "./components/PaletteCard/index";
import { RouteComponentProps, useLocation } from '@reach/router';


import CircularProgress from "@material-ui/core/CircularProgress"
import { useCurrentGroup, usePalettes } from "#src/scenes/App/services/app-state-store";

import MultiPaletteAppBar from "./components/MultiPaletteAppBar/index";
import LeftDrawer from "./components/LeftDrawer/index";

interface MultiPaletteProps extends RouteComponentProps {
  groupId?: number;
}

export default function MultiPalette(props : MultiPaletteProps) {
  return <>
    <MultiPaletteAppBar/>
    <Palettes/>
    <LeftDrawer /> 
  </>
}



function Palettes(props: unknown) {
  const allPalettes = usePalettes();
  const group = useCurrentGroup();

  let palettes = group?.palettes || allPalettes;

  if (!palettes)
    return <CircularProgress />;

  if (!palettes.length)
    return <p>You have no palettes. Click on '+' to create your first palette!</p>
  else 
    return <main className="p-6 grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}>
      { palettes.map(palette => <PaletteCard palette={palette}/>) }
    </main>;
}