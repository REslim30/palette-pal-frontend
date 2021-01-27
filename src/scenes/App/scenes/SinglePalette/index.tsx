import React from "react";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MoreVertIcon from '@material-ui/icons/MoreVert'
import ArrowBackIcon  from "@material-ui/icons/ArrowBack";

import RightEdgeIconButton from "#src/components/RightEdgeIconButton/index";
import { usePalette } from "#app/services/app-store";
import ColorList from "./scenes/ColorList/index";
import { RouteComponentProps } from '@reach/router';
import IconLink from "#src/components/IconLink";

// Displays colors from a single palette
interface SinglePaletteProps extends RouteComponentProps {
  id?: number
}

export default function SinglePalette(props: SinglePaletteProps) {
  const palette = usePalette(props.id as number);
  return <>
    <SinglePaletteAppBar>{palette?.name || ''}</SinglePaletteAppBar>
    <ColorList palette={palette} />
  </>
};

function SinglePaletteAppBar(props: any) {
  return <AppBar position="static">
    <Toolbar>
      <IconLink edge="start" color="inherit" aria-label="Menu" to={"/app/palettes"}>
        <ArrowBackIcon />
      </IconLink>
      <h1 className='pl-4 text-xl flex-grow'>{props.children}</h1>
      <RightEdgeIconButton edge="end" color="inherit" aria-label="Add Palette">
        <MoreVertIcon />
      </RightEdgeIconButton>
    </Toolbar>
  </AppBar>
}