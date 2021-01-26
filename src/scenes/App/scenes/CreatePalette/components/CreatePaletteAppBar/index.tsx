import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import RightEdgeIconButton from "#src/components/RightEdgeIconButton/index";
import SendIcon from "#src/components/SendIcon/index";

type CreatePaletteAppBarProps = {
  submitButtonDisabled: boolean,
  handleSubmit: () => void,
}

export default function CreatePaletteAppBar(props: CreatePaletteAppBarProps) {
  const onArrowBack = () => {
    window.history.back();
  }

  return <AppBar position="static">
    <Toolbar>
      <IconButton edge="start" color="inherit" aria-label="Menu" onClick={onArrowBack}>
        <ArrowBackIcon />
      </IconButton>
      <h1 className='pl-4 text-xl flex-grow'>Add Palette</h1>
      <RightEdgeIconButton 
        edge="end" 
        color="inherit" 
        aria-label="Create palette"
        disabled={ props.submitButtonDisabled }
        onClick={ props.handleSubmit }>
        <SendIcon />
      </RightEdgeIconButton>
    </Toolbar>
  </AppBar>
};