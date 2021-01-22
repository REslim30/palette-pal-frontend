import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import AddColorDialog from "./components/AddColorDialog/index";
import SendIcon from "#src/components/SendIcon/index";

import { makeStyles } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";



const useStyles = makeStyles((theme) => ({
  rightEdgeButton: {
    marginRight: '-12px',
  },
  formControl: {
    minWidth: '50%'
  }
}));

// Page to create a new palette
export default function CreatePalette(props) {
  const classes = useStyles();
  const [group, setGroup] = useState('');
  const [colors, setColors] = useState([]);
  const [colorToEdit, setColorToEdit] = useState({});
  const [colorToBeDeleted, setColorToBeDeleted] = useState(null);
  const [submitColor, setSubmitColor] = useState(() => addColor);

  const { loading, error, data } = useQuery(gql`
    query GetGroups {
      groups {
        id
        name
      }
    }
  `);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;


  const onArrowBack = (event) => {
    window.history.back();
  }

  const handleGroupChange = (event) => {
    setGroup(event.target.value);
  }

  const handleNewColorCreate = (event) => {
    setColorToEdit({ name: '', shades: [] });
  }

  const handleColorDialogClose = (event) => {
    setColorToEdit(null);
  }

  function addColor(color) {
    setColors([...colors, color])
  }

  const handleEditColor = (event) => {
    const colorIndex = parseInt(event.currentTarget.dataset.index);

    const editColor = (newColor) => {
      const newColors = [...colors];
      newColors[colorIndex] = newColor;
      setColors(newColors);
    }

    setSubmitColor(() => editColor);
    setColorToEdit(colors[colorIndex]);
  }

  const handleDeleteColorDialogOpen = (event) => {
    const colorIndex = parseInt(event.currentTarget.dataset.index);
    setColorToBeDeleted(colorIndex);
  }

  const handleDeleteColorDialogClose = (event) => {
    setColorToBeDeleted(null);
  };

  const handleDeleteColor = () => {
    setColors(colors.filter((color, index) => colorToBeDeleted !== index));
    setColorToBeDeleted(null);
  }
  
  return <>
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="Menu" onClick={onArrowBack}>
          <ArrowBackIcon />
        </IconButton>
        <h1 className='pl-4 text-xl flex-grow'>Add Palette</h1>
        <IconButton edge="end" className={ classes.rightEdgeButton } color="inherit" aria-label="Create palette">
          <SendIcon />
        </IconButton>
      </Toolbar>
    </AppBar>

    <main className="p-6">
      {/* Name and Group input*/}
      <section className="grid grid-cols-2 gap-4">
        <TextField variant="outlined" label="Name"></TextField>
        <FormControl className={classes.formControl} variant="outlined">
          <InputLabel htmlFor="group-select-label">Group</InputLabel>
          <Select 
            native
            value={group}
            onChange={handleGroupChange}
            label="Group"
            inputProps={{
              name: 'group',
              id: 'group-select-label'
            }}
          >
            <option aria-label="none" value=""/>
            {data.groups.map(group => {
              return <option value={group.id}>{group.name}</option>
            })}
          </Select>
        </FormControl> 
      </section>

      <section className="mt-6">
        {/* List of colors */}
        {colors.map((color, index) => {
          return <button 
            className="clickable-card w-full mt-4 py-2 pl-4 pr-2 grid gap-x-4 gap-y-2 items-center" 
            style={{ gridTemplateColumns: 'auto min-content' }}
            onClick={ handleEditColor }
            data-index={index}>
            <h2 className="text-left">{color.name}</h2>
            <IconButton onClick={handleDeleteColorDialogOpen} data-index={index} size="small">
              <DeleteIcon className="text-red-800"/>
            </IconButton>
            <div className="grid gap-x-3 gap-y-2 pb-2" style={{ gridTemplateColumns: 'repeat(auto-fill, 1rem)' }}>
              { color.shades.length === 1
              ? <span className="h-4 w-full rounded-full" style={{ backgroundColor: color.shades[0] }}/>
              : color.shades.map((shade) => {
                  return <span className="color-ball mr-3 " style={{ backgroundColor: shade }}/>
                })}
            </div>
          </button>
        })}
        {/* Delete 'are you sure' dialog */}
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
          <AddIcon alt="Add Color" className="text-primary-500"/>
        </button>
      </section>

      <AddColorDialog 
        open={Boolean(colorToEdit)} 
        onClose={handleColorDialogClose}
        submitColor={submitColor}
        color={colorToEdit}
        />
    </main>
  </>
};