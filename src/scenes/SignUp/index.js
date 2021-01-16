import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import TextHorizontalRule from '../../components/TextHorizontalRule/index';
import { useStaticQuery, graphql } from 'gatsby';


export default function SignUp(props) {
  const [errorMessage, setErrorMessage] = useState("");

  // Get URL of backend website
  const query = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            backendApi
          }
        }
      }
    `
  );

  //Submit form
  const submitForm = function(event) {
    const data = {
      username: event.currentTarget.querySelector('input[name="username"]').value,
      email: event.currentTarget.querySelector('input[name="email"]').value,
      password: event.currentTarget.querySelector('input[name="password"]').value,
    }

    // Send a post request to server
    fetch(`${query.site.siteMetadata.backendApi}/auth/local/register`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify(data)
    })
    .then(response => {
      return response.json();
    })
    .then(body => {
      if (body.jwt) {
        // Handle Success
        localStorage.setItem('jwt', body.jwt);
        window.location = '/palettes'
      } else if (body.statusCode === 400) {
        // Handle failure
        setErrorMessage(body.data[0].messages[0].message)
      }
    })
    .catch(error => {
      console.log(error);
    })

    event.preventDefault();
    return false;
  }


  return <div className="p-4">
    <h1 className="text-4xl mb-8">Sign up to Palette Pal</h1>
    <form onSubmit={submitForm} className="grid gap-4 mb-4">
      <TextField className="w-full" label="Username" inputProps={{name: "username"}} variant="outlined"/>
      <TextField className="w-full" label="Email" inputProps={{name: "email"}} variant="outlined"/>
      <TextField type="password" className="w-full" label="Password" inputProps={{name: "password"}} variant="outlined"/>
      { errorMessage && 
        <p className="text-red-700">{errorMessage}</p> }
      <Button className="w-full" variant="contained" color="primary" type="submit">Sign Up</Button>

    </form>

    <TextHorizontalRule>Or</TextHorizontalRule>


  </div>
}