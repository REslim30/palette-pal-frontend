import React, { useState, useRef } from 'react';

// Material UI components
import Dialog  from '@material-ui/core/Dialog';
import DialogTitle  from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import SendIcon from "#src/components/SendIcon/index";

import { fromString } from "css-color-converter";

// Dialog on CreatePalette that adds a color
export default function AddColorDialog(props) {
  const [shades, setShades] = useState([]);
  const [addShadeInputOpen, setAddShadeInputOpen] = useState(false);
  const [cssColorString, setCssColorString] = useState('');
  const [shadeInputError, setShadeInputError] = useState({});
  
  const handleCssColorStringChange = (event) => {
    setCssColorString(event.target.value);
  };

  const handleAddShadeInputOpen = (event) => {
    setAddShadeInputOpen(true);
  };

  const handleAddShade = (event) => {
    const hexValue = fromString(cssColorString)?.toHexString();
    if (hexValue) {
      setShadeInputError({});
      setShades([...shades, hexValue.toUpperCase()]);
      setAddShadeInputOpen(false);
      setCssColorString(false);
    } else {
      setShadeInputError({error: true, helperText: 'Please use a valid hex, rgb, or hsl CSS string.'})
    }
  }

  const handleAddShadeKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      handleAddShade(event);
    }
  }

  return <>
    <Dialog open={props.open} aria-labelledby="add-color-dialog-title" onClose={props.handleClose}>
      <DialogTitle id="add=color-dialog-title" disableTypography={true}>Add a Color</DialogTitle>
      <div className="pb-6 px-6">
        {/* Color Name */}
        <TextField label="Name" variant="outlined" placeholder="E.g. Primary, Blue, Neutrals"/>

        {/* List of Shades */}
        {shades.map((shade, index) => {
          return <div key={shade + index}>
            <span className="h-4 w-4 block" style={{ backgroundColor: shade }}></span>
          </div>
        })}

        {/* Shade Adder */}
        <div className="pt-4">
          {addShadeInputOpen
            ? <div className="flex flex-col items-end">
                <TextField 
                  {...shadeInputError}
                  label="CSS color string" 
                  variant="outlined" size="small" 
                  placeholder="e.g. hsl(10, 20%, 30%)" 
                  autoFocus 
                  onChange={handleCssColorStringChange}
                  onKeyDown={handleAddShadeKeyDown}
                />
                <Button color="primary" onClick={handleAddShade}>Add shade</Button>
              </div>
            : <button className="grid gap-4 w-full" style={{ gridTemplateColumns: 'auto 24px' }} onClick={handleAddShadeInputOpen}>
                <span className="text-neutral-500 text-left self-end pt-0.5">Add shade</span>
                <AddIcon className="text-primary-500"/>
              </button>
          }
          
          <div className="flex justify-end">
            <Fab
              aria-label="Add color"
              size="small"
              color="primary"
              onClick={props.handleClose}
            >
              <SendIcon className="text-white mt-1 mr-1"/>
            </Fab>
          </div>
        </div>
      </div>
    </Dialog>
  </>
};

