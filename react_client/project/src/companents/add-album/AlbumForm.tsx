"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Typography, TextField, Button, Box, Alert, CircularProgress, Avatar } from "@mui/material"
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate"
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"
import LocalFloristIcon from "@mui/icons-material/LocalFlorist"
import { useUserContext } from "../../context/UserContext"
import { albumService } from "../../services/album.service"
import { albumUploaderStyles } from "../../styles/albumUploader.styles"

interface AlbumFormProps {
  initialMessage?: string
  initialSuccess?: boolean
}

// קומפוננטת טופס עם לוגיקה - 100 שורות
const AlbumForm: React.FC<AlbumFormProps> = ({ initialMessage = "", initialSuccess = false }) => {
  const [albumTitle, setAlbumTitle] = useState("")
  const [albumDescription, setAlbumDescription] = useState("")
  const [message, setMessage] = useState(initialMessage)
  const [isSuccess, setIsSuccess] = useState(initialSuccess)
  const [loading, setLoading] = useState(false)
  const { user } = useUserContext()
  const navigate = useNavigate()

  const submitAlbum = async () => {
    if (!user?.UserId) {
      setMessage("יש להתחבר קודם.")
      setIsSuccess(false)
      return
    }

    setLoading(true)
    try {
      const newAlbum = await albumService.createAlbum({
        title: albumTitle,
        description: albumDescription,
        userId: user.UserId,
      })

      setMessage(`האלבום "${newAlbum.title}" נוצר בהצלחה!`)
      setIsSuccess(true)
      setAlbumTitle("")
      setAlbumDescription("")

      setTimeout(() => navigate("/AlbumsList"), 1000) // ניווט עם דיליי קל
    } catch (error: any) {
      setIsSuccess(false)
      setMessage(`שגיאה: ${error.response?.data || error.message || "שגיאה בלתי צפויה"}`)
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
    <>
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
    </>
  )
}

export default AlbumForm
