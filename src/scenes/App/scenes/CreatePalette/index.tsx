import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from '@reach/router';

import PaletteSubmitter from "./components/PaletteSubmitter/index";
import NameAndGroupInput from "./components/NameAndGroupInput/index";
import ColorInput from "./components/ColorInput";
import CreatePaletteContext from "./services/CreatePaletteContext";


// Page to create a new palette
export default function CreatePalette(props: RouteComponentProps) {
  const [name, setName] = useState('');
  const [group, setGroup] = useState<number | null>(null);
  const [colors, setColors] = useState<Color[]>([]);

  return <>
    <CreatePaletteContext.Provider 
      value={{
        colors, 
        setColors,
        name,
        setName,
        group,
        setGroup
      }}>

      <PaletteSubmitter />

      <main className="p-6">
        <NameAndGroupInput />

        <ColorInput />
      </main>
    </CreatePaletteContext.Provider>
  </>
};