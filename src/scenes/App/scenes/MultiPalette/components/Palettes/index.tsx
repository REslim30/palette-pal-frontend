import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress"
import { useCurrentGroup, usePalettes } from "#src/services/app-state-store";
import PaletteCard from "./components/PaletteCard/index";

export default function Palettes(props: unknown) {
  const allPalettes = usePalettes();
  const group = useCurrentGroup();

  let palettes = group?.palettes || allPalettes;

  if (!palettes)
    return <CircularProgress />;

  if (!palettes.length)
    return <main className="flex flex-col items-center justify-center flex-grow">
      <span className="text-xl text-neutral-800">Click '+' to create a palette!</span>
    </main>
  else 
    return <main className="grid gap-6 p-6" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}>
      { palettes.map(palette => <PaletteCard palette={palette} key={palette.id}/>) }
    </main>;
}