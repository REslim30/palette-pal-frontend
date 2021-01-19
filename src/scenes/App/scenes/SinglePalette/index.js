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

  // Calculate hsl and rgb css strings
  let hslSelectedColor;
  let rgbSelectedColor;
  if (selectedColor) {
    const hslArray = hexToHsl(selectedColor);
    hslSelectedColor = `hsl(${hslArray[0]}, ${hslArray[1]}%, ${hslArray[2]}%)`;
    rgbSelectedColor = hexToRgb(selectedColor);
  }

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


  const onArrowBack = (event) => {
    window.history.back();
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
                      <p>{shade.toUpperCase()}</p>
                    </button>
                })
              }
            </div>
          </section>
        })
      }
    {/* Dialog box for copying color to clipboard */}
    <Dialog onClose={handleClose} aria-labelledby="dialog-title" open={Boolean(selectedColor)}>
      <DialogTitle id='dialog-title' disableTypography="true">Copy color {selectedColor} to clipboard</DialogTitle>
      {[selectedColor, rgbSelectedColor, hslSelectedColor]}
    </Dialog>
    </main>
  </>
};