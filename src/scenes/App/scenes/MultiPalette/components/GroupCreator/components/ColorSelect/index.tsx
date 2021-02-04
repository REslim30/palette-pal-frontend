import React from "react";

import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import ColorBall from "#src/components/ColorBall/index";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

export default function ColorSelect(props: any) {
  const colorList = [
    "indianred",
    "lightcoral",
    "salmon",
    "tomato",
    "coral",
    "gold",
    "peachpuff",
    "palegreen",
    "darkseagreen",
    "olive",
    "paleturquoise",
    "cadetblue",
    "teal",
    "orchid",
    "mediumpurple",
    "lightpink",
    "palevioletred",
    "gainsboro",
    "lightslategray",
    "darkgray",
    "burlywood",
    "rosybrown",
    "peru"
  ]

  return <FormControl variant="outlined">
    <InputLabel id="color-select-input-label">Color</InputLabel>
    {/* TODO: Replace Select with accessible select with suitable styles */}
    <Select
      labelId="color-select-input-label"
      value={props.value}
      onChange={props.onChange}
      label="Color">
      <MenuItem value="" aria-label="None"></MenuItem>
      {colorList.map(color => {
        return <MenuItem value={color} key={color} aria-label={color}>
          <div>
            <ColorBall color={color} />
            <span className="pb-2 ml-4">{color}</span>
          </div>
        </MenuItem>
      })}
    </Select>
  </FormControl>
}