import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import RightEdgeIconButton from "#src/components/RightEdgeIconButton/index";
import SendIcon from "#src/components/SendIcon/index";
import IconLink from "#src/components/IconLink";
import { useCreateOrEditPaletteContext } from "#app/scenes/CreateOrEditPalette/services/CreateOrEditPaletteContext";

type CreateOrEditPaletteAppBarProps = {
  handleSubmit: () => void,
}

export default function CreateOrEditPaletteAppBar(props: CreateOrEditPaletteAppBarProps) {
  const { name, colors } = useCreateOrEditPaletteContext();
  const paletteIsSubmittable = Boolean(name && colors.length !== 0);

  return <AppBar position="static">
    <Toolbar>
      <IconLink to="/app/palettes" edge="start" color="inherit" aria-label="Menu">
        <ArrowBackIcon />
      </IconLink>
      <h1 className='pl-4 text-xl flex-grow'>Add Palette</h1>
      <RightEdgeIconButton 
        edge="end" 
        color="inherit" 
        aria-label="Create palette"
        disabled={ !paletteIsSubmittable }
        onClick={ props.handleSubmit }>
        <SendIcon />
      </RightEdgeIconButton>
    </Toolbar>
  </AppBar>
};