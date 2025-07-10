"use client"

import type React from "react"
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  TextField,
  IconButton,
  CircularProgress,
  Tooltip,
  Divider,
} from "@mui/material"
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import CheckIcon from "@mui/icons-material/Check"
import CancelIcon from "@mui/icons-material/Cancel"
import SlideshowIcon from "@mui/icons-material/Slideshow"
import DownloadIcon from "@mui/icons-material/Download"
import AIImageButton from "../ai-image-description/ai-image-button"
import styles from "../../styles/imageDialog.styles"

interface Image {
  photoId: number
  url: string
  title: string
  albumId: number
  userId: number
}

interface ImageGalleryTabProps {
  images: Image[]
  editingPhotoId: number | null
  setEditingPhotoId: (id: number | null) => void
  newTitle: string
  setNewTitle: (title: string) => void
  saving: boolean
  setSaving: (saving: boolean) => void
  onUpdateImage: (image: Image, newTitle: string) => Promise<boolean>
  onDeleteImage: (photoId: number) => void
  onUploadOpen: () => void
  onOpenLightbox: (index: number) => void
  onOpenSlideshow: () => void
  onOpenAIAnalyzer: (image: Image) => void
  onDownloadImage: (image: Image) => void
  getFileNameWithoutExtension: (filename: string) => string
}

// קומפוננטת הגלריה - כל הכרטיסים והתמונות
const ImageGalleryTab: React.FC<ImageGalleryTabProps> = ({
  images,
  editingPhotoId,
  setEditingPhotoId,
  newTitle,
  setNewTitle,
  saving,
  setSaving,
  onUpdateImage,
  onDeleteImage,
  onUploadOpen,
  onOpenLightbox,
  onOpenSlideshow,
  onOpenAIAnalyzer,
  onDownloadImage,
  getFileNameWithoutExtension,
}) => {
  const startEditing = (image: Image) => {
    if (editingPhotoId !== image.photoId) {
      setNewTitle(getFileNameWithoutExtension(image.title))
    }
    setEditingPhotoId(image.photoId)
  }

  const saveTitle = async (image: Image) => {
    setSaving(true)
    const extension = image.title?.substring(image.title.lastIndexOf(".")) || ""
    const fullTitle = `${newTitle}${extension}`
    const success = await onUpdateImage(image, fullTitle)
    setSaving(false)
    if (success) {
      setEditingPhotoId(null)
    }
  }

  if (images.length === 0) {
    return (
      <Box sx={styles.emptyGallery}>
        <Typography variant="h6" color="white" gutterBottom>
          אין תמונות להצגה באלבום זה
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddPhotoAlternateIcon />}
          onClick={onUploadOpen}
          sx={styles.uploadButton}
        >
          העלה תמונה ראשונה
        </Button>
      </Box>
    )
  }

  return (
    <>
      <Grid container spacing={3} sx={{ p: 3 }}>
        {images.map((image, index) => (
          <Grid key={image.photoId}>
            <Card sx={styles.imageCard}>
              <Box
                sx={{
                  position: "relative",
                  height: "200px",
                  overflow: "hidden",
                  width: "100%",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  margin: "0 auto",
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={image.url}
                  alt={image.title}
                  onClick={() => onOpenLightbox(index)}
                  sx={{
                    ...styles.cardMedia,
                    objectFit: "cover",
                    cursor: "pointer",
                    width: "100%",
                    height: "200px",
                  }}
                />
              </Box>
              <CardContent sx={styles.cardContent}>
                {editingPhotoId === image.photoId ? (
                  <Box sx={styles.editTitleBox}>
                    <TextField
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      size="small"
                      fullWidth
                      autoFocus
                      InputProps={{
                        sx: styles.editTextField,
                      }}
                    />
                    <IconButton size="small" sx={styles.saveButton} onClick={() => saveTitle(image)} disabled={saving}>
                      {saving ? <CircularProgress size={20} /> : <CheckIcon />}
                    </IconButton>
                    <IconButton size="small" sx={styles.cancelButton} onClick={() => setEditingPhotoId(null)}>
                      <CancelIcon />
                    </IconButton>
                  </Box>
                ) : (
                  <Typography
                    variant="body1"
                    noWrap
                    title={getFileNameWithoutExtension(image.title)}
                    sx={styles.imageTitle}
                  >
                    {getFileNameWithoutExtension(image.title)}
                  </Typography>
                )}
              </CardContent>
              <Divider sx={styles.divider} />
              <CardActions sx={styles.cardActions}>
                <Tooltip title="ערוך">
                  <IconButton size="small" sx={styles.editIcon} onClick={() => startEditing(image)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="מחק">
                  <IconButton size="small" sx={styles.deleteIcon} onClick={() => onDeleteImage(image.photoId)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="הורד תמונה">
                  <IconButton
                    size="medium"
                    sx={{
                      color: "#388E3C",
                      "&:hover": { color: "#2e7d32" },
                      width: 50,
                      height: 50,
                    }}
                    onClick={() => onDownloadImage(image)}
                  >
                    <DownloadIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
                <AIImageButton onClick={() => onOpenAIAnalyzer(image)} />
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={styles.uploadButtonContainer}>
        <Button
          variant="contained"
          startIcon={<AddPhotoAlternateIcon />}
          onClick={onUploadOpen}
          sx={styles.uploadButton}
        >
          העלאת תמונה
        </Button>
        {images.length > 0 && (
          <Button variant="contained" startIcon={<SlideshowIcon />} onClick={onOpenSlideshow} sx={styles.uploadButton}>
            תצוגת שקופיות
          </Button>
        )}
      </Box>
    </>
  )
}

export default ImageGalleryTab
