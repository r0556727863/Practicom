// import type React from "react"
// import { useState, type ChangeEvent, useEffect } from "react"
// import axios from "axios"
// import { useDispatch } from "react-redux"
// import { Box, Button, Typography, LinearProgress, Alert, IconButton, Card, CardContent, Avatar } from "@mui/material"
// import CloudUploadIcon from "@mui/icons-material/CloudUpload"
// import CloseIcon from "@mui/icons-material/Close"
// import { useUserContext } from "../context/UserContext"
// import { fileUploaderStyles } from "../styles/fileUploader.styles"

// interface FileUploaderProps {
//   open: boolean
//   onClose: () => void
//   albumId?: number
// }

// const FileUploader: React.FC<FileUploaderProps> = ({ open, onClose, albumId }) => {
//   const [file, setFile] = useState<File | null>(null)
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null)
//   const [uploadProgress, setUploadProgress] = useState(0)
//   const [error, setError] = useState<string | null>(null)
//   const [uploading, setUploading] = useState(false)
//   const [success, setSuccess] = useState(false)
//   const token = localStorage.getItem("token")
//   const dispatch = useDispatch()
//   const { user } = useUserContext()

//   // יצירת תצוגה מקדימה כאשר נבחר קובץ
//   useEffect(() => {
//     if (!file) {
//       setPreviewUrl(null)
//       return
//     }

//     // יצירת URL לתצוגה מקדימה של התמונה
//     const objectUrl = URL.createObjectURL(file)
//     setPreviewUrl(objectUrl)

//     // ניקוי ה-URL כשהקומפוננטה נהרסת
//     return () => URL.revokeObjectURL(objectUrl)
//   }, [file])

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setFile(e.target.files[0])
//       setError(null)
//       setSuccess(false)
//     }
//   }

//   const uploadFile = async () => {
//     if (!file) {
//       setError("אנא בחר קובץ להעלאה")
//       return
//     }

//     if (!token) {
//       setError("עליך להתחבר כדי להעלות קבצים")
//       return
//     }

//     if (!albumId) {
//       setError("מזהה אלבום חסר")
//       return
//     }

//     setUploading(true)
//     setError(null)
//     setSuccess(false)

//     try {
//       const response = await axios.get("https://localhost:7259/api/UploadFile/presigned-url", {
//         params: {
//           fileName: file.name,
//           albumName: albumId,
//         },
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })

//       const { uploadUrl, fileUrl } = response.data

//       await axios.put(uploadUrl, file, {
//         headers: {
//           "Content-Type": file.type,
//           "x-amz-acl": "bucket-owner-full-control",
//         },
//         onUploadProgress: (progressEvent) => {
//           const total = progressEvent.total || 0
//           const current = progressEvent.loaded
//           const percentage = Math.round((current / total) * 100)
//           setUploadProgress(percentage)
//         },
//       })

//       const photoData = {
//         AlbumId: albumId,
//         UserId: user?.UserId,
//         Url: fileUrl,
//         Title: file.name,
//         CreatedAt: new Date().toISOString(),
//         UpdatedAt: new Date().toISOString(),
//       }

//       const postResponse = await axios.post("https://localhost:7259/api/Photo/photo", photoData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       })

//       // כאן את מקבלת את התמונה המלאה כולל photoId מהשרת:
//       const savedPhoto = postResponse.data

//       // רק עכשיו תשלחי ל־Redux:
//       dispatch({ type: "ADD_PHOTO", payload: savedPhoto })

//       setSuccess(true)
//       setTimeout(() => {
//         setUploadProgress(0)
//         setFile(null)
//         setPreviewUrl(null)
//         onClose()
//       }, 1500)
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         setError(`שגיאה בהעלאה: ${error.response?.data || error.message}`)
//       } else {
//         setError("שגיאה כללית בהעלאה")
//       }
//     } finally {
//       setUploading(false)
//     }
//   }

//   if (!open) return null

//   return (
//     <Card sx={fileUploaderStyles.card}>
//       <IconButton onClick={onClose} sx={fileUploaderStyles.closeButton}>
//         <CloseIcon />
//       </IconButton>

