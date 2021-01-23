import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import { useQuery } from '@apollo/client';
import GET_PALETTE from "./services/getPalettesGraphQL.ts";
import PaletteCard from "./components/PaletteCard";


const useStyles = makeStyles((theme) => ({
  rightEdgeButton: {
    marginRight: '-12px',
  },
  paletteMoreButton: {
    marginRight: '-10px',
    marginTop: '-10px'
  }
}));


export default function MultiPalette(props) {
  const classes = useStyles();
  const [group, setGroup] = useState('');
  const { loading, error, data } = useQuery(GET_PALETTE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  const onAddPalette = (event) => {
    window.location = "/app/palettes/new"
  }

  return <>
    {/* App Bar */}
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="Menu">
          <MenuIcon />
        </IconButton>
        <h1 className='pl-4 text-xl flex-grow'>All</h1>
        <IconButton edge="start" className={ classes.rightEdgeButton } color="inherit" aria-label="Add Palette" onClick={onAddPalette}>
          <AddIcon />
        </IconButton>
      </Toolbar>
    </AppBar>

    {/* Main palette View */}
    {data.palettes.length === 0 
      ? <p>You have no palettes. Click on '+' to create your first palette!</p>
      : (<main className="p-6 grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}>
        { data.palettes.map(palette => <PaletteCard palette={palette}/>) }
      </main>)
    }
  </>
}