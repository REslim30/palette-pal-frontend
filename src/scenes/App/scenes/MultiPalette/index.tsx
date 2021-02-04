import React, { useState } from 'react';
import { RouteComponentProps } from '@reach/router';

import MultiPaletteAppBar from "./components/MultiPaletteAppBar/index";
import LeftDrawer from "./components/LeftDrawer/index";
import MultiPaletteContext from './services/MultiPaletteContext';
import GroupCreator from "./components/GroupCreator/index";
import Palettes from "./components/Palettes/index";
import SEO from "#src/components/SEO/index";

interface MultiPaletteProps extends RouteComponentProps {
  groupId?: number;
}

export default function MultiPalette(props : MultiPaletteProps) {
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
  const [groupToEdit, setGroupToEdit] = useState<'new' | Group | null>(null);

  return <>
  <SEO title="View Palettes"/>
  <MultiPaletteContext.Provider
    value={{
      leftDrawerOpen,
      setLeftDrawerOpen,
      groupToEdit,
      setGroupToEdit
    }}>
    <div className="flex flex-col min-h-screen">
      <MultiPaletteAppBar/>
      <Palettes/>
      <LeftDrawer /> 
      <GroupCreator />
    </div>
  </MultiPaletteContext.Provider>
  </>
}



