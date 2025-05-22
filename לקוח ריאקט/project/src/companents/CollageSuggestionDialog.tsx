"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Grid,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import SaveIcon from "@mui/icons-material/Save"

interface SimpleCollageMakerProps {
  open: boolean
  onClose: () => void
  imageUrl: string
  onSaveCollage: (collageDataUrl: string) => void
}

type CollageLayout = "original" | "split2" | "split4" | "polaroid" | "frame" | "heart" | "circle" | "star"

const SimpleCollageMaker: React.FC<SimpleCollageMakerProps> = ({ open, onClose, imageUrl, onSaveCollage }) => {
  const [layout, setLayout] = useState<CollageLayout>("original")
  const [borderWidth, setBorderWidth] = useState<number>(5) // מסגרת צרה יותר כברירת מחדל
  const [borderColor, setBorderColor] = useState<string>("#ff5252")
  const [backgroundColor, setBackgroundColor] = useState<string>("#ffffff")
  const [polaroidText, setPolaroidText] = useState<string>("My Photo")
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)

  // טען את התמונה כשהקומפוננטה נטענת או כשה-URL משתנה
  useEffect(() => {
    if (!imageUrl) return

    const img = new Image()
    img.crossOrigin = "anonymous" // חשוב למניעת שגיאות CORS
    img.src = imageUrl
    img.onload = () => {
      imageRef.current = img
      renderCollage()
    }
  }, [imageUrl])

  // רנדר מחדש כשמשתנים הפרמטרים
  useEffect(() => {
    if (imageRef.current) {
      renderCollage()
    }
  }, [layout, borderWidth, borderColor, backgroundColor, polaroidText])

  const renderCollage = () => {
    const canvas = canvasRef.current
    if (!canvas || !imageRef.current) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const img = imageRef.current

    // קבע גודל קנבס קבוע
    const canvasWidth = 600
    const canvasHeight = 600

    canvas.width = canvasWidth
    canvas.height = canvasHeight

    // נקה את הקנבס
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    // צבע רקע
    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    // חשב את היחס של התמונה המקורית
    const imgRatio = img.width / img.height

    // פונקציה לציור תמונה תוך שמירה על היחס המקורי
    const drawImageMaintainAspect = (x: number, y: number, width: number, height: number) => {
      let drawWidth = width
      let drawHeight = height
      let offsetX = 0
      let offsetY = 0

      // חשב את הגודל החדש תוך שמירה על היחס
      if (width / height > imgRatio) {
        // אם המסגרת רחבה יותר מהתמונה
        drawWidth = height * imgRatio
        offsetX = (width - drawWidth) / 2
      } else {
        // אם המסגרת גבוהה יותר מהתמונה
        drawHeight = width / imgRatio
        offsetY = (height - drawHeight) / 2
      }

      ctx.drawImage(img, x + offsetX, y + offsetY, drawWidth, drawHeight)
    }

    // פונקציה לציור צורת לב
    const drawHeart = (x: number, y: number, width: number, height: number) => {
      ctx.save()
      ctx.beginPath()

      const topCurveHeight = height * 0.3

      // ציור הלב
      ctx.moveTo(x + width / 2, y + height)
      ctx.bezierCurveTo(x, y + height * 0.7, x, y, x + width / 2, y + topCurveHeight)
      ctx.bezierCurveTo(x + width, y, x + width, y + height * 0.7, x + width / 2, y + height)

      ctx.closePath()
      ctx.clip()

      // צייר את התמונה בתוך הלב
      drawImageMaintainAspect(x, y, width, height)

      ctx.restore()
    }

    // פונקציה לציור עיגול
    const drawCircle = (x: number, y: number, radius: number) => {
      ctx.save()
      ctx.beginPath()
      ctx.arc(x + radius, y + radius, radius, 0, Math.PI * 2)
      ctx.closePath()
      ctx.clip()

      // צייר את התמונה בתוך העיגול
      drawImageMaintainAspect(x, y, radius * 2, radius * 2)

      ctx.restore()
    }

    // פונקציה לציור כוכב
    const drawStar = (x: number, y: number, width: number, height: number) => {
      ctx.save()
      ctx.beginPath()

      const centerX = x + width / 2
      const centerY = y + height / 2
      const outerRadius = Math.min(width, height) / 2
      const innerRadius = outerRadius / 2.5
      const spikes = 5

      let rot = (Math.PI / 2) * 3
      const step = Math.PI / spikes

      ctx.moveTo(centerX, centerY - outerRadius)

      for (let i = 0; i < spikes; i++) {
        ctx.lineTo(centerX + Math.cos(rot) * outerRadius, centerY + Math.sin(rot) * outerRadius)
        rot += step
        ctx.lineTo(centerX + Math.cos(rot) * innerRadius, centerY + Math.sin(rot) * innerRadius)
        rot += step
      }

      ctx.lineTo(centerX, centerY - outerRadius)
      ctx.closePath()
      ctx.clip()

      // צייר את התמונה בתוך הכוכב
      drawImageMaintainAspect(x, y, width, height)

      ctx.restore()
    }

    // צייר לפי הפריסה שנבחרה
    switch (layout) {
      case "original":
        // תמונה מקורית - במרכז עם רקע
        const originalSize = Math.min(canvasWidth, canvasHeight) * 0.8
        const originalX = (canvasWidth - originalSize) / 2
        const originalY = (canvasHeight - originalSize) / 2

        // צייר את התמונה
        drawImageMaintainAspect(originalX, originalY, originalSize, originalSize)
        break

      case "split2":
        // חלוקה לשניים עם מסגרת מסביב לכל תמונה בנפרד
        const halfWidth = (canvasWidth - borderWidth * 6) / 2
        const halfHeight = canvasHeight * 0.7
        const halfY = (canvasHeight - halfHeight) / 2

        // תמונה שמאלית עם מסגרת
        ctx.fillStyle = borderColor
        ctx.fillRect(
          canvasWidth * 0.2 - borderWidth,
          halfY - borderWidth,
          halfWidth + borderWidth * 2,
          halfHeight + borderWidth * 2,
        )
        drawImageMaintainAspect(canvasWidth * 0.2, halfY, halfWidth, halfHeight)

        // תמונה ימנית עם מסגרת
        ctx.fillStyle = borderColor
        ctx.fillRect(
          canvasWidth * 0.8 - halfWidth - borderWidth,
          halfY - borderWidth,
          halfWidth + borderWidth * 2,
          halfHeight + borderWidth * 2,
        )
        drawImageMaintainAspect(canvasWidth * 0.8 - halfWidth, halfY, halfWidth, halfHeight)
        break

      case "split4":
        // חלוקה לארבע עם מסגרת מסביב לכל תמונה בנפרד
        const quarterSize = canvasWidth * 0.35
        const margin = (canvasWidth - quarterSize * 2) / 3

        // צייר את הרקע
        ctx.fillStyle = backgroundColor
        ctx.fillRect(0, 0, canvasWidth, canvasHeight)

        // תמונה שמאלית עליונה עם מסגרת
        ctx.fillStyle = borderColor
        ctx.fillRect(
          margin - borderWidth,
          margin - borderWidth,
          quarterSize + borderWidth * 2,
          quarterSize + borderWidth * 2,
        )
        drawImageMaintainAspect(margin, margin, quarterSize, quarterSize)

        // תמונה ימנית עליונה עם מסגרת
        ctx.fillStyle = borderColor
        ctx.fillRect(
          margin * 2 + quarterSize - borderWidth,
          margin - borderWidth,
          quarterSize + borderWidth * 2,
          quarterSize + borderWidth * 2,
        )
        drawImageMaintainAspect(margin * 2 + quarterSize, margin, quarterSize, quarterSize)

        // תמונה שמאלית תחתונה עם מסגרת
        ctx.fillStyle = borderColor
        ctx.fillRect(
          margin - borderWidth,
          margin * 2 + quarterSize - borderWidth,
          quarterSize + borderWidth * 2,
          quarterSize + borderWidth * 2,
        )
        drawImageMaintainAspect(margin, margin * 2 + quarterSize, quarterSize, quarterSize)

        // תמונה ימנית תחתונה עם מסגרת
        ctx.fillStyle = borderColor
        ctx.fillRect(
          margin * 2 + quarterSize - borderWidth,
          margin * 2 + quarterSize - borderWidth,
          quarterSize + borderWidth * 2,
          quarterSize + borderWidth * 2,
        )
        drawImageMaintainAspect(margin * 2 + quarterSize, margin * 2 + quarterSize, quarterSize, quarterSize)
        break

      case "polaroid":
        // אפקט פולארויד
        const polaroidWidth = canvasWidth * 0.7
        const polaroidHeight = polaroidWidth * 1.2
        const polaroidX = (canvasWidth - polaroidWidth) / 2
        const polaroidY = (canvasHeight - polaroidHeight) / 2
        const frameWidth = 20
        const bottomFrame = 60

        // מסגרת לבנה
        ctx.fillStyle = "#ffffff"
        ctx.fillRect(polaroidX, polaroidY, polaroidWidth, polaroidHeight)

        // צל קל למסגרת
        ctx.shadowColor = "rgba(0, 0, 0, 0.2)"
        ctx.shadowBlur = 10
        ctx.shadowOffsetX = 5
        ctx.shadowOffsetY = 5
        ctx.fillRect(polaroidX, polaroidY, polaroidWidth, polaroidHeight)
        ctx.shadowColor = "transparent"

        // התמונה עצמה
        const polaroidImgWidth = polaroidWidth - frameWidth * 2
        const polaroidImgHeight = polaroidHeight - frameWidth - bottomFrame

        drawImageMaintainAspect(polaroidX + frameWidth, polaroidY + frameWidth, polaroidImgWidth, polaroidImgHeight)

        // הוסף טקסט בתחתית הפולארויד
        ctx.font = "24px Arial"
        ctx.fillStyle = "#333"
        ctx.textAlign = "center"
        ctx.fillText(polaroidText, polaroidX + polaroidWidth / 2, polaroidY + polaroidHeight - 20)
        break

      case "frame":
        // מסגרת פשוטה צמודה לתמונה
        const frameSize = Math.min(canvasWidth, canvasHeight) * 0.7
        const frameX = (canvasWidth - frameSize) / 2
        const frameY = (canvasHeight - frameSize) / 2

        // צייר את המסגרת
        ctx.fillStyle = borderColor
        ctx.fillRect(
          frameX - borderWidth,
          frameY - borderWidth,
          frameSize + borderWidth * 2,
          frameSize + borderWidth * 2,
        )

        // התמונה
        drawImageMaintainAspect(frameX, frameY, frameSize, frameSize)
        break

      case "heart":
        // קולאז' בצורת לב
        const heartSize = Math.min(canvasWidth, canvasHeight) * 0.7
        const heartX = (canvasWidth - heartSize) / 2
        const heartY = (canvasHeight - heartSize) / 2

        // צייר את המסגרת בצורת לב
        if (borderWidth > 0) {
          ctx.fillStyle = borderColor
          ctx.beginPath()

          const x = heartX - borderWidth
          const y = heartY - borderWidth
          const width = heartSize + borderWidth * 2
          const height = heartSize + borderWidth * 2
          const topCurveHeight = height * 0.3

          ctx.moveTo(x + width / 2, y + height)
          ctx.bezierCurveTo(x, y + height * 0.7, x, y, x + width / 2, y + topCurveHeight)
          ctx.bezierCurveTo(x + width, y, x + width, y + height * 0.7, x + width / 2, y + height)

          ctx.closePath()
          ctx.fill()
        }

        // צייר את התמונה בצורת לב
        drawHeart(heartX, heartY, heartSize, heartSize)
        break

      case "circle":
        // קולאז' בצורת עיגול
        const circleSize = Math.min(canvasWidth, canvasHeight) * 0.7
        const circleX = (canvasWidth - circleSize) / 2
        const circleY = (canvasHeight - circleSize) / 2
        const radius = circleSize / 2

        // צייר את המסגרת בצורת עיגול
        if (borderWidth > 0) {
          ctx.fillStyle = borderColor
          ctx.beginPath()
          ctx.arc(circleX + radius, circleY + radius, radius + borderWidth, 0, Math.PI * 2)
          ctx.closePath()
          ctx.fill()
        }

        // צייר את התמונה בצורת עיגול
        drawCircle(circleX, circleY, radius)
        break

      case "star":
        // קולאז' בצורת כוכב
        const starSize = Math.min(canvasWidth, canvasHeight) * 0.7
        const starX = (canvasWidth - starSize) / 2
        const starY = (canvasHeight - starSize) / 2

        // צייר את המסגרת בצורת כוכב
        if (borderWidth > 0) {
          ctx.fillStyle = borderColor

          const centerX = canvasWidth / 2
          const centerY = canvasHeight / 2
          const outerRadius = starSize / 2 + borderWidth
          const innerRadius = outerRadius / 2.5
          const spikes = 5

          ctx.beginPath()
          let rot = (Math.PI / 2) * 3
          const step = Math.PI / spikes

          ctx.moveTo(centerX, centerY - outerRadius)

          for (let i = 0; i < spikes; i++) {
            ctx.lineTo(centerX + Math.cos(rot) * outerRadius, centerY + Math.sin(rot) * outerRadius)
            rot += step
            ctx.lineTo(centerX + Math.cos(rot) * innerRadius, centerY + Math.sin(rot) * innerRadius)
            rot += step
          }

          ctx.lineTo(centerX, centerY - outerRadius)
          ctx.closePath()
          ctx.fill()
        }

        // צייר את התמונה בצורת כוכב
        drawStar(starX, starY, starSize, starSize)
        break
    }

    // שמור את התוצאה כ-URL
    setPreviewUrl(canvas.toDataURL("image/jpeg"))
  }

  const handleSave = () => {
    if (previewUrl) {
      onSaveCollage(previewUrl)
      onClose()
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ borderBottom: "1px solid #eee", padding: "16px 24px" }}>
        <Typography variant="h6" component="div">
          עורך קולאז' פשוט
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ padding: "24px" }}>
        <Grid container spacing={3}>
          <Grid >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mb: 2,
                border: "1px solid #ddd",
                borderRadius: 1,
                p: 2,
                height: 400,
                overflow: "hidden",
                backgroundColor: "#f5f5f5",
              }}
            >
              <canvas ref={canvasRef} style={{ maxWidth: "100%", maxHeight: "100%", display: "block" }} />
            </Box>
          </Grid>

          <Grid >
            <FormControl fullWidth sx={{ mb: 3, mt: 2 }}>
              <InputLabel
                id="collage-style-label"
                sx={{
                  backgroundColor: "white",
                  px: 1,
                  top: "-8px",
                  "&.MuiInputLabel-shrink": {
                    top: "0px",
                  },
                }}
              >
                סגנון קולאז'
              </InputLabel>
              <Select
                labelId="collage-style-label"
                value={layout}
                onChange={(e) => setLayout(e.target.value as CollageLayout)}
                label="סגנון קולאז'"
              >
                <MenuItem value="original">תמונה מקורית</MenuItem>
                <MenuItem value="split2">חלוקה לשניים</MenuItem>
                <MenuItem value="split4">חלוקה לארבע</MenuItem>
                <MenuItem value="polaroid">פולארויד</MenuItem>
                <MenuItem value="frame">מסגרת</MenuItem>
                <MenuItem value="heart">צורת לב</MenuItem>
                <MenuItem value="circle">צורת עיגול</MenuItem>
                <MenuItem value="star">צורת כוכב</MenuItem>
              </Select>
            </FormControl>

            <Typography gutterBottom>עובי מסגרת</Typography>
            <Slider
              value={borderWidth}
              onChange={(_, value) => setBorderWidth(value as number)}
              min={0}
              max={30}
              valueLabelDisplay="auto"
              sx={{ mb: 3 }}
            />

            <Typography gutterBottom>צבע מסגרת</Typography>
            <Box sx={{ display: "flex", gap: 1, mb: 3, flexWrap: "wrap" }}>
              {[
                "#ff5252", // אדום בהיר
                "#2196f3", // כחול
                "#ff4081", // ורוד
                "#9c27b0", // סגול
                "#ffd600", // צהוב
                "#4caf50", // ירוק
                "#000000", // שחור
                "#ffffff", // לבן
              ].map((color) => (
                <Box
                  key={color}
                  onClick={() => setBorderColor(color)}
                  sx={{
                    width: 30,
                    height: 30,
                    backgroundColor: color,
                    border: borderColor === color ? "3px solid #333" : "1px solid #ddd",
                    borderRadius: "50%",
                    cursor: "pointer",
                  }}
                />
              ))}
            </Box>

            <Typography gutterBottom>צבע רקע</Typography>
            <Box sx={{ display: "flex", gap: 1, mb: 3, flexWrap: "wrap" }}>
              {[
                "#ffffff", // לבן
                "#f0f0f0", // אפור בהיר
                "#e3f2fd", // כחול בהיר
                "#fce4ec", // ורוד בהיר
                "#e8f5e9", // ירוק בהיר
                "#fff9c4", // צהוב בהיר
                "#000000", // שחור
                "#212121", // אפור כהה
              ].map((color) => (
                <Box
                  key={color}
                  onClick={() => setBackgroundColor(color)}
                  sx={{
                    width: 30,
                    height: 30,
                    backgroundColor: color,
                    border: backgroundColor === color ? "3px solid #333" : "1px solid #ddd",
                    borderRadius: "50%",
                    cursor: "pointer",
                  }}
                />
              ))}
            </Box>

            {layout === "polaroid" && (
              <TextField
                label="טקסט בפולארויד"
                fullWidth
                value={polaroidText}
                onChange={(e) => setPolaroidText(e.target.value)}
                sx={{ mb: 3 }}
              />
            )}
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 2, borderTop: "1px solid #eee" }}>
        <Button onClick={onClose} color="inherit">
          ביטול
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
          sx={{
            background: "linear-gradient(45deg, #ff5252 30%, #ff4081 90%)",
            boxShadow: "0 3px 5px 2px rgba(255, 82, 82, .3)",
          }}
        >
          שמור קולאז'
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SimpleCollageMaker
