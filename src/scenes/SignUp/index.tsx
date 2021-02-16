import React, { useState } from "react"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import { signup } from "#src/services/authentication";

// Sign Up page
export default function SignUp(props: {}) {
  const [errorMessage, setErrorMessage] = useState("")

  //Submit form
  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const username = (event.currentTarget.querySelector(
      'input[name="username"]'
    ) as HTMLInputElement).value;
    const email = (event.currentTarget.querySelector(
      'input[name="email"]'
    ) as HTMLInputElement).value;
    const password = (event.currentTarget.querySelector(
      'input[name="password"]'
    ) as HTMLInputElement).value;

    try {
      const response = await signup({username, email, password});

      if (response.status === 200) {
        window.location.href = "/app/palettes"
      } else {
        const body = await response.json();
        setErrorMessage(body.data[0].messages[0].message)
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Connection issue.");
    }
  }

  return (
    <main className="max-w-screen-sm p-4 mx-auto">
      <h1 className="mb-8 text-4xl">Sign up to Palette Pal</h1>
      <form onSubmit={submitForm} className="grid gap-4 mb-4">
        <TextField
          id="username-input"
          className="w-full"
          label="Username"
          inputProps={{ name: "username" }}
          variant="outlined"
        />
        <TextField
          id="email-input"
          className="w-full"
          label="Email"
          inputProps={{ name: "email" }}
          variant="outlined"
        />
        <TextField
          id="password-input"
          type="password"
          className="w-full"
          label="Password"
          inputProps={{ name: "password" }}
          variant="outlined"
        />
        {errorMessage && (
          <p className="text-red-700" role="alert">
            {errorMessage}
          </p>
        )}
        <Button
          className="w-full"
          variant="contained"
          color="primary"
          type="submit"
        >
          Sign Up
        </Button>
      </form>
    </main>
  )
}
