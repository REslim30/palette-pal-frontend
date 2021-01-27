import React from "react";

import CreatePaletteAppBar from "./component/CreatePaletteAppBar/index";
import { useCreatePaletteContext } from "../../services/CreatePaletteContext";
import submitPalette from "./services/submitPalette";
import { refreshPalettes } from "#app/services/app-state-store";

export default function PaletteSubmitter(props: any) {
  const { colors, name, group } = useCreatePaletteContext();

  const handlePaletteSubmit = () => {
    submitPalette({ name, group, colors })
    .then((palette: Palette) => {
      window.location.href = `/app/palettes/${palette.id}`;
    })
    .catch(console.error)
  }

  return <CreatePaletteAppBar 
    handleSubmit={handlePaletteSubmit}/>
};