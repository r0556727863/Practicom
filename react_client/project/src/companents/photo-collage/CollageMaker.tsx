"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Grid, Typography, Button } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import SaveIcon from "@mui/icons-material/Save"
import CollageCanvas from "./CollageCanvas"
import CollageControls from "./CollageControls"
import { collageStyles } from "../../styles/collage.styles"

interface CollageMakerProps {
  open: boolean
  onClose: () => void
  imageUrl: string
  onSaveCollage: (collageDataUrl: string) => void
}

export type CollageLayout = "original" | "split2" | "split4" | "polaroid" | "frame" | "heart" | "circle" | "star"

// קומפוננטה ראשית לעורך קולאז' - 35 שורות
const CollageMaker: React.FC<CollageMakerProps> = ({ open, onClose, imageUrl, onSaveCollage }) => {
  const [layout, setLayout] = useState<CollageLayout>("original")
  const [borderWidth, setBorderWidth] = useState<number>(5)
  const [borderColor, setBorderColor] = useState<string>("#00d4ff")
  const [backgroundColor, setBackgroundColor] = useState<string>("transparent")
  const [polaroidText, setPolaroidText] = useState<string>("התמונה שלי")
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    if (!imageUrl) return
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = imageUrl
    img.onload = () => {
      imageRef.current = img
    }
  }, [imageUrl])

  const handleSave = () => {
    if (previewUrl) {
      onSaveCollage(previewUrl)
      onClose()
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth PaperProps={{ sx: collageStyles.dialog }}>
      <DialogTitle sx={collageStyles.dialogTitle}>
        <Typography variant="h6" component="div">
          עורך קולאז' מתקדם
        </Typography>
        <IconButton aria-label="close" onClick={onClose} sx={collageStyles.closeButton}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={collageStyles.dialogContent}>
        <Grid container spacing={4}>
          <Grid>
            <CollageCanvas
              canvasRef={canvasRef}
              imageRef={imageRef}
              layout={layout}
              borderWidth={borderWidth}
              borderColor={borderColor}
              backgroundColor={backgroundColor}
              polaroidText={polaroidText}
              onPreviewUpdate={setPreviewUrl}
            />
          </Grid>
          <Grid>
            <CollageControls
              layout={layout}
              setLayout={setLayout}
              borderWidth={borderWidth}
              setBorderWidth={setBorderWidth}
              borderColor={borderColor}
              setBorderColor={setBorderColor}
              backgroundColor={backgroundColor}
              setBackgroundColor={setBackgroundColor}
              polaroidText={polaroidText}
              setPolaroidText={setPolaroidText}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={collageStyles.dialogActions}>
        <Button onClick={onClose} sx={collageStyles.cancelButton}>
          ביטול
        </Button>
        <Button onClick={handleSave} variant="contained" startIcon={<SaveIcon />} sx={collageStyles.saveButton}>
          שמור קולאז'
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CollageMaker
