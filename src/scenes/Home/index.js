import React from "react"
import { Button } from "@material-ui/core";
import artVectorIllustration from "./art-vector-illustration.svg"
import { Link } from "gatsby";

// Landing page
export default function Home(props) {
  const goToSignUp = function(event) {
    window.location = '/signup/';
  }

  return (
    <div className="max-w-screen-md mx-auto">
      <header className="flex justify-between items-center p-4">
        <h1 className="text-3xl">Palette Pal</h1>
        <nav>
          <Link className="text-lg regular-link" to="/login/">login</Link>
          <Link className="text-lg text-primary-600 ml-4 regular" to="/signup/">signup</Link>
        </nav>
      </header>

      <main>
        <article>
          <div className="flex flex-col items-center w-64 my-8 mx-auto">
            <h2 className="text-4xl text-center mb-4">Store all of your color palettes in one place.</h2>
            <Button onClick={goToSignUp} variant="contained" color="primary">Get Started</Button>
          </div>
          <img src={artVectorIllustration} className="w-4/5 mx-auto" alt="A person painting"></img>
        </article>

        <article className="bg-purple-50 py-8 px-4 mt-8 flex flex-col items-center">
          <h2 className="text-4xl mb-8">Save your color palettes for your next big project.</h2>
          <Button onClick={goToSignUp} variant="contained" color="primary">Get Started</Button>
        </article>
      </main>
    </div>
  );
}