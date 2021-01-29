import React, { useState } from "react";

import { styled } from "@material-ui/core/styles"
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { Link } from "gatsby";
import PaletteMoreOptions from "#app/components/PaletteMoreOptions/index";


// A card displaying a palette
type PaletteCardProps = {
  palette: Palette
}
export default function PaletteCard(props: PaletteCardProps) {
  const colors: Color[] = ensureAtLeastThreeColors(props.palette.colors);
  const [optionsAnchorEl, setOptionsAnchorEl] = useState<HTMLElement | null>(null);

  const handleOptionsOpen = (event: React.MouseEvent<HTMLElement>) => {
    setOptionsAnchorEl(event.currentTarget);
  }

  const handleOptionsClose = () => {
    setOptionsAnchorEl(null);
  }

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
          return <div className="flex">
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
            ).map((shade, shadeIndex) => {
              return <span className="flex-grow h-5" style={{ backgroundColor: shade }} key={shadeIndex}/>
            })}
          </div>
        })
      }
      </div>
    </Link>

    <TopRightIconButton aria-label="More options" aria-controls={`palette-${props.palette.id}-options`} onClick={handleOptionsOpen}>
      <MoreVertIcon/>
    </TopRightIconButton>
    
    <PaletteMoreOptions 
      palette={props.palette}
      anchorEl={optionsAnchorEl}
      onClose={handleOptionsClose}/>
  </div>;
};

const TopRightIconButton = styled(IconButton)({
  right: "0px",
  top: "0px",
  position: "absolute",
});

function ensureAtLeastThreeColors(inputColors: Color[]) {
  const colors: Color[] = [...inputColors];

  if (colors.length === 0)
    colors.push({id: -1, shades: ['#FFFFFF'], name: "test"});

  if (colors.length === 1)
    colors.push({id: -2, shades: colors[0].shades, name: "test"});

  if (colors.length === 2)
    colors.push({id: -3, shades: colors[1].shades, name: "test"});

  return colors;
}