//       <CardContent sx={fileUploaderStyles.cardContent}>
//         <Box sx={fileUploaderStyles.headerBox}>
//           <Avatar sx={fileUploaderStyles.avatar}>
//             <CloudUploadIcon sx={fileUploaderStyles.avatarIcon} />
//           </Avatar>
//           <Typography variant="h5" component="h2" gutterBottom align="center" fontWeight="bold">
//             העלאת תמונה
//           </Typography>
//           <Typography variant="body2" color="text.secondary" align="center">
//             בחר תמונה להעלאה לאלבום
//           </Typography>
//         </Box>

//         {previewUrl ? (
//           // תצוגה מקדימה של התמונה שנבחרה
//           <Box sx={{ mb: 3 }}>
//             <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 1 }}>
//               תצוגה מקדימה:
//             </Typography>
//             <Box
//               sx={{
//                 borderRadius: "10px",
//                 overflow: "hidden",
//                 boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//                 mb: 2,
//                 maxHeight: "250px",
//                 display: "flex",
//                 justifyContent: "center",
//               }}
//             >
//               <img
//                 src={previewUrl || "/placeholder.svg"}
//                 alt="תצוגה מקדימה"
//                 style={{ maxWidth: "80%", maxHeight: "230px", objectFit: "contain" }}
//               />
//             </Box>
//             <Box sx={{ display: "flex", justifyContent: "center" }}>
//               <Button
//                 variant="outlined"
//                 size="small"
//                 onClick={() => {
//                   setFile(null)
//                   setPreviewUrl(null)
//                 }}
//                 sx={{ borderRadius: "20px", fontSize: "0.8rem" }}
//               >
//                 בחר תמונה אחרת
//               </Button>
//             </Box>
//           </Box>
//         ) : (
//           // אזור גרירה/בחירת קובץ
//           <Box sx={fileUploaderStyles.dropZone}>
//             <input
//               accept="image/*"
//               style={{ display: "none" }}
//               id="raised-button-file"
//               type="file"
//               onChange={handleFileChange}
//             />
//             <label htmlFor="raised-button-file">
//               <Box sx={fileUploaderStyles.dropZoneContent}>
//                 <CloudUploadIcon sx={fileUploaderStyles.uploadIcon} />
//                 <Typography variant="body1" gutterBottom>
//                   {file ? file.name : "לחץ לבחירת תמונה"}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   PNG, JPG, GIF עד 10MB
//                 </Typography>
//               </Box>
//             </label>
//           </Box>
//         )}

//         {uploadProgress > 0 && (
//           <Box sx={fileUploaderStyles.progressContainer}>
//             <Box sx={fileUploaderStyles.progressLabels}>
//               <Typography variant="body2">מעלה...</Typography>
//               <Typography variant="body2">{uploadProgress}%</Typography>
//             </Box>
//             <LinearProgress variant="determinate" value={uploadProgress} sx={fileUploaderStyles.progressBar} />
//           </Box>
//         )}

//         {error && (
//           <Alert severity="error" sx={fileUploaderStyles.alert}>
//             {error}
//           </Alert>
//         )}

//         {success && (
//           <Alert severity="success" sx={fileUploaderStyles.alert}>
//             התמונה הועלתה בהצלחה!
//           </Alert>
//         )}

//         <Button
//           variant="contained"
//           fullWidth
//           onClick={uploadFile}
//           disabled={!file || uploading}
//           sx={fileUploaderStyles.uploadButton}
//         >
//           {uploading ? "מעלה..." : "העלה קובץ"}
//         </Button>
//       </CardContent>
//     </Card>
//   )
// }

// export default FileUploader
"use client"

import type React from "react"
import { useState, type ChangeEvent, useEffect } from "react"
import axios from "axios"
import { useDispatch } from "react-redux"
import { Box, Button, Typography, LinearProgress, Alert, IconButton, Card, CardContent, Avatar } from "@mui/material"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import CloseIcon from "@mui/icons-material/Close"
import EditIcon from "@mui/icons-material/Edit"
import { useUserContext } from "../context/UserContext"
import { fileUploaderStyles } from "../styles/fileUploader.styles"
import SimpleCollageMaker from "./CollageSuggestionDialog"

