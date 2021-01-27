import React from "react";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import IconLink from "#src/components/IconLink/index";

import { useCurrentGroup } from "#app/services/app-state-store";

export default function MultiPaletteAppBar(props: any) {
  const group = useCurrentGroup();

  return <AppBar position="static">
    <Toolbar>
      <IconButton edge="start" color="inherit" aria-label="Menu">
        <MenuIcon />
      </IconButton>
      <h1 className='pl-4 text-xl flex-grow'>{group?.name || 'All'}</h1>
      <IconLink to="/app/palettes/new">
        <AddIcon />
      </IconLink>
    </Toolbar>
  </AppBar>
}