import React, { useState } from 'react';
import { fromString } from "css-color-converter";
import { nanoid } from "nanoid";

import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";

import { useColorSubmitContext } from "../../services/ColorSubmitContext";

export default function ShadeInput(props: any) {
  const { shades, setShades } = useColorSubmitContext();
  const [cssColorString, setCssColorString] = useState('');
  const [shadeInputError, setShadeInputError] = useState({});

  const handleCssColorStringChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCssColorString(event.target.value);
  };

  const handleAddShade = () => {
    const hexValue = fromString(cssColorString)?.toHexString();
    if (hexValue) {
      const newShade: any = new String(hexValue.toUpperCase());
      newShade.uid = nanoid();
      setShades([...shades, newShade]);
      setShadeInputError({});
      setCssColorString('');
    } else {
      setShadeInputError({error: true, helperText: 'Invalid hex, rgb, or hsl CSS string.'})
    }
  }

  const handleAddShadeKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      handleAddShade();
    }
  }

  return <div className="pt-4">          
    <div className="flex flex-col items-end">
      <TextField 
        id="css-color-shade-input"
        {...shadeInputError}
        label="shade (CSS color string)" 
        variant="outlined" size="small" 
        placeholder="e.g. hsl(10, 20%, 30%)" 
        value={cssColorString}
        onChange={handleCssColorStringChange}
        onKeyDown={handleAddShadeKeyDown}/>
      <Button color="primary" onClick={handleAddShade}>Add shade</Button>
    </div>
  </div>
}