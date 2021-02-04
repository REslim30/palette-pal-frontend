import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from '@reach/router';

import PaletteSubmitter from "./components/PaletteSubmitter/index";
import NameAndGroupInput from "./components/NameAndGroupInput/index";
import ColorInput from "./components/ColorInput";
import CreateOrEditPaletteContext from "./services/CreateOrEditPaletteContext";
import { usePalette } from "#src/services/app-state-store";
import SEO from "#src/components/SEO/index";

interface CreateOrEditPaletteProps extends RouteComponentProps {
  id?: number
}

export default function CreateOrEditPalette(props: CreateOrEditPaletteProps) {
  const palette = usePalette(props.id);
  const [name, setName] = useState('');
  const [group, setGroup] = useState<number | null>(null);
  const [colors, setColors] = useState<Color[]>([]);

  useEffect(() => {
    if (palette) {
      setName(palette.name);
      setGroup(palette.group?.id || null);
      setColors(palette.colors);
    }
  }, [palette])

  return <>
    <SEO title="Create Palette"/>
    <CreateOrEditPaletteContext.Provider 
      value={{
        colors, 
        setColors,
        name,
        setName,
        group,
        setGroup,
        id: props.id
      }}>

      <PaletteSubmitter />

      <main className="p-6">
        <NameAndGroupInput />

        <ColorInput />
      </main>
    </CreateOrEditPaletteContext.Provider>
  </>
};