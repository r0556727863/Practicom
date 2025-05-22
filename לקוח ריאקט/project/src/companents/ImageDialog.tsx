// import type React from "react"
// import { useState } from "react"
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   IconButton,
//   Box,
//   TextField,
//   Button,
//   CircularProgress,
//   Grid,
//   Typography,
//   Tabs,
//   Tab,
//   Card,
//   CardMedia,
//   CardContent,
//   CardActions,
//   Tooltip,
//   Divider,
//   Paper,
// } from "@mui/material"


// import CloseIcon from "@mui/icons-material/Close"
// import EditIcon from "@mui/icons-material/Edit"
// import DeleteIcon from "@mui/icons-material/Delete"
// import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate"
// import CheckIcon from "@mui/icons-material/Check"
// import CancelIcon from "@mui/icons-material/Cancel"
// import ZoomInIcon from "@mui/icons-material/ZoomIn"
// import ZoomOutIcon from "@mui/icons-material/ZoomOut"
// import RestartAltIcon from "@mui/icons-material/RestartAlt"
// import ArrowBackIcon from "@mui/icons-material/ArrowBack"
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
// import SlideshowIcon from "@mui/icons-material/Slideshow"
// import FileUploader from "./FileUploader"
// import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"
// import styles from "../styles/imageDialog.styles"
// import SimpleSlideshowMaker from "./simple-slideshow-maker"

// interface Image {
//   photoId: number
//   url: string
//   title: string
//   albumId: number
//   userId: number
// }

// interface ImageDialogProps {
//   open: boolean
//   onClose: () => void
//   images: Image[]
//   albumId?: number
//   onDeleteImage: (photoId: number) => void
//   onUpdateImage: (image: Image, newTitle: string) => Promise<boolean>
//   onUploadImage: () => void
// }

// interface TabPanelProps {
//   children?: React.ReactNode
//   index: number
//   value: number
// }

// function TabPanel(props: TabPanelProps) {
//   const { children, value, index, ...other } = props

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
//     </div>
//   )
// }

// const ImageDialog: React.FC<ImageDialogProps> = ({
//   open,
//   onClose,
//   images,
//   albumId,
//   onDeleteImage,
//   onUpdateImage,
//   onUploadImage,
// }) => {
//   const [editingPhotoId, setEditingPhotoId] = useState<number | null>(null)
//   const [newTitle, setNewTitle] = useState<string>("")
//   const [saving, setSaving] = useState(false)
//   const [uploadOpen, setUploadOpen] = useState(false)
//   const [selectedImage, setSelectedImage] = useState<Image | null>(null)
//   const [selectedImageIndex, setSelectedImageIndex] = useState<number>(-1)
//   const [tabValue, setTabValue] = useState(0)
//   const [slideshowOpen, setSlideshowOpen] = useState(false)

//   const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
//     setTabValue(newValue)
//   }

//   const handleUploadOpen = () => {
//     setUploadOpen(true)
//     setTabValue(1)
//   }

//   const handleUploadClose = () => {
//     setUploadOpen(false)
//     setTabValue(0)
//   }

//   const handleClose = () => {
//     onClose()
//     setUploadOpen(false)
//     setSelectedImage(null)
//     setSelectedImageIndex(-1)
//   }

//   const handleCloseFullImage = () => {
//     setSelectedImage(null)
//     setSelectedImageIndex(-1)
//   }

//   const startEditing = (image: Image) => {
//     if (editingPhotoId !== image.photoId) {
//       setNewTitle(getFileNameWithoutExtension(image.title))
//     }
//     setEditingPhotoId(image.photoId)
//   }

//   const saveTitle = async (image: Image) => {
//     setSaving(true)
//     const success = await onUpdateImage(image, newTitle)
//     setSaving(false)
//     if (success) {
//       setEditingPhotoId(null)
//     }
//   }

//   const getFileNameWithoutExtension = (filename: string) => {
//     if (!filename) return ""
//     const lastDot = filename.lastIndexOf(".")
//     return lastDot === -1 ? filename : filename.substring(0, lastDot)
//   }

//   // פונקציות לניווט בין תמונות
//   const handleSelectImage = (image: Image, index: number) => {
//     setSelectedImage(image)
//     setSelectedImageIndex(index)
//   }

