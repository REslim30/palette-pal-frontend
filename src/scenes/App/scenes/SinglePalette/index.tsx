import React from "react";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert'
import ArrowBackIcon  from "@material-ui/icons/ArrowBack";

import RightEdgeIconButton from "#src/components/RightEdgeIconButton/index";
import usePalette from "#src/services/backendApi/usePalette";
import ColorList from "./scenes/ColorList/index";
import { RouteComponentProps } from '@reach/router';

// Displays colors from a single palette
interface SinglePaletteProps extends RouteComponentProps {
  id?: number
}

export default function SinglePalette(props: SinglePaletteProps) {
  const { loading, error, data } = usePalette(props.id as number);
  return <>
    <SinglePaletteAppBar>{data?.palette.name || ''}</SinglePaletteAppBar>
    <ColorList palette={data?.palette} loading={loading} error={error}/>
  </>
};

function SinglePaletteAppBar(props: any) {
  const onArrowBack = () => {
    window.history.back();
  }

  return <AppBar position="static">
    <Toolbar>
      <IconButton edge="start" color="inherit" aria-label="Menu" onClick={onArrowBack}>
        <ArrowBackIcon />
      </IconButton>
      <h1 className='pl-4 text-xl flex-grow'>{props.children}</h1>
      <RightEdgeIconButton edge="end" color="inherit" aria-label="Add Palette">
        <MoreVertIcon />
      </RightEdgeIconButton>
    </Toolbar>
  </AppBar>
}