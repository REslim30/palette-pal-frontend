import React from "react";
import { TextField, Button } from "@material-ui/core";
import TextHorizontalRule from '../../components/TextHorizontalRule/index';
import { useStaticQuery, graphql } from 'gatsby';


export default function SignUp(props) {
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
  console.log(query);

  return <div className="p-4">
    <h1 className="text-4xl mb-8">Sign up to Palette Pal</h1>
    <form action={`${query.site.siteMetadata.backendApi}/auth/local/register`} method="post" className="grid gap-4 mb-4">
      <TextField className="w-full" label="Username" inputProps={{name: "username"}} variant="outlined"/>
      <TextField className="w-full" label="Email" inputProps={{name: "email"}} variant="outlined"/>
      <TextField className="w-full" label="Password" inputProps={{name: "password"}} variant="outlined"/>
      <Button className="w-full" variant="contained" color="primary" type="submit">Sign Up</Button>
    </form>

    <TextHorizontalRule>Or</TextHorizontalRule>


  </div>
}