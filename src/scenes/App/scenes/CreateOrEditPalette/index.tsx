import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from '@reach/router';

import PaletteSubmitter from "./components/PaletteSubmitter/index";
import NameAndGroupInput from "./components/NameAndGroupInput/index";
import ColorInput from "./components/ColorInput";
import CreateOrEditPaletteContext from "./services/CreateOrEditPaletteContext";
import { getPalette } from "#app/services/app-state-store";

interface CreateOrEditPalette extends RouteComponentProps {
  id?: number
}

export default function CreateOrEditPalette(props: CreateOrEditPaletteContext) {
  const palette = props.id && getPalette(props.id);
  const [name, setName] = useState('');
  const [group, setGroup] = useState<number | null>(null);
  const [colors, setColors] = useState<Color[]>([]);

  return <>
    <CreateOrEditPaletteContext.Provider 
      value={{
        colors, 
        setColors,
        name,
        setName,
        group,
        setGroup,
        props.id
      }}>

      <PaletteSubmitter />

      <main className="p-6">
        <NameAndGroupInput />

        <ColorInput />
      </main>
    </CreateOrEditPaletteContext.Provider>
  </>
};