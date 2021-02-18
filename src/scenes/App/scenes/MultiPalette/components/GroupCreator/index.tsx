import React, { useEffect, useState } from "react"
import { useMultiPaletteContext } from "../../services/MultiPaletteContext"
import { refreshGroups } from "#src/services/app-state-store"

import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogActions from "@material-ui/core/DialogActions"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"

import submitGroup from "./services/submitGroup"
import ColorSelect from "./components/ColorSelect/index"
import { useAuth0 } from "@auth0/auth0-react";

export default function GroupCreator(props: any) {
  const {
    groupToEdit,
    setGroupToEdit,
    setLeftDrawerOpen,
  } = useMultiPaletteContext()
  const [iconColor, setIconColor] = useState("")
  const [name, setName] = useState("")
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const group = groupToEdit as Group
    if (group?.id) {
      setIconColor(group.iconColor ?? "")
      setName(group.name)
    }
  }, [groupToEdit])

  const handleClose = () => {
    setGroupToEdit(null)
  }

  const handleIconColorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIconColor(event.target.value)
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const handleSubmit = async () => {
    submitGroup({ id: (groupToEdit as any)?.id, name, iconColor }, getAccessTokenSilently)
    .then(() => {
      return refreshGroups(getAccessTokenSilently)
    })
    .then(() => {
      handleClose()
      setLeftDrawerOpen(true)
    })
  }

  return (
    <Dialog open={Boolean(groupToEdit)} onClose={handleClose} aria-describedby="group-dialog-heading">
      <DialogTitle id="group-dialog-heading">Create a Group</DialogTitle>
      <div className="flex flex-col justify-between px-5 mb-2">
        <div className="mb-4">
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={handleNameChange}
            autoFocus
            id="group-creator-name-input"
          />
        </div>
        <ColorSelect value={iconColor} onChange={handleIconColorChange} />
      </div>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}
