import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import usePalettes from "#src/services/backendApi/usePalettes";
import PaletteCard from "./components/PaletteCard";
import CircularProgress from "@material-ui/core/CircularProgress"
import { RouteComponentProps } from '@reach/router';
import IconLink from "#src/components/IconLink/index";


export default function MultiPalette(props : RouteComponentProps) {
  const [group, setGroup] = useState('');
  const { loading, error, data } = usePalettes();

  if (error) return <p>Error...</p>;

  return <>
    <MultiPaletteAppBar>{group || 'All'}</MultiPaletteAppBar>
    <Palettes loading={loading} palettes={data?.palettes}/>
  </>
}

function MultiPaletteAppBar(props: any) {
  return <AppBar position="static">
    <Toolbar>
      <IconButton edge="start" color="inherit" aria-label="Menu">
        <MenuIcon />
      </IconButton>
      <h1 className='pl-4 text-xl flex-grow'>{props.children}</h1>
      <IconLink to="/app/palettes/new">
        <AddIcon />
      </IconLink>
    </Toolbar>
  </AppBar>
}

function Palettes(props: {loading: boolean, palettes: Palette[] | undefined}) {
  let markup = <CircularProgress />;

  if (!props.loading) {
    markup = <p>You have no palettes. Click on '+' to create your first palette!</p>
    
    if (props.palettes?.length) {
      markup = <main className="p-6 grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}>
        { props.palettes.map(palette => <PaletteCard palette={palette}/>) }
      </main>;
    }
  }

  return markup;
}