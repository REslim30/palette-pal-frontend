import React, { useState, useEffect } from 'react';

import Dialog  from '@material-ui/core/Dialog';
import DialogTitle  from '@material-ui/core/DialogTitle';

import { useCreateOrEditPaletteContext } from "#app/scenes/CreateOrEditPalette/services/CreateOrEditPaletteContext";
import ColorSubmitContext, { useColorSubmitContext } from "./services/ColorSubmitContext";
import ShadeList from "./components/ShadeList/index";
import ColorNameInput from "./components/ColorNameInput/index"
import SubmitButton from "./components/SubmitButton/index";
import ShadeInput from "./components/ShadeInput/index";

// Dialog that edits or creates a color
type ColorSubmitDialogProps = {
  colorToSubmit: "new" | number | null,
  onClose: (event: React.SyntheticEvent<HTMLElement>) => void,
}

export default function ColorSubmitDialog(props: ColorSubmitDialogProps) {
  const { colors } = useCreateOrEditPaletteContext();
  const [name, setName] = useState('');
  const [shades, setShades] = useState<String[]>([]);
  const [shadeMenuAnchorEl, setShadeMenuAnchorEl] = useState<HTMLElement | null>(null);

  // Initialize name and shades if given
  useEffect(() => {
    if (typeof props.colorToSubmit === "number") {
      const color = colors[props.colorToSubmit];
      setName(color.name);
      setShades(color?.shades)
    }
  }, [props.colorToSubmit])

  useEffect(() => {
    return () => {
      setName('');
      setShades([]);
    }
  }, [props.colorToSubmit])

  return <ColorSubmitContext.Provider 
    value={{
      name,
      setName,
      shades,
      setShades,
      shadeMenuAnchorEl,
      setShadeMenuAnchorEl,
      onClose: props.onClose,
      colorToSubmit: props.colorToSubmit
    }}>
    <Dialog 
      open={Boolean(props.colorToSubmit)} 
      aria-labelledby="add-color-dialog-title" 
      onClose={props.onClose}>

      <div className="flex justify-between pb-4">
        <DialogTitle 
          id="add-color-dialog-title"
          disableTypography={true}>
          Add a Color
        </DialogTitle>

        <SubmitButton />
      </div>

      <div className="px-6 pb-6">
        <ColorNameInput />
        
        <ShadeList />

        <ShadeInput />
      </div>
    </Dialog>
  </ColorSubmitContext.Provider>
};
