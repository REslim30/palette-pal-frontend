import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { RouteComponentProps } from '@reach/router';

import CreatePaletteAppBar from "./components/CreatePaletteAppBar/index";
import NameAndGroupInput from "./components/NameAndGroupInput/index";
import ColorInput from "./components/ColorInput";
import ColorContext from "./services/ColorContext";
import SUBMIT_PALETTE from "./services/submitPaletteGraphQL"
import SUBMIT_COLOR from "./services/submitColorGraphQL";
import usePaletteIsSubmittable from './services/usePaletteIsSubmittable';

// Page to create a new palette
export default function CreatePalette(props: RouteComponentProps) {
  const [name, setName] = useState('');
  const [group, setGroup] = useState<number | null>(null);
  const [colors, setColors] = useContext(ColorContext);
  const paletteIsSubmittable = usePaletteIsSubmittable(name, colors);

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
  
  
  return <>
    <CreatePaletteAppBar 
      submitButtonDisabled={!paletteIsSubmittable} 
      handleSubmit={handlePaletteSubmit}/>

    <main className="p-6">
      <NameAndGroupInput
        setGroup={setGroup}
        setName={setName}
        group={group}
        name={name}
      />

      <ColorInput />
    </main>
  </>
};