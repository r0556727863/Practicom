import type React from "react"
import { Box, Typography, CircularProgress, IconButton } from "@mui/material"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import PauseIcon from "@mui/icons-material/Pause"
import VolumeUpIcon from "@mui/icons-material/VolumeUp"
import VolumeOffIcon from "@mui/icons-material/VolumeOff"
import slideshowStyles from "../../styles/slideshow.styles"

interface Image {
  photoId: number
  url: string
  title: string
  albumId: number
  userId: number
}

interface SlideshowViewerProps {
  generating: boolean
  selectedImages: Image[]
  currentImageIndex: number
  playing: boolean
  isMusicPlaying: boolean
  onStartSlideshow: () => void
  onPauseSlideshow: () => void
  onToggleMusic: () => void
}

// קומפוננטת הצגת המצגת - הצגה וטעינה
const SlideshowViewer: React.FC<SlideshowViewerProps> = ({
  generating,
  selectedImages,
  currentImageIndex,
  playing,
  isMusicPlaying,
  onStartSlideshow,
  onPauseSlideshow,
  onToggleMusic,
}) => {
  if (generating) {
    return (
      <Box sx={slideshowStyles.loadingContainer}>
        <CircularProgress size={60} sx={slideshowStyles.loadingSpinner} />
        <Typography variant="h6" sx={{ color: "white" }}>
          מכין מצגת מרהיבה...
        </Typography>
        <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
          תצוגת השקופיות מתחילה כעת
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={slideshowStyles.slideshowContainer}>
      {selectedImages.map((image, index) => (
        <Box
          key={image.photoId}
          component="img"
          src={image.url || "/placeholder.svg"}
          alt={image.title}
          sx={{
            ...slideshowStyles.slideshowImage,
            opacity: index === currentImageIndex ? 1 : 0,
          }}
        />
      ))}
      <Box sx={slideshowStyles.slideshowControls}>
        {!playing ? (
          <IconButton onClick={onStartSlideshow} sx={slideshowStyles.playButton}>
            <PlayArrowIcon />
          </IconButton>
        ) : (
          <IconButton onClick={onPauseSlideshow} sx={slideshowStyles.pauseButton}>
            <PauseIcon />
          </IconButton>
        )}
        <IconButton
          onClick={onToggleMusic}
          sx={{
            ...slideshowStyles.musicButton,
            color: isMusicPlaying ? "#00d4ff" : "rgba(255, 255, 255, 0.5)",
          }}
        >
          {isMusicPlaying ? <VolumeUpIcon /> : <VolumeOffIcon />}
        </IconButton>
      </Box>
    </Box>
  )
}

export default SlideshowViewer
