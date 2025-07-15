import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography, IconButton } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"
import SuccessSnackbar from "../ui/SuccessSnackbar"
import ErrorAlert from "../ui/ErrorAlert"
import slideshowStyles from "../../styles/slideshow.styles"
import SlideshowImageSelector from "./SlideshowImageSelector"
import SlideshowControls from "./SlideshowControls"
import SlideshowViewer from "./SlideshowViewer"

interface Image {
  photoId: number
  url: string
  title: string
  albumId: number
  userId: number
}

interface SimpleSlideshowMakerProps {
  open: boolean
  onClose: () => void
  images: Image[]
  albumId: number
}

const MUSIC_OPTIONS = [
  { id: "happy", name: "מוזיקה שמחה", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { id: "relaxing", name: "מוזיקה רגועה", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { id: "energetic", name: "מוזיקה אנרגטית", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
]

// הקומפוננטה הראשית - רק state management ולוגיקה
const SimpleSlideshowMaker: React.FC<SimpleSlideshowMakerProps> = ({ open, onClose, images, albumId }) => {
  // כל ה-state בדיוק כמו שהיה
  const [selectedImages, setSelectedImages] = useState<Image[]>([])
  const [generating, setGenerating] = useState(false)
  const [slideshowReady, setSlideshowReady] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [slideSpeed, setSlideSpeed] = useState(3000)
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info",
  })
  const [selectedMusic, setSelectedMusic] = useState<string>("happy")
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const [volume, setVolume] = useState(50)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // כל ה-useEffect בדיוק כמו שהיו
  useEffect(() => {
    if (images.length > 0) {
      setSelectedImages(images)
    }
  }, [images])

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [])

  // כל הפונקציות בדיוק כמו שהיו
  const toggleImageSelection = (image: Image) => {
    if (selectedImages.some((img) => img.photoId === image.photoId)) {
      setSelectedImages((prev) => prev.filter((img) => img.photoId !== image.photoId))
    } else {
      setSelectedImages((prev) => [...prev, image])
    }
  }

  const handleSelectAllImages = () => {
    if (selectedImages.length === images.length) {
      setSelectedImages([])
    } else {
      setSelectedImages([...images])
    }
  }

  const generateSlideshow = async () => {
    if (selectedImages.length === 0) return
    setGenerating(true)
    setTimeout(() => {
      setGenerating(false)
      setSlideshowReady(true)
      startSlideshow()
    }, 1000)
  }

  const startSlideshow = () => {
    setPlaying(true)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    intervalRef.current = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % selectedImages.length)
    }, slideSpeed)
    if (isMusicPlaying && audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("שגיאה בהפעלת המוזיקה:", error)
        showNotification("לא ניתן להפעיל את המוזיקה. נסה ללחוץ על הדף קודם.", "error")
      })
    }
  }

  const pauseSlideshow = () => {
    setPlaying(false)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    if (audioRef.current && isMusicPlaying) {
      audioRef.current.pause()
    }
  }

  const showNotification = (message: string, severity: "success" | "error" | "info") => {
    setNotification({
      open: true,
      message,
      severity,
    })
  }

  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }))
  }

  const handleMusicChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const musicId = event.target.value as string
    setSelectedMusic(musicId)
    if (audioRef.current) {
      const selectedMusicOption = MUSIC_OPTIONS.find((option) => option.id === musicId)
      if (selectedMusicOption) {
        audioRef.current.src = selectedMusicOption.url
        if (playing && isMusicPlaying) {
          audioRef.current.play().catch(console.error)
        }
      }
    }
  }

  const toggleMusic = () => {
    if (!audioRef.current) return
    if (isMusicPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch((error) => {
        console.error("שגיאה בהפעלת המוזיקה:", error)
        showNotification("לא ניתן להפעיל את המוזיקה. נסה ללחוץ על הדף קודם.", "error")
      })
    }
    setIsMusicPlaying(!isMusicPlaying)
  }

  const handleVolumeChange = (event: Event, newValue: number | number[]) => {
    const newVolume = newValue as number
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100
    }
  }

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth PaperProps={{ sx: slideshowStyles.dialogPaper }}>
        <DialogTitle sx={slideshowStyles.dialogTitle}>
          <Box display="flex" alignItems="center" justifyContent="center">
            <AutoAwesomeIcon sx={{ mr: 1 }} />
            <Typography variant="h6">תצוגת שקופיות מתקדמת</Typography>
          </Box>
          <IconButton onClick={onClose} sx={slideshowStyles.closeButton}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ ...slideshowStyles.dialogContent, overflow: slideshowReady ? "hidden" : "auto" }}>
          {!slideshowReady ? (
            <>
              {!generating && (
                <>
                  <SlideshowImageSelector
                    images={images}
                    selectedImages={selectedImages}
                    onToggleImageSelection={toggleImageSelection}
                    onSelectAllImages={handleSelectAllImages}
                  />
                  <SlideshowControls
                    slideSpeed={slideSpeed}
                    onSlideSpeedChange={(_, value) => setSlideSpeed(value as number)}
                    selectedMusic={selectedMusic}
                    onMusicChange={handleMusicChange}
                    isMusicPlaying={isMusicPlaying}
                    onToggleMusic={toggleMusic}
                    volume={volume}
                    onVolumeChange={handleVolumeChange}
                    musicOptions={MUSIC_OPTIONS}
                  />
                </>
              )}
              {generating && (
                <SlideshowViewer
                  generating={true}
                  selectedImages={[]}
                  currentImageIndex={0}
                  playing={false}
                  isMusicPlaying={false}
                  onStartSlideshow={() => {}}
                  onPauseSlideshow={() => {}}
                  onToggleMusic={() => {}}
                />
              )}
            </>
          ) : (
            <SlideshowViewer
              generating={false}
              selectedImages={selectedImages}
              currentImageIndex={currentImageIndex}
              playing={playing}
              isMusicPlaying={isMusicPlaying}
              onStartSlideshow={startSlideshow}
              onPauseSlideshow={pauseSlideshow}
              onToggleMusic={toggleMusic}
            />
          )}
        </DialogContent>
        <DialogActions sx={slideshowStyles.dialogActions}>
          <Button onClick={onClose} sx={slideshowStyles.closeButtonAction}>
            סגור
          </Button>
          {!slideshowReady && !generating && (
            <Button
              onClick={generateSlideshow}
              variant="contained"
              disabled={selectedImages.length === 0}
              startIcon={<AutoAwesomeIcon />}
              sx={slideshowStyles.startButton}
            >
              התחל תצוגת שקופיות
            </Button>
          )}
        </DialogActions>
      </Dialog>
      <audio ref={audioRef} src={MUSIC_OPTIONS.find((option) => option.id === selectedMusic)?.url} loop />
      {/* השתמשתי בקומפוננטות העזר שלך */}
      <SuccessSnackbar
        open={notification.open && notification.severity === "success"}
        message={notification.message}
        onClose={handleCloseNotification}
      />
      {notification.open && notification.severity === "error" && (
        <ErrorAlert error={notification.message} onClose={handleCloseNotification} />
      )}
    </>
  )
}

export default SimpleSlideshowMaker
