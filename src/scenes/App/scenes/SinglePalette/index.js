import React, { useState } from "react";

// Material UI imports
import { hexToRgb, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { useQuery, gql } from '@apollo/client';
import  ArrowBackIcon  from "@material-ui/icons/ArrowBack";
import Dialog  from '@material-ui/core/Dialog';
import DialogTitle  from '@material-ui/core/DialogTitle';
import ListItem  from '@material-ui/core/ListItem';
import List  from '@material-ui/core/List';
import Snackbar from "@material-ui/core/Snackbar";


import hexToHsl from 'hex-to-hsl';

const useStyles = makeStyles((theme) => ({
  rightEdgeButton: {
    marginRight: '-12px',
  },
}));


export default function SinglePalette(props) {
  const classes = useStyles();
  // Dialog state
  const [selectedColor, setSelectedColor] = useState(null);
  const [successCopySnackbarOpen, setSuccessCopySnackbarOpen] = useState(false);
  const [errorCopySnackbarOpen, setErrorCopySnackbarOpen] = useState(false);

  const { loading, error, data } = useQuery(gql`
    query GetSinglePalette {
      palette(id: ${props.id}) {
        id
        name
        colors {
          id
          name
          shades
        }
      }
    }
  `);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  //Dialog Handlers
  const makeHandleOpen = (shade) => {
    return (event) => {
      setSelectedColor(shade);
    }
  }

  const handleClose = () => {
    setSelectedColor(null);
  }

  const handleCopy = (event) => {
    // Creates a span that's off the page to copy
    const colorSpan = document.createElement('span');
    colorSpan.textContent = event.currentTarget.querySelector('.js-color-text').textContent;
    colorSpan.className = 'absolute -left-96';
    document.body.appendChild(colorSpan);

    // Selects and copies
    const selection = window.getSelection();
    const range = document.createRange();

    range.selectNodeContents(colorSpan);
    selection.removeAllRanges();
    selection.addRange(range);

    try {
      document.execCommand('copy');
      selection.removeAllRanges();

      setSuccessCopySnackbarOpen(true);
    } catch (e) {
      console.error('Could not copy to clipboard ' + e)
    }

    // Clean up dom
    colorSpan.remove();

    // Close dialog
    setSelectedColor(null);
  }

  const handleSuccessCopySnackbarClose = () => {
    setSuccessCopySnackbarOpen(false);
  }

  const handleErrorCopySnackbarClose = () => {
    setErrorCopySnackbarOpen(false);
  }

  const onArrowBack = (event) => {
    window.history.back();
  }

  // Calculate hsl and rgb css strings
  let hslSelectedColor;
  let rgbSelectedColor;
  if (selectedColor) {
    const hslArray = hexToHsl(selectedColor);
    hslSelectedColor = `hsl(${hslArray[0]}, ${hslArray[1]}%, ${hslArray[2]}%)`;
    rgbSelectedColor = hexToRgb(selectedColor);
  }

  return <>
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="Menu" onClick={onArrowBack}>
          <ArrowBackIcon />
        </IconButton>
        <h1 className='pl-4 text-xl flex-grow'>{data.palette.name}</h1>
        <IconButton edge="start" className={ classes.rightEdgeButton } color="inherit" aria-label="Add Palette">
          <MoreVertIcon />
        </IconButton>
      </Toolbar>
    </AppBar>

    {/* List of colors */}
    <main className="p-4">
      {
        data.palette.colors.map(color => {
          return <section className="mb-10" key={color.id}>
            <h2 className="text-3xl mb-2">{color.name}</h2>
            <div className="grid gap-8" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))' }}>
              {/* List of shades */}
              {
                color.shades.map((shade, index) => {
                  return <button className="flex flex-col items-center rounded-lg border-2 border-gray-300 pt-2 pb-1 px-2" style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }} key={index} aria-label={shade} onClick={makeHandleOpen(shade)}>
                      <span className="inline-block h-12 w-12 rounded-lg mb-1.5" style={{ backgroundColor: shade }}/>
                      <p className="text-neutral-600 font-mono">{shade.toUpperCase()}</p>
                    </button>
                })
              }
            </div>
          </section>
        })
      }
      {/* Dialog box for copying color to clipboard */}
      <Dialog onClose={handleClose} aria-labelledby="dialog-title" open={Boolean(selectedColor)}>
        <DialogTitle id='dialog-title' disableTypography={true}>
          <span className="h-4 w-4 mr-2 rounded-full inline-block" style={{ backgroundColor: selectedColor}}/>
          Copy color to clipboard
        </DialogTitle>
        
        <List>
          {[selectedColor?.toUpperCase(), rgbSelectedColor, hslSelectedColor].map(color => {
            return <ListItem button onClick={handleCopy}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-copy text-neutral-500 mr-2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>

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
    </main>
  </>
};