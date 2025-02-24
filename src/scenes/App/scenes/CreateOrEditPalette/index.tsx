import React, { useEffect, useState } from "react"
import { RouteComponentProps } from "@reach/router"

import CreateOrEditPaletteAppBar from "./components/CreateOrEditPaletteAppBar/index"
import NameAndGroupInput from "./components/NameAndGroupInput/index"
import ColorInput from "./components/ColorInput"
import CreateOrEditPaletteContext from "./services/CreateOrEditPaletteContext"
import { refreshGroups, refreshPalettes, usePalette } from "#src/services/app-state-store"
import SEO from "#src/components/SEO/index"
import submitPalette from "./services/submitPalette"
import Button from "@material-ui/core/Button"
import paletteIsSubmittable from "./services/paletteIsSubmittable"
import useWindowSize from "#src/services/useWindowSize"
import { useAuth0 } from "@auth0/auth0-react"
import { navigate } from "gatsby"

interface CreateOrEditPaletteProps extends RouteComponentProps {
  id?: number
}

export default function CreateOrEditPalette(props: CreateOrEditPaletteProps) {
  const palette = usePalette(props.id)
  const [name, setName] = useState("")
  const [group, setGroup] = useState<number | null>(null)
  const [colors, setColors] = useState<Color[]>([])
  const size = useWindowSize()
  const { getAccessTokenSilently, loginWithRedirect } = useAuth0()

  const handlePaletteSubmit = async () => {
    try {
      const palette = await submitPalette(
        { id: props.id, name, group, colors },
        getAccessTokenSilently
      )
      await Promise.all([
        refreshPalettes(getAccessTokenSilently, loginWithRedirect),
        refreshGroups(getAccessTokenSilently, loginWithRedirect)
      ])
      navigate(`/app/palettes/${palette.id}`)
    } catch (err: any) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (palette) {
      setName(palette.name)
      setGroup(palette.group || null)
      setColors(palette.colors)
    }
  }, [palette])

  return (
    <>
      <SEO title="Create Palette" />
      <CreateOrEditPaletteContext.Provider
        value={{
          colors,
          setColors,
          name,
          setName,
          group,
          setGroup,
          id: props.id,
        }}
      >
        <CreateOrEditPaletteAppBar onSubmit={handlePaletteSubmit} />

        <main className="max-w-screen-md p-6 mx-auto">
          <NameAndGroupInput />

          <ColorInput />

          <Button
            onClick={handlePaletteSubmit}
            disabled={!paletteIsSubmittable({ name, colors })}
            variant="contained"
            color="primary"
            style={{
              display: (size.width as number) <= 768 ? "none" : "block",
              marginTop: "1rem",
            }}
          >
            {props.id ? "Edit Palette" : "Create Palette"}
          </Button>
        </main>
      </CreateOrEditPaletteContext.Provider>
    </>
  )
}
