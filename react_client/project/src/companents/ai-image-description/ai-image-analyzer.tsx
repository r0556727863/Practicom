// "use client"

// import type React from "react"
// import { useState } from "react"
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Typography,
//   Box,
//   CircularProgress,
//   Chip,
//   IconButton,
//   Divider,
//   Paper,
// } from "@mui/material"
// import CloseIcon from "@mui/icons-material/Close"
// import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"
// import ImageSearchIcon from "@mui/icons-material/ImageSearch"
// import LocalOfferIcon from "@mui/icons-material/LocalOffer"
// import axios from "axios"

// interface AIImageAnalyzerProps {
//   open: boolean
//   onClose: () => void
//   imageUrl: string
//   imageTitle: string
//   onUpdateDescription?: (description: string) => void
// }

// const AIImageAnalyzer: React.FC<AIImageAnalyzerProps> = ({
//   open,
//   onClose,
//   imageUrl,
//   imageTitle,
//   onUpdateDescription,
// }) => {
//   const [loading, setLoading] = useState(false)
//   const [description, setDescription] = useState<string | null>(null)
//   const [error, setError] = useState<string | null>(null)
//   const token = localStorage.getItem("token")

//   const analyzeImage = async () => {
//     setLoading(true)
//     setError(null)

//     try {
//       // שליחת בקשה ל-AI לניתוח התמונה
//       const response = await axios.post(
//         "https://localhost:7259/api/AiDescription/describe",
//         {
//           generatedText: `תאר בפירוט את התמונה הבאה: ${imageTitle}`,
//         },
//         {
//           headers: {
//             Authorization: token ? `Bearer ${token}` : "",
//             "Content-Type": "application/json",
//           },
//         },
//       )

//       setDescription(response.data.description || "לא הצלחתי לנתח את התמונה.")
//     } catch (error) {
//       console.error("Error analyzing image:", error)
//       setError("אירעה שגיאה בניתוח התמונה. אנא נסה שוב מאוחר יותר.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleSaveDescription = () => {
//     if (description && onUpdateDescription) {
//       onUpdateDescription(description)
//     }
//     onClose()
//   }


//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       maxWidth="md"
//       fullWidth
//       PaperProps={{
//         sx: {
//           borderRadius: 3,
//           background: "rgba(255, 255, 255, 0.95)",
//           backdropFilter: "blur(10px)",
//           boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
//           overflow: "hidden",
//           direction: "rtl",
//         },
//       }}
//     >
//       <DialogTitle sx={{ pb: 1 }}>
//         <Box display="flex" alignItems="center" justifyContent="space-between">
//           <Box display="flex" alignItems="center" gap={1}>
//             <ImageSearchIcon sx={{ color: "#ff758c" }} />
//             <Typography variant="h6" fontWeight="bold">
//               ניתוח שם תמונה באמצעות AI
//             </Typography>
//           </Box>
//           <IconButton onClick={onClose} edge="end" aria-label="close">
//             <CloseIcon />
//           </IconButton>
//         </Box>
//       </DialogTitle>

//       <DialogContent>
//         <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3 }}>
//           <Box sx={{ flex: 1, maxWidth: { xs: "100%", md: "50%" } }}>
//             <Paper
//               elevation={3}
//               sx={{
//                 borderRadius: 2,
//                 overflow: "hidden",
//                 height: "300px",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 mb: 2,
//               }}
//             >
//               <img
//                 src={imageUrl || "/placeholder.svg"}
//                 alt={imageTitle}
//                 style={{
//                   maxWidth: "100%",
//                   maxHeight: "100%",
//                   objectFit: "contain",
//                 }}
//               />
//             </Paper>
//             <Typography variant="h6" gutterBottom>
//               {imageTitle}
//             </Typography>
//           </Box>

//           <Box sx={{ flex: 1 }}>
//             {!description && !loading && !error && (
//               <Box
//                 sx={{
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   height: "100%",
//                   textAlign: "center",
//                   p: 3,
//                 }}
//               >
//                 <AutoAwesomeIcon sx={{ fontSize: 60, color: "#ff758c", mb: 2 }} />
//                 <Typography variant="h6" gutterBottom>
//                   ניתוח שם תמונה באמצעות AI
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary" paragraph>
//                   ה-AI שלנו יכול לנתח את התמונה ולספק תיאור מפורט. לחץ על הכפתור למטה כדי להתחיל.
//                 </Typography>
//                 <Button
//                   variant="contained"
//                   onClick={analyzeImage}
//                   startIcon={<ImageSearchIcon />}
//                   sx={{
//                     mt: 2,
//                     borderRadius: 2,
//                     background: "linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)",
//                     boxShadow: "0 4px 12px rgba(255, 117, 140, 0.3)",
//                   }}
//                 >
//                     תן תאור לשם התמונה  
//                 </Button>
//               </Box>
//             )}

