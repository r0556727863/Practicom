import type React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
  Paper,
  IconButton,
  Avatar,
} from "@mui/material"
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary"
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"
import CameraAltIcon from "@mui/icons-material/CameraAlt"
import FilterVintageIcon from "@mui/icons-material/FilterVintage"
import FlareIcon from "@mui/icons-material/Flare"
import LocalFloristIcon from "@mui/icons-material/LocalFlorist"
import { useUserContext } from "../context/UserContext"
import { albumUploaderStyles } from "../styles/albumUploader.styles"

const AlbumUploader: React.FC = () => {
  const [albumTitle, setAlbumTitle] = useState("")
  const [albumDescription, setAlbumDescription] = useState("")
  const [message, setMessage] = useState("")
  const [, setAlbumId] = useState<number | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const { user } = useUserContext()
  const token = localStorage.getItem("token")
  const userId = user?.UserId
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    const token = localStorage.getItem("token")
  
    // אם אין משתמש בזיכרון וגם אין משתמש בשמירה, או שאין טוקן
    if ((!user && !storedUser) || !token) {
      navigate("/login")
    }
  }, [user, navigate])
  

  const submitAlbum = async () => {
    setLoading(true)
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/Album/album`,
        {
          title: albumTitle,
          description: albumDescription,
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      )

      const createdAlbumId = response.data?.albumId
      setAlbumId(createdAlbumId || null)
      setMessage(`האלבום "${response.data?.title}" נוצר בהצלחה!`)
      setIsSuccess(true)
      setAlbumTitle("")
      setAlbumDescription("")

      setTimeout(() => navigate("/AlbumsList"), 1000) // ניווט עם דיליי קל
    } catch (error) {
      setIsSuccess(false)
      if (axios.isAxiosError(error)) {
        setMessage(`שגיאה: ${error.response?.data || error.message}`)
      } else {
        setMessage("שגיאה בלתי צפויה.")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleAlbumSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")

    if (!albumTitle || !albumDescription) {
      setMessage("אנא הכנס שם ותיאור לאלבום.")
      setIsSuccess(false)
      return
    }

    submitAlbum()
  }

  return (
    <Box sx={albumUploaderStyles.container}>
      {/* Background */}
      <Box sx={albumUploaderStyles.background} />

      {/* Overlay gradient */}
      <Box sx={albumUploaderStyles.overlay} />

      {/* אלמנטים דקורטיביים מרחפים */}
      {[...Array(15)].map((_, i) => (
        <Box
          key={i}
          sx={{
            ...albumUploaderStyles.decorElement,
            //...albumUploaderStyles[`float-${i % 15}`],
            background:
              i % 3 === 0
                ? "rgba(245, 169, 184, 0.4)"
                : i % 3 === 1
                  ? "rgba(169, 222, 245, 0.4)"
                  : "rgba(186, 169, 245, 0.4)",
          }}
        />
      ))}

      {/* אייקונים מרחפים */}
      <Box sx={albumUploaderStyles.floatingIcon1}>
        <PhotoLibraryIcon sx={albumUploaderStyles.floatingIconImage1} />
      </Box>

      <Box sx={albumUploaderStyles.floatingIcon2}>
        <CameraAltIcon sx={albumUploaderStyles.floatingIconImage2} />
      </Box>

      <Box sx={albumUploaderStyles.floatingIcon3}>
        <FilterVintageIcon sx={albumUploaderStyles.floatingIconImage3} />
      </Box>

      <Box sx={albumUploaderStyles.floatingIcon4}>
        <FlareIcon sx={albumUploaderStyles.floatingIconImage4} />
      </Box>

      <Container maxWidth="sm" sx={albumUploaderStyles.contentContainer}>
        <IconButton onClick={() => navigate("/AlbumsList")} sx={albumUploaderStyles.backButton}>
          <ArrowBackIcon />
        </IconButton>

        <Paper elevation={0} sx={albumUploaderStyles.paper}>
          {/* Header - גרדיאנט מרהיב */}
          <Box sx={albumUploaderStyles.headerBox}>
            {/* אלמנטים דקורטיביים בכותרת */}
            <Box sx={albumUploaderStyles.headerDecor1} />
            <Box sx={albumUploaderStyles.headerDecor2} />

            <Avatar sx={albumUploaderStyles.avatar}>
              <AddPhotoAlternateIcon sx={albumUploaderStyles.avatarIcon} />
            </Avatar>
            <Typography variant="h3" component="h1" fontWeight="bold" color="white" sx={albumUploaderStyles.title}>
              הוסף אלבום חדש
            </Typography>
            <Typography variant="h6" color="white" sx={albumUploaderStyles.subtitle}>
              <AutoAwesomeIcon /> צור אלבום מרהיב לתמונות שלך <AutoAwesomeIcon />
            </Typography>
          </Box>

          {/* Form */}
          <Box sx={albumUploaderStyles.formContainer}>
            {/* אלמנטים דקורטיביים בטופס */}
            <Box sx={albumUploaderStyles.formDecor1} />
            <Box sx={albumUploaderStyles.formDecor2} />

            <form onSubmit={handleAlbumSubmit}>
              <Typography variant="h5" fontWeight="600" color="#333" sx={albumUploaderStyles.formTitle}>
                <LocalFloristIcon sx={{ color: "#f5a9b8" }} /> פרטי האלבום החדש
              </Typography>

              <TextField
                label="שם האלבום"
                variant="outlined"
                fullWidth
                value={albumTitle}
                onChange={(e) => setAlbumTitle(e.target.value)}
                margin="normal"
                placeholder="הכנס שם לאלבום החדש"
                InputProps={{
                  sx: albumUploaderStyles.textFieldInput,
                }}
                InputLabelProps={{
                  sx: albumUploaderStyles.textFieldLabel,
                }}
              />
              <TextField
                label="תיאור האלבום"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                value={albumDescription}
                onChange={(e) => setAlbumDescription(e.target.value)}
                margin="normal"
                placeholder="הוסף תיאור קצר לאלבום"
                InputProps={{
                  sx: albumUploaderStyles.textFieldInput,
                }}
                InputLabelProps={{
                  sx: albumUploaderStyles.textFieldLabel,
                }}
              />

              {message && (
                <Alert severity={isSuccess ? "success" : "error"} sx={albumUploaderStyles.alert}>
                  {message}
                </Alert>
              )}

              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={loading}
                sx={albumUploaderStyles.submitButton}
              >
                {loading ? (
                  <CircularProgress size={28} sx={{ color: "white" }} />
                ) : (
                  <>
                    <AddPhotoAlternateIcon sx={{ mr: 1 }} /> צור אלבום מדהים
                  </>
                )}
              </Button>
            </form>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}

export default AlbumUploader
