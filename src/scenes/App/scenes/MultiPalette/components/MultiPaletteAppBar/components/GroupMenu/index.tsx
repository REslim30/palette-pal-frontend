import React, { useState } from "react"

import MoreVertIcon from "@material-ui/icons/MoreVert"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"

import RightEdgeIconButton from "#src/components/RightEdgeIconButton/index"
import ConfirmDeleteDialog from "#src/components/ConfirmDeleteDialog/index"
import { deleteRequest } from "#src/services/api/backendApi"
import {
  refreshGroups,
  refreshPalettes,
  useCurrentGroup,
} from "#src/services/app-state-store"
import { useMultiPaletteContext } from "../../../../services/MultiPaletteContext"

export default function GroupMenu(props: unknown) {
  const group = useCurrentGroup()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false)
  const { setGroupToEdit } = useMultiPaletteContext()

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleConfirmDeleteDialogOpen = () => {
    setConfirmDeleteDialogOpen(true)
    handleClose()
  }

  const handleConfirmDeleteDialogClose = () => {
    setConfirmDeleteDialogOpen(false)
  }

  const handleDelete = async () => {
    await deleteRequest(`/groups/${(group as Group).id}`)
    const groupRefresh = refreshGroups()
    const paletteRefresh = refreshPalettes()
    await groupRefresh
    await paletteRefresh
    handleConfirmDeleteDialogClose()
  }

  const handleEdit = () => {
    handleClose();
    setGroupToEdit(group)
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
          <MenuItem onClick={handleEdit}>Edit Group</MenuItem>
          <span className="text-red-800">
            <MenuItem onClick={handleConfirmDeleteDialogOpen}>
              Delete Group
            </MenuItem>
          </span>
        </Menu>
        <ConfirmDeleteDialog
          open={confirmDeleteDialogOpen}
          objectToDelete="group"
          onDelete={handleDelete}
          onClose={handleConfirmDeleteDialogClose}
          additionalMessage="This will also delete any palettes in the group."
        />
      </>
    )
  )
}