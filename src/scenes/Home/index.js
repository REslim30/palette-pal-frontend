import React from "react"
import { Button } from "@material-ui/core";
import artVectorIllustration from "./art-vector-illustration.svg"

export default function Home(props) {
  return (
    <div className="max-w-screen-md mx-auto">
      <header className="flex justify-between items-center p-4">
        <h1 className="text-3xl">Palette Pal</h1>
        <nav>
          <a className="text-lg" href="">login</a>
          <a className="text-lg text-primary-600 ml-4" href="">signup</a>
        </nav>
      </header>

      <main>
        <article>
          <div className="flex flex-col items-center w-64 my-8 mx-auto">
            <h2 className="text-4xl text-center mb-4">Store all of your color palettes in one place.</h2>
            <Button variant="contained" color="primary">Get Started</Button>
          </div>
          <img src={artVectorIllustration} className="w-4/5 mx-auto" alt="A person painting"></img>
        </article>

        <article className="bg-purple-50 py-8 px-4 mt-8 flex flex-col items-center">
          <h2 className="text-4xl mb-8">Save your color palettes for your next big project.</h2>
          <Button variant="contained" color="primary">Get Started</Button>
        </article>
      </main>
    </div>
  );
}