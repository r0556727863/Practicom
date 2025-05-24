"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Box, Typography, Button, Dialog, Fade } from "@mui/material"
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"

interface AIWelcomeAnimationProps {
  userName?: string | null
  onClose: () => void
}

const AIWelcomeAnimation: React.FC<AIWelcomeAnimationProps> = ({ userName, onClose }) => {
  const [open, setOpen] = useState(false)
  const [animationStep, setAnimationStep] = useState(0)

  useEffect(() => {
    // פתיחת האנימציה אחרי השהייה קצרה
    const timer = setTimeout(() => {
      setOpen(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (open) {
      // התקדמות בשלבי האנימציה
      const timer = setTimeout(() => {
        if (animationStep < 3) {
          setAnimationStep(animationStep + 1)
        }
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [open, animationStep])

  const handleClose = () => {
    setOpen(false)
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          background: "rgba(0, 0, 0, 0.85)",
          backdropFilter: "blur(10px)",
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          height: "60vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 4,
          overflow: "hidden",
        }}
      >
        {/* רקע אנימציה */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "radial-gradient(circle, rgba(255,117,140,0.2) 0%, rgba(0,0,0,0) 70%)",
            animation: "pulse 4s infinite",
            "@keyframes pulse": {
              "0%": { opacity: 0.5 },
              "50%": { opacity: 1 },
              "100%": { opacity: 0.5 },
            },
          }}
        />

        {/* אלמנטים מרחפים */}
        {[...Array(20)].map((_, i) => (
          <Box
            key={i}
            sx={{
              position: "absolute",
              width: Math.random() * 10 + 5,
              height: Math.random() * 10 + 5,
              borderRadius: "50%",
              background: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float-${i} ${Math.random() * 10 + 10}s infinite ease-in-out`,
              "@keyframes float-0": {
                "0%, 100%": { transform: "translate(0, 0)" },
                "50%": { transform: "translate(20px, -20px)" },
              },
            }}
          />
        ))}

        {/* אייקון AI */}
        <Fade in={animationStep >= 0} timeout={1000}>
          <Box
            sx={{
              mb: 4,
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 30px rgba(255, 117, 140, 0.7)",
              animation: "pulse-icon 2s infinite",
              "@keyframes pulse-icon": {
                "0%": { transform: "scale(1)" },
                "50%": { transform: "scale(1.1)" },
                "100%": { transform: "scale(1)" },
              },
            }}
          >
            <AutoAwesomeIcon sx={{ fontSize: 50, color: "white" }} />
          </Box>
        </Fade>

        {/* כותרת ברוכים הבאים */}
        <Fade in={animationStep >= 1} timeout={1000}>
          <Typography
            variant="h3"
            component="h1"
            align="center"
            sx={{
              color: "white",
              fontWeight: "bold",
              mb: 2,
              textShadow: "0 0 10px rgba(255, 117, 140, 0.7)",
            }}
          >
            {userName ? `שלום ${userName}!` : "ברוכים הבאים!"}
          </Typography>
        </Fade>

        {/* תיאור */}
        <Fade in={animationStep >= 2} timeout={1000}>
          <Typography
            variant="h6"
            align="center"
            sx={{
              color: "rgba(255, 255, 255, 0.8)",
              maxWidth: "80%",
              mb: 4,
            }}
          >
            ברוכים הבאים לאלבומיקס החדש, עם יכולות AI מתקדמות שיעזרו לך לארגן ולנהל את התמונות שלך בצורה חכמה יותר.
          </Typography>
        </Fade>

        {/* כפתור התחלה */}
        <Fade in={animationStep >= 3} timeout={1000}>
          <Button
            variant="contained"
            size="large"
            onClick={handleClose}
            sx={{
              borderRadius: 30,
              px: 4,
              py: 1.5,
              background: "linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)",
              boxShadow: "0 10px 20px rgba(255, 117, 140, 0.3)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 15px 30px rgba(255, 117, 140, 0.4)",
              },
            }}
          >
            התחל להשתמש
          </Button>
        </Fade>
      </Box>
    </Dialog>
  )
}

export default AIWelcomeAnimation
