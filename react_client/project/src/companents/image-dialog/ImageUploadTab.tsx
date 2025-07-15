import type React from "react"
import { Box } from "@mui/material"
import FileUploader from "../photo-fileupload/FileUploader"

interface ImageUploadTabProps {
  open: boolean
  onClose: () => void
  albumId?: number
}

// קומפוננטת טאב העלאת תמונות - עכשיו עם תיקון הבעיה
const ImageUploadTab: React.FC<ImageUploadTabProps> = ({ open, onClose, albumId }) => {
  // הבעיה הייתה שהקומפוננטה FileUploader מצפה לקבל open=true כדי להציג את עצמה
  // אבל כשהטאב פתוח, הקומפוננטה צריכה להיות תמיד מוצגת
  return (
    <Box sx={{ p: 2, minHeight: "400px" }}>
      <FileUploader
        open={true} // תמיד true כשהטאב פתוח
        onClose={onClose}
        albumId={albumId}
      />
    </Box>
  )
}

export default ImageUploadTab
