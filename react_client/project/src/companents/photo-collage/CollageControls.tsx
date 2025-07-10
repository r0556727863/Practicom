"use client"

import type React from "react"
import { FormControl, InputLabel, Select, MenuItem, Typography, Slider, Box, TextField } from "@mui/material"
import type { CollageLayout } from "./CollageMaker"
import { collageStyles } from "../../styles/collage.styles"

interface CollageControlsProps {
  layout: CollageLayout
  setLayout: (layout: CollageLayout) => void
  borderWidth: number
  setBorderWidth: (width: number) => void
  borderColor: string
  setBorderColor: (color: string) => void
  backgroundColor: string
  setBackgroundColor: (color: string) => void
  polaroidText: string
  setPolaroidText: (text: string) => void
}

// קומפוננטת הפקדים - 35 שורות
const CollageControls: React.FC<CollageControlsProps> = ({
  layout,
  setLayout,
  borderWidth,
  setBorderWidth,
  borderColor,
  setBorderColor,
  backgroundColor,
  setBackgroundColor,
  polaroidText,
  setPolaroidText,
}) => {
  const borderColors = ["#00d4ff", "#9c27b0", "#ff6ec7", "#ff5252", "#ffd600", "#4caf50", "#000000", "#ffffff"]
  const backgroundColors = [
    "transparent",
    "#ffffff",
    "#f0f0f0",
    "#e3f2fd",
    "#fce4ec",
    "#e8f5e9",
    "#fff9c4",
    "#000000",
    "#212121",
  ]

  return (
    <>
      <FormControl fullWidth sx={collageStyles.formControl}>
        <InputLabel sx={collageStyles.inputLabel}>סגנון קולאז'</InputLabel>
        <Select
          value={layout}
          onChange={(e) => setLayout(e.target.value as CollageLayout)}
          label="סגנון קולאז'"
          sx={collageStyles.select}
        >
          <MenuItem value="original">תמונה מקורית</MenuItem>
          <MenuItem value="split2">חלוקה לשתי תמונות</MenuItem>
          <MenuItem value="split4">חלוקה לארבע תמונות</MenuItem>
          <MenuItem value="polaroid">סגנון פולארויד</MenuItem>
          <MenuItem value="frame">מסגרת קלאסית</MenuItem>
          <MenuItem value="heart">צורת לב</MenuItem>
          <MenuItem value="circle">צורת עיגול</MenuItem>
          <MenuItem value="star">צורת כוכב</MenuItem>
        </Select>
      </FormControl>

      <Typography gutterBottom sx={{ color: "white", mb: 1, fontWeight: "bold" }}>
        עובי מסגרת: {borderWidth}
      </Typography>
      <Slider
        value={borderWidth}
        onChange={(_, value) => setBorderWidth(value as number)}
        min={0}
        max={30}
        valueLabelDisplay="auto"
        sx={collageStyles.slider}
      />

      <Typography gutterBottom sx={{ color: "white", mb: 2, fontWeight: "bold" }}>
        צבע מסגרת
      </Typography>
      <Box sx={collageStyles.colorPalette}>
        {borderColors.map((color) => (
          <Box
            key={color}
            onClick={() => setBorderColor(color)}
            sx={{
              ...collageStyles.colorBox,
              backgroundColor: color,
              border: borderColor === color ? "3px solid #00d4ff" : "2px solid rgba(255,255,255,0.3)",
              boxShadow: borderColor === color ? "0 0 15px rgba(0, 212, 255, 0.5)" : "none",
            }}
          />
        ))}
      </Box>

      <Typography gutterBottom sx={{ color: "white", mb: 2, fontWeight: "bold" }}>
        צבע רקע
      </Typography>
      <Box sx={collageStyles.colorPalette}>
        {backgroundColors.map((color) => (
          <Box
            key={color}
            onClick={() => setBackgroundColor(color)}
            sx={{
              ...collageStyles.colorBox,
              backgroundColor: color === "transparent" ? "transparent" : color,
              border: backgroundColor === color ? "3px solid #00d4ff" : "2px solid rgba(255,255,255,0.3)",
              backgroundImage:
                color === "transparent"
                  ? "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)"
                  : "none",
              backgroundSize: color === "transparent" ? "8px 8px" : "auto",
              backgroundPosition: color === "transparent" ? "0 0, 0 4px, 4px -4px, -4px 0px" : "auto",
              boxShadow: backgroundColor === color ? "0 0 15px rgba(0, 212, 255, 0.5)" : "none",
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
          sx={collageStyles.textField}
        />
      )}
    </>
  )
}

export default CollageControls
