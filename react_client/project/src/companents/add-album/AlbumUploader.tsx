"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Container, Box, Paper, IconButton } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary"
import CameraAltIcon from "@mui/icons-material/CameraAlt"
import FilterVintageIcon from "@mui/icons-material/FilterVintage"
import FlareIcon from "@mui/icons-material/Flare"
import { useUserContext } from "../../context/UserContext"
import { albumUploaderStyles } from "../../styles/albumUploader.styles"
import AlbumForm from "./AlbumForm"

// קומפוננטה ראשית עם רקע ומבנה כללי - 70 שורות
const AlbumUploader: React.FC = () => {
  const [message, setMessage] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)
  const { user } = useUserContext()
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    // אם אין משתמש בזיכרון וגם אין משתמש בשמירה, או שאין טוקן
    if (!user?.UserId || !token) {
      setMessage("יש להתחבר קודם.")
      navigate("/login")
    }
  }, [user?.UserId, navigate])

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
          <AlbumForm initialMessage={message} initialSuccess={isSuccess} />
        </Paper>
      </Container>
    </Box>
  )
}

export default AlbumUploader
