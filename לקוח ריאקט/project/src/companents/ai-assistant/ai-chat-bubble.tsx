"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Box, Paper, Typography, IconButton, Collapse, Fade } from "@mui/material"
import SmartToyIcon from "@mui/icons-material/SmartToy"
import CloseIcon from "@mui/icons-material/Close"
import LightbulbIcon from "@mui/icons-material/Lightbulb"
import { keyframes } from "@mui/system"

interface AIChatBubbleProps {
  message: string
  type?: "welcome" | "tip" | "suggestion"
  onClose?: () => void
  autoHide?: boolean
  delay?: number
}

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(255, 117, 140, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(255, 117, 140, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 117, 140, 0);
  }
`

const AIChatBubble: React.FC<AIChatBubbleProps> = ({
  message,
  type = "welcome",
  onClose,
  autoHide = false,
  delay = 0,
}) => {
  const [visible, setVisible] = useState(false)
  const [expanded, setExpanded] = useState(true)

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setVisible(true)
    }, delay)

    let hideTimer: NodeJS.Timeout
    if (autoHide) {
      hideTimer = setTimeout(() => {
        setExpanded(false)
        setTimeout(() => setVisible(false), 500)
      }, delay + 7000) // הצג למשך 7 שניות ואז הסתר
    }

    return () => {
      clearTimeout(showTimer)
      if (autoHide) clearTimeout(hideTimer)
    }
  }, [autoHide, delay])

  const handleClose = () => {
    setExpanded(false)
    setTimeout(() => {
      setVisible(false)
      if (onClose) onClose()
    }, 300)
  }

  if (!visible) return null

  const getBubbleStyle = () => {
    switch (type) {
      case "tip":
        return {
          background: "linear-gradient(135deg, #a9def5 0%, #7fd6f7 100%)",
          color: "#333",
        }
      case "suggestion":
        return {
          background: "linear-gradient(135deg, #d4a5ff 0%, #b57dff 100%)",
          color: "#fff",
        }
      default:
        return {
          background: "linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)",
          color: "#fff",
        }
    }
  }

  const getIcon = () => {
    switch (type) {
      case "tip":
        return <LightbulbIcon />
      case "suggestion":
        return <SmartToyIcon />
      default:
        return <SmartToyIcon />
    }
  }

  return (
    <Fade in={visible}>
      <Box
        sx={{
          position: "fixed",
          bottom: 80,
          right: 20,
          zIndex: 1000,
          maxWidth: 350,
          direction: "rtl",
        }}
      >
        <Collapse in={expanded} timeout={300}>
          <Paper
            elevation={6}
            sx={{
              p: 2,
              borderRadius: 3,
              ...getBubbleStyle(),
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
              animation: `${pulse} 2s infinite`,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
              <Box
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.3)",
                  borderRadius: "50%",
                  p: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {getIcon()}
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body1" fontWeight="medium">
                  {message}
                </Typography>
              </Box>
              <IconButton
                size="small"
                onClick={handleClose}
                sx={{
                  color: "inherit",
                  opacity: 0.7,
                  "&:hover": { opacity: 1 },
                  mt: -1,
                  mr: -1,
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          </Paper>
        </Collapse>
      </Box>
    </Fade>
  )
}

export default AIChatBubble
