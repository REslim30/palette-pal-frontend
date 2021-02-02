import React from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

type ConfirmDeleteDialogProps = {
  open: boolean,
  onClose: () => void,
  onDelete: () => void,
  objectToDelete: string,
  additionalMessage?: string
}

export default function ConfirmDeleteDialog(props: ConfirmDeleteDialogProps) {
  return <Dialog
    open={props.open}
    onClose={props.onClose}
    aria-labelledby={`delete-${props.objectToDelete}-dialog-title`}
    aria-describedby={`delete-${props.objectToDelete}-dialog-description`}>
    <DialogTitle id={`delete-${props.objectToDelete}-dialog-title`}>Erase {props.objectToDelete}?</DialogTitle>
    <DialogContent>
      <DialogContentText id="delete-color-dialog-description">
        You won't be able to recover this {props.objectToDelete}. {props.additionalMessage && props.additionalMessage + ' '}Are you sure?
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