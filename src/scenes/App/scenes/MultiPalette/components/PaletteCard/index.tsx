import React, { useState } from "react";

import { styled } from "@material-ui/core/styles"
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { Link } from "gatsby";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import deleteRequest from "#src/services/deleteRequest";
import { refreshGroups, refreshPalettes } from "#app/services/app-state-store";
import ConfirmDeleteDialog from "#src/components/ConfirmDeleteDialog/index";

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

  return <div className="relative" key={props.palette.id}>
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

function PaletteMoreOptions(props: { palette: Palette, anchorEl: HTMLElement | null, onClose: () => void }) {
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const handleDelete = async() => {
    await deleteRequest(`/palettes/${props.palette.id}`);
    const palettes = refreshPalettes();
    const groups = refreshGroups();

    await palettes;
    await groups;
  }

  const handleConfirmDeleteOpen = () => {
    setConfirmDeleteOpen(true);
    props.onClose();
  }

  const handleConfirmDeleteClose = () => {
    setConfirmDeleteOpen(false);
  }

  return <>
    <Menu
      id={`palette-${props.palette.id}-options`}
      anchorEl={props.anchorEl}
      open={Boolean(props.anchorEl)}
      onClose={props.onClose}>
      <MenuItem>
        <Link to={`/app/palettes/edit/${props.palette.id}`} role="menuitem">Edit</Link>
      </MenuItem>
      <span className="text-red-800">
        <MenuItem onClick={handleConfirmDeleteOpen}>Delete</MenuItem>
      </span>
    </Menu>

    <ConfirmDeleteDialog 
      open={confirmDeleteOpen}
      onDelete={handleDelete}
      onClose={handleConfirmDeleteClose}
      objectToDelete="palette"/>
  </>
}

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