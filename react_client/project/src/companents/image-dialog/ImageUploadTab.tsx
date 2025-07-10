"use client"

import type React from "react"
import FileUploader from "../photo-fileupload/FileUploader"

interface ImageUploadTabProps {
  open: boolean
  onClose: () => void
  albumId?: number
}

// קומפוננטת טאב העלאת תמונות - פשוטה ונקייה
const ImageUploadTab: React.FC<ImageUploadTabProps> = ({ open, onClose, albumId }) => {
  return <FileUploader open={open} onClose={onClose} albumId={albumId} />
}

export default ImageUploadTab
