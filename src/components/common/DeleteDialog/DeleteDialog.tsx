import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import React from "react";

export interface DeleteDialogProps<T> {
  value: T;
  onCancel: () => void;
  onDelete: (data: T) => void;
  open: boolean;
  title: React.ReactNode;
  description: React.ReactNode;
}

function DeleteDialog<T>({
  open,
  value,
  onDelete,
  onCancel,
  title,
  description,
}: DeleteDialogProps<T>) {
  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{description}</DialogContent>
      <DialogActions>
        <Button onClick={() => onCancel()}>Cancel</Button>
        <Button onClick={() => onDelete(value)} color="secondary">Delete</Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteDialog;
