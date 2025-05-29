// import type React from "react"
// import { useState, useRef, useEffect } from "react"
// import {
//   Box,
//   Button,
//   Typography,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   IconButton,
//   Grid,
//   Slider,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   TextField,
// } from "@mui/material"
// import CloseIcon from "@mui/icons-material/Close"
// import SaveIcon from "@mui/icons-material/Save"

// interface SimpleCollageMakerProps {
//   open: boolean
//   onClose: () => void
//   imageUrl: string
//   onSaveCollage: (collageDataUrl: string) => void
// }

// type CollageLayout = "original" | "split2" | "split4" | "polaroid" | "frame" | "heart" | "circle" | "star"

// const SimpleCollageMaker: React.FC<SimpleCollageMakerProps> = ({ open, onClose, imageUrl, onSaveCollage }) => {
//   const [layout, setLayout] = useState<CollageLayout>("original")
//   const [borderWidth, setBorderWidth] = useState<number>(5)
//   const [borderColor, setBorderColor] = useState<string>("#00d4ff")
//   const [backgroundColor, setBackgroundColor] = useState<string>("#ffffff")
//   const [polaroidText, setPolaroidText] = useState<string>("My Photo")
//   const canvasRef = useRef<HTMLCanvasElement>(null)
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null)
//   const imageRef = useRef<HTMLImageElement | null>(null)

//   useEffect(() => {
//     if (!imageUrl) return

//     const img = new Image()
//     img.crossOrigin = "anonymous"
//     img.src = imageUrl
//     img.onload = () => {
//       imageRef.current = img
//       renderCollage()
//     }
//   }, [imageUrl])

//   useEffect(() => {
//     if (imageRef.current) {
//       renderCollage()
//     }
//   }, [layout, borderWidth, borderColor, backgroundColor, polaroidText])

//   const renderCollage = () => {
//     const canvas = canvasRef.current
//     if (!canvas || !imageRef.current) return

//     const ctx = canvas.getContext("2d")
//     if (!ctx) return

//     const img = imageRef.current
//     const canvasWidth = 600
//     const canvasHeight = 600

//     canvas.width = canvasWidth
//     canvas.height = canvasHeight

//     ctx.clearRect(0, 0, canvasWidth, canvasHeight)
//     ctx.fillStyle = backgroundColor
//     ctx.fillRect(0, 0, canvasWidth, canvasHeight)

//     const imgRatio = img.width / img.height

//     const drawImageMaintainAspect = (x: number, y: number, width: number, height: number) => {
//       let drawWidth = width
//       let drawHeight = height
//       let offsetX = 0
//       let offsetY = 0

//       if (width / height > imgRatio) {
//         drawWidth = height * imgRatio
//         offsetX = (width - drawWidth) / 2
//       } else {
//         drawHeight = width / imgRatio
//         offsetY = (height - drawHeight) / 2
//       }

//       ctx.drawImage(img, x + offsetX, y + offsetY, drawWidth, drawHeight)
//     }

//     const drawHeart = (x: number, y: number, width: number, height: number) => {
//       ctx.save()
//       ctx.beginPath()

//       const topCurveHeight = height * 0.3

//       ctx.moveTo(x + width / 2, y + height)
//       ctx.bezierCurveTo(x, y + height * 0.7, x, y, x + width / 2, y + topCurveHeight)
//       ctx.bezierCurveTo(x + width, y, x + width, y + height * 0.7, x + width / 2, y + height)

//       ctx.closePath()
//       ctx.clip()

//       drawImageMaintainAspect(x, y, width, height)

//       ctx.restore()
//     }

//     const drawCircle = (x: number, y: number, radius: number) => {
//       ctx.save()
//       ctx.beginPath()
//       ctx.arc(x + radius, y + radius, radius, 0, Math.PI * 2)
//       ctx.closePath()
//       ctx.clip()

//       drawImageMaintainAspect(x, y, radius * 2, radius * 2)

//       ctx.restore()
//     }

//     const drawStar = (x: number, y: number, width: number, height: number) => {
//       ctx.save()
//       ctx.beginPath()

//       const centerX = x + width / 2
//       const centerY = y + height / 2
//       const outerRadius = Math.min(width, height) / 2
//       const innerRadius = outerRadius / 2.5
//       const spikes = 5

//       let rot = (Math.PI / 2) * 3
//       const step = Math.PI / spikes

//       ctx.moveTo(centerX, centerY - outerRadius)

