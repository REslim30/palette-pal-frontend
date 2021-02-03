import React, { useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

import ShadeCard from "./components/ShadeCard/index";
import CopyShadeDialog from "./components/CopyShadeDialog/index"

// List of colors and their corresponding shades
interface ColorListProps { 
  palette: Palette | null
}

export default function ColorList(props: ColorListProps) {
  // Dialog state
  const [selectedShade, setSelectedShade] = useState('');

  if (!props.palette) return <CircularProgress/>;

  //Dialog Handlers
  const makeHandleOpen = (shade: string) => {
    return () => {
      setSelectedShade(shade);
    }
  }

  const handleClose = () => {
    setSelectedShade('');
  }

  return <main className="max-w-screen-md p-6 mx-auto">
    {/* List of shades */}
    {props.palette?.colors.map(color => {
        return <section className="mb-10" key={color.id}>
          <h2 className="mb-2 text-3xl">{color.name}</h2>
          <div className="grid gap-8" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))' }}>
            {color.shades.map((shade, index) => {
                return <ShadeCard shade={shade} onClick={makeHandleOpen(shade)} key={index}/>
              })
            }
          </div>
        </section>
      })
    }

    <CopyShadeDialog selectedShade={selectedShade} onClose={handleClose}/>
  </main>
}