interface FileUploaderProps {
  open: boolean
  onClose: () => void
  albumId?: number
}

const FileUploader: React.FC<FileUploaderProps> = ({ open, onClose, albumId }) => {
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [success, setSuccess] = useState(false)
  const token = localStorage.getItem("token")
  const dispatch = useDispatch()
  const { user } = useUserContext()

  // מצב חדש לעורך הקולאז'
  const [showCollageMaker, setShowCollageMaker] = useState(false)

  // יצירת תצוגה מקדימה כאשר נבחר קובץ
  useEffect(() => {
    if (!file) {
      setPreviewUrl(null)
      return
    }

    // יצירת URL לתצוגה מקדימה של התמונה
    const objectUrl = URL.createObjectURL(file)
    setPreviewUrl(objectUrl)

    // ניקוי ה-URL כשהקומפוננטה נהרסת
    return () => URL.revokeObjectURL(objectUrl)
  }, [file])

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setError(null)
      setSuccess(false)
    }
  }

  // תיקון לבעיית העלאת התמונה האחרונה שעוצבה

  // 1. שנה את פונקציית handleSaveCollage כך שתשמור את התמונה החדשה ותנקה את הקודמת
  const handleSaveCollage = (collageDataUrl: string) => {
    // העלה את הקולאז' כתמונה חדשה
    uploadFile(collageDataUrl)

    // סגור את עורך הקולאז'
    setShowCollageMaker(false)

    // איפוס התמונה המקורית כדי שלא תעלה שוב
    setFile(null)
    setPreviewUrl(null)
  }

  // 2. שנה את פונקציית uploadFile כדי לוודא שהיא מטפלת נכון בקולאז'
  const uploadFile = async (collageDataUrl?: string) => {
    if (!file && !collageDataUrl) {
      setError("אנא בחר קובץ להעלאה")
      return
    }

    if (!token) {
      setError("עליך להתחבר כדי להעלות קבצים")
      return
    }

    if (!albumId) {
      setError("מזהה אלבום חסר")
      return
    }

    setUploading(true)
    setError(null)
    setSuccess(false)

    try {
      // אם יש קולאז', המר אותו לקובץ
      let fileToUpload = file
      let fileName = file?.name || "collage.jpg"

      if (collageDataUrl) {
        // המר את ה-data URL לקובץ
        const response = await fetch(collageDataUrl)
        const blob = await response.blob()
        // יצירת קובץ חדש עם שם ייחודי כדי למנוע התנגשויות
        const uniqueFileName = `collage_${Date.now()}.jpg`
        fileToUpload = new File([blob], uniqueFileName, { type: "image/jpeg" })
        fileName = uniqueFileName
      }

      const response = await axios.get("https://localhost:7259/api/UploadFile/presigned-url", {
        params: {
          fileName: fileName,
          albumName: albumId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const { uploadUrl, fileUrl } = response.data

      await axios.put(uploadUrl, fileToUpload, {
        headers: {
          "Content-Type": fileToUpload?.type || "image/jpeg",
          "x-amz-acl": "bucket-owner-full-control",
        },
        onUploadProgress: (progressEvent) => {
          const total = progressEvent.total || 0
          const current = progressEvent.loaded
          const percentage = Math.round((current / total) * 100)
          setUploadProgress(percentage)
        },
      })

      const photoData = {
        AlbumId: albumId,
        UserId: user?.UserId,
        Url: fileUrl,
        Title: fileName,
        CreatedAt: new Date().toISOString(),
        UpdatedAt: new Date().toISOString(),
      }

      const postResponse = await axios.post("https://localhost:7259/api/Photo/photo", photoData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      // כאן את מקבלת את התמונה המלאה כולל photoId מהשרת:
      const savedPhoto = postResponse.data

      // רק עכשיו תשלחי ל־Redux:
      dispatch({ type: "ADD_PHOTO", payload: savedPhoto })

      setSuccess(true)
      setTimeout(() => {
        setUploadProgress(0)
        setFile(null)
        setPreviewUrl(null)
        onClose()
      }, 1500)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(`שגיאה בהעלאה: ${error.response?.data || error.message}`)
      } else {
        setError("שגיאה כללית בהעלאה")
      }
    } finally {
      setUploading(false)
    }
  }

  if (!open) return null

  return (
    <>
      <Card sx={fileUploaderStyles.card}>
        <IconButton onClick={onClose} sx={fileUploaderStyles.closeButton}>
          <CloseIcon />
        </IconButton>

        <CardContent sx={fileUploaderStyles.cardContent}>
          <Box sx={fileUploaderStyles.headerBox}>
            <Avatar sx={fileUploaderStyles.avatar}>
              <CloudUploadIcon sx={fileUploaderStyles.avatarIcon} />
            </Avatar>
            <Typography variant="h5" component="h2" gutterBottom align="center" fontWeight="bold">
              העלאת תמונה
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              בחר תמונה להעלאה לאלבום
            </Typography>
          </Box>

          {previewUrl ? (
            // תצוגה מקדימה של התמונה שנבחרה - מוקטנת יותר
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 1 }}>
                תצוגה מקדימה:
              </Typography>
              <Box
                sx={{
                  borderRadius: "10px",
                  overflow: "hidden",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  mb: 2,
                  maxHeight: "200px", // הקטנת הגובה המקסימלי
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  src={previewUrl || "/placeholder.svg"}
                  alt="תצוגה מקדימה"
                  style={{ maxWidth: "100%", maxHeight: "200px", objectFit: "contain" }}
                />
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    setFile(null)
                    setPreviewUrl(null)
                  }}
                  sx={{ borderRadius: "20px", fontSize: "0.8rem" }}
                >
                  בחר תמונה אחרת
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  color="primary"
                  startIcon={<EditIcon />}
                  onClick={() => setShowCollageMaker(true)}
                  sx={{ borderRadius: "20px", fontSize: "0.8rem" }}
                >
                  ערוך קולאז'
                </Button>
              </Box>
            </Box>
          ) : (
            // אזור גרירה/בחירת קובץ
            <Box sx={fileUploaderStyles.dropZone}>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="raised-button-file"
                type="file"
                onChange={handleFileChange}
              />
              <label htmlFor="raised-button-file">
                <Box sx={fileUploaderStyles.dropZoneContent}>
                  <CloudUploadIcon sx={fileUploaderStyles.uploadIcon} />
                  <Typography variant="body1" gutterBottom>
                    {file ? file.name : "לחץ לבחירת תמונה"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    PNG, JPG, GIF עד 10MB
                  </Typography>
                </Box>
              </label>
            </Box>
          )}

          {uploadProgress > 0 && (
            <Box sx={fileUploaderStyles.progressContainer}>
              <Box sx={fileUploaderStyles.progressLabels}>
                <Typography variant="body2">מעלה...</Typography>
                <Typography variant="body2">{uploadProgress}%</Typography>
              </Box>
              <LinearProgress variant="determinate" value={uploadProgress} sx={fileUploaderStyles.progressBar} />
            </Box>
          )}

          {error && (
            <Alert severity="error" sx={fileUploaderStyles.alert}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={fileUploaderStyles.alert}>
              התמונה הועלתה בהצלחה!
            </Alert>
          )}

          <Button
            variant="contained"
            fullWidth
            onClick={() => uploadFile()}
            disabled={!file || uploading}
            sx={fileUploaderStyles.uploadButton}
          >
            {uploading ? "מעלה..." : "העלה קובץ"}
          </Button>
        </CardContent>
      </Card>

      {/* עורך קולאז' פשוט */}
      {showCollageMaker && previewUrl && (
        <SimpleCollageMaker
          open={showCollageMaker}
          onClose={() => setShowCollageMaker(false)}
          imageUrl={previewUrl}
          onSaveCollage={handleSaveCollage}
        />
      )}
    </>
  )
}

export default FileUploader
