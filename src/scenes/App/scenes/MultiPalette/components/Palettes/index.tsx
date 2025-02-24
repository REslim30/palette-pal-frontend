import React from "react"
import { useCurrentGroup, usePalettes } from "#src/services/app-state-store"
import PaletteCard from "./components/PaletteCard/index"
import AddIcon from "@material-ui/icons/Add";
import useWindowSize from "#src/services/useWindowSize";
import LoadingAnimation from "#src/components/LoadingAnimation";
import { Link } from "gatsby";

export default function Palettes(props: unknown) {
  const allPalettes = usePalettes()
  const group = useCurrentGroup()
  const size = useWindowSize();

  let palettes = group?.palettes || allPalettes

  if (!palettes) return <main style={{ height: "calc(100vh - 64px)"}}><LoadingAnimation /></main>

  if (!palettes.length && size.width as number <= 1024)
    return (
      <main className="flex flex-col items-center justify-center flex-grow">
        <span className="text-xl text-neutral-800">
          Click '+' to create a palette!
        </span>
      </main>
    )
  else
    return (
      <main
        className="grid w-full max-w-screen-md gap-6 p-6 mx-auto"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))" }}
      >
        {palettes.map(palette => (
          <PaletteCard palette={palette} key={palette.id} />
        ))}

        {/* Add palette link for desktop screens */}
        <Link
          to="/app/palettes/new"
          aria-label="create new palette"
          className="items-center justify-center hidden w-full h-40 lg:flex clickable-card text-primary-800"
        >
          <span>
            <AddIcon fontSize="large"/>
          </span>
        </Link>
      </main>
    )
}
