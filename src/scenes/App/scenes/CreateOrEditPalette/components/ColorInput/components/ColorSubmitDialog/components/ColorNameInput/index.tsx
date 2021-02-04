import React from 'react';
import TextField from '@material-ui/core/TextField';

import { useColorSubmitContext } from "../../services/ColorSubmitContext";


export default function ColorNameInput(props: unknown) {
  const { name, setName } = useColorSubmitContext();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return <TextField 
    id="color-name-input"
    label="Name" 
    variant="outlined" 
    placeholder="E.g. Primary, Blue, Neutrals"
    value={name}
    onChange={handleNameChange}
    autoFocus/>
}