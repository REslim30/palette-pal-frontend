import React from "react";

import { styled } from "@material-ui/core/styles"
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { Link } from "gatsby";

const TopRightIconButton = styled(IconButton)({
  right: "0px",
  top: "0px",
  position: "absolute",
});

// A card displaying a palette
type AppProps = {
  palette: Palette
}

export default function PaletteCard(props: AppProps) {
  const colors: Color[] = [...props.palette.colors];

  //Ensure that there are at least three colors
  if (colors.length === 0)
    colors.push({id: -1, shades: ['#FFFFFF']})

  if (colors.length === 1)
    colors.push({id: -2, shades: colors[0].shades})

  if (colors.length === 2)
    colors.push({id: -3, shades: colors[1].shades})

  return <div className="relative">
    <Link to={`/app/palettes/${props.palette.id}`} aria-label={props.palette.name} className="clickable-card w-full text-left h-40 flex flex-col truncate" key={props.palette.id}>
      {/* Title and More button */}
      <div className="p-2 flex justify-between">
        <h2 className="text-xl flex-grow">{props.palette.name}</h2>
      </div>

      {/* Three palette sample stripes */}
      <div className="flex-grow flex flex-col justify-between mt-4">
      {
        colors.slice(0, 3).map(({shades, id}, index) => {
          return <div className="flex" key={id}>
            {(shades.length === 2
            ? [
                shades[0],
                shades[shades.length-1]
              ]
            : [
                shades[0],
                shades[Math.trunc(shades.length/2)],
                shades[shades.length-1],
              ]
            ).map(shade => {
              return <span className="flex-grow h-5" style={{ backgroundColor: shade }}/>
            })}
          </div>
        })
      }
      </div>
    </Link>
    {/* More Options Icon Button */}
    <TopRightIconButton aria-label="More options">
      <MoreVertIcon/>
    </TopRightIconButton>
  </div>;
};