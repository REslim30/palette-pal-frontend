import React, { useState, useEffect, useContext } from 'react';
import SendIcon from "#src/components/SendIcon";
import { fromString } from "css-color-converter";
import { nanoid } from "nanoid";

import Dialog  from '@material-ui/core/Dialog';
import DialogTitle  from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";

import { useCreatePaletteContext } from "#app/scenes/CreatePalette/services/CreatePaletteContext";
import ColorSubmitContext, { useColorSubmitContext } from "./services/ColorSubmitContext";
import { replaceElementImmutably } from "#src/services/immutableArrayActions";
import ShadeList from "./components/ShadeList";

// Dialog that edits or creates a color
type ColorSubmitDialogProps = {
  colorToSubmit: "new" | number | null,
  onClose: (event: React.SyntheticEvent<HTMLElement>) => void,
}

export default function ColorSubmitDialog(props: ColorSubmitDialogProps) {
  const { colors } = useCreatePaletteContext();
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
          id="add=color-dialog-title"
          disableTypography={true}>
          Add a Color
        </DialogTitle>

        <SubmitButton />
      </div>

      <div className="pb-6 px-6">
        <ColorNameInput />
        
        <ShadeList />

        <ShadeInput />
      </div>
    </Dialog>
  </ColorSubmitContext.Provider>
};

function ColorNameInput(props: unknown) {
  const { name, setName } = useColorSubmitContext();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return <TextField 
    label="Name" 
    variant="outlined" 
    placeholder="E.g. Primary, Blue, Neutrals"
    value={name}
    onChange={handleNameChange}/>
}

function SubmitButton(props: unknown) {
  const { colors, setColors } = useCreatePaletteContext();
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
      <SendIcon className="text-white mt-1 mr-1"/>
    </Fab>
  </span>
}

function ShadeInput(props: any) {
  const { shades, setShades } = useColorSubmitContext();
  const [cssColorString, setCssColorString] = useState('');
  const [shadeInputError, setShadeInputError] = useState({});

  const handleCssColorStringChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCssColorString(event.target.value);
  };

  const handleAddShade = () => {
    const hexValue = fromString(cssColorString)?.toHexString();
    if (hexValue) {
      const newShade: any = new String(hexValue.toUpperCase());
      newShade.uid = nanoid();
      setShades([...shades, newShade]);
      setShadeInputError({});
      setCssColorString('');
    } else {
      setShadeInputError({error: true, helperText: 'Invalid hex, rgb, or hsl CSS string.'})
    }
  }

  const handleAddShadeKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      handleAddShade();
    }
  }

  return <div className="pt-4">          
    <div className="flex flex-col items-end">
      <TextField 
        {...shadeInputError}
        label="CSS color string" 
        variant="outlined" size="small" 
        placeholder="e.g. hsl(10, 20%, 30%)" 
        value={cssColorString}
        onChange={handleCssColorStringChange}
        onKeyDown={handleAddShadeKeyDown}/>
      <Button color="primary" onClick={handleAddShade}>Add shade</Button>
    </div>
  </div>
}