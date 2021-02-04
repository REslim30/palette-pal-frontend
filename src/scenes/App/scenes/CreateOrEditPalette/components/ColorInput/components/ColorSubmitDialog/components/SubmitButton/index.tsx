import React from 'react';
import SendIcon from "#src/components/SendIcon";
import Fab from "@material-ui/core/Fab";

import { useCreateOrEditPaletteContext } from "#app/scenes/CreateOrEditPalette/services/CreateOrEditPaletteContext";
import { useColorSubmitContext } from "../../services/ColorSubmitContext";
import { replaceElementImmutably } from "#src/services/immutableArrayActions";


export default function SubmitButton(props: unknown) {
  const { colors, setColors } = useCreateOrEditPaletteContext();
  const { shades, setShades, name, onClose, colorToSubmit } = useColorSubmitContext();

  const handleSubmit = (event: React.SyntheticEvent<HTMLElement>) => {
    const newShades = shades.map((shade: any) => shade.toString());
    if (colorToSubmit === "new") {
      setColors([...colors, { id: -1, name, shades: newShades }])
    } else {
      setColors(replaceElementImmutably(colors, colorToSubmit as number, { id: -1, name, shades: newShades }))
    }
    onClose(event);
  }

  const submitDisabled = shades.length <= 0 || !name;

  return <span className="p-4">
    <Fab aria-label="Add color"
      size="small"
      color="primary"
      onClick={handleSubmit}
      disabled={submitDisabled}>
      <SendIcon className="mt-1 mr-1 text-white"/>
    </Fab>
  </span>
}