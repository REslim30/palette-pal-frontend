import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { useQuery, gql } from '@apollo/client';
import { ArrowBack as ArrowBackIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  rightEdgeButton: {
    marginRight: '-12px',
  },
}));


export default function SinglePalette(props) {
  const classes = useStyles();

  const { loading, error, data } = useQuery(gql`
    query GetSinglePalette {
      palette(id: ${props.id}) {
        id
        name
        colors {
          id
          shades
        }
      }
    }
  `);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  return <>
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="Menu">
          <ArrowBackIcon />
        </IconButton>
        <h1 className='pl-4 text-xl flex-grow'>{data.palette.name}</h1>
        <IconButton edge="start" className={ classes.rightEdgeButton } color="inherit" aria-label="Add Palette">
          <MoreVertIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  </>
};