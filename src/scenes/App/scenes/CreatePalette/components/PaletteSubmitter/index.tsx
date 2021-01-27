import React from "react";

import { useMutation } from '@apollo/client';
import CreatePaletteAppBar from "./component/CreatePaletteAppBar/index";
import SUBMIT_PALETTE from "./services/submitPaletteGraphQL"
import SUBMIT_COLOR from "./services/submitColorGraphQL";
import { useCreatePaletteContext } from "../../services/CreatePaletteContext";

// Defines logic for submitting a palette
export default function PaletteSubmitter(props: any) {
  const { colors, name, group } = useCreatePaletteContext();

  const [submitPalette, submitPaletteResult] = useMutation(SUBMIT_PALETTE);
  const [submitColor] = useMutation(SUBMIT_COLOR);

  if (submitPaletteResult.data) {
    window.location.href = `/app/palettes/${submitPaletteResult.data.createPalette.palette.id}`;
  }

  const handlePaletteSubmit = async() => {
    const colorCreationPromises = colors.map(color => submitColor({variables: { name: color.name, shades: color.shades }}).catch(console.log))

    // Must use a regular loop instead of .forEach due to async-await
    const colorIds = []
    for (let i=0; i<colorCreationPromises.length; i++) {
      const colorCreation = await colorCreationPromises[i];
      // TODO: handle error
      colorIds.push((colorCreation as Record<string, any>).data.createColor.color.id);
    }

    submitPalette({variables: { name: name, group: group, colors: colorIds }})
  }

  return <CreatePaletteAppBar 
    handleSubmit={handlePaletteSubmit}/>
};