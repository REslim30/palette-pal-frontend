import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import { useQuery } from '@apollo/client';
import GET_PALETTE from "./services/getPalettesGraphQL";
import PaletteCard from "./components/PaletteCard";
import CircularProgress from "@material-ui/core/CircularProgress"
import RightEdgeIconButton from "#src/components/RightEdgeIconButton/index";
import { RouteComponentProps } from '@reach/router';


export default function MultiPalette(props : RouteComponentProps) {
  const [group, setGroup] = useState('');
  const { loading, error, data } = useQuery(GET_PALETTE);

  if (error) return <p>Error...</p>;

  const onAddPalette = () => {
    window.location.href = "/app/palettes/new"
  }

  return <>
    {/* App Bar */}
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="Menu">
          <MenuIcon />
        </IconButton>
        <h1 className='pl-4 text-xl flex-grow'>All</h1>
        <RightEdgeIconButton edge="start" color="inherit" aria-label="Add Palette" onClick={onAddPalette}>
          <AddIcon />
        </RightEdgeIconButton>
      </Toolbar>
    </AppBar>

    <Palettes loading={loading} palettes={data?.palettes}/>
  </>
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