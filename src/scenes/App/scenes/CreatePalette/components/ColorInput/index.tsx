import React, { useState, useContext } from "react";

import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import ColorDialog from "./components/ColorDialog/index";
import ColorContext from "../../services/ColorContext";

type ColorInput = {
  colors: Color[],
  setColors: (colors: Color[]) => void,
}
export default function ColorInput({...props}: any) {
  const [colors, setColors] = useContext(ColorContext);
  const [colorOptionsAnchorEl, setColorOptionsAnchorEl] = useState<HTMLElement | null>(null);
  const [colorToEdit, setColorToEdit] = useState<Color | null>(null);
  const [colorToBeDeleted, setColorToBeDeleted] = useState<number | null>(null);

  const [editColor, setEditColor] = useState(() => addColor);

  const handleColorEdit = () => {
    const colorIndex = parseInt((colorOptionsAnchorEl as HTMLElement).dataset.index as string);

    const editColor = (newColor: Color) => {
      const newColors = [...colors];
      newColors[colorIndex] = newColor;
      setColors(newColors);
    }

    setEditColor(() => editColor);
    setColorToEdit(colors[colorIndex]);
  }

  const handleDeleteColorDialogOpen = () => {
    const colorIndex = parseInt((colorOptionsAnchorEl as HTMLElement).dataset.index as string);
    setColorToBeDeleted(colorIndex);
    setColorOptionsAnchorEl(null);
  }

  const handleDeleteColorDialogClose = () => {
    setColorToBeDeleted(null);
  };

  const handleDeleteColor = () => {
    setColors(colors.filter((color: Color, index: number) => colorToBeDeleted !== index));
    setColorToBeDeleted(null);
  }

  const handleColorOptionsOpen = (event: React.SyntheticEvent<HTMLElement>) => {
    setColorOptionsAnchorEl(event.currentTarget);
  }

  const handleColorOptionsClose = () => {
    setColorOptionsAnchorEl(null);
  }

  const handleNewColorCreate = () => {
    setEditColor(() => addColor);
    setColorToEdit({ id: 1, name: '', shades: [] });
  }

  const handleColorDialogClose = () => {
    setColorToEdit(null);
  }

  function addColor(color: Color) {
    setColors([...colors, color])
  }


  return <section className="mt-6">
    {/* List of colors */}
    {colors.map((color: Color, index: number) => {
      return <div 
        className="border-2 border-neutral-200 rounded w-full mt-4 py-2 pl-4 pr-2 grid gap-x-4 gap-y-2 items-center" 
        style={{ gridTemplateColumns: 'auto min-content' }}
        data-index={index}>
        <h2 className="text-left">{color.name}</h2>
        <IconButton
          aria-controls="color-options-menu"
          aria-haspopup="true"
          onClick={handleColorOptionsOpen}
          data-index={index} 
          size="small">
          <MoreVertIcon className="text-neutral-500"/>
        </IconButton>
        <div className="grid gap-x-3 gap-y-2 pb-2" style={{ gridTemplateColumns: 'repeat(auto-fill, 1rem)' }}>
          { color.shades.length === 1
          ? <span className="h-4 w-full rounded-full" style={{ backgroundColor: color.shades[0] }}/>
          : color.shades.map((shade) => {
              return <span className="color-ball mr-3 " style={{ backgroundColor: shade }}/>
            })}
        </div>
      </div>
    })}
    {/* Color options */}
    <Menu
      id="color-options-menu"
      anchorEl={colorOptionsAnchorEl}
      open={Boolean(colorOptionsAnchorEl)}
      onClose={handleColorOptionsClose}>
      <MenuItem onClick={handleColorEdit}>
        <ListItemIcon>
          <EditIcon/>
        </ListItemIcon>
        <ListItemText primary="Edit" />
      </MenuItem>
      <MenuItem onClick={handleDeleteColorDialogOpen}>
        <ListItemIcon>
          <DeleteIcon className="text-red-700"/>
        </ListItemIcon>
        <ListItemText primary="Delete"/>
      </MenuItem>
    </Menu>

    {/* Color delete 'are you sure' dialog */}
    <Dialog
      open={colorToBeDeleted !== null}
      onClose={handleDeleteColorDialogClose}
      aria-labelledby="delete-color-dialog-title"
      aria-describedby="delete-color-dialog-description">
      <DialogTitle id="delete-color-dialog-title">Erase color?</DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-color-dialog-description">
          You won't be able to recover this color. Are you sure?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDeleteColorDialogClose}>
          Cancel
        </Button>
        <Button onClick={handleDeleteColor} color="secondary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>

    {/* Add color button */}
    <button className="py-2 px-4 clickable-card flex items-center justify-between w-full mt-4" onClick={handleNewColorCreate}>
      <span className="text-neutral-500">Add Color</span>
      <AddIcon className="text-primary-500"/>
    </button>
    
    <ColorDialog 
    open={Boolean(colorToEdit)} 
    onClose={handleColorDialogClose}
    submitColor={editColor}
    color={colorToEdit}
    />
  </section>
};