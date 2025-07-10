"use client"

import { useEffect, useRef } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  CircularProgress,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import { folderListStyles } from "../../styles/albumsList.styles"

interface AlbumEditDialogProps {
  isEditing: boolean
  newTitle: string
  setNewTitle: (title: string) => void
  currentDescription: string
  setCurrentDescription: (description: string) => void
  saving: boolean
  onSave: () => void
  onCancel: () => void
}

// דיאלוג עריכת אלבום - ~80 שורות
const AlbumEditDialog = ({
  isEditing,
  newTitle,
  setNewTitle,
  currentDescription,
  setCurrentDescription,
  saving,
  onSave,
  onCancel,
}: AlbumEditDialogProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (isEditing) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 50)
    }
  }, [isEditing])

  return (
    <Dialog
      open={isEditing}
      onClose={onCancel}
      disableEnforceFocus
      PaperProps={{
        sx: folderListStyles.dialogPaper,
      }}
    >
      <DialogTitle sx={folderListStyles.dialogTitle}>
        עריכת אלבום
        <IconButton aria-label="close" onClick={onCancel} sx={folderListStyles.closeButton}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField
          inputRef={inputRef}
          autoFocus
          margin="dense"
          label="שם האלבום"
          fullWidth
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          variant="outlined"
          sx={folderListStyles.titleField}
          InputProps={{
            sx: folderListStyles.inputProps,
          }}
          InputLabelProps={{
            sx: folderListStyles.inputLabelProps,
          }}
        />
        <TextField
          margin="dense"
          label="תיאור האלבום"
          fullWidth
          multiline
          rows={4}
          value={currentDescription}
          onChange={(e) => setCurrentDescription(e.target.value)}
          variant="outlined"
          InputProps={{
            sx: folderListStyles.inputProps,
          }}
          InputLabelProps={{
            sx: folderListStyles.inputLabelProps,
          }}
        />
      </DialogContent>
      <DialogActions sx={folderListStyles.dialogActions}>
        <Button onClick={onCancel} color="inherit" sx={folderListStyles.cancelButton}>
          ביטול
        </Button>
        <Button onClick={onSave} variant="contained" disabled={saving} sx={folderListStyles.saveButton}>
          {saving ? <CircularProgress size={24} /> : "שמור שינויים"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AlbumEditDialog
