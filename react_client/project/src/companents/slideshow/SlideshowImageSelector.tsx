
import type React from "react"
import { Box, Typography, Button } from "@mui/material"
import slideshowStyles from "../../styles/slideshow.styles"

interface Image {
  photoId: number
  url: string
  title: string
  albumId: number
  userId: number
}

interface SlideshowImageSelectorProps {
  images: Image[]
  selectedImages: Image[]
  onToggleImageSelection: (image: Image) => void
  onSelectAllImages: () => void
}

// קומפוננטת בחירת תמונות - כל הגלריה והבחירה
const SlideshowImageSelector: React.FC<SlideshowImageSelectorProps> = ({
  images,
  selectedImages,
  onToggleImageSelection,
  onSelectAllImages,
}) => {
  return (
    <>
      <Box mb={3}>
        <Box sx={slideshowStyles.selectionHeader}>
          <Typography variant="h6" gutterBottom sx={{ color: "white" }}>
            בחר תמונות לתצוגה
          </Typography>
          <Button variant="outlined" size="small" onClick={onSelectAllImages} sx={slideshowStyles.selectAllButton}>
            {selectedImages.length === images.length ? "בטל בחירת הכל" : "בחר הכל"}
          </Button>
        </Box>
        <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)" }} mb={1}>
          נבחרו {selectedImages.length} מתוך {images.length} תמונות
        </Typography>
      </Box>
      <Box sx={slideshowStyles.imageGrid}>
        {images.length === 0 ? (
          <Typography sx={{ color: "white" }}>אין תמונות</Typography>
        ) : (
          images.map((image) => {
            const selected = selectedImages.some((img) => img.photoId === image.photoId)
            return (
              <Box
                key={image.photoId}
                onClick={() => onToggleImageSelection(image)}
                sx={{
                  ...slideshowStyles.imageBox,
                  border: selected ? "3px solid #00d4ff" : "1px solid rgba(255, 255, 255, 0.3)",
                }}
              >
                <img
                  src={image.url || "/placeholder.svg"}
                  alt={image.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                {selected && <Box sx={slideshowStyles.selectedBadge}>✓</Box>}
              </Box>
            )
          })
        )}
      </Box>
    </>
  )
}

export default SlideshowImageSelector
