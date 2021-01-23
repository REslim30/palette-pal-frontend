import React, { useState } from "react";
import ApolloClient, { useQuery } from '@apollo/client';
import CircularProgress from "@material-ui/core/CircularProgress";

import ShadeCard from "./components/ShadeCard/index";
import CopyShadeDialog from "./components/CopyShadeDialog/index"

// List of colors and their corresponding shades
interface ColorListProps { 
  palette: Palette | undefined, 
  loading: boolean, 
  error: ApolloClient.ApolloError | undefined,
}

export default function ColorList(props: ColorListProps) {
  // Dialog state
  const [selectedShade, setSelectedShade] = useState('');

  if (props.loading) return <CircularProgress/>;
  if (props.error) return <p>Error...</p>;

  //Dialog Handlers
  const makeHandleOpen = (shade: string) => {
    return () => {
      setSelectedShade(shade);
    }
  }

  const handleClose = () => {
    setSelectedShade('');
  }

  return <main className="p-6">
    {/* List of shades */}
    {props.palette?.colors.map(color => {
        return <section className="mb-10" key={color.id}>
          <h2 className="text-3xl mb-2">{color.name}</h2>
          <div className="grid gap-8" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))' }}>
            {color.shades.map((shade) => {
                return <ShadeCard shade={shade} onClick={makeHandleOpen(shade)} />
              })
            }
          </div>
        </section>
      })
    }

    <CopyShadeDialog selectedShade={selectedShade} onClose={handleClose}/>
  </main>
}