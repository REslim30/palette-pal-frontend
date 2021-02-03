import React, { useState } from "react";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MoreVertIcon from '@material-ui/icons/MoreVert'
import ArrowBackIcon  from "@material-ui/icons/ArrowBack";

import RightEdgeIconButton from "#src/components/RightEdgeIconButton/index";
import { usePalette } from "#src/services/app-state-store";
import ColorList from "./scenes/ColorList/index";
import { RouteComponentProps, navigate } from '@reach/router';
import IconLink from "#src/components/IconLink";
import PaletteMoreOptions from "#app/components/PaletteMoreOptions/index";
import SEO from "#src/components/SEO/index";

// Displays colors from a single palette
interface SinglePaletteProps extends RouteComponentProps {
  id?: number
}

export default function SinglePalette(props: SinglePaletteProps) {
  const palette = usePalette(props.id as number);

  return <>
    <SinglePaletteAppBar palette={palette}/>
    <ColorList palette={palette} />
  </>
};

function SinglePaletteAppBar(props: { palette: Palette | null }) {
  const [optionsAnchorEl, setOptionsAnchorEl] = useState<HTMLElement | null>(null);

  const handleOptionsOpen = (event: React.MouseEvent<HTMLElement>) => {
    setOptionsAnchorEl(event.currentTarget);
  }

  const handleOptionsClose = () => {
    setOptionsAnchorEl(null);
  }

  const handleDelete = () => {
    navigate('/app/palettes');
  }

  return <>
    <SEO title="View Palette"/>
    <AppBar position="static">
      <Toolbar>
        <IconLink edge="start" color="inherit" aria-label="Menu" to={"/app/palettes"}>
          <ArrowBackIcon />
        </IconLink>
        <h1 className='flex-grow pl-4 text-xl'>{props.palette?.name || ''}</h1>
        <RightEdgeIconButton edge="end" color="inherit" aria-label="palette options" onClick={handleOptionsOpen} aria-haspopup="menu">
          <MoreVertIcon />
        </RightEdgeIconButton>
      </Toolbar>
    </AppBar>
    <PaletteMoreOptions
      palette={props.palette as Palette}
      anchorEl={optionsAnchorEl}
      onClose={handleOptionsClose}
      onDelete={handleDelete}/>
  </>
}