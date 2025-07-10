"use client"

import type React from "react"
import { Box, Button, Typography, LinearProgress, Alert, IconButton, Card, CardContent, Avatar } from "@mui/material"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import CloseIcon from "@mui/icons-material/Close"
import EditIcon from "@mui/icons-material/Edit"
import { fileUploaderStyles } from "../../styles/fileUploader.styles"

interface FileUploaderContentProps {
  file: File | null
  previewUrl: string | null
  uploadProgress: number
  error: string | null
  uploading: boolean
  success: boolean
  onClose: () => void
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onUpload: () => void
  onOpenCollageMaker: () => void
  onClearFile: () => void
}

// קומפוננטת התוכן והUI - 80 שורות
const FileUploaderContent: React.FC<FileUploaderContentProps> = ({
  file,
  previewUrl,
  uploadProgress,
  error,
  uploading,
  success,
  onClose,
  onFileChange,
  onUpload,
  onOpenCollageMaker,
  onClearFile,
}) => {
  return (
    <Card sx={fileUploaderStyles.card}>
      <IconButton onClick={onClose} sx={fileUploaderStyles.closeButton}>
        <CloseIcon />
      </IconButton>

      <CardContent sx={fileUploaderStyles.cardContent}>
        <Box sx={fileUploaderStyles.headerBox}>
          <Avatar sx={fileUploaderStyles.avatar}>
            <CloudUploadIcon sx={fileUploaderStyles.avatarIcon} />
          </Avatar>
          <Typography variant="h5" component="h2" gutterBottom align="center" fontWeight="bold">
            העלאת תמונה
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            בחר תמונה להעלאה לאלבום
          </Typography>
        </Box>

        {previewUrl ? (
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 1 }}>
              תצוגה מקדימה:
            </Typography>
            <Box
              sx={{
                borderRadius: "10px",
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                mb: 2,
                maxHeight: "200px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={previewUrl || "/placeholder.svg"}
                alt="תצוגה מקדימה"
                style={{ maxWidth: "100%", maxHeight: "200px", objectFit: "contain" }}
              />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <Button
                variant="outlined"
                size="small"
                onClick={onClearFile}
                sx={{ borderRadius: "20px", fontSize: "0.8rem" }}
              >
                בחר תמונה אחרת
              </Button>
              <Button
                variant="outlined"
                size="small"
                color="primary"
                startIcon={<EditIcon />}
                onClick={onOpenCollageMaker}
                sx={{ borderRadius: "20px", fontSize: "0.8rem" }}
              >
                ערוך קולאז'
              </Button>
            </Box>
          </Box>
        ) : (
          <Box sx={fileUploaderStyles.dropZone}>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="raised-button-file"
              type="file"
              onChange={onFileChange}
            />
            <label htmlFor="raised-button-file">
              <Box sx={fileUploaderStyles.dropZoneContent}>
                <CloudUploadIcon sx={fileUploaderStyles.uploadIcon} />
                <Typography variant="body1" gutterBottom>
                  {file ? file.name : "לחץ לבחירת תמונה"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  PNG, JPG, GIF עד 10MB
                </Typography>
              </Box>
            </label>
          </Box>
        )}

        {uploadProgress > 0 && (
          <Box sx={fileUploaderStyles.progressContainer}>
            <Box sx={fileUploaderStyles.progressLabels}>
              <Typography variant="body2">מעלה...</Typography>
              <Typography variant="body2">{uploadProgress}%</Typography>
            </Box>
            <LinearProgress variant="determinate" value={uploadProgress} sx={fileUploaderStyles.progressBar} />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={fileUploaderStyles.alert}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={fileUploaderStyles.alert}>
            התמונה הועלתה בהצלחה!
          </Alert>
        )}

        <Button
          variant="contained"
          fullWidth
          onClick={onUpload}
          disabled={!file || uploading}
          sx={fileUploaderStyles.uploadButton}
        >
          {uploading ? "מעלה..." : "העלה קובץ"}
        </Button>
      </CardContent>
    </Card>
  )
}

export default FileUploaderContent