//             {loading && (
//               <Box
//                 sx={{
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   height: "100%",
//                   p: 3,
//                 }}
//               >
//                 <CircularProgress size={60} sx={{ color: "#ff758c", mb: 3 }} />
//                 <Typography variant="h6">מנתח את התמונה...</Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   אנא המתן בזמן שה-AI מנתח את התמונה
//                 </Typography>
//               </Box>
//             )}

//             {error && (
//               <Box
//                 sx={{
//                   p: 3,
//                   bgcolor: "rgba(211, 47, 47, 0.1)",
//                   borderRadius: 2,
//                   color: "error.main",
//                 }}
//               >
//                 <Typography variant="h6" gutterBottom>
//                   שגיאה
//                 </Typography>
//                 <Typography variant="body2">{error}</Typography>
//                 <Button variant="outlined" color="error" onClick={analyzeImage} sx={{ mt: 2 }}>
//                   נסה שוב
//                 </Button>
//               </Box>
//             )}

//             {description && !loading && !error && (
//               <Box>
//                 <Typography variant="h6" gutterBottom>
//                   תיאור התמונה
//                 </Typography>
//                 <Paper
//                   elevation={1}
//                   sx={{
//                     p: 2,
//                     borderRadius: 2,
//                     bgcolor: "rgba(255, 117, 140, 0.05)",
//                     mb: 3,
//                   }}
//                 >
//                   <Typography variant="body1">{description}</Typography>
//                 </Paper>

//                 <Divider sx={{ my: 2 }} />
//               </Box>
//             )}
//           </Box>
//         </Box>
//       </DialogContent>

//       <DialogActions sx={{ p: 2, borderTop: "1px solid rgba(0, 0, 0, 0.1)" }}>
//         <Button onClick={onClose} color="inherit">
//           סגור
//         </Button>
//         {description && onUpdateDescription && (
//           <Button
//             onClick={handleSaveDescription}
//             variant="contained"
//             sx={{
//               borderRadius: 2,
//               background: "linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)",
//             }}
//           >
//             שמור תיאור
//           </Button>
//         )}
//       </DialogActions>
//     </Dialog>
//   )
// }

// export default AIImageAnalyzer
"use client"

import type React from "react"
import { useState } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CircularProgress,
  IconButton,
  Divider,
  Paper,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"
import ImageSearchIcon from "@mui/icons-material/ImageSearch"
import axios from "axios"

interface AIImageAnalyzerProps {
  open: boolean
  onClose: () => void
  imageUrl: string
  imageTitle: string
  onUpdateDescription?: (description: string) => void
}

