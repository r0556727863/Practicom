"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../redux/store"
import { Box, Container } from "@mui/material"
import { albumService, photoService } from "../../services"
import LoadingSpinner from "../ui/LoadingSpinner"
import ErrorAlert from "../ui/ErrorAlert"
import SuccessSnackbar from "../ui/SuccessSnackbar"
import ConfirmDialog from "../ui/ConfirmDialog"
import { folderImagesStyles } from "../../styles/folderImages.styles"
import FolderImagesHeader from "./FolderImagesHeader"
import FolderImagesContent from "./FolderImagesContent"

interface Image {
  photoId: number
  url: string
  title: string
  albumId: number
  userId: number
}

// הקומפוננטה הראשית - רק לוגיקה וניהול state
const FolderImages: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { folderId, userId } = location.state as { folderId: number; userId: number }
  const uploadedPhotos = useSelector((state: RootState) => state.photos.uploadedPhotos)

  // State management - בדיוק כמו שהיה לך
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [albumTitle, setAlbumTitle] = useState("")
  const [showUploader, setShowUploader] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [imageToDelete, setImageToDelete] = useState<number | null>(null)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null)
  const dispatch = useDispatch()

  // טעינת נתונים - עכשיו דרך השירותים שלך
  useEffect(() => {
    if (!location.state || typeof folderId !== "number" || typeof userId !== "number") {
      navigate("/AlbumsList")
      return
    }

    const fetchData = async () => {
      try {
        setLoading(true)

        // טעינת פרטי האלבום דרך albumService שלך
        const albumResponse = await albumService.getAlbumById(folderId)
        if (albumResponse) {
          setAlbumTitle(albumResponse.title || "אלבום")
        }

        // טעינת התמונות דרך photoService שלך
        const allPhotos = await photoService.getPhotos()
        const filteredImages: Image[] = allPhotos
          .filter((image: any) => image.albumId === folderId && image.userId === userId)
          .map((img: any) => ({
            photoId: img.photoId,
            url: img.url,
            title: img.title,
            albumId: img.albumId,
            userId: img.userId,
          }))

        dispatch({ type: "SET_PHOTOS", payload: filteredImages })
        setOpenDialog(true)
        setLoading(false)
      } catch (err: any) {
        setError(err.response?.data || err.message || "שגיאה בטעינת הנתונים")
        setLoading(false)
      }
    }

    fetchData()
  }, [folderId, userId, dispatch, navigate, location.state])

  // פונקציות טיפול - בדיוק כמו שהיה לך
  const requestDeleteImage = (photoId: number) => {
    setImageToDelete(photoId)
    setDeleteDialogOpen(true)
  }

  const handleDeleteImage = async () => {
    if (imageToDelete === null) return

    try {
      // שימוש ב-photoService שלך
      await photoService.deletePhoto(imageToDelete)
      dispatch({ type: "DELETE_PHOTO", payload: imageToDelete })
      setSnackbarMessage("התמונה נמחקה בהצלחה")
      setSnackbarOpen(true)
      setDeleteDialogOpen(false)
      setImageToDelete(null)
    } catch (err: any) {
      setError(err.response?.data || err.message || "שגיאה במחיקת התמונה")
    }
  }

  const handleUpdateImage = async (image: Image, newTitle: string) => {
    try {
      // שימוש ב-photoService שלך
      await photoService.updatePhoto(image.photoId, {
        ...image,
        title: newTitle,
      })
      dispatch({ type: "UPDATE_PHOTO", payload: { photoId: image.photoId, title: newTitle } })
      setSnackbarMessage("השם עודכן בהצלחה")
      setSnackbarOpen(true)
      return true
    } catch (err: any) {
      setError(err.response?.data || err.message || "שגיאה בעדכון התמונה")
      return false
    }
  }

  const handleUploadImage = () => {
    setShowUploader(true)
  }

  const handleUploaderClose = () => {
    setShowUploader(false)
    setOpenDialog(true)
  }

  // מסך טעינה
  if (loading) {
    return (
      <Box sx={folderImagesStyles.loadingContainer}>
        <Box sx={folderImagesStyles.background} />
        <Box sx={folderImagesStyles.overlay} />
        <LoadingSpinner message="טוען את האלבום..." />
      </Box>
    )
  }

  return (
    <Box sx={folderImagesStyles.container}>
      <Box sx={folderImagesStyles.background} />
      <Box sx={folderImagesStyles.overlay} />

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        {/* שגיאה כללית */}
        {error && <ErrorAlert error={error} title="שגיאה בטעינת האלבום" onClose={() => setError(null)} />}

        {/* כותרת האלבום */}
        <FolderImagesHeader
          albumTitle={albumTitle}
          onBack={() => navigate("/AlbumsList")}
          onUpload={handleUploadImage}
        />

        {/* תוכן האלבום */}
        <FolderImagesContent
          showUploader={showUploader}
          photos={uploadedPhotos}
          openDialog={openDialog}
          albumId={folderId}
          albumTitle={albumTitle}
          onUpload={handleUploadImage}
          onUploaderClose={handleUploaderClose}
          onDialogClose={() => {
            setOpenDialog(false)
            navigate("/AlbumsList")
          }}
          onDeleteImage={requestDeleteImage}
          onUpdateImage={handleUpdateImage}
        />
      </Container>

      {/* דיאלוג אישור מחיקה */}
      <ConfirmDialog
        open={deleteDialogOpen}
        title="אישור מחיקה"
        message="האם אתה בטוח שברצונך למחוק את התמונה?"
        confirmText="כן, מחק"
        cancelText="לא"
        onConfirm={handleDeleteImage}
        onCancel={() => setDeleteDialogOpen(false)}
        confirmColor="error"
      />

      {/* הודעות הצלחה */}
      <SuccessSnackbar open={snackbarOpen} message={snackbarMessage || ""} onClose={() => setSnackbarOpen(false)} />
    </Box>
  )
}

export default FolderImages
