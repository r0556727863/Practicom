"use client"

import type React from "react"
import { Paper, IconButton, Box, Typography, Fab } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate"
import { folderImagesStyles } from "../../styles/folderImages.styles"

interface FolderImagesHeaderProps {
  albumTitle: string
  onBack: () => void
  onUpload: () => void
}

// קומפוננטת כותרת - רק החלק העליון
const FolderImagesHeader: React.FC<FolderImagesHeaderProps> = ({ albumTitle, onBack, onUpload }) => {
  return (
    <Paper elevation={0} sx={folderImagesStyles.headerPaper}>
      <IconButton onClick={onBack} sx={folderImagesStyles.backButton}>
        <ArrowBackIcon />
      </IconButton>
      <Box sx={folderImagesStyles.headerContent}>
        <Typography variant="h4" component="h1" sx={folderImagesStyles.title}>
          {albumTitle}
        </Typography>
        <Fab color="primary" aria-label="add" size="medium" onClick={onUpload} sx={folderImagesStyles.addButton}>
          <AddPhotoAlternateIcon />
        </Fab>
      </Box>
    </Paper>
  )
}

export default FolderImagesHeader
