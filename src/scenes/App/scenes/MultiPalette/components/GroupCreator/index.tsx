import React, { useEffect, useState } from "react";
import { useMultiPaletteContext } from "../../services/MultiPaletteContext";
import { refreshGroups } from "#src/services/app-state-store";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import submitGroup from "./services/submitGroup";
import ColorSelect from "./components/ColorSelect/index";

export default function GroupCreator(props: any) {
  const { groupToEdit, setGroupToEdit, setLeftDrawerOpen } = useMultiPaletteContext();
  const [iconColor, setIconColor] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const group = (groupToEdit as Group);
    if (group?.id) {
      setIconColor(group.iconColor ?? '');
      setName(group.name);
    }
  }, [groupToEdit]);

  const handleClose = () => {
    setGroupToEdit(null);
  }

  const handleIconColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIconColor(event.target.value);
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }

  const handleSubmit = async () => {
    await submitGroup({id: (groupToEdit as any)?.id, name, iconColor})
    await refreshGroups()
    handleClose();
    setLeftDrawerOpen(true);
  }

  return <Dialog
    open={Boolean(groupToEdit)}
    onClose={handleClose}>
    <DialogTitle>Create a Group</DialogTitle>
    <div className="flex flex-col justify-between px-5 mb-4">
      <div className="mb-6">
        <TextField label="Name" variant="outlined" value={name} onChange={handleNameChange}/>
      </div>
      <ColorSelect value={iconColor} onChange={handleIconColorChange}/>
    </div>

    <DialogActions>
      <Button onClick={handleClose}>
        Cancel
      </Button>
      <Button onClick={handleSubmit} color="primary">
        Submit
      </Button>

    </DialogActions>
  </Dialog>
};
