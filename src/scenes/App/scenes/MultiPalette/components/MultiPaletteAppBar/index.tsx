import React, { useState } from "react"
import { navigate } from "@reach/router";

import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import AddIcon from "@material-ui/icons/Add"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import IconLink from "#src/components/IconLink/index"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"

import RightEdgeIconButton from "#src/components/RightEdgeIconButton/index"
import ConfirmDeleteDialog from "#src/components/ConfirmDeleteDialog/index";
import deleteRequest from "#src/services/deleteRequest";
import { refreshGroups, refreshPalettes, useCurrentGroup } from "#app/services/app-state-store"
import { useMultiPaletteContext } from "../../services/MultiPaletteContext"

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
          aria-label="Menu"
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>
        <h1 className="flex-grow pl-4 text-xl">{group?.name || "All"}</h1>
        <IconLink to="/app/palettes/new">
          <AddIcon />
        </IconLink>
        <GroupMenu />
      </Toolbar>
    </AppBar>
  )
}

function GroupMenu(props: unknown) {
  const group = useCurrentGroup()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleConfirmDeleteDialogOpen = () => {
    setConfirmDeleteDialogOpen(true);
    handleClose();
  }

  const handleConfirmDeleteDialogClose = () => {
    setConfirmDeleteDialogOpen(false);
  }

  const handleDelete = async () => {
    await deleteRequest(`/groups/${(group as Group).id}`)
    const groupRefresh = refreshGroups();
    const paletteRefresh = refreshPalettes();
    await groupRefresh;
    await paletteRefresh;
    handleConfirmDeleteDialogClose();
  }

  return (
    group && (
      <>
        <RightEdgeIconButton
          aria-controls="group-menu"
          aria-haspopup="true"
          onClick={handleOpen}
        >
          <MoreVertIcon className="text-white" />
        </RightEdgeIconButton>
        <Menu
          id="group-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem>Edit Group</MenuItem>
          <span className="text-red-800">
            <MenuItem onClick={handleConfirmDeleteDialogOpen}>Delete Group</MenuItem>
          </span>
        </Menu>
        <ConfirmDeleteDialog
          open={confirmDeleteDialogOpen}
          objectToDelete="group"
          onDelete={handleDelete}
          onClose={handleConfirmDeleteDialogClose}
          additionalMessage="This will also delete any palettes in the group."/>
      </>
    )
  )
}
