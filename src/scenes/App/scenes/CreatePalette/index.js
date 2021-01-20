import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SendIcon from "@material-ui/icons/Send";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

import { useQuery, gql } from '@apollo/client';

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
      <section className="grid grid-cols-2 gap-4">
        <TextField variant="outlined" label="Name"></TextField>
        <FormControl className={classes.formControl} variant="outlined">
          <InputLabel htmlfor="group-select-label">Group</InputLabel>
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

      <section>

      </section>
    </main>
  </>
};