//       for (let i = 0; i < spikes; i++) {
//         ctx.lineTo(centerX + Math.cos(rot) * outerRadius, centerY + Math.sin(rot) * outerRadius)
//         rot += step
//         ctx.lineTo(centerX + Math.cos(rot) * innerRadius, centerY + Math.sin(rot) * innerRadius)
//         rot += step
//       }

//       ctx.lineTo(centerX, centerY - outerRadius)
//       ctx.closePath()
//       ctx.clip()

//       drawImageMaintainAspect(x, y, width, height)

//       ctx.restore()
//     }

//     switch (layout) {
//       case "original":
//         const originalSize = Math.min(canvasWidth, canvasHeight) * 0.8
//         const originalX = (canvasWidth - originalSize) / 2
//         const originalY = (canvasHeight - originalSize) / 2
//         drawImageMaintainAspect(originalX, originalY, originalSize, originalSize)
//         break

//       case "split2":
//         const halfWidth = (canvasWidth - borderWidth * 6) / 2
//         const halfHeight = canvasHeight * 0.7
//         const halfY = (canvasHeight - halfHeight) / 2

//         ctx.fillStyle = borderColor
//         ctx.fillRect(
//           canvasWidth * 0.2 - borderWidth,
//           halfY - borderWidth,
//           halfWidth + borderWidth * 2,
//           halfHeight + borderWidth * 2,
//         )
//         drawImageMaintainAspect(canvasWidth * 0.2, halfY, halfWidth, halfHeight)

//         ctx.fillStyle = borderColor
//         ctx.fillRect(
//           canvasWidth * 0.8 - halfWidth - borderWidth,
//           halfY - borderWidth,
//           halfWidth + borderWidth * 2,
//           halfHeight + borderWidth * 2,
//         )
//         drawImageMaintainAspect(canvasWidth * 0.8 - halfWidth, halfY, halfWidth, halfHeight)
//         break

//       case "split4":
//         const quarterSize = canvasWidth * 0.35
//         const margin = (canvasWidth - quarterSize * 2) / 3

//         ctx.fillStyle = backgroundColor
//         ctx.fillRect(0, 0, canvasWidth, canvasHeight)

//         ctx.fillStyle = borderColor
//         ctx.fillRect(
//           margin - borderWidth,
//           margin - borderWidth,
//           quarterSize + borderWidth * 2,
//           quarterSize + borderWidth * 2,
//         )
//         drawImageMaintainAspect(margin, margin, quarterSize, quarterSize)

//         ctx.fillStyle = borderColor
//         ctx.fillRect(
//           margin * 2 + quarterSize - borderWidth,
//           margin - borderWidth,
//           quarterSize + borderWidth * 2,
//           quarterSize + borderWidth * 2,
//         )
//         drawImageMaintainAspect(margin * 2 + quarterSize, margin, quarterSize, quarterSize)

//         ctx.fillStyle = borderColor
//         ctx.fillRect(
//           margin - borderWidth,
//           margin * 2 + quarterSize - borderWidth,
//           quarterSize + borderWidth * 2,
//           quarterSize + borderWidth * 2,
//         )
//         drawImageMaintainAspect(margin, margin * 2 + quarterSize, quarterSize, quarterSize)

//         ctx.fillStyle = borderColor
//         ctx.fillRect(
//           margin * 2 + quarterSize - borderWidth,
//           margin * 2 + quarterSize - borderWidth,
//           quarterSize + borderWidth * 2,
//           quarterSize + borderWidth * 2,
//         )
//         drawImageMaintainAspect(margin * 2 + quarterSize, margin * 2 + quarterSize, quarterSize, quarterSize)
//         break

//       case "polaroid":
//         const polaroidWidth = canvasWidth * 0.7
//         const polaroidHeight = polaroidWidth * 1.2
//         const polaroidX = (canvasWidth - polaroidWidth) / 2
//         const polaroidY = (canvasHeight - polaroidHeight) / 2
//         const frameWidth = 20
//         const bottomFrame = 60

//         ctx.fillStyle = "#ffffff"
//         ctx.fillRect(polaroidX, polaroidY, polaroidWidth, polaroidHeight)

//         ctx.shadowColor = "rgba(0, 0, 0, 0.2)"
//         ctx.shadowBlur = 10
//         ctx.shadowOffsetX = 5
//         ctx.shadowOffsetY = 5
//         ctx.fillRect(polaroidX, polaroidY, polaroidWidth, polaroidHeight)
//         ctx.shadowColor = "transparent"

//         const polaroidImgWidth = polaroidWidth - frameWidth * 2
//         const polaroidImgHeight = polaroidHeight - frameWidth - bottomFrame

