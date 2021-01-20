import React, { useState } from 'react';

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

import { useQuery, gql } from '@apollo/client';
import AddColorDialog from "./components/AddColorDialog/index";
import SendIcon from "../../../../components/SendIcon/index";

const useStyles = makeStyles((theme) => ({
  rightEdgeButton: {
    marginRight: '-12px',
  },
  formControl: {
    minWidth: '50%'
  }
}));

export default function CreatePalette(props) {
  const classes = useStyles();
  const [group, setGroup] = useState('');
  const [colors, setColors] = useState([]);
  const [colorDialogOpen, setColorDialogOpen] = useState(false);

  // Graphql query
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

  const handleColorDialogOpen = (event) => {
    setColorDialogOpen(true);
  }

  const handleColorDialogClose = (event) => {
    setColorDialogOpen(false);
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

    {/* Name and Group section */}
    <main className="p-6">
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

      {/* Colors Section */}
      <section>
        {colors.map(color => {
          return <div>
            <h2>{color.name}</h2>
          </div>
        })}

        <button className="py-2 px-4 rounded-md shadow-md flex items-center justify-between w-full border-2" onClick={handleColorDialogOpen}>
          <span className="text-neutral-500">Add Color</span>
          <AddIcon alt="Add Color" className="text-primary-500"/>
        </button>
      </section>

      <AddColorDialog open={colorDialogOpen} handleClose={handleColorDialogClose}/>
    </main>
  </>
};