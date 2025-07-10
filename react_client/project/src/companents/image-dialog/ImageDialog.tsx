"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogTitle, DialogContent, IconButton, Typography, Tabs, Tab, Box } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import AIImageAnalyzer from "../ai-image-description/ai-image-analyzer"
import SuccessSnackbar from "../ui/SuccessSnackbar"
import ErrorAlert from "../ui/ErrorAlert"
import styles from "../../styles/imageDialog.styles"
import ImageGalleryTab from "./ImageGalleryTab"
import ImageUploadTab from "./ImageUploadTab"
import ImageLightbox from "./ImageLightbox"
import SimpleSlideshowMaker from "../slideshow/SimpleSlideshowMaker"

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

// הקומפוננטה הראשית - רק state management ולוגיקה
const ImageDialog: React.FC<ImageDialogProps> = ({
  open,
  onClose,
  images,
  albumId,
  albumTitle,
  onDeleteImage,
  onUpdateImage,
}) => {
  // כל ה-state בדיוק כמו שהיה
  const [editingPhotoId, setEditingPhotoId] = useState<number | null>(null)
  const [newTitle, setNewTitle] = useState<string>("")
  const [saving, setSaving] = useState(false)
  const [uploadOpen, setUploadOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<Image | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(-1)
  const [tabValue, setTabValue] = useState(0)
  const [slideshowOpen, setSlideshowOpen] = useState(false)
  const [aiAnalyzerOpen, setAiAnalyzerOpen] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error" | "info" | "warning">("success")
  const [error, setError] = useState<string | null>(null)

  // כל הפונקציות בדיוק כמו שהיו
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

  const getFileNameWithoutExtension = (filename: string) => {
    if (!filename) return ""
    const lastDot = filename.lastIndexOf(".")
    return lastDot === -1 ? filename : filename.substring(0, lastDot)
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
      setError(`אירעה שגיאה בהורדת התמונה: ${error instanceof Error ? error.message : "שגיאה לא ידועה"}`)
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
        setError("אירעה שגיאה בעדכון תיאור התמונה")
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
          {error && <ErrorAlert error={error} onClose={() => setError(null)} />}

          <TabPanel value={tabValue} index={0}>
            <ImageGalleryTab
              images={images}
              editingPhotoId={editingPhotoId}
              setEditingPhotoId={setEditingPhotoId}
              newTitle={newTitle}
              setNewTitle={setNewTitle}
              saving={saving}
              setSaving={setSaving}
              onUpdateImage={onUpdateImage}
              onDeleteImage={onDeleteImage}
              onUploadOpen={handleUploadOpen}
              onOpenLightbox={openLightbox}
              onOpenSlideshow={() => setSlideshowOpen(true)}
              onOpenAIAnalyzer={(image) => {
                setSelectedImage(image)
                setAiAnalyzerOpen(true)
              }}
              onDownloadImage={handleDownloadImage}
              getFileNameWithoutExtension={getFileNameWithoutExtension}
            />
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <ImageUploadTab open={uploadOpen} onClose={handleUploadClose} albumId={albumId} />
          </TabPanel>
        </DialogContent>
      </Dialog>

      <ImageLightbox
        open={lightboxOpen}
        onClose={closeLightbox}
        images={images}
        selectedImage={selectedImage}
        selectedImageIndex={selectedImageIndex}
        setSelectedImage={setSelectedImage}
        setSelectedImageIndex={setSelectedImageIndex}
        onDownloadImage={handleDownloadImage}
        onOpenAIAnalyzer={(image) => {
          setSelectedImage(image)
          setAiAnalyzerOpen(true)
        }}
      />

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

      {/* השתמשתי בקומפוננטת SuccessSnackbar שלך במקום Snackbar רגיל */}
      <SuccessSnackbar
        open={snackbarOpen && snackbarSeverity === "success"}
        message={snackbarMessage}
        onClose={() => setSnackbarOpen(false)}
      />
    </>
  )
}

export default ImageDialog
