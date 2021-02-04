import React from "react"

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AddIcon from "@material-ui/icons/Add";
import { styled } from "@material-ui/core/styles";
import IconLink from "#src/components/IconLink/index";
import { useCurrentGroup } from "#src/services/app-state-store";
import { useMultiPaletteContext } from "../../services/MultiPaletteContext";
import GroupMenu from "./components/GroupMenu/index";

export default function MultiPaletteAppBar(props: any) {
  const group = useCurrentGroup()
  const { setLeftDrawerOpen } = useMultiPaletteContext()

  const handleMenuOpen = (event: React.SyntheticEvent<HTMLElement>) => {
    setLeftDrawerOpen(true)
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open left drawer"
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>
        <h1 className="flex-grow pl-4 text-xl">{group?.name || "All"}</h1>
        <IconLink to="/app/palettes/new" aria-label="Add New Palette" className="lg:hidden">
          <AddIcon />
        </IconLink>
        <GroupMenu />
      </Toolbar>
    </AppBar>
  )
}
