import React, { useState } from "react";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import RedMenuItem from "#src/components/RedMenuItem";
import { deleteRequest } from "#src/services/api/backendApi";
import { refreshGroups, refreshPalettes } from "#src/services/app-state-store";
import ConfirmDeleteDialog from "#src/components/ConfirmDeleteDialog/index";
import { Link } from "gatsby";

type PaletteMoreOptionsProps = { 
  palette: Palette,
  anchorEl: HTMLElement | null,
  onClose: () => void,
  onDelete?: () => void, //Extra actions following delete
}

export default function PaletteMoreOptions(props: PaletteMoreOptionsProps) {
  if (!props.palette) return null;

  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const handleDelete = async() => {
    await deleteRequest(`/palettes/${props.palette.id}`);
    const palettes = refreshPalettes();
    const groups = refreshGroups();

    await palettes;
    await groups;
    props.onDelete?.();
  }

  const handleConfirmDeleteOpen = () => {
    setConfirmDeleteOpen(true);
    props.onClose();
  }

  const handleConfirmDeleteClose = () => {
    setConfirmDeleteOpen(false);
  }

  return <>
    <Menu
      id={`palette-${props.palette.id}-options`}
      anchorEl={props.anchorEl}
      open={Boolean(props.anchorEl)}
      onClose={props.onClose}
      aria-label="palette-options">
      <MenuItem>
        <Link to={`/app/palettes/edit/${props.palette.id}`} role="menuitem">Edit</Link>
      </MenuItem>
      <RedMenuItem onClick={handleConfirmDeleteOpen}>Delete</RedMenuItem>
    </Menu>

    <ConfirmDeleteDialog 
      open={confirmDeleteOpen}
      onDelete={handleDelete}
      onClose={handleConfirmDeleteClose}
      objectToDelete="palette"/>
  </>
}