//         drawImageMaintainAspect(polaroidX + frameWidth, polaroidY + frameWidth, polaroidImgWidth, polaroidImgHeight)

//         ctx.font = "24px Arial"
//         ctx.fillStyle = "#333"
//         ctx.textAlign = "center"
//         ctx.fillText(polaroidText, polaroidX + polaroidWidth / 2, polaroidY + polaroidHeight - 20)
//         break

//       case "frame":
//         const frameSize = Math.min(canvasWidth, canvasHeight) * 0.7
//         const frameX = (canvasWidth - frameSize) / 2
//         const frameY = (canvasHeight - frameSize) / 2

//         ctx.fillStyle = borderColor
//         ctx.fillRect(
//           frameX - borderWidth,
//           frameY - borderWidth,
//           frameSize + borderWidth * 2,
//           frameSize + borderWidth * 2,
//         )

//         drawImageMaintainAspect(frameX, frameY, frameSize, frameSize)
//         break

//       case "heart":
//         const heartSize = Math.min(canvasWidth, canvasHeight) * 0.7
//         const heartX = (canvasWidth - heartSize) / 2
//         const heartY = (canvasHeight - heartSize) / 2

//         if (borderWidth > 0) {
//           ctx.fillStyle = borderColor
//           ctx.beginPath()

//           const x = heartX - borderWidth
//           const y = heartY - borderWidth
//           const width = heartSize + borderWidth * 2
//           const height = heartSize + borderWidth * 2
//           const topCurveHeight = height * 0.3

//           ctx.moveTo(x + width / 2, y + height)
//           ctx.bezierCurveTo(x, y + height * 0.7, x, y, x + width / 2, y + topCurveHeight)
//           ctx.bezierCurveTo(x + width, y, x + width, y + height * 0.7, x + width / 2, y + height)

//           ctx.closePath()
//           ctx.fill()
//         }

//         drawHeart(heartX, heartY, heartSize, heartSize)
//         break

//       case "circle":
//         const circleSize = Math.min(canvasWidth, canvasHeight) * 0.7
//         const circleX = (canvasWidth - circleSize) / 2
//         const circleY = (canvasHeight - circleSize) / 2
//         const radius = circleSize / 2

//         if (borderWidth > 0) {
//           ctx.fillStyle = borderColor
//           ctx.beginPath()
//           ctx.arc(circleX + radius, circleY + radius, radius + borderWidth, 0, Math.PI * 2)
//           ctx.closePath()
//           ctx.fill()
//         }

//         drawCircle(circleX, circleY, radius)
//         break

//       case "star":
//         const starSize = Math.min(canvasWidth, canvasHeight) * 0.7
//         const starX = (canvasWidth - starSize) / 2
//         const starY = (canvasHeight - starSize) / 2

//         if (borderWidth > 0) {
//           ctx.fillStyle = borderColor

//           const centerX = canvasWidth / 2
//           const centerY = canvasHeight / 2
//           const outerRadius = starSize / 2 + borderWidth
//           const innerRadius = outerRadius / 2.5
//           const spikes = 5

//           ctx.beginPath()
//           let rot = (Math.PI / 2) * 3
//           const step = Math.PI / spikes

//           ctx.moveTo(centerX, centerY - outerRadius)

//           for (let i = 0; i < spikes; i++) {
//             ctx.lineTo(centerX + Math.cos(rot) * outerRadius, centerY + Math.sin(rot) * outerRadius)
//             rot += step
//             ctx.lineTo(centerX + Math.cos(rot) * innerRadius, centerY + Math.sin(rot) * innerRadius)
//             rot += step
//           }

//           ctx.lineTo(centerX, centerY - outerRadius)
//           ctx.closePath()
//           ctx.fill()
//         }

//         drawStar(starX, starY, starSize, starSize)
//         break
//     }

//     setPreviewUrl(canvas.toDataURL("image/jpeg"))
//   }

