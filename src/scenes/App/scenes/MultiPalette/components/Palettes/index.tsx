import React from "react"
import CircularProgress from "@material-ui/core/CircularProgress"
import { useCurrentGroup, usePalettes } from "#src/services/app-state-store"
import PaletteCard from "./components/PaletteCard/index"
import IconLink from "#src/components/IconLink"
import AddIcon from "@material-ui/icons/Add";

export default function Palettes(props: unknown) {
  const allPalettes = usePalettes()
  const group = useCurrentGroup()

  let palettes = group?.palettes || allPalettes

  if (!palettes) return <CircularProgress />

  if (!palettes.length)
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
        <IconLink
          to="/app/palettes/new"
          aria-label="create new palette"
          className="items-center justify-center hidden lg:flex clickable-card text-primary-800"
        >
          <span>
            <AddIcon fontSize="large"/>
          </span>
        </IconLink>
      </main>
    )
}
