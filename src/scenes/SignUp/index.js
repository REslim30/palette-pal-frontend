import React from "react";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import TextHorizontalRule from '../../components/TextHorizontalRule/index';


export default function SignUp(props) {
  return <div className="grid p-4 gap-4">
    <h1 className="text-4xl mb-4">Sign up to Palette Pal</h1>
    <TextField className="w-full" label="Username" variant="outlined"/>
    <TextField className="w-full" label="Email" variant="outlined"/>
    <TextField className="w-full" label="Password" variant="outlined"/>
    <Button className="w-full" variant="contained" color="primary">Sign Up</Button>

    <TextHorizontalRule>Or</TextHorizontalRule>

    
  </div>
}