const AIImageAnalyzer: React.FC<AIImageAnalyzerProps> = ({
  open,
  onClose,
  imageUrl,
  imageTitle,
  onUpdateDescription,
}) => {
  const [loading, setLoading] = useState(false)
  const [description, setDescription] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const token = localStorage.getItem("token")

  const analyzeImage = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/AiDescription/describe`,
        {
          generatedText: `תאר בפירוט את התמונה הבאה: ${imageTitle}`,
        },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        },
      )

      setDescription(response.data.description || "לא הצלחתי לנתח את התמונה.")
    } catch (error) {
      console.error("Error analyzing image:", error)
      setError("אירעה שגיאה בניתוח התמונה. אנא נסה שוב מאוחר יותר.")
    } finally {
      setLoading(false)
    }
  }

  const handleSaveDescription = () => {
    if (description && onUpdateDescription) {
      onUpdateDescription(description)
    }
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 20,
          background: "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(30px)",
          boxShadow: "0 25px 80px rgba(0, 0, 0, 0.3)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          overflow: "hidden",
          direction: "rtl",
          color: "white",
        },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={1}>
            <ImageSearchIcon sx={{ color: "#00d4ff" }} />
            <Typography variant="h6" fontWeight="bold" color="white">
              ניתוח תמונה באמצעות AI
            </Typography>
          </Box>
          <IconButton onClick={onClose} edge="end" aria-label="close" sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3 }}>
          <Box sx={{ flex: 1, maxWidth: { xs: "100%", md: "50%" } }}>
            <Paper
              elevation={3}
              sx={{
                borderRadius: 15,
                overflow: "hidden",
                height: "300px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <img
                src={imageUrl || "/placeholder.svg"}
                alt={imageTitle}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            </Paper>
            <Typography variant="h6" gutterBottom color="white">
              {imageTitle}
            </Typography>
          </Box>

          <Box sx={{ flex: 1 }}>
            {!description && !loading && !error && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  textAlign: "center",
                  p: 3,
                }}
              >
                <AutoAwesomeIcon sx={{ fontSize: 60, color: "#00d4ff", mb: 2 }} />
                <Typography variant="h6" gutterBottom color="white">
                  ניתוח תמונה באמצעות AI
                </Typography>
                <Typography variant="body2" color="rgba(255,255,255,0.7)" paragraph>
                  ה-AI שלנו יכול לנתח את התמונה ולספק תיאור מפורט. לחץ על הכפתור למטה כדי להתחיל.
                </Typography>
                <Button
                  variant="contained"
                  onClick={analyzeImage}
                  startIcon={<ImageSearchIcon />}
                  sx={{
                    mt: 2,
                    borderRadius: 15,
                    background: "linear-gradient(135deg, #00d4ff 0%, #9c27b0 50%, #ff6ec7 100%)",
                    boxShadow: "0 8px 30px rgba(0, 212, 255, 0.3)",
                    "&:hover": {
                      background: "linear-gradient(135deg, #00b8e6 0%, #8e24aa 50%, #e91e63 100%)",
                    },
                  }}
                >
                  נתח תמונה
                </Button>
              </Box>
            )}

            {loading && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  p: 3,
                }}
              >
                <CircularProgress size={60} sx={{ color: "#00d4ff", mb: 3 }} />
                <Typography variant="h6" color="white">
                  מנתח את התמונה...
                </Typography>
                <Typography variant="body2" color="rgba(255,255,255,0.7)">
                  אנא המתן בזמן שה-AI מנתח את התמונה
                </Typography>
              </Box>
            )}

            {error && (
              <Box
                sx={{
                  p: 3,
                  bgcolor: "rgba(255, 82, 82, 0.2)",
                  borderRadius: 15,
                  border: "1px solid rgba(255, 82, 82, 0.3)",
                  color: "white",
                }}
              >
                <Typography variant="h6" gutterBottom>
                  שגיאה
                </Typography>
                <Typography variant="body2">{error}</Typography>
                <Button
                  variant="outlined"
                  onClick={analyzeImage}
                  sx={{
                    mt: 2,
                    color: "white",
                    borderColor: "rgba(255, 255, 255, 0.3)",
                    "&:hover": {
                      borderColor: "rgba(255, 255, 255, 0.5)",
                      background: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  נסה שוב
                </Button>
              </Box>
            )}

            {description && !loading && !error && (
              <Box>
                <Typography variant="h6" gutterBottom color="white">
                  תיאור התמונה
                </Typography>
                <Paper
                  elevation={1}
                  sx={{
                    p: 3,
                    borderRadius: 15,
                    background: "rgba(0, 212, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(0, 212, 255, 0.2)",
                    mb: 3,
                  }}
                >
                  <Typography variant="body1" color="white">
                    {description}
                  </Typography>
                </Paper>

                <Divider sx={{ my: 2, borderColor: "rgba(255, 255, 255, 0.1)" }} />
              </Box>
            )}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}>
        <Button
          onClick={onClose}
          sx={{
            color: "rgba(255, 255, 255, 0.7)",
            "&:hover": { color: "white" },
          }}
        >
          סגור
        </Button>
        {description && onUpdateDescription && (
          <Button
            onClick={handleSaveDescription}
            variant="contained"
            sx={{
              borderRadius: 15,
              background: "linear-gradient(135deg, #00d4ff 0%, #9c27b0 50%, #ff6ec7 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #00b8e6 0%, #8e24aa 50%, #e91e63 100%)",
              },
            }}
          >
            שמור תיאור
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default AIImageAnalyzer
