import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import RightEdgeIconButton from "#src/components/RightEdgeIconButton/index";
import SendIcon from "#src/components/SendIcon/index";
import IconLink from "#src/components/IconLink";
import { useCreateOrEditPaletteContext } from "#app/scenes/CreateOrEditPalette/services/CreateOrEditPaletteContext";
import submitPalette from "./services/submitPalette";

type CreateOrEditPaletteAppBarProps = {
  handleSubmit: () => void,
}

export default function CreateOrEditPaletteAppBar(props: CreateOrEditPaletteAppBarProps) {
  const { colors, name, group, id } = useCreateOrEditPaletteContext();

  const handlePaletteSubmit = () => {
    submitPalette({ id, name, group, colors })
    .then((palette: Palette) => {
      window.location.href = `/app/palettes/${palette.id}`;
    })
    .catch(console.error)
  }

  const paletteIsSubmittable = Boolean(name && colors.length !== 0);

  return <AppBar position="static">
    <Toolbar>
      <IconLink to="/app/palettes" aria-label="Back to Palettes">
        <ArrowBackIcon />
      </IconLink>
      <h1 className='flex-grow pl-4 text-xl'>Add Palette</h1>
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