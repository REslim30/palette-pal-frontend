import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  addButton: {
    marginRight: '-12px',
  }
}));


export default function PaletteView(props) {
  const classes = useStyles();

  return <>
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <h1 className='text-xl flex-grow'>All</h1>
        <IconButton edge="start" className={ classes.addButton } color="inherit" aria-label="Add Palette">
          <AddIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  </>
}