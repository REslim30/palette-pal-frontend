import React from "react"
import { Button } from "@material-ui/core";
import artVectorIllustration from "./art-vector-illustration.svg";
import { useAuth0 } from "@auth0/auth0-react";

// Landing page
export default function Home(props: {}) {
  const { loginWithRedirect } = useAuth0();
  const goToSignUp = function() {
    loginWithRedirect();
  }

  return (
    <div className="max-w-screen-md mx-auto">
      <header className="flex items-center justify-between p-4">
        <h1 className="text-3xl">Palette Pal</h1>
        <nav>
          {/* <Link className="text-lg regular-link" to="/login/">login</Link> */}
          <a role="button" className="ml-4 text-lg regular-link text-primary-600 regular" onClick={goToSignUp}>login</a>
        </nav>
      </header>

      <main>
        <article>
          <div className="flex flex-col items-center w-64 mx-auto my-8">
            <h2 className="mb-4 text-4xl text-center">Store all of your color palettes in one place.</h2>
            <Button onClick={goToSignUp} variant="contained" color="primary">Get Started</Button>
          </div>
          <img src={artVectorIllustration} className="w-4/5 mx-auto" alt="A person painting"></img>
        </article>

        <article className="flex flex-col items-center px-4 py-8 mt-8 bg-purple-50">
          <h2 className="mb-8 text-4xl">Save your color palettes for your next big project.</h2>
          <Button onClick={goToSignUp} variant="contained" color="primary">Get Started</Button>
        </article>
      </main>
    </div>
  );
}