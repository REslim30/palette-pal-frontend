import React, { useContext, useState } from "react";

import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";

import { useCreateOrEditPaletteContext } from "#app/scenes/CreateOrEditPalette/services/CreateOrEditPaletteContext";
import ColorBall from "#src/components/ColorBall/index";

type ColorListProps = {
  setColorToDelete: (colorIndex: number) => void,
  setColorToEdit: (colorIndex: number) => void,
}

export default function ColorList(props: ColorListProps) {
  const [colorOptionsAnchorEl, setColorOptionsAnchorEl] = useState<HTMLElement | null>(null);

  const handleColorOptionsOpen = (event: React.SyntheticEvent<HTMLElement>) => {
    setColorOptionsAnchorEl(event.currentTarget);
  }

  const handleColorOptionsClose = () => {
    setColorOptionsAnchorEl(null);
  }

  const handleColorEdit = () => {
    const colorIndex = parseInt((colorOptionsAnchorEl as HTMLElement).dataset.index as string);
    props.setColorToEdit(colorIndex);
  }

  const handleDeleteColorDialogOpen = () => {
    const colorIndex = parseInt((colorOptionsAnchorEl as HTMLElement).dataset.index as string);
    props.setColorToDelete(colorIndex);
    setColorOptionsAnchorEl(null);
  }

  return <>
    <CreatedColors 
      onColorOptionsOpen={handleColorOptionsOpen}/>

    <ColorListOptions 
      anchorEl={colorOptionsAnchorEl}
      onClose={handleColorOptionsClose}
      onEdit={handleColorEdit}
      onDelete={handleDeleteColorDialogOpen}/>
  </>
};

function CreatedColors(props: { onColorOptionsOpen: (event: React.SyntheticEvent<HTMLElement>) => void }) {
  const {colors} = useCreateOrEditPaletteContext();

  return <>
    {colors.map((color: Color, index: number) => {
      return <div 
        className="grid items-center w-full py-2 pl-4 pr-2 mt-4 border-2 rounded border-neutral-200 gap-x-4 gap-y-2" 
        style={{ gridTemplateColumns: 'auto min-content' }}
        data-index={index}>
        <h2 className="text-left">{color.name}</h2>
        <IconButton
          aria-controls="color-options-menu"
          aria-haspopup="true"
          onClick={props.onColorOptionsOpen}
          data-index={index} 
          size="small">
          <MoreVertIcon className="text-neutral-500"/>
        </IconButton>
        <div className="grid pb-2 gap-x-3 gap-y-2" style={{ gridTemplateColumns: 'repeat(auto-fill, 1rem)' }}>
          { color.shades.length === 1
          ? <span className="w-full h-4 rounded-full" style={{ backgroundColor: color.shades[0] }}/>
          : color.shades.map((shade, index) => {
              return <ColorBall color={shade} key={index}/>
            })}
        </div>
      </div>
    })}
  </>
}

type ColorListOptionsProps = {
  anchorEl: HTMLElement | null,
  onClose: () => void,
  onEdit: () => void,
  onDelete: () => void,
}
function ColorListOptions(props: ColorListOptionsProps) {
  return <Menu
    id="color-options-menu"
    anchorEl={props.anchorEl}
    open={Boolean(props.anchorEl)}
    onClose={props.onClose}>
    <MenuItem onClick={props.onEdit}>
      <ListItemIcon>
        <EditIcon/>
      </ListItemIcon>
      <ListItemText primary="Edit" />
    </MenuItem>
    <MenuItem onClick={props.onDelete}>
      <ListItemIcon>
        <DeleteIcon className="text-red-700"/>
      </ListItemIcon>
      <ListItemText primary="Delete"/>
    </MenuItem>
  </Menu>
}