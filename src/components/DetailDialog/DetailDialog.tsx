// src/components/DetailDialog/DetailDialog.tsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from "@mui/material";

interface DetailDialogProps {
  open: boolean;
  title: string;
  content: string | React.ReactNode;
  onClose: () => void;
}

/**
 * A reusable dialog component to display detailed post information.
 * @param {boolean} open - Controls the visibility of the dialog.
 * @param {string} title - The title of the dialog.
 * @param {string|React.ReactNode} content - The content to display.
 * @param {() => void} onClose - Callback to close the dialog.
 */
export const DetailDialog: React.FC<DetailDialogProps> = ({
  open,
  title,
  content,
  onClose,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="dialog-title"
      maxWidth="md"
      fullWidth
    >
      <DialogTitle id="dialog-title" fontWeight={600}>
        {title}
      </DialogTitle>
      <DialogContent>
        <Typography>{content}</Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
