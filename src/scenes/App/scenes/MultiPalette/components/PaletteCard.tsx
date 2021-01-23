import React from "react";
import { Palette } from "../services/getPalettesGraphQL";

import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { Link } from "gatsby";


// A card displaying a palette
type AppProps = {
  palette: Palette
}

export default function PaletteCard(props: AppProps) {
  const colors = [...props.palette.colors];

  //Ensure that there are at least three colors
  for (let i=0; i<3; i++)
    if (colors.length === 2)
      colors.push({id: i, shades: ['#FFFFFF']})

  return (<article className="rounded-md shadow-md h-40 border-2 border-grey-300 flex flex-col truncate" key={palette.id}>
    {/* Title and More button */}
    <div className="p-2 flex justify-between">
      <h2 className="text-xl flex-grow"><Link to={`/app/palettes/${props.palette.id}`}>{props.palette.name}</Link></h2>
      <IconButton size="small" aria-label="More options">
        <MoreVertIcon/>
      </IconButton>
    </div>

    {/* Three palette sample stripes */}
    <div className="flex-grow flex flex-col justify-between">
    {
      colors.slice(0, 3).map(({shades,id}, index) => {
        return <div className="flex" key={id}>
          {(shades.length === 2
          ? [
              shades[0],
              shades[shades.length-1]
            ]
          : [
              shades[0],
              shades[shades.length/2],
              shades[shades.length-1],
            ]
          ).map(shade => {
            return <span className="flex-grow h-5" style={{ backgroundColor: shade }}/>
          })}
        </div>
      })
    }
    </div>
  </article>)
};