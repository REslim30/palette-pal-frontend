import React, { useState, useEffect } from 'react';
import SendIcon from "#src/components/SendIcon/index";
import { fromString } from "css-color-converter";

import Dialog  from '@material-ui/core/Dialog';
import DialogTitle  from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";

// Dialog that adds a color to a palette
export default function AddColorDialog(props) {
  const [shades, setShades] = useState([]);
  const [cssColorString, setCssColorString] = useState('');
  const [name, setName] = useState('');
  const [shadeInputError, setShadeInputError] = useState({});
  const [submitDisabled, setSubmitDisabled] = useState(true);

  
  useEffect(() => {
    setSubmitDisabled(shades.length <= 0 || !name);
  });


  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleCssColorStringChange = (event) => {
    setCssColorString(event.target.value);
  };

  const handleAddShade = (event) => {
    const hexValue = fromString(cssColorString)?.toHexString();
    if (hexValue) {
      setShadeInputError({});
      setShades([...shades, hexValue.toUpperCase()]);
      setCssColorString('');
    } else {
      setShadeInputError({error: true, helperText: 'Invalid hex, rgb, or hsl CSS string.'})
    }
  }

  const handleAddShadeKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      handleAddShade(event);
    }
  }

  const handleSubmit = (event) => {
    props.addColor({ name, shades })
    props.onClose(event);
  }


  return <>
    <Dialog 
      open={props.open} 
      aria-labelledby="add-color-dialog-title" 
      onClose={props.handleClose}>

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
          onChange={handleNameChange}
        />

        {/* List of Shades */}
        <div className="pt-6">
          {shades.map((shade, index) => {
            return <>
              <div 
                className="grid gap-4 items-center my-3" 
                style={{ gridTemplateColumns: 'min-content auto min-content' }} 
                key={shade + index}
              >
                <span className="h-4 w-4 block rounded-full" style={{ backgroundColor: shade }}></span>
                <span>{shade}</span>
                <IconButton size="small">
                  <MoreVertIcon/>
                </IconButton>
              </div>
            </>
          })}
        </div>

        {/* Add shade input */}
        <div className="pt-4">          
          <div className="flex flex-col items-end">
            <TextField 
              {...shadeInputError}
              label="CSS color string" 
              variant="outlined" size="small" 
              placeholder="e.g. hsl(10, 20%, 30%)" 
              autoFocus 
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