//   const handleSave = () => {
//     if (previewUrl) {
//       onSaveCollage(previewUrl)
//       onClose()
//     }
//   }

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       maxWidth="md"
//       fullWidth
//       PaperProps={{
//         sx: {
//           borderRadius: 25,
//           background: "rgba(255, 255, 255, 0.08)",
//           backdropFilter: "blur(30px)",
//           border: "1px solid rgba(255, 255, 255, 0.15)",
//           boxShadow: "0 25px 80px rgba(0, 0, 0, 0.3)",
//         },
//       }}
//     >
//       <DialogTitle
//         sx={{
//           background: "linear-gradient(135deg, #00d4ff 0%, #9c27b0 50%, #ff6ec7 100%)",
//           color: "white",
//           position: "relative",
//           textAlign: "center",
//           py: 3,
//         }}
//       >
//         <Typography variant="h6" component="div">
//           עורך קולאז' מתקדם
//         </Typography>
//         <IconButton
//           aria-label="close"
//           onClick={onClose}
//           sx={{
//             position: "absolute",
//             right: 16,
//             top: "50%",
//             transform: "translateY(-50%)",
//             color: "white",
//             background: "rgba(255, 255, 255, 0.1)",
//             "&:hover": {
//               background: "rgba(255, 255, 255, 0.2)",
//               transform: "translateY(-50%) scale(1.1)",
//             },
//           }}
//         >
//           <CloseIcon />
//         </IconButton>
//       </DialogTitle>

//       <DialogContent sx={{ padding: "24px", background: "rgba(255, 255, 255, 0.02)" }}>
//         <Grid container spacing={3}>
//           <Grid >
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 mb: 2,
//                 borderRadius: 20,
//                 p: 2,
//                 height: 400,
//                 overflow: "hidden",
//                 background: "rgba(255, 255, 255, 0.05)",
//                 backdropFilter: "blur(20px)",
//                 border: "1px solid rgba(255, 255, 255, 0.1)",
//               }}
//             >
//               <canvas
//                 ref={canvasRef}
//                 style={{ maxWidth: "100%", maxHeight: "100%", display: "block", borderRadius: "15px" }}
//               />
//             </Box>
//           </Grid>

//           <Grid  >
//             <FormControl fullWidth sx={{ mb: 3, mt: 2 }}>
//               <InputLabel
//                 sx={{
//                   color: "rgba(255, 255, 255, 0.7)",
//                   "&.Mui-focused": { color: "#00d4ff" },
//                 }}
//               >
//                 סגנון קולאז'
//               </InputLabel>
//               <Select
//                 value={layout}
//                 onChange={(e) => setLayout(e.target.value as CollageLayout)}
//                 label="סגנון קולאז'"
//                 sx={{
//                   borderRadius: 15,
//                   backgroundColor: "rgba(255, 255, 255, 0.08)",
//                   color: "white",
//                   "& .MuiOutlinedInput-notchedOutline": {
//                     borderColor: "rgba(255, 255, 255, 0.15)",
//                   },
//                   "&:hover .MuiOutlinedInput-notchedOutline": {
//                     borderColor: "#00d4ff",
//                   },
//                   "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//                     borderColor: "#00d4ff",
//                   },
//                 }}
//               >
//                 <MenuItem value="original">תמונה מקורית</MenuItem>
//                 <MenuItem value="split2">חלוקה לשניים</MenuItem>
//                 <MenuItem value="split4">חלוקה לארבע</MenuItem>
//                 <MenuItem value="polaroid">פולארויד</MenuItem>
//                 <MenuItem value="frame">מסגרת</MenuItem>
//                 <MenuItem value="heart">צורת לב</MenuItem>
//                 <MenuItem value="circle">צורת עיגול</MenuItem>
//                 <MenuItem value="star">צורת כוכב</MenuItem>
//               </Select>
//             </FormControl>

//             <Typography gutterBottom sx={{ color: "white", mb: 1 }}>
//               עובי מסגרת
//             </Typography>
//             <Slider
//               value={borderWidth}
//               onChange={(_, value) => setBorderWidth(value as number)}
//               min={0}
//               max={30}
//               valueLabelDisplay="auto"
//               sx={{
//                 mb: 3,
//                 color: "#00d4ff",
//                 "& .MuiSlider-thumb": {
//                   background: "linear-gradient(135deg, #00d4ff 0%, #ff6ec7 100%)",
//                 },
//                 "& .MuiSlider-track": {
//                   background: "linear-gradient(135deg, #00d4ff 0%, #ff6ec7 100%)",
//                 },
//               }}
//             />

//             <Typography gutterBottom sx={{ color: "white", mb: 1 }}>
//               צבע מסגרת
//             </Typography>
//             <Box sx={{ display: "flex", gap: 1, mb: 3, flexWrap: "wrap" }}>
//               {[
//                 "#00d4ff", // ציאן
//                 "#9c27b0", // סגול
//                 "#ff6ec7", // ורוד
//                 "#ff5252", // אדום
//                 "#ffd600", // צהוב
//                 "#4caf50", // ירוק
//                 "#000000", // שחור
//                 "#ffffff", // לבן
//               ].map((color) => (
//                 <Box
//                   key={color}
//                   onClick={() => setBorderColor(color)}
//                   sx={{
//                     width: 30,
//                     height: 30,
//                     backgroundColor: color,
//                     border: borderColor === color ? "3px solid #00d4ff" : "1px solid rgba(255,255,255,0.3)",
//                     borderRadius: "50%",
//                     cursor: "pointer",
//                     transition: "all 0.3s ease",
//                     "&:hover": {
//                       transform: "scale(1.1)",
//                       boxShadow: "0 4px 15px rgba(0, 212, 255, 0.3)",
//                     },
//                   }}
//                 />
//               ))}
//             </Box>