//   const handleNextImage = () => {
//     if (selectedImageIndex < images.length - 1) {
//       const nextIndex = selectedImageIndex + 1
//       setSelectedImage(images[nextIndex])
//       setSelectedImageIndex(nextIndex)
//     }
//   }

//   const handlePrevImage = () => {
//     if (selectedImageIndex > 0) {
//       const prevIndex = selectedImageIndex - 1
//       setSelectedImage(images[prevIndex])
//       setSelectedImageIndex(prevIndex)
//     }
//   }

//   const handleOpenSlideshow = () => {
//     setSlideshowOpen(true)
//   }

//   return (
//     <>
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         maxWidth="lg"
//         fullWidth
//         PaperProps={{
//           sx: styles.dialogPaper,
//         }}
//       >
//         <DialogTitle sx={styles.dialogTitle}>
//           <IconButton aria-label="close" onClick={handleClose} sx={styles.closeButton}>
//             <CloseIcon />
//           </IconButton>
//           <Typography variant="h6" component="div" fontWeight="bold" sx={styles.title}>
//             תמונות באלבום
//           </Typography>
//         </DialogTitle>

//         <Tabs value={tabValue} onChange={handleTabChange} centered sx={styles.tabs}>
//           <Tab label="גלריה" />
//           <Tab label="העלאת תמונה" />
//         </Tabs>

//         <DialogContent sx={{ p: 0 }}>
//           <TabPanel value={tabValue} index={0}>
//             {images.length === 0 ? (
//               <Box sx={styles.emptyGallery}>
//                 <Typography variant="h6" color="white" gutterBottom>
//                   אין תמונות להצגה באלבום זה
//                 </Typography>
//                 <Button
//                   variant="contained"
//                   startIcon={<AddPhotoAlternateIcon />}
//                   onClick={handleUploadOpen}
//                   sx={styles.uploadButton}
//                 >
//                   העלה תמונה ראשונה
//                 </Button>
//               </Box>
//             ) : (
//               <>
//                 <Grid container spacing={3} sx={{ p: 3 }}>
//                   {images.map((image, index) => (
//                     <Grid  key={image.photoId}>
//                       <Card sx={styles.imageCard}>
//                         <Box
//                           sx={{
//                             position: "relative",
//                             height: "200px",
//                             overflow: "hidden",
//                             width: "100%",
//                             border: "1px solid #ddd",
//                             borderRadius: "8px",
//                             margin: "0 auto",
//                           }}
//                         >
//                           <CardMedia
//                             component="img"
//                             height="200"
//                             image={image.url}
//                             alt={image.title}
//                             onClick={() => handleSelectImage(image, index)}
//                             sx={{
//                               ...styles.cardMedia,
//                               objectFit: "cover",
//                               cursor: "pointer",
//                               width: "100%",
//                               height: "200px",
//                             }}
//                           />
//                         </Box>
//                         <CardContent sx={styles.cardContent}>
//                           {editingPhotoId === image.photoId ? (
//                             <Box sx={styles.editTitleBox}>
//                               <TextField
//                                 value={newTitle}
//                                 onChange={(e) => setNewTitle(e.target.value)}
//                                 size="small"
//                                 fullWidth
//                                 autoFocus
//                                 InputProps={{
//                                   sx: styles.editTextField,
//                                 }}
//                               />
//                               <IconButton
//                                 size="small"
//                                 sx={styles.saveButton}
//                                 onClick={() => saveTitle(image)}
//                                 disabled={saving}
//                               >
//                                 {saving ? <CircularProgress size={20} /> : <CheckIcon />}
//                               </IconButton>
//                               <IconButton size="small" sx={styles.cancelButton} onClick={() => setEditingPhotoId(null)}>
//                                 <CancelIcon />
//                               </IconButton>
//                             </Box>
//                           ) : (
//                             <Typography
//                               variant="body1"
//                               noWrap
//                               title={getFileNameWithoutExtension(image.title)}
//                               sx={styles.imageTitle}
//                             >
//                               {getFileNameWithoutExtension(image.title)}
//                             </Typography>
//                           )}
//                         </CardContent>
//                         <Divider sx={styles.divider} />
//                         <CardActions sx={styles.cardActions}>
//                           <Tooltip title="ערוך">
//                             <IconButton size="small" sx={styles.editIcon} onClick={() => startEditing(image)}>
//                               <EditIcon fontSize="small" />
//                             </IconButton>
//                           </Tooltip>
//                           <Tooltip title="מחק">
//                             <IconButton
//                               size="small"
//                               sx={styles.deleteIcon}
//                               onClick={() => onDeleteImage(image.photoId)}
//                             >
//                               <DeleteIcon fontSize="small" />
//                             </IconButton>
//                           </Tooltip>
//                         </CardActions>
//                       </Card>
//                     </Grid>
//                   ))}
//                 </Grid>
//               </>
//             )}

