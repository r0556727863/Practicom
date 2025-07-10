"use client"

import type React from "react"
import { useEffect } from "react"
import { Dialog, Backdrop, Box, IconButton } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import ZoomInIcon from "@mui/icons-material/ZoomIn"
import ZoomOutIcon from "@mui/icons-material/ZoomOut"
import RestartAltIcon from "@mui/icons-material/RestartAlt"
import DownloadIcon from "@mui/icons-material/Download"
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"

interface Image {
  photoId: number
  url: string
  title: string
  albumId: number
  userId: number
}

interface ImageLightboxProps {
  open: boolean
  onClose: () => void
  images: Image[]
  selectedImage: Image | null
  selectedImageIndex: number
  setSelectedImage: (image: Image) => void
  setSelectedImageIndex: (index: number) => void
  onDownloadImage: (image: Image) => void
  onOpenAIAnalyzer: (image: Image) => void
}

// קומפוננטת הלייטבוקס - כל הזום והניווט
const ImageLightbox: React.FC<ImageLightboxProps> = ({
  open,
  onClose,
  images,
  selectedImage,
  selectedImageIndex,
  setSelectedImage,
  setSelectedImageIndex,
  onDownloadImage,
  onOpenAIAnalyzer,
}) => {
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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (open) {
        if (event.key === "ArrowRight") {
          handleNextImage()
        } else if (event.key === "ArrowLeft") {
          handlePrevImage()
        } else if (event.key === "Escape") {
          onClose()
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [open, selectedImageIndex])

  return (
    <Dialog
      open={open}
      onClose={onClose}
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
      <Backdrop open={open} sx={{ backgroundColor: "rgba(24, 24, 24, 0.9)" }}>
        <Box
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "60%",
            height: "90%",
            p: 4,
            paddingLeft: 13,
          }}
        >
          {/* כפתור סגירה */}
          <IconButton
            sx={{
              position: "absolute",
              top: 16,
              right: 1,
              color: "white",
              background: "rgba(0,0,0,0.5)",
              "&:hover": { background: "rgba(0,0,0,0.7)" },
              zIndex: 3,
            }}
            onClick={onClose}
          >
            <CloseIcon sx={{ fontSize: 28 }} />
          </IconButton>

          {/* כפתור תמונה קודמת */}
          <IconButton
            sx={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              left: 1,
              color: "white",
              background: "rgba(0,0,0,0.5)",
              "&:hover": { background: "rgba(0,0,0,0.7)" },
              zIndex: 3,
            }}
            onClick={(e) => {
              e.stopPropagation()
              handlePrevImage()
            }}
          >
            <NavigateBeforeIcon sx={{ fontSize: 28 }} />
          </IconButton>

          {/* כפתור תמונה הבאה */}
          <IconButton
            sx={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              right: 1,
              color: "white",
              background: "rgba(0,0,0,0.5)",
              "&:hover": { background: "rgba(0,0,0,0.7)" },
              zIndex: 3,
            }}
            onClick={(e) => {
              e.stopPropagation()
              handleNextImage()
            }}
          >
            <NavigateNextIcon sx={{ fontSize: 28 }} />
          </IconButton>

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
                    onClick={() => selectedImage && onDownloadImage(selectedImage)}
                    size="small"
                    sx={{ color: "white", "&:hover": { background: "rgba(255, 255, 255, 0.1)" } }}
                    title="הורד תמונה"
                  >
                    <DownloadIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    onClick={() => selectedImage && onOpenAIAnalyzer(selectedImage)}
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
  )
}

export default ImageLightbox
