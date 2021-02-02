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
    <Link to={`/app/palettes/${props.palette.id}`} aria-label={props.palette.name} className="flex flex-col w-full h-40 text-left truncate clickable-card">
      {/* Title and More button */}
      <div className="flex justify-between p-2">
        <h2 className="flex-grow text-xl">{props.palette.name}</h2>
      </div>

      {/* Three palette sample stripes */}
      <div className="flex flex-col justify-between flex-grow mt-4">
      {
        colors.slice(0, 3).map(({shades, id}, index) => {
          let styleObj;
          if (shades.length === 3) {
            const middleShade = shades[Math.trunc(shades.length/2)];
            styleObj = { background: `linear-gradient(to right, ${shades[0]} 33.3%, ${middleShade} 0, ${middleShade} 66.6%, ${shades[shades.length-1]} 0)` };
          } else if (shades.length === 2) {
            styleObj = { background: `linear-gradient(to right, ${shades[0]} 50%, ${shades[shades.length-1]} 50%)` };
          } else {
            styleObj = { background: shades[0] };
          }

          return <div className="h-5" style={styleObj} key={index}/>
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