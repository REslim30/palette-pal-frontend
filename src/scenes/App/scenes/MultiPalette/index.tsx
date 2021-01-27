import React, { useState, useEffect } from 'react';
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
import { usePalettes } from "#app/services/app-store";


interface MultiPaletteProps extends RouteComponentProps {
  groupId?: number;
}

export default function MultiPalette(props : MultiPaletteProps) {
  const [group, setGroup] = useState<number | null>(null);
  const location = useLocation();
  const palettes = usePalettes();

  useEffect(() => {
    const params = parse(location.search);
    if (params.group)
      setGroup(parseInt(params.group as string));
  }, [props.groupId])

  return <>
    <MultiPaletteAppBar group={group}/>
    <Palettes palettes={palettes}/>
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

function Palettes(props: {palettes: Palette[] | null}) {
  if (!props.palettes)
    return <CircularProgress />;

  if (!props.palettes.length)
    return <p>You have no palettes. Click on '+' to create your first palette!</p>
  else 
    return <main className="p-6 grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}>
      { props.palettes.map(palette => <PaletteCard palette={palette}/>) }
    </main>;
}