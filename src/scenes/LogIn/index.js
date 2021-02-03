import React, { useState } from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import BACKEND_API_URL from "#src/services/api/BACKEND_API_URL";

// Login Page
export default function LogIn(props) {
  const [errorMessage, setErrorMessage] = useState("");
  
  // Submit event handler
  const submitForm = async function(event) {
    event.preventDefault();

    const data = {
      identifier: event.target.querySelector('input[name="identifier"]').value,
      password: event.target.querySelector('input[name="password"]').value,
    }
    
    const response = await fetch(`${BACKEND_API_URL}/auth/local`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify(data)
    });

    const body = await response.json();

    if (body.jwt) {
      localStorage.setItem('jwt', body.jwt);
      window.location = '/app/palettes';
    } else {
      setErrorMessage(body.data[0].messages[0].message)
    }
  }

  return <main className="max-w-screen-sm p-4 mx-auto">
    <h1 className="mb-8 text-4xl">Login to Palette Pal</h1>
    <form onSubmit={submitForm} className="grid gap-4 mb-4">
      <TextField id="identifier-input" className="w-full" label="Email or Username" inputProps={{name: "identifier"}} variant="outlined"/>
      <TextField id="password-input" type="password" className="w-full" label="Password" inputProps={{name: "password"}} variant="outlined"/>
      { errorMessage && 
        <p className="text-red-700" role="alert">{errorMessage}</p> }
      <Button className="w-full" variant="contained" color="primary" type="submit">Login</Button>
    </form>
  </main>
}