//             <Typography gutterBottom sx={{ color: "white", mb: 1 }}>
//               צבע רקע
//             </Typography>
//             <Box sx={{ display: "flex", gap: 1, mb: 3, flexWrap: "wrap" }}>
//               {[
//                 "#ffffff", // לבן
//                 "#f0f0f0", // אפור בהיר
//                 "#e3f2fd", // כחול בהיר
//                 "#fce4ec", // ורוד בהיר
//                 "#e8f5e9", // ירוק בהיר
//                 "#fff9c4", // צהוב בהיר
//                 "#000000", // שחור
//                 "#212121", // אפור כהה
//               ].map((color) => (
//                 <Box
//                   key={color}
//                   onClick={() => setBackgroundColor(color)}
//                   sx={{
//                     width: 30,
//                     height: 30,
//                     backgroundColor: color,
//                     border: backgroundColor === color ? "3px solid #00d4ff" : "1px solid rgba(255,255,255,0.3)",
//                     borderRadius: "50%",
//                     cursor: "pointer",
//                     transition: "all 0.3s ease",
//                     "&:hover": {
//                       transform: "scale(1.1)",
//                       boxShadow: "0 4px 15px rgba(0, 212, 255, 0.3)",
//                     },
//                   }}
//                 />
//               ))}
//             </Box>

//             {layout === "polaroid" && (
//               <TextField
//                 label="טקסט בפולארויד"
//                 fullWidth
//                 value={polaroidText}
//                 onChange={(e) => setPolaroidText(e.target.value)}
//                 sx={{
//                   mb: 3,
//                   "& .MuiOutlinedInput-root": {
//                     borderRadius: 15,
//                     backgroundColor: "rgba(255, 255, 255, 0.08)",
//                     color: "white",
//                     "& fieldset": {
//                       borderColor: "rgba(255, 255, 255, 0.15)",
//                     },
//                     "&:hover fieldset": {
//                       borderColor: "#00d4ff",
//                     },
//                     "&.Mui-focused fieldset": {
//                       borderColor: "#00d4ff",
//                     },
//                   },
//                   "& .MuiInputLabel-root": {
//                     color: "rgba(255, 255, 255, 0.7)",
//                     "&.Mui-focused": {
//                       color: "#00d4ff",
//                     },
//                   },
//                 }}
//               />
//             )}
//           </Grid>
//         </Grid>
//       </DialogContent>

//       <DialogActions
//         sx={{
//           p: 3,
//           background: "rgba(255, 255, 255, 0.05)",
//           borderTop: "1px solid rgba(255, 255, 255, 0.1)",
//         }}
//       >
//         <Button
//           onClick={onClose}
//           sx={{
//             color: "rgba(255, 255, 255, 0.7)",
//             "&:hover": { color: "white" },
//           }}
//         >
//           ביטול
//         </Button>
//         <Button
//           onClick={handleSave}
//           variant="contained"
//           startIcon={<SaveIcon />}
//           sx={{
//             borderRadius: 20,
//             px: 4,
//             background: "linear-gradient(135deg, #00d4ff 0%, #9c27b0 50%, #ff6ec7 100%)",
//             backdropFilter: "blur(20px)",
//             border: "1px solid rgba(255, 255, 255, 0.2)",
//             boxShadow: "0 8px 30px rgba(0, 212, 255, 0.3)",
//             transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
//             "&:hover": {
//               transform: "translateY(-3px) scale(1.05)",
//               boxShadow: "0 15px 40px rgba(0, 212, 255, 0.5)",
//               background: "linear-gradient(135deg, #00b8e6 0%, #8e24aa 50%, #e91e63 100%)",
//             },
//           }}
//         >
//           שמור קולאז'
//         </Button>
//       </DialogActions>
//     </Dialog>
//   )
// }

