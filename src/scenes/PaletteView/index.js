import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import useBackendApi from '../../services/useBackendApi';

const useStyles = makeStyles((theme) => ({
  addButton: {
    marginRight: '-12px',
  },
}));


export default function PaletteView(props) {
  const classes = useStyles();
  const [palettes, setPalettes] = useState(null);
  const backendApiUrl = useBackendApi();

  // Get palettes from api
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${backendApiUrl}/palettes`, {
        headers: {
          Authorization: `bearer ${localStorage.getItem('jwt')}`,
        }
      });

      switch(response.status) {
        case 403:
          window.location = '/login/'
          return;
      }

      const body = await response.json();

      console.log(body);
    }
    fetchData();
  });

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

    {palettes 
      ? <h1>You have palettes</h1> 
      : <h1>You have no palettes</h1> 
    }
  </>
}