import React, { useState, useEffect, useContext } from 'react';
import SendIcon from "#src/components/SendIcon";
import { fromString } from "css-color-converter";

import Dialog  from '@material-ui/core/Dialog';
import DialogTitle  from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import ColorContext from "../../../../services/ColorContext";
import { tryToSwapElementsImmutably, replaceElementImmutably } from "#src/services/immutableArrayActions";

// Dialog that edits or creates a color
type ColorSubmitDialogProps = {
  colorToSubmit: "new" | number | null,
  onClose: (event: React.SyntheticEvent<HTMLElement>) => void,
}

export default function ColorSubmitDialog(props: ColorSubmitDialogProps) {
  const [colors, setColors] = useContext(ColorContext);
  const [cssColorString, setCssColorString] = useState('');
  const [name, setName] = useState('');
  const [shades, setShades] = useState<string[]>([]);
  const [shadeInputError, setShadeInputError] = useState({});
  const [shadeMenuAnchorEl, setShadeMenuAnchorEl] = useState<HTMLElement | null>(null);

  // Initialize name and shades if given
  useEffect(() => {
    if (typeof props.colorToSubmit === "number") {
      const color = colors[props.colorToSubmit];
      setName(color.name);
      setShades(color?.shades)
    }
  }, [props.colorToSubmit])

  // Reset all state after componenet unmount
  useEffect(() => {
    return () => {
      setCssColorString('');
      setName('');
      setShades([]);
      setShadeInputError({});
    }
  }, [props.colorToSubmit])

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleCssColorStringChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCssColorString(event.target.value);
  };

  const handleAddShade = () => {
    const hexValue = fromString(cssColorString)?.toHexString();
    if (hexValue) {
      setShadeInputError({});
      setShades([...shades, hexValue.toUpperCase()]);
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

  const handleSubmit = (event: React.SyntheticEvent<HTMLElement>) => {
    if (props.colorToSubmit === "new") {
      setColors([...colors, { id: -1, name, shades }])
    } else {
      setColors(replaceElementImmutably(colors, props.colorToSubmit as number, { id: -1, name, shades }))
    }
    props.onClose(event);
  }

  const handleShadeMenuOpen = (event: React.SyntheticEvent<HTMLElement>) => {
    setShadeMenuAnchorEl(event.currentTarget);
  }

  const handleShadeMenuClose = () => {
    setShadeMenuAnchorEl(null);
  }

  const handleShadeDelete = (event: React.MouseEvent<HTMLElement>) => {
    const shadeIndex = parseInt(shadeMenuAnchorEl?.dataset.index as string);
    setShades(shades.filter((shade, index) => index !== shadeIndex));
    handleShadeMenuClose();
  }

  const handleShadeMoveUp = (event: React.MouseEvent<HTMLElement>) => {
    const shadeIndex = parseInt(shadeMenuAnchorEl?.dataset.index as string);
    setShades(tryToSwapElementsImmutably(shades, shadeIndex, shadeIndex-1));
    handleShadeMenuClose();
  }

  const handleShadeMoveDown = (event: React.MouseEvent<HTMLElement>) => {
    const shadeIndex = parseInt(shadeMenuAnchorEl?.dataset.index as string);
    setShades(tryToSwapElementsImmutably(shades, shadeIndex, shadeIndex+1));
    handleShadeMenuClose();
  }

  const submitDisabled = shades.length <= 0 || !name;

  return <>
    <Dialog 
      open={Boolean(props.colorToSubmit)} 
      aria-labelledby="add-color-dialog-title" 
      onClose={props.onClose}>

      <div className="flex justify-between pb-4">
        {/* Dialog Title */}
        <DialogTitle 
          id="add=color-dialog-title"
          disableTypography={true}>
          Add a Color
        </DialogTitle>

        {/* Submit button */}
        <span className="p-4">
          <Fab aria-label="Add color"
            size="small"
            color="primary"
            onClick={handleSubmit}
            disabled={submitDisabled}>
            <SendIcon className="text-white mt-1 mr-1"/>
          </Fab>
        </span>
      </div>

      <div className="pb-6 px-6">
        {/* Color Name Input*/}
        <TextField 
          label="Name" 
          variant="outlined" 
          placeholder="E.g. Primary, Blue, Neutrals"
          value={name}
          onChange={handleNameChange}/>

        {/* List of Shades */}
        <div className="pt-6">
          <h2 className="text-xl">Shades:</h2>
          {shades.map((shade: string, index: number) => {
            return <>
              <div 
                className="grid gap-4 items-center my-3" 
                style={{ gridTemplateColumns: 'min-content auto min-content' }} 
                key={shade + index}>
                <span 
                  className="h-4 w-4 block rounded-full" 
                  style={{ backgroundColor: shade }}/>
                <span>{shade}</span>
                <IconButton 
                  size="small" 
                  aria-controls='shade-options-menu' 
                  onClick={handleShadeMenuOpen}
                  data-index={index}>
                  <MoreVertIcon/>
                </IconButton>
              </div>
            </>
          })}
          {/* Menu for shade */}
          <Menu
            id="shade-options-menu"
            anchorEl={shadeMenuAnchorEl}
            open={Boolean(shadeMenuAnchorEl)}
            onClose={handleShadeMenuClose}>
            <MenuItem  onClick={handleShadeMoveUp}>
              <ListItemIcon>
                <ArrowUpwardIcon/>
              </ListItemIcon>
              <ListItemText primary="Move up"/>
            </MenuItem>
            <MenuItem onClick={handleShadeMoveDown}>
              <ListItemIcon>
                <ArrowDownwardIcon/>
              </ListItemIcon>
              <ListItemText primary="Move down"/>
            </MenuItem>
            <MenuItem onClick={handleShadeDelete}>
              <ListItemIcon>
                <DeleteIcon className="text-red-800"/>
              </ListItemIcon>
              <ListItemText primary="Delete"/>
            </MenuItem>
          </Menu>
        </div>

        {/* Add shade input */}
        <div className="pt-4">          
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
      </div>
    </Dialog>
  </>
};

