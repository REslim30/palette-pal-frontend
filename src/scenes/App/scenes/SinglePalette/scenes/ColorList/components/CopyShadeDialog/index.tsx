import React, { useState } from "react";
import hexToHsl from 'hex-to-hsl';


// Material UI imports
import { hexToRgb } from '@material-ui/core/styles';
import Dialog  from '@material-ui/core/Dialog';
import DialogTitle  from '@material-ui/core/DialogTitle';
import ListItem  from '@material-ui/core/ListItem';
import List  from '@material-ui/core/List';
import Snackbar from "@material-ui/core/Snackbar";

import CopyIcon from '#src/components/CopyIcon/index'


// Sets up a shade to be copied
type CopyShadeDialogProps = {
  onClose: () => void,
  selectedShade: string,
}

export default function CopyShadeDialog({ selectedShade, ...props }: CopyShadeDialogProps) {
  const [successCopySnackbarOpen, setSuccessCopySnackbarOpen] = useState(false);
  
  const handleCopy = (event: React.SyntheticEvent) => {
    // Creates a span that's off the page to copy
    const colorSpan = document.createElement('span');
    colorSpan.textContent = event.currentTarget.querySelector('.js-color-text')?.textContent || '';
    colorSpan.className = 'absolute -left-96';
    document.body.appendChild(colorSpan);

    // Selects and copies
    const selection: Selection | null = window.getSelection();
    const range: Range = document.createRange();

    range.selectNodeContents(colorSpan);
    selection?.removeAllRanges();
    selection?.addRange(range);

    try {
      document.execCommand('copy');
      selection?.removeAllRanges();

      setSuccessCopySnackbarOpen(true);
    } catch (e) {
      console.error('Could not copy to clipboard ' + e)
    }

    // Clean up dom
    colorSpan.remove();

    props.onClose();
  }

  const handleSuccessCopySnackbarClose = () => {
    setSuccessCopySnackbarOpen(false);
  }

  // Calculate hsl and rgb css strings
  let hslSelectedShade;
  let rgbSelectedShade;
  if (selectedShade) {
    const hslArray = hexToHsl(selectedShade);
    hslSelectedShade = `hsl(${hslArray[0]}, ${hslArray[1]}%, ${hslArray[2]}%)`;
    rgbSelectedShade = hexToRgb(selectedShade);
  }
  
  return <>
    {/* Dialog box for copying Shade to clipboard */}
    <Dialog onClose={props.onClose} aria-labelledby="dialog-title" open={Boolean(selectedShade)}>
      <DialogTitle id='dialog-title' disableTypography={true}>
        <span className="h-4 w-4 mr-2 rounded-full inline-block" style={{ backgroundColor: selectedShade }}/>
        Copy shade to clipboard
      </DialogTitle>
      
      <List>
        {[selectedShade?.toUpperCase(), rgbSelectedShade, hslSelectedShade].map((color, index) => {
          return <ListItem button onClick={handleCopy} key={index}>
            <CopyIcon />
            <span className="js-color-text font-mono">{color}</span>
          </ListItem>
        })}
      </List>
    </Dialog>

    {/* Copy success/error Snackbars */}
    <Snackbar 
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      open={successCopySnackbarOpen} 
      autoHideDuration={6000} 
      onClose={handleSuccessCopySnackbarClose} 
      message="Copied!"/>
  </>
}