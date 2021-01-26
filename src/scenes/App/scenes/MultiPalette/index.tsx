import React, { useState, useEffect } from 'react';
import usePalettes from "#src/services/backendApi/usePalettes";
import PaletteCard from "./components/PaletteCard";
import { RouteComponentProps, useLocation } from '@reach/router';
import IconLink from "#src/components/IconLink/index";
import { parse } from "query-string";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from "@material-ui/core/CircularProgress"


interface MultiPaletteProps extends RouteComponentProps {
  groupId?: number;
}

export default function MultiPalette(props : MultiPaletteProps) {
  const [group, setGroup] = useState<number | null>(null);
  const location = useLocation();
  const { loading, error, data } = usePalettes();

  useEffect(() => {
    const params = parse(location.search);
    if (params.group)
      setGroup(parseInt(params.group as string));
  }, [props.groupId])

  if (error) return <p>Error...</p>;

  return <>
    <MultiPaletteAppBar group={group}/>
    <Palettes loading={loading} palettes={data?.palettes}/>
  </>
}

function MultiPaletteAppBar(props: any) {
  return <AppBar position="static">
    <Toolbar>
      <IconButton edge="start" color="inherit" aria-label="Menu">
        <MenuIcon />
      </IconButton>
      <h1 className='pl-4 text-xl flex-grow'>{props.group || 'All'}</h1>
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