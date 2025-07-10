"use client"

import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button } from "@mui/material"
import { folderListStyles } from "../../styles/albumsList.styles"

interface AlbumDeleteDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

// דיאלוג מחיקת אלבום - ~40 שורות
const AlbumDeleteDialog = ({ isOpen, onClose, onConfirm }: AlbumDeleteDialogProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        sx: folderListStyles.dialogPaper,
      }}
    >
      <DialogTitle dir="rtl" sx={folderListStyles.dialogTitle}>
        אישור מחיקה
      </DialogTitle>
      <DialogContent dir="rtl">
        <Typography>האם אתה בטוח שברצונך למחוק את האלבום?</Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "flex-start" }}>
        <Button onClick={onClose} color="inherit">
          לא
        </Button>
        <Button onClick={onConfirm} variant="contained" color="error">
          כן, מחק
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AlbumDeleteDialog
