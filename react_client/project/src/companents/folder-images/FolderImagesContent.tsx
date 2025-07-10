"use client"

import type React from "react"
import { Box, Typography, Button } from "@mui/material"
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate"
import CollectionsIcon from "@mui/icons-material/Collections"
// import ImageDialog from "../ImageDialog"
import { folderImagesStyles } from "../../styles/folderImages.styles"
import FileUploader from "../photo-fileupload/FileUploader"
import ImageDialog from "../image-dialog/ImageDialog"

interface Photo {
  photoId: number
  url: string
  title: string
  albumId: number
  userId: number
}

interface FolderImagesContentProps {
  showUploader: boolean
  photos: Photo[]
  openDialog: boolean
  albumId: number
  albumTitle: string
  onUpload: () => void
  onUploaderClose: () => void
  onDialogClose: () => void
  onDeleteImage: (photoId: number) => void
  onUpdateImage: (image: Photo, newTitle: string) => Promise<boolean>
}

// קומפוננטת תוכן - כל השאר (העלאה, אלבום ריק, תמונות)
const FolderImagesContent: React.FC<FolderImagesContentProps> = ({
  showUploader,
  photos,
  openDialog,
  albumId,
  albumTitle,
  onUpload,
  onUploaderClose,
  onDialogClose,
  onDeleteImage,
  onUpdateImage,
}) => {
  // אם מציגים את העלאת הקבצים
  if (showUploader) {
    return (
      <Box sx={folderImagesStyles.uploaderContainer}>
        <FileUploader open={true} onClose={onUploaderClose} albumId={albumId} />
      </Box>
    )
  }

  // אם אין תמונות באלבום
  if (photos.length === 0) {
    return (
      <Box sx={folderImagesStyles.emptyAlbum}>
        <CollectionsIcon sx={folderImagesStyles.emptyAlbumIcon} />
        <Typography variant="h5" gutterBottom sx={folderImagesStyles.emptyAlbumTitle}>
          אין תמונות להצגה באלבום זה
        </Typography>
        <Typography variant="body1" sx={folderImagesStyles.emptyAlbumText}>
          התחל להעלות תמונות לאלבום זה כדי לראות אותן כאן
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddPhotoAlternateIcon />}
          onClick={onUpload}
          size="large"
          sx={folderImagesStyles.uploadButton}
        >
          העלה תמונה ראשונה
        </Button>
      </Box>
    )
  }

  // הצגת התמונות בדיאלוג
  return (
    <ImageDialog
      open={openDialog}
      onClose={onDialogClose}
      images={photos}
      albumId={albumId}
      onDeleteImage={onDeleteImage}
      onUpdateImage={onUpdateImage}
      onUploadImage={onUpload}
      albumTitle={albumTitle}
    />
  )
}

export default FolderImagesContent