//             <Box sx={styles.uploadButtonContainer}>
//               <Button
//                 variant="contained"
//                 startIcon={<AddPhotoAlternateIcon />}
//                 onClick={handleUploadOpen}
//                 sx={styles.uploadButton}
//               >
//                 העלאת תמונה
//               </Button>

//               {images.length > 0 && (
//                 <Button
//                   variant="contained"
//                   startIcon={<SlideshowIcon />}
//                   onClick={handleOpenSlideshow}
//                   sx={{
//                     ...styles.uploadButton,
//                     ml: 2,
//                     background: "linear-gradient(135deg, #ff758c 0%, #a9def5 100%)",
//                   }}
//                 >
//                   יצירת מצגת
//                 </Button>
//               )}
//             </Box>
//           </TabPanel>

//           <TabPanel value={tabValue} index={1}>
//             <FileUploader open={true} onClose={handleUploadClose} albumId={albumId} />
//           </TabPanel>
//         </DialogContent>
//       </Dialog>

//       {/* דיאלוג הצגת תמונה בגודל מלא - עם חצי ניווט */}
//       {selectedImage && (
//         <Dialog
//           open={true}
//           onClose={handleCloseFullImage}
//           maxWidth="lg"
//           PaperProps={{
//             sx: styles.fullImageDialog,
//           }}
//         >
//           <IconButton aria-label="close" onClick={handleCloseFullImage} sx={styles.fullImageCloseButton}>
//             <CloseIcon />
//           </IconButton>

//           {/* חץ קודם */}
//           {selectedImageIndex > 0 && (
//             <IconButton
//               onClick={handlePrevImage}
//               sx={{
//                 position: "absolute",
//                 left: 16,
//                 top: "50%",
//                 transform: "translateY(-50%)",
//                 color: "white",
//                 backgroundColor: "rgba(0,0,0,0.3)",
//                 "&:hover": { backgroundColor: "rgba(0,0,0,0.5)" },
//                 zIndex: 10,
//               }}
//             >
//               <ArrowBackIcon />
//             </IconButton>
//           )}

//           {/* חץ הבא */}
//           {selectedImageIndex < images.length - 1 && (
//             <IconButton
//               onClick={handleNextImage}
//               sx={{
//                 position: "absolute",
//                 right: 16,
//                 top: "50%",
//                 transform: "translateY(-50%)",
//                 color: "white",
//                 backgroundColor: "rgba(0,0,0,0.3)",
//                 "&:hover": { backgroundColor: "rgba(0,0,0,0.5)" },
//                 zIndex: 10,
//               }}
//             >
//               <ArrowForwardIcon />
//             </IconButton>
//           )}

//           <Box sx={styles.fullImageContainer}>
//             <TransformWrapper initialScale={1} initialPositionX={0} initialPositionY={0}>
//               {({ zoomIn, zoomOut, resetTransform }) => (
//                 <>
//                   <TransformComponent
//                     wrapperStyle={{
//                       width: "100%",
//                       height: "80vh",
//                       display: "flex",
//                       justifyContent: "center",
//                       alignItems: "center",
//                     }}
//                   >
//                     <img
//                       src={selectedImage.url || "/placeholder.svg"}
//                       alt={selectedImage.title}
//                       style={{
//                         maxWidth: "100%",
//                         maxHeight: "80vh",
//                         objectFit: "contain",
//                       }}
//                     />
//                   </TransformComponent>