// export default SimpleCollageMaker
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
  const [borderWidth, setBorderWidth] = useState<number>(0) // הסרת המסגרת כברירת מחדל
  const [borderColor, setBorderColor] = useState<string>("#00d4ff")
  const [backgroundColor, setBackgroundColor] = useState<string>("transparent") // רקע שקוף כברירת מחדל
  const [polaroidText, setPolaroidText] = useState<string>("My Photo")
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
      renderCollage()
    }
  }, [imageUrl])

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
    const canvasWidth = 600
    const canvasHeight = 600

    canvas.width = canvasWidth
    canvas.height = canvasHeight

    // ניקוי הקנבס
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    
    // רק אם הרקע לא שקוף
    if (backgroundColor !== "transparent") {
      ctx.fillStyle = backgroundColor
      ctx.fillRect(0, 0, canvasWidth, canvasHeight)
    }

    const imgRatio = img.width / img.height

    const drawImageMaintainAspect = (x: number, y: number, width: number, height: number) => {
      let drawWidth = width
      let drawHeight = height
      let offsetX = 0
      let offsetY = 0

      if (width / height > imgRatio) {
        drawWidth = height * imgRatio
        offsetX = (width - drawWidth) / 2
      } else {
        drawHeight = width / imgRatio
        offsetY = (height - drawHeight) / 2
      }

      ctx.drawImage(img, x + offsetX, y + offsetY, drawWidth, drawHeight)
    }

    const drawHeart = (x: number, y: number, width: number, height: number) => {
      ctx.save()
      ctx.beginPath()

      const topCurveHeight = height * 0.3

      ctx.moveTo(x + width / 2, y + height)
      ctx.bezierCurveTo(x, y + height * 0.7, x, y, x + width / 2, y + topCurveHeight)
      ctx.bezierCurveTo(x + width, y, x + width, y + height * 0.7, x + width / 2, y + height)

      ctx.closePath()
      ctx.clip()

      drawImageMaintainAspect(x, y, width, height)

      ctx.restore()
    }

    const drawCircle = (x: number, y: number, radius: number) => {
      ctx.save()
      ctx.beginPath()
      ctx.arc(x + radius, y + radius, radius, 0, Math.PI * 2)
      ctx.closePath()
      ctx.clip()

      drawImageMaintainAspect(x, y, radius * 2, radius * 2)

      ctx.restore()
    }

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

      drawImageMaintainAspect(x, y, width, height)

      ctx.restore()
    }

    switch (layout) {
      case "original":
        const originalSize = Math.min(canvasWidth, canvasHeight)
        const originalX = 0
        const originalY = 0
        drawImageMaintainAspect(originalX, originalY, originalSize, originalSize)
        break

      case "split2":
        // תיקון חלוקה לשניים - חלוקה אנכית
        const halfWidth = canvasWidth / 2
        const fullHeight = canvasHeight
        
        // חצי שמאלי
        ctx.save()
        ctx.beginPath()
        ctx.rect(0, 0, halfWidth, fullHeight)
        ctx.clip()
        drawImageMaintainAspect(0, 0, canvasWidth, canvasHeight)
        ctx.restore()
        
        // קו מפריד דק (אופציונלי)
        if (borderWidth > 0) {
          ctx.fillStyle = borderColor
          ctx.fillRect(halfWidth - borderWidth/2, 0, borderWidth, fullHeight)
        }
        
        // חצי ימני
        ctx.save()
        ctx.beginPath()
        ctx.rect(halfWidth + (borderWidth > 0 ? borderWidth/2 : 0), 0, halfWidth - (borderWidth > 0 ? borderWidth/2 : 0), fullHeight)
        ctx.clip()
        drawImageMaintainAspect(0, 0, canvasWidth, canvasHeight)
        ctx.restore()
        break

      case "split4":
        const quarterSize = canvasWidth * 0.35
        const margin = (canvasWidth - quarterSize * 2) / 3

        if (backgroundColor !== "transparent") {
          ctx.fillStyle = backgroundColor
          ctx.fillRect(0, 0, canvasWidth, canvasHeight)
        }

        if (borderWidth > 0) {
          ctx.fillStyle = borderColor
          ctx.fillRect(
            margin - borderWidth,
            margin - borderWidth,
            quarterSize + borderWidth * 2,
            quarterSize + borderWidth * 2,
          )
        }
        drawImageMaintainAspect(margin, margin, quarterSize, quarterSize)

        if (borderWidth > 0) {
          ctx.fillStyle = borderColor
          ctx.fillRect(
            margin * 2 + quarterSize - borderWidth,
            margin - borderWidth,
            quarterSize + borderWidth * 2,
            quarterSize + borderWidth * 2,
          )
        }
        drawImageMaintainAspect(margin * 2 + quarterSize, margin, quarterSize, quarterSize)

        if (borderWidth > 0) {
          ctx.fillStyle = borderColor
          ctx.fillRect(
            margin - borderWidth,
            margin * 2 + quarterSize - borderWidth,
            quarterSize + borderWidth * 2,
            quarterSize + borderWidth * 2,
          )
        }
        drawImageMaintainAspect(margin, margin * 2 + quarterSize, quarterSize, quarterSize)

        if (borderWidth > 0) {
          ctx.fillStyle = borderColor
          ctx.fillRect(
            margin * 2 + quarterSize - borderWidth,
            margin * 2 + quarterSize - borderWidth,
            quarterSize + borderWidth * 2,
            quarterSize + borderWidth * 2,
          )
        }
        drawImageMaintainAspect(margin * 2 + quarterSize, margin * 2 + quarterSize, quarterSize, quarterSize)
        break

      case "polaroid":
        const polaroidWidth = canvasWidth * 0.7
        const polaroidHeight = polaroidWidth * 1.2
        const polaroidX = (canvasWidth - polaroidWidth) / 2
        const polaroidY = (canvasHeight - polaroidHeight) / 2
        const frameWidth = 20
        const bottomFrame = 60

        ctx.fillStyle = "#ffffff"
        ctx.fillRect(polaroidX, polaroidY, polaroidWidth, polaroidHeight)

        ctx.shadowColor = "rgba(0, 0, 0, 0.2)"
        ctx.shadowBlur = 10
        ctx.shadowOffsetX = 5
        ctx.shadowOffsetY = 5
        ctx.fillRect(polaroidX, polaroidY, polaroidWidth, polaroidHeight)
        ctx.shadowColor = "transparent"

        const polaroidImgWidth = polaroidWidth - frameWidth * 2
        const polaroidImgHeight = polaroidHeight - frameWidth - bottomFrame

        drawImageMaintainAspect(polaroidX + frameWidth, polaroidY + frameWidth, polaroidImgWidth, polaroidImgHeight)

        ctx.font = "24px Arial"
        ctx.fillStyle = "#333"
        ctx.textAlign = "center"
        ctx.fillText(polaroidText, polaroidX + polaroidWidth / 2, polaroidY + polaroidHeight - 20)
        break

      case "frame":
        const frameSize = Math.min(canvasWidth, canvasHeight)
        const frameX = 0
        const frameY = 0

        if (borderWidth > 0) {
          ctx.fillStyle = borderColor
          ctx.fillRect(
            frameX - borderWidth,
            frameY - borderWidth,
            frameSize + borderWidth * 2,
            frameSize + borderWidth * 2,
          )
        }

        drawImageMaintainAspect(frameX, frameY, frameSize, frameSize)
        break

      case "heart":
        const heartSize = Math.min(canvasWidth, canvasHeight)
        const heartX = 0
        const heartY = 0

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

        drawHeart(heartX, heartY, heartSize, heartSize)
        break

      case "circle":
        const circleSize = Math.min(canvasWidth, canvasHeight)
        const circleX = 0
        const circleY = 0
        const radius = circleSize / 2

        if (borderWidth > 0) {
          ctx.fillStyle = borderColor
          ctx.beginPath()
          ctx.arc(circleX + radius, circleY + radius, radius + borderWidth, 0, Math.PI * 2)
          ctx.closePath()
          ctx.fill()
        }

        drawCircle(circleX, circleY, radius)
        break

      case "star":
        const starSize = Math.min(canvasWidth, canvasHeight)
        const starX = 0
        const starY = 0

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

        drawStar(starX, starY, starSize, starSize)
        break
    }

    setPreviewUrl(canvas.toDataURL("image/jpeg"))
  }

  const handleSave = () => {
    if (previewUrl) {
      onSaveCollage(previewUrl)
      onClose()
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 25,
          background: "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(30px)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          boxShadow: "0 25px 80px rgba(0, 0, 0, 0.3)",
        },
      }}
    >
      <DialogTitle
        sx={{
          background: "linear-gradient(135deg, #00d4ff 0%, #9c27b0 50%, #ff6ec7 100%)",
          color: "white",
          position: "relative",
          textAlign: "center",
          py: 3,
        }}
      >
        <Typography variant="h6" component="div">
          עורך קולאז' מתקדם
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 16,
            top: "50%",
            transform: "translateY(-50%)",
            color: "white",
            background: "rgba(255, 255, 255, 0.1)",
            "&:hover": {
              background: "rgba(255, 255, 255, 0.2)",
              transform: "translateY(-50%) scale(1.1)",
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ padding: "24px", background: "rgba(255, 255, 255, 0.02)" }}>
        <Grid container spacing={3}>
          <Grid >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mb: 2,
                borderRadius: 20,
                p: 2,
                height: 400,
                overflow: "hidden",
                background: "transparent", // הסרת הרקע הלבן
                border: "none", // הסרת המסגרת
              }}
            >
              <canvas
                ref={canvasRef}
                style={{ maxWidth: "100%", maxHeight: "100%", display: "block", borderRadius: "15px" }}
              />
            </Box>
          </Grid>

          <Grid >
            <FormControl fullWidth sx={{ mb: 3, mt: 2 }}>
              <InputLabel
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                  "&.Mui-focused": { color: "#00d4ff" },
                }}
              >
                סגנון קולאז'
              </InputLabel>
              <Select
                value={layout}
                onChange={(e) => setLayout(e.target.value as CollageLayout)}
                label="סגנון קולאז'"
                sx={{
                  borderRadius: 15,
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  color: "white",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255, 255, 255, 0.15)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#00d4ff",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#00d4ff",
                  },
                }}
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

            <Typography gutterBottom sx={{ color: "white", mb: 1 }}>
              עובי מסגרת
            </Typography>
            <Slider
              value={borderWidth}
              onChange={(_, value) => setBorderWidth(value as number)}
              min={0}
              max={30}
              valueLabelDisplay="auto"
              sx={{
                mb: 3,
                color: "#00d4ff",
                "& .MuiSlider-thumb": {
                  background: "linear-gradient(135deg, #00d4ff 0%, #ff6ec7 100%)",
                },
                "& .MuiSlider-track": {
                  background: "linear-gradient(135deg, #00d4ff 0%, #ff6ec7 100%)",
                },
              }}
            />

            <Typography gutterBottom sx={{ color: "white", mb: 1 }}>
              צבע מסגרת
            </Typography>
            <Box sx={{ display: "flex", gap: 1, mb: 3, flexWrap: "wrap" }}>
              {[
                "#00d4ff", // ציאן
                "#9c27b0", // סגול
                "#ff6ec7", // ורוד
                "#ff5252", // אדום
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
                    border: borderColor === color ? "3px solid #00d4ff" : "1px solid rgba(255,255,255,0.3)",
                    borderRadius: "50%",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.1)",
                      boxShadow: "0 4px 15px rgba(0, 212, 255, 0.3)",
                    },
                  }}
                />
              ))}
            </Box>

            <Typography gutterBottom sx={{ color: "white", mb: 1 }}>
              צבע רקע
            </Typography>
            <Box sx={{ display: "flex", gap: 1, mb: 3, flexWrap: "wrap" }}>
              {[
                "transparent", // שקוף
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
                    backgroundColor: color === "transparent" ? "transparent" : color,
                    border: backgroundColor === color ? "3px solid #00d4ff" : "1px solid rgba(255,255,255,0.3)",
                    borderRadius: "50%",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    backgroundImage: color === "transparent" ? "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)" : "none",
                    backgroundSize: color === "transparent" ? "8px 8px" : "auto",
                    backgroundPosition: color === "transparent" ? "0 0, 0 4px, 4px -4px, -4px 0px" : "auto",
                    "&:hover": {
                      transform: "scale(1.1)",
                      boxShadow: "0 4px 15px rgba(0, 212, 255, 0.3)",
                    },
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
                sx={{
                  mb: 3,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 15,
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    color: "white",
                    "& fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.15)",
                    },
                    "&:hover fieldset": {
                      borderColor: "#00d4ff",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#00d4ff",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "rgba(255, 255, 255, 0.7)",
                    "&.Mui-focused": {
                      color: "#00d4ff",
                    },
                  },
                }}
              />
            )}
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions
        sx={{
          p: 3,
          background: "rgba(255, 255, 255, 0.05)",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <Button
          onClick={onClose}
          sx={{
            color: "rgba(255, 255, 255, 0.7)",
            "&:hover": { color: "white" },
          }}
        >
          ביטול
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          startIcon={<SaveIcon />}
          sx={{
            borderRadius: 20,
            px: 4,
            background: "linear-gradient(135deg, #00d4ff 0%, #9c27b0 50%, #ff6ec7 100%)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 8px 30px rgba(0, 212, 255, 0.3)",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              transform: "translateY(-3px) scale(1.05)",
              boxShadow: "0 15px 40px rgba(0, 212, 255, 0.5)",
              background: "linear-gradient(135deg, #00b8e6 0%, #8e24aa 50%, #e91e63 100%)",
            },
          }}
        >
          שמור קולאז'
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SimpleCollageMaker
