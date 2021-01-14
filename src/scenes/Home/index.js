import React from "react"

export default function Home(props) {
  return (
    <header className="flex justify-between p-4">
      <h1 className="text-3xl">Palette Pal</h1>
      <nav>
        <a className="text-lg" href="">login</a>
        <a className="text-lg text-primary-700 ml-4" href="">signup</a>
      </nav>
    </header>
  );
}