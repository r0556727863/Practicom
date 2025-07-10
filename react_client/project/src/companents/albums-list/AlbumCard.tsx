"use client"

import { Box, Typography, IconButton, Tooltip, SvgIcon } from "@mui/material"
import FolderIcon from "@mui/icons-material/Folder"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import { folderListStyles } from "../../styles/albumsList.styles"

interface Folder {
  albumId: number
  title: string
  userId: number
  description: string
}

interface AlbumCardProps {
  folder: Folder
  onOpen: (folder: Folder) => void
  onEdit: (folder: Folder) => void
  onDelete: (folderId: number) => void
}

// קומפוננטת כרטיס אלבום - ~70 שורות
const AlbumCard = ({ folder, onOpen, onEdit, onDelete }: AlbumCardProps) => {
  return (
    <Box sx={folderListStyles.folderItem}>
      <Box onClick={() => onOpen(folder)} sx={folderListStyles.folderClickArea}>
        <SvgIcon sx={folderListStyles.folderIcon} className="folder-icon">
          <defs>
            <linearGradient id={`gradient-${folder.albumId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#00d4ff", stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: "#9c27b0", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "#ff6ec7", stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <FolderIcon sx={{ fill: `url(#gradient-${folder.albumId})` }} />
        </SvgIcon>
        <Typography variant="h6" sx={folderListStyles.folderTitle}>
          {folder.title}
        </Typography>
        <Typography variant="body2" sx={folderListStyles.folderDescription}>
          {folder.description}
        </Typography>
      </Box>

      <Box sx={folderListStyles.actionButtons}>
        <Tooltip title="ערוך">
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation()
              onEdit(folder)
            }}
            sx={folderListStyles.editButton}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="מחק">
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation()
              onDelete(folder.albumId)
            }}
            sx={folderListStyles.deleteButton}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  )
}

export default AlbumCard
