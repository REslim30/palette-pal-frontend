import React from "react";

import CreateOrEditPaletteAppBar from "./component/CreateOrEditPaletteAppBar/index";
import { useCreateOrEditPaletteContext } from "../../services/CreateOrEditPaletteContext";
import submitPalette from "./services/submitPalette";
import { refreshPalettes } from "#app/services/app-state-store";

export default function PaletteSubmitter(props: any) {
  const { colors, name, group } = useCreateOrEditPaletteContext();

  const handlePaletteSubmit = () => {
    submitPalette({ name, group, colors })
    .then((palette: Palette) => {
      window.location.href = `/app/palettes/${palette.id}`;
    })
    .catch(console.error)
  }

  return <CreateOrEditPaletteAppBar 
    handleSubmit={handlePaletteSubmit}/>
};