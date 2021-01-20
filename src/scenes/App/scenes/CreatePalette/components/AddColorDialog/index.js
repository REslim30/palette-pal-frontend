import React, { useState, useRef } from 'react';

// Material UI components
import Dialog  from '@material-ui/core/Dialog';
import DialogTitle  from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import SendIcon from "../../../../../../components/SendIcon/index";

// Dialog on CreatePalette that adds a color
export default function AddColorDialog(props) {
  const [shades, setShades] = useState([]);
  const [addShadeInputOpen, setAddShadeInputOpen] = useState(false);
  
  const handleAddShadeInputOpen = (event) => {
    setAddShadeInputOpen(true);
  };

  return <>
    <Dialog open={props.open} aria-labelledby="add-color-dialog-title" onClose={props.handleClose}>
      <DialogTitle id="add=color-dialog-title" disableTypography={true}>Add a Color</DialogTitle>
      <div className="pb-6 px-6">
        {/* Color Name */}
        <TextField label="Name" variant="outlined" placeholder="E.g. Primary, Blue, Neutrals"/>

        {/* Color Adder */}
        <div className="pt-4">
          {addShadeInputOpen
            ? <div className="flex flex-col items-end">
                <TextField label="CSS color string" variant="outlined" size="small" placeholder="e.g. hsl(10, 20%, 30%)" autoFocus/>
                <Button color="primary">Add shade</Button>
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

