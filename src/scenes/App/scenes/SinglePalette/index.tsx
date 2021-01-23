import React, { useState } from "react";
import { useQuery } from '@apollo/client';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert'
import ArrowBackIcon  from "@material-ui/icons/ArrowBack";

import RightEdgeIconButton from "#src/components/RightEdgeIconButton/index";
import GET_SINGLE_PALETTE from "./services/getSinglePaletteGraphQL";
import ColorList from "./scenes/ColorList/index";

export default function SinglePalette(props: {id: number}) {
  const { loading, error, data } = useQuery(GET_SINGLE_PALETTE, {variables: {id: props.id}});
  const onArrowBack = () => {
    window.history.back();
  }

  return <>
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="Menu" onClick={onArrowBack}>
          <ArrowBackIcon />
        </IconButton>
        <h1 className='pl-4 text-xl flex-grow'>{data?.palette.name}</h1>
        <RightEdgeIconButton edge="end" color="inherit" aria-label="Add Palette">
          <MoreVertIcon />
        </RightEdgeIconButton>
      </Toolbar>
    </AppBar>

    <ColorList palette={data?.palette} loading={loading} error={error}/>
  </>
};