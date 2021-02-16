import React, { useState } from "react"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import { login } from "#src/services/api/backendApi"

// Login Page
export default function LogIn(props: {}) {
  const [errorMessage, setErrorMessage] = useState("")

  // Submit event handler
  const submitForm = async function (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const identifier = (event.currentTarget.querySelector(
      'input[name="identifier"]'
    ) as HTMLInputElement).value
    const password = (event.currentTarget.querySelector(
      'input[name="password"]'
    ) as HTMLInputElement).value


    try {
      const response = await login({ identifier, password });

      if (response.status === 200) {
        // window.location.href = "/app/palettes"
      } else {
        const body = await response.json()
        setErrorMessage(body.message);
      }
      
    } catch (error) {
      console.error(error);
      setErrorMessage("Connection issue.");
    }
  }

  return (
    <main className="max-w-screen-sm p-4 mx-auto">
      <h1 className="mb-8 text-4xl">Login to Palette Pal</h1>
      <form onSubmit={submitForm} className="grid gap-4 mb-4">
        <TextField
          id="identifier-input"
          className="w-full"
          label="Email or Username"
          inputProps={{ name: "identifier" }}
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
          Login
        </Button>
      </form>
    </main>
  )
}
