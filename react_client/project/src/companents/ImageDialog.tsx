import React from "react"
import { useState } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  TextField,
  Button,
  CircularProgress,
  Grid,
  Typography,
  Tabs,
  Tab,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Tooltip,
  Divider,
  Snackbar,
  Alert,
  Backdrop,
} from "@mui/material"

import CloseIcon from "@mui/icons-material/Close"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate"
import CheckIcon from "@mui/icons-material/Check"
import CancelIcon from "@mui/icons-material/Cancel"
import ZoomInIcon from "@mui/icons-material/ZoomIn"
import ZoomOutIcon from "@mui/icons-material/ZoomOut"
import RestartAltIcon from "@mui/icons-material/RestartAlt"
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import SlideshowIcon from "@mui/icons-material/Slideshow"
import DownloadIcon from "@mui/icons-material/Download"
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"
import FileUploader from "./FileUploader"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"
import SimpleSlideshowMaker from "./simple-slideshow-maker"
import AIImageButton from "./ai-image-description/ai-image-button"
import AIImageAnalyzer from "./ai-image-description/ai-image-analyzer"
import styles from "../styles/imageDialog.styles"

interface Image {
  photoId: number
  url: string
  title: string
  albumId: number
  userId: number
}

interface ImageDialogProps {
  open: boolean
  onClose: () => void
  images: Image[]
  albumId?: number
  albumTitle?: string
  onDeleteImage: (photoId: number) => void
  onUpdateImage: (image: Image, newTitle: string) => Promise<boolean>
  onUploadImage: () => void
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

const ImageDialog: React.FC<ImageDialogProps> = ({
  open,
  onClose,
  images,
  albumId,
  albumTitle,
  onDeleteImage,
  onUpdateImage,
}) => {
  const [editingPhotoId, setEditingPhotoId] = useState<number | null>(null)
  const [newTitle, setNewTitle] = useState<string>("")
  const [saving, setSaving] = useState(false)
  const [, setUploadOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<Image | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(-1)
  const [tabValue, setTabValue] = useState(0)
  const [slideshowOpen, setSlideshowOpen] = useState(false)
  const [aiAnalyzerOpen, setAiAnalyzerOpen] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error" | "info" | "warning">("success")

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (lightboxOpen) {
        if (event.key === "ArrowRight") {
          handleNextImage()
        } else if (event.key === "ArrowLeft") {
          handlePrevImage()
        } else if (event.key === "Escape") {
          closeLightbox()
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [lightboxOpen, selectedImageIndex])

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const handleUploadOpen = () => {
    setUploadOpen(true)
    setTabValue(1)
  }

  const handleUploadClose = () => {
    setUploadOpen(false)
    setTabValue(0)
  }

  const handleClose = () => {
    onClose()
    setUploadOpen(false)
    closeLightbox()
  }

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index)
    setSelectedImage(images[index])
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    setSelectedImage(null)
    setSelectedImageIndex(-1)
  }

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

  const getFileNameWithoutExtension = (filename: string) => {
    if (!filename) return ""
    const lastDot = filename.lastIndexOf(".")
    return lastDot === -1 ? filename : filename.substring(0, lastDot)
  }

  const handleNextImage = () => {
    if (selectedImageIndex < images.length - 1) {
      const nextIndex = selectedImageIndex + 1
      setSelectedImage(images[nextIndex])
      setSelectedImageIndex(nextIndex)
    }
  }

  const handlePrevImage = () => {
    if (selectedImageIndex > 0) {
      const prevIndex = selectedImageIndex - 1
      setSelectedImage(images[prevIndex])
      setSelectedImageIndex(prevIndex)
    }
  }

  const handleOpenSlideshow = () => {
    setSlideshowOpen(true)
  }

  const handleOpenAIAnalyzer = (image: Image) => {
    setSelectedImage(image)
    setAiAnalyzerOpen(true)
  }

  const showSnackbar = (message: string, severity: "success" | "error" | "info" | "warning" = "success") => {
    setSnackbarMessage(message)
    setSnackbarSeverity(severity)
    setSnackbarOpen(true)
  }

  const handleDownloadImage = async (image: Image) => {
    try {
      showSnackbar("מכין את התמונה להורדה...", "info")

      const filename = image.title || `image_${image.photoId}.jpg`
      const downloadUrl = `${import.meta.env.VITE_API_URL}/Download/image?url=${encodeURIComponent(image.url)}&filename=${encodeURIComponent(filename)}`

      const response = await fetch(downloadUrl)

      if (!response.ok) {
        throw new Error(`שגיאת שרת: ${response.status}`)
      }

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)

      const link = document.createElement("a")
      link.href = url
      link.download = filename
      document.body.appendChild(link)

      link.click()

      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      showSnackbar("התמונה הורדה בהצלחה!", "success")
    } catch (error) {
      console.error("שגיאה בהורדת התמונה:", error)
      showSnackbar(`אירעה שגיאה בהורדת התמונה: ${error instanceof Error ? error.message : "שגיאה לא ידועה"}`, "error")
    }
  }

