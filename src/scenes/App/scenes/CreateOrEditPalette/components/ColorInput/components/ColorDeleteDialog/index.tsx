import React from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

type ColorDeleteDialogProps = {
  color: number,
  onClose: () => void,
  onDelete: () => void
}

export default function ColorDeleteDialog(props: ColorDeleteDialogProps) {
  return <Dialog
    open={props.color !== null}
    onClose={props.onClose}
    aria-labelledby="delete-color-dialog-title"
    aria-describedby="delete-color-dialog-description">
    <DialogTitle id="delete-color-dialog-title">Erase color?</DialogTitle>
    <DialogContent>
      <DialogContentText id="delete-color-dialog-description">
        You won't be able to recover this color. Are you sure?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={props.onClose}>
        Cancel
      </Button>
      <Button onClick={props.onDelete} color="secondary">
        Delete
      </Button>
    </DialogActions>
  </Dialog>
};