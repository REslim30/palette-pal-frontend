import React from "react";

import CreateOrEditPaletteAppBar from "./component/CreateOrEditPaletteAppBar/index";
import { useCreateOrEditPaletteContext } from "../../services/CreateOrEditPaletteContext";
import submitPalette from "./services/submitPalette";

export default function PaletteSubmitter(props: any) {
  const { colors, name, group, id } = useCreateOrEditPaletteContext();

  const handlePaletteSubmit = () => {
    submitPalette({ id, name, group, colors })
    .then((palette: Palette) => {
      window.location.href = `/app/palettes/${palette.id}`;
    })
    .catch(console.error)
  }

  return <CreateOrEditPaletteAppBar 
    handleSubmit={handlePaletteSubmit}/>
};