  const handleUpdateAIDescription = async (description: string) => {
    if (selectedImage) {
      const newImageTitle =
        getFileNameWithoutExtension(selectedImage.title) + " - " + description.substring(0, 30) + "..."
      const success = await onUpdateImage(selectedImage, newImageTitle)

      if (success) {
        showSnackbar("תיאור התמונה עודכן בהצלחה!", "success")
      } else {
        showSnackbar("אירעה שגיאה בעדכון תיאור התמונה", "error")
      }
    }
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: styles.dialogPaper,
        }}
      >
        <DialogTitle sx={styles.dialogTitle}>
          <IconButton aria-label="close" onClick={handleClose} sx={styles.closeButton}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" component="div" fontWeight="bold" sx={styles.title}>
            {`תמונות באלבום ${albumTitle}`}
          </Typography>
        </DialogTitle>

        <Tabs value={tabValue} onChange={handleTabChange} centered sx={styles.tabs}>
          <Tab label="גלריה" />
          <Tab label="העלאת תמונה" />
        </Tabs>

        <DialogContent sx={{ p: 0 }}>
          <TabPanel value={tabValue} index={0}>
            {images.length === 0 ? (
              <Box sx={styles.emptyGallery}>
                <Typography variant="h6" color="white" gutterBottom>
                  אין תמונות להצגה באלבום זה
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddPhotoAlternateIcon />}
                  onClick={handleUploadOpen}
                  sx={styles.uploadButton}
                >
                  העלה תמונה ראשונה
                </Button>
              </Box>
            ) : (
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
                            onClick={() => openLightbox(index)}
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
                              <IconButton
                                size="small"
                                sx={styles.saveButton}
                                onClick={() => saveTitle(image)}
                                disabled={saving}
                              >
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
                            <IconButton
                              size="small"
                              sx={styles.deleteIcon}
                              onClick={() => onDeleteImage(image.photoId)}
                            >
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
                              onClick={() => handleDownloadImage(image)}
                            >
                              <DownloadIcon fontSize="inherit" />
                            </IconButton>
                          </Tooltip>
                          <AIImageButton onClick={() => handleOpenAIAnalyzer(image)} />
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </>
            )}

            <Box sx={styles.uploadButtonContainer}>
              <Button
                variant="contained"
                startIcon={<AddPhotoAlternateIcon />}
                onClick={handleUploadOpen}
                sx={styles.uploadButton}
              >
                העלאת תמונה
              </Button>

              {images.length > 0 && (
                <>
                  <Button
                    variant="contained"
                    startIcon={<SlideshowIcon />}
                    onClick={handleOpenSlideshow}
                    sx={styles.uploadButton}
                  >
                    תצוגת שקופיות
                  </Button>
                </>
              )}
            </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <FileUploader open={true} onClose={handleUploadClose} albumId={albumId} />
          </TabPanel>
        </DialogContent>
      </Dialog>

      {/* Lightbox - בדיוק כמו הקוד שהבאת */}
      <Dialog
        open={lightboxOpen}
        onClose={closeLightbox}
        maxWidth={false}
        fullWidth
        PaperProps={{
          sx: {
            background: "transparent",
            boxShadow: "none",
            maxWidth: "90vw",
            maxHeight: "90vh",
          },
        }}
      >
        <Backdrop open={lightboxOpen} sx={{ backgroundColor: "rgba(0, 0, 0, 0.9)" }}>
          <Box
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "60%",
              height: "90%",
              p: 4,
            }}
          >
            <IconButton
              sx={{
                position: "absolute",
                top: 20,
                right: -200,
                color: "white",
                background: "rgba(0, 0, 0, 0.5)",
                "&:hover": { background: "rgba(0, 0, 0, 0.7)" },
                zIndex: 3,
              }}
              onClick={closeLightbox}
            >
              <CloseIcon />
            </IconButton>

            {images.length > 1 && (
              <>
                <IconButton
                  sx={{
                    position: "absolute",
                    left: -250,
                    color: "white",
                    background: "rgba(0, 0, 0, 0.5)",
                    "&:hover": { background: "rgba(0, 0, 0, 0.7)" },
                    zIndex: 3,
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                    handlePrevImage()
                  }}
                >
                  <NavigateBeforeIcon />
                </IconButton>

                <IconButton
                  sx={{
                    position: "absolute",
                    right: -250,
                    color: "white",
                    background: "rgba(0, 0, 0, 0.5)",
                    "&:hover": { background: "rgba(0, 0, 0, 0.7)" },
                    zIndex: 3,
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleNextImage()
                  }}
                >
                  <NavigateNextIcon />
                </IconButton>
              </>
            )}

            <TransformWrapper
              initialScale={1}
              initialPositionX={0}
              initialPositionY={0}
              wheel={{ step: 0.1 }}
              doubleClick={{ disabled: false }}
            >
              {({ zoomIn, zoomOut, resetTransform }) => (
                <>
                  <TransformComponent>
                    <Box
                      component="img"
                      src={selectedImage?.url}
                      alt={selectedImage?.title}
                      sx={{
                        maxWidth: "90%",
                        maxHeight: "90%",
                        objectFit: "contain",
                        borderRadius: "8px",
                      }}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </TransformComponent>

                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 3,
                      left: "50%",
                      transform: "translateX(-50%)",
                      display: "flex",
                      gap: 1,
                      background: "rgba(0, 0, 0, 0.7)",
                      borderRadius: "20px",
                      padding: "8px 12px",
                      zIndex: 3,
                    }}
                  >
                    <IconButton
                      onClick={() => zoomIn()}
                      size="small"
                      sx={{ color: "white", "&:hover": { background: "rgba(255, 255, 255, 0.1)" } }}
                      title="הגדל"
                    >
                      <ZoomInIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      onClick={() => zoomOut()}
                      size="small"
                      sx={{ color: "white", "&:hover": { background: "rgba(255, 255, 255, 0.1)" } }}
                      title="הקטן"
                    >
                      <ZoomOutIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      onClick={() => resetTransform()}
                      size="small"
                      sx={{ color: "white", "&:hover": { background: "rgba(255, 255, 255, 0.1)" } }}
                      title="איפוס זום"
                    >
                      <RestartAltIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      onClick={() => selectedImage && handleDownloadImage(selectedImage)}
                      size="small"
                      sx={{ color: "white", "&:hover": { background: "rgba(255, 255, 255, 0.1)" } }}
                      title="הורד תמונה"
                    >
                      <DownloadIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      onClick={() => selectedImage && handleOpenAIAnalyzer(selectedImage)}
                      size="small"
                      sx={{ color: "white", "&:hover": { background: "rgba(255, 255, 255, 0.1)" } }}
                      title="ניתוח AI"
                    >
                      <AutoAwesomeIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </>
              )}
            </TransformWrapper>
          </Box>
        </Backdrop>
      </Dialog>

      {/* דיאלוג יצירת מצגת */}
      {slideshowOpen && albumId && (
        <SimpleSlideshowMaker
          open={slideshowOpen}
          onClose={() => setSlideshowOpen(false)}
          images={images}
          albumId={albumId}
        />
      )}

      {/* דיאלוג ניתוח תמונה באמצעות AI */}
      {aiAnalyzerOpen && selectedImage && (
        <AIImageAnalyzer
          open={aiAnalyzerOpen}
          onClose={() => setAiAnalyzerOpen(false)}
          imageUrl={selectedImage.url}
          imageTitle={selectedImage.title}
          onUpdateDescription={handleUpdateAIDescription}
        />
      )}

      {/* הודעות Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  )
}

export default ImageDialog
