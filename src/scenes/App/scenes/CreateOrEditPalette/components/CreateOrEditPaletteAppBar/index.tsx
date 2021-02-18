import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import RightEdgeIconButton from "#src/components/RightEdgeIconButton/index";
import SendIcon from "#src/components/SendIcon/index";
import IconLink from "#src/components/IconLink";
import { useCreateOrEditPaletteContext } from "#app/scenes/CreateOrEditPalette/services/CreateOrEditPaletteContext";
import paletteIsSubmittable from "../../services/paletteIsSubmittable";
import useWindowSize from "#src/services/useWindowSize";

type CreateOrEditPaletteAppBarProps = {
  onSubmit: () => void,
}

export default function CreateOrEditPaletteAppBar(props: CreateOrEditPaletteAppBarProps) {
  const { colors, name } = useCreateOrEditPaletteContext();
  const size = useWindowSize();

  return <AppBar position="static">
    <Toolbar>
      <IconLink to="/app/palettes" aria-label="Back to Palettes" className="-ml-4">
        <ArrowBackIcon />
      </IconLink>
      <h1 className='flex-grow pl-4 text-xl'>Add Palette</h1>
      <RightEdgeIconButton 
        edge="end" 
        color="inherit" 
        aria-label="Create palette"
        disabled={ !paletteIsSubmittable({name, colors}) }
        onClick={ props.onSubmit }
        style={{ display: size.width as number <= 768 ? "block" : "none" }}>
        <SendIcon />
      </RightEdgeIconButton>
    </Toolbar>
  </AppBar>
};