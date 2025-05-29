import type React from "react"
import { useEffect, useState } from "react"
import axios from "axios"
import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../redux/store"
import { Box, Container, Snackbar, Alert, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, Paper, Fab, IconButton } from "@mui/material"
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate"
import CollectionsIcon from "@mui/icons-material/Collections"
import FileUploader from "./FileUploader"
import ImageDialog from "./ImageDialog"
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary"
import { folderImagesStyles } from "../styles/folderImages.styles"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"

interface Image {
  photoId: number
  url: string
  title: string
  albumId: number
  userId: number
}

const FolderImages: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { folderId, userId } = location.state as { folderId: number; userId: number }
  const uploadedPhotos = useSelector((state: RootState) => state.photos.uploadedPhotos)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [albumTitle, setAlbumTitle] = useState("")
  const [showUploader, setShowUploader] = useState(false)
  const [errorDialogOpen, setErrorDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [imageToDelete, setImageToDelete] = useState<number | null>(null)
  const token = localStorage.getItem("token")
  const dispatch = useDispatch()
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!location.state || typeof folderId !== "number" || typeof userId !== "number") {
      navigate("/AlbumsList")
      return
    }

    const fetchData = async () => {
      if (!token) {
        setError("המשתמש אינו מחובר.")
        setLoading(false)
        return
      }

      try {
        // Fetch album details
        const albumResponse = await axios.get(`${process.env.REACT_APP_API_URL}/Album/${folderId}`,
          {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (albumResponse.data) {
          setAlbumTitle(albumResponse.data.title || "אלבום")
        }

        // Fetch images
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/Photo`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        const filteredImages: Image[] = response.data
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
      } catch (err: unknown) {
        if (axios.isAxiosError(err) && err.message) {
          setError(err.message)
          setErrorDialogOpen(true)
        } else {
          setError("שגיאה לא ידועה")
          setErrorDialogOpen(true)
        }
        setLoading(false)
      }
    }

    fetchData()
  }, [folderId, userId, token, dispatch, navigate, location.state])

  const requestDeleteImage = (photoId: number) => {
    setImageToDelete(photoId);
    setDeleteDialogOpen(true);
  };
 

  const handleDeleteImage = async () => {
    if (!token || imageToDelete === null) {
      alert("המשתמש אינו מחובר.")
      return
    }
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/Photo/${imageToDelete}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      dispatch({ type: "DELETE_PHOTO", payload: imageToDelete })

      // עדכון ההודעה והצגת ה-Snackbar
      setSnackbarMessage("התמונה נמחקה בהצלחה")
      setSnackbarOpen(true)
      setDeleteDialogOpen(false);

    } catch (err) {
      alert(axios.isAxiosError(err) ? err.message : "שגיאה לא ידועה")
    }
  }

  const handleUpdateImage = async (image: Image, newTitle: string) => {
    if (!token) {
      alert("המשתמש אינו מחובר.")
      return false
    }
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/Photo/${image.photoId}`,
        {
          ...image,
          title: newTitle,
          updated_at: new Date().toISOString(),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )

      // עדכון התמונות מיד על המסך
      dispatch({ type: "UPDATE_PHOTO", payload: { photoId: image.photoId, title: newTitle } })
      setSnackbarMessage("השם עודכן בהצלחה")
      setSnackbarOpen(true)

      return true
    } catch (err) {
      alert(axios.isAxiosError(err) ? err.message : "שגיאה לא ידועה")
      return false
    }
  }

  const handleUploadImage = () => {
    setShowUploader(true)
  }

  const handleUploaderClose = () => {
    setShowUploader(false)
    // Refresh images after upload
    setOpenDialog(true)
  }

  if (loading) {
    return (
      <Box sx={folderImagesStyles.loadingContainer}>
        <Box sx={folderImagesStyles.background} />
        <Box sx={folderImagesStyles.overlay} />
        <Box sx={folderImagesStyles.loadingContent}>
          <Box sx={folderImagesStyles.loadingIcon}>
            <PhotoLibraryIcon sx={{ fontSize: 80, color: "white" }} />
          </Box>
          <Typography variant="h6" color="white">
            טוען את האלבום...
          </Typography>
        </Box>
      </Box>
    )
  }

  return (
    <Box sx={folderImagesStyles.container}>
      <Box sx={folderImagesStyles.background} />
      <Box sx={folderImagesStyles.overlay} />
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <Paper elevation={0} sx={folderImagesStyles.headerPaper}>
          <IconButton onClick={() => navigate("/AlbumsList")} sx={folderImagesStyles.backButton}>
            <ArrowBackIcon />
          </IconButton>
          <Box sx={folderImagesStyles.headerContent}>
            <Typography variant="h4" component="h1" sx={folderImagesStyles.title}>
              {albumTitle}
            </Typography>
            <Fab
              color="primary"
              aria-label="add"
              size="medium"
              onClick={handleUploadImage}
              sx={folderImagesStyles.addButton}
            >
              <AddPhotoAlternateIcon />
            </Fab>
          </Box>
        </Paper>

        {showUploader ? (
          <Box sx={folderImagesStyles.uploaderContainer}>
            <FileUploader open={true} onClose={handleUploaderClose} albumId={folderId} />
          </Box>
        ) : uploadedPhotos.length === 0 ? (
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
              onClick={handleUploadImage}
              size="large"
              sx={folderImagesStyles.uploadButton}
            >
              העלה תמונה ראשונה
            </Button>
          </Box>
        ) : (
          <ImageDialog
            open={openDialog}
            onClose={() => {
              setOpenDialog(false)
              navigate("/AlbumsList")
            }}
            images={uploadedPhotos}
            albumId={folderId}
            onDeleteImage={requestDeleteImage}
            onUpdateImage={handleUpdateImage}
            onUploadImage={handleUploadImage}
            albumTitle={albumTitle}

          />
        )}
      </Container>

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} PaperProps={{ sx: folderImagesStyles.dialogPaper }}>
        <DialogTitle dir='rtl'>אישור מחיקה</DialogTitle>
        <DialogContent dir="rtl">
          <Typography>האם אתה בטוח שברצונך למחוק את התמונה?</Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'flex-start' }}>
          <Button onClick={() => setDeleteDialogOpen(false)} color="inherit">
            לא
          </Button>
          <Button onClick={handleDeleteImage} variant="contained" color="error">
            כן, מחק
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={errorDialogOpen} onClose={() => setErrorDialogOpen(false)}>
        <DialogTitle>שגיאה</DialogTitle>
        <DialogContent>
          <Typography>{error}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setErrorDialogOpen(false)} color="inherit">
            סגור
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ zIndex: (theme) => theme.zIndex.modal + 1, marginTop: '50px' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  )
}
export default FolderImages