//                   {/* כפתורי זום בתחתית התמונה */}
//                   <Paper elevation={3} sx={styles.zoomControls}>
//                     <IconButton onClick={() => zoomIn()} size="small" sx={styles.zoomButton}>
//                       <ZoomInIcon fontSize="small" />
//                     </IconButton>
//                     <IconButton onClick={() => zoomOut()} size="small" sx={styles.zoomButton}>
//                       <ZoomOutIcon fontSize="small" />
//                     </IconButton>
//                     <IconButton onClick={() => resetTransform()} size="small" sx={styles.zoomButton}>
//                       <RestartAltIcon fontSize="small" />
//                     </IconButton>
//                   </Paper>
//                 </>
//               )}
//             </TransformWrapper>
//           </Box>
//         </Dialog>
//       )}

//       {/* דיאלוג יצירת מצגת */}
//       {slideshowOpen && albumId && (
//         <SimpleSlideshowMaker
//           open={slideshowOpen}
//           onClose={() => setSlideshowOpen(false)}
//           images={images}
//           albumId={albumId}
//         />
//       )}
//     </>
//   )
// }

// export default ImageDialog
"use client"

import type React from "react"
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
  Paper,
  Snackbar,
  Alert,
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
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import SlideshowIcon from "@mui/icons-material/Slideshow"
import DownloadIcon from "@mui/icons-material/Download" // אייקון הורדה
import FileUploader from "./FileUploader"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"
import styles from "../styles/imageDialog.styles"
import SimpleSlideshowMaker from "./simple-slideshow-maker"
// import SlideshowDownloadHelper from "./slideshow-download-helper"

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
  onDeleteImage,
  onUpdateImage,
  onUploadImage,
}) => {
  const [editingPhotoId, setEditingPhotoId] = useState<number | null>(null)
  const [newTitle, setNewTitle] = useState<string>("")
  const [saving, setSaving] = useState(false)
  const [uploadOpen, setUploadOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<Image | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(-1)
  const [tabValue, setTabValue] = useState(0)
  const [slideshowOpen, setSlideshowOpen] = useState(false)

  // מצבים להודעות
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error" | "info" | "warning">("success")

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
    setSelectedImage(null)
    setSelectedImageIndex(-1)
  }

  const handleCloseFullImage = () => {
    setSelectedImage(null)
    setSelectedImageIndex(-1)
  }

  const startEditing = (image: Image) => {
    if (editingPhotoId !== image.photoId) {
      // setNewTitle(image.title)
      setNewTitle(getFileNameWithoutExtension(image.title)) // רק השם בלי הסיומת

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

  // פונקציות לניווט בין תמונות
  const handleSelectImage = (image: Image, index: number) => {
    setSelectedImage(image)
    setSelectedImageIndex(index)
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

  // פונקציה להצגת הודעות
  const showSnackbar = (message: string, severity: "success" | "error" | "info" | "warning" = "success") => {
    setSnackbarMessage(message)
    setSnackbarSeverity(severity)
    setSnackbarOpen(true)
  }

  // פונקציה להורדת תמונה - גרסה משופרת שנשארת באותו עמוד
  const handleDownloadImage = async (image: Image) => {
    try {
      showSnackbar("מכין את התמונה להורדה...", "info")

      // יצירת URL להורדה דרך השרת
      const filename = image.title || `image_${image.photoId}.jpg`
      const downloadUrl = `https://localhost:7259/api/Download/image?url=${encodeURIComponent(image.url)}&filename=${encodeURIComponent(filename)}`

      // הורדת התמונה באמצעות fetch
      const response = await fetch(downloadUrl)

      if (!response.ok) {
        throw new Error(`שגיאת שרת: ${response.status}`)
      }

      // קבלת ה-blob מהתגובה
      const blob = await response.blob()

      // יצירת URL לבלוב
      const url = URL.createObjectURL(blob)

      // יצירת אלמנט קישור להורדה
      const link = document.createElement("a")
      link.href = url
      link.download = filename
      document.body.appendChild(link)

      // לחיצה על הקישור להורדה
      link.click()

      // ניקוי
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      showSnackbar("התמונה הורדה בהצלחה!", "success")
    } catch (error) {
      console.error("שגיאה בהורדת התמונה:", error)
      showSnackbar(`אירעה שגיאה בהורדת התמונה: ${error instanceof Error ? error.message : "שגיאה לא ידועה"}`, "error")
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
            תמונות באלבום
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
                            onClick={() => handleSelectImage(image, index)}
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
                          {/* כפתור הורדה */}
                          <Tooltip title="הורד תמונה">
                            <IconButton
                              size="small"
                              sx={{
                                color: "#1b5e20",
                                "&:hover": { color: "#2e7d32" },
                              }}
                              onClick={() => handleDownloadImage(image)}
                            >
                              <DownloadIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
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
                    sx={{
                      ...styles.uploadButton,
                      ml: 2,
                      background: "linear-gradient(135deg, #ff758c 0%, #a9def5 100%)",
                    }}
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

      {/* דיאלוג הצגת תמונה בגודל מלא - עם חצי ניווט */}
      {selectedImage && (
        <Dialog
          open={true}
          onClose={handleCloseFullImage}
          maxWidth="lg"
          PaperProps={{
            sx: styles.fullImageDialog,
          }}
        >
          <IconButton aria-label="close" onClick={handleCloseFullImage} sx={styles.fullImageCloseButton}>
            <CloseIcon />
          </IconButton>

          {/* חץ קודם */}
          {selectedImageIndex > 0 && (
            <IconButton
              onClick={handlePrevImage}
              sx={{
                position: "absolute",
                left: 16,
                top: "50%",
                transform: "translateY(-50%)",
                color: "white",
                backgroundColor: "rgba(0,0,0,0.3)",
                "&:hover": { backgroundColor: "rgba(0,0,0,0.5)" },
                zIndex: 10,
              }}
            >
              <ArrowBackIcon />
            </IconButton>
          )}

          {/* חץ הבא */}
          {selectedImageIndex < images.length - 1 && (
            <IconButton
              onClick={handleNextImage}
              sx={{
                position: "absolute",
                right: 16,
                top: "50%",
                transform: "translateY(-50%)",
                color: "white",
                backgroundColor: "rgba(0,0,0,0.3)",
                "&:hover": { backgroundColor: "rgba(0,0,0,0.5)" },
                zIndex: 10,
              }}
            >
              <ArrowForwardIcon />
            </IconButton>
          )}

          <Box sx={styles.fullImageContainer}>
            <TransformWrapper initialScale={1} initialPositionX={0} initialPositionY={0}>
              {({ zoomIn, zoomOut, resetTransform }) => (
                <>
                  <TransformComponent
                    wrapperStyle={{
                      width: "100%",
                      height: "80vh",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={selectedImage.url || "/placeholder.svg"}
                      alt={selectedImage.title}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "80vh",
                        objectFit: "contain",
                      }}
                    />
                  </TransformComponent>

                  {/* כפתורי זום בתחתית התמונה */}
                  <Paper elevation={3} sx={styles.zoomControls}>
                    <IconButton onClick={() => zoomIn()} size="small" sx={styles.zoomButton}>
                      <ZoomInIcon fontSize="small" />
                    </IconButton>
                    <IconButton onClick={() => zoomOut()} size="small" sx={styles.zoomButton}>
                      <ZoomOutIcon fontSize="small" />
                    </IconButton>
                    <IconButton onClick={() => resetTransform()} size="small" sx={styles.zoomButton}>
                      <RestartAltIcon fontSize="small" />
                    </IconButton>
                    {/* כפתור הורדה בתצוגה מלאה */}
                    <IconButton
                      onClick={() => handleDownloadImage(selectedImage)}
                      size="small"
                      sx={{
                        ...styles.zoomButton,
                        color: "#4caf50",
                      }}
                    >
                      <DownloadIcon fontSize="small" />
                    </IconButton>
                  </Paper>
                </>
              )}
            </TransformWrapper>
          </Box>
        </Dialog>
      )}

      {/* דיאלוג יצירת מצגת */}
      {slideshowOpen && albumId && (
        <SimpleSlideshowMaker
          open={slideshowOpen}
          onClose={() => setSlideshowOpen(false)}
          images={images}
          albumId={albumId}
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

