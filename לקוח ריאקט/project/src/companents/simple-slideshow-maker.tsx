import type React from "react"
import { useState, useEffect, useRef } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  CircularProgress,
  IconButton,
  Slider,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import PauseIcon from "@mui/icons-material/Pause"
import SpeedIcon from "@mui/icons-material/Speed"
import MusicNoteIcon from "@mui/icons-material/MusicNote"
import VolumeUpIcon from "@mui/icons-material/VolumeUp"
import VolumeOffIcon from "@mui/icons-material/VolumeOff"

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

// אפקטים אפשריים למצגת
type TransitionEffect = "fade" | "slide" | "zoom"

// רשימת שירים לבחירה
const MUSIC_OPTIONS = [
  { id: "happy", name: "מוזיקה שמחה", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { id: "relaxing", name: "מוזיקה רגועה", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { id: "energetic", name: "מוזיקה אנרגטית", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
]

const SimpleSlideshowMaker: React.FC<SimpleSlideshowMakerProps> = ({ open, onClose, images, albumId }) => {
  const [selectedImages, setSelectedImages] = useState<Image[]>([])
  const [generating, setGenerating] = useState(false)
  const [slideshowReady, setSlideshowReady] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [slideSpeed, setSlideSpeed] = useState(3000) // מהירות החלפת שקופיות במילישניות
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info",
  })

  // מצבים חדשים למוזיקה
  const [selectedMusic, setSelectedMusic] = useState<string>("happy")
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const [volume, setVolume] = useState(50)

  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // בחירת כל התמונות כברירת מחדל
  useEffect(() => {
    if (images.length > 0) {
      setSelectedImages(images)
    }
  }, [images])

  // ניקוי כשהקומפוננטה נסגרת
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      // עצור את המוזיקה כשהקומפוננטה נסגרת
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [])

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

    // סימולציה של זמן עיבוד
    setTimeout(() => {
      setGenerating(false)
      setSlideshowReady(true)
      // התחל את המצגת אוטומטית
      startSlideshow()
    }, 1000)
  }

  const startSlideshow = () => {
    setPlaying(true)

    // עצור אינטרוול קודם אם קיים
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    // הפעל אינטרוול חדש
    intervalRef.current = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % selectedImages.length)
    }, slideSpeed)

    // הפעל מוזיקה אם נבחרה
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

    // עצור את המוזיקה
    if (audioRef.current && isMusicPlaying) {
      audioRef.current.pause()
    }
  }

  // פונקציה להצגת הודעות למשתמש
  const showNotification = (message: string, severity: "success" | "error" | "info") => {
    setNotification({
      open: true,
      message,
      severity,
    })
  }

  // פונקציה לסגירת הודעות
  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }))
  }

  // פונקציה לשינוי בחירת המוזיקה
  const handleMusicChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const musicId = event.target.value as string
    setSelectedMusic(musicId)

    // עדכן את מקור השמע
    if (audioRef.current) {
      const selectedMusicOption = MUSIC_OPTIONS.find((option) => option.id === musicId)
      if (selectedMusicOption) {
        audioRef.current.src = selectedMusicOption.url

        // אם המצגת פועלת והמוזיקה פועלת, הפעל את המוזיקה החדשה
        if (playing && isMusicPlaying) {
          audioRef.current.play().catch(console.error)
        }
      }
    }
  }
  // פונקציה להפעלה/עצירה של המוזיקה
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

  // פונקציה לשינוי עוצמת הקול
  const handleVolumeChange = (event: Event, newValue: number | number[]) => {
    const newVolume = newValue as number
    setVolume(newVolume)

    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100
    }
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            overflow: "hidden",
            direction: "rtl",
          },
        }}
      >
        <DialogTitle>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center">
              <AutoAwesomeIcon sx={{ mr: 1, color: "#ff758c" }} />
              <Typography variant="h6">תצוגת שקופיות</Typography>
            </Box>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent
          sx={{
            overflow: slideshowReady ? "hidden" : "auto",
            padding: 3,
          }}
        >
          {!slideshowReady ? (
            <>
              {!generating && (
                <>
                  <Box mb={3}>
                    <Box display="flex" alignItems="center" gap={2} mb={2}>
                      <Typography variant="h6" gutterBottom>
                        בחר תמונות לתצוגה
                      </Typography>
                      <Button variant="outlined" size="small" onClick={handleSelectAllImages}>
                        {selectedImages.length === images.length ? "בטל בחירת הכל" : "בחר הכל"}
                      </Button>
                    </Box>

                    <Typography variant="body2" color="text.secondary" mb={1}>
                      נבחרו {selectedImages.length} מתוך {images.length} תמונות
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "12px",
                      justifyContent: "flex-start",
                      mb: 4,
                    }}
                  >
                    {images.length === 0 ? (
                      <Typography>אין תמונות</Typography>
                    ) : (
                      images.map((image) => {
                        const selected = selectedImages.some((img) => img.photoId === image.photoId)
                        return (
                          <Box
                            key={image.photoId}
                            onClick={() => toggleImageSelection(image)}
                            sx={{
                              width: 120,
                              height: 120,
                              borderRadius: 2,
                              overflow: "hidden",
                              border: selected ? "3px solid #ff758c" : "1px solid #ccc",
                              cursor: "pointer",
                              position: "relative",
                              transition: "all 0.2s",
                              "&:hover": {
                                transform: "scale(1.05)",
                                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                              },
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
                            {selected && (
                              <Box
                                sx={{
                                  position: "absolute",
                                  top: 0,
                                  right: 0,
                                  bgcolor: "#ff758c",
                                  color: "white",
                                  px: 0.5,
                                  py: 0,
                                  fontSize: 12,
                                  fontWeight: "bold",
                                }}
                              >
                                ✓
                              </Box>
                            )}
                          </Box>
                        )
                      })
                    )}
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Typography gutterBottom display="flex" alignItems="center">
                      <SpeedIcon sx={{ mr: 1, color: "#ff758c" }} />
                      מהירות החלפת שקופיות: {slideSpeed / 1000} שניות
                    </Typography>
                    <Slider
                      value={slideSpeed}
                      onChange={(_, value) => setSlideSpeed(value as number)}
                      min={1000}
                      max={10000}
                      step={500}
                      valueLabelDisplay="auto"
                      valueLabelFormat={(value) => `${value / 1000}s`}
                    />
                  </Box>

                  {/* הגדרות מוזיקה */}
                  <Box sx={{ mb: 3 }}>
                    <Typography gutterBottom display="flex" alignItems="center">
                      <MusicNoteIcon sx={{ mr: 1, color: "#ff758c" }} />
                      מוזיקת רקע למצגת
                    </Typography>

                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel>בחר מוזיקה</InputLabel>
                      <Select value={selectedMusic} onChange={(e) => handleMusicChange(e as any)} label="בחר מוזיקה">
                        {MUSIC_OPTIONS.map((option) => (
                          <MenuItem key={option.id} value={option.id}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <Box display="flex" alignItems="center" gap={2}>
                      <IconButton onClick={toggleMusic}>
                        {isMusicPlaying ? <VolumeUpIcon /> : <VolumeOffIcon />}
                      </IconButton>
                      <Typography variant="body2" sx={{ minWidth: 100 }}>
                        {isMusicPlaying ? "מוזיקה פועלת" : "מוזיקה כבויה"}
                      </Typography>
                      <Slider
                        value={volume}
                        onChange={handleVolumeChange}
                        aria-labelledby="volume-slider"
                        sx={{ flex: 1 }}
                        disabled={!isMusicPlaying}
                      />
                    </Box>
                  </Box>
                </>
              )}

              {generating && (
                <Box textAlign="center" py={4}>
                  <CircularProgress size={60} sx={{ mb: 3, color: "#ff758c" }} />
                  <Typography variant="h6">מכין מצגת...</Typography>
                  <Typography variant="body2" color="text.secondary">
                    תצוגת השקופיות מתחילה כעת
                  </Typography>
                </Box>
              )}
            </>
          ) : (
            <>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "60vh",
                  bgcolor: "black",
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow: "0 0 20px rgba(0,0,0,0.5)",
                  border: "5px solid #ff758c",
                  mb: 2,
                }}
              >
                {selectedImages.map((image, index) => (
                  <Box
                    key={image.photoId}
                    component="img"
                    src={image.url || "/placeholder.svg"}
                    alt={image.title}
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      transition: "opacity 1s ease",
                      opacity: index === currentImageIndex ? 1 : 0,
                    }}
                  />
                ))}

                <Box
                  sx={{
                    position: "absolute",
                    bottom: 20,
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    gap: 2,
                    bgcolor: "rgba(255, 255, 255, 0.7)",
                    borderRadius: "30px",
                    px: 2,
                    py: 1,
                  }}
                >
                  {!playing ? (
                    <IconButton onClick={startSlideshow}>
                      <PlayArrowIcon />
                    </IconButton>
                  ) : (
                    <IconButton onClick={pauseSlideshow}>
                      <PauseIcon />
                    </IconButton>
                  )}
                  <IconButton onClick={toggleMusic}>{isMusicPlaying ? <VolumeUpIcon /> : <VolumeOffIcon />}</IconButton>
                </Box>
              </Box>
            </>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={onClose}>סגור</Button>
          {!slideshowReady && !generating && (
            <Button
              onClick={generateSlideshow}
              variant="contained"
              disabled={selectedImages.length === 0}
              startIcon={<AutoAwesomeIcon />}
              sx={{
                background: "linear-gradient(to right, #ff758c, #a9def5)",
              }}
            >
            תצוגת שקופיות
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* אלמנט אודיו נסתר */}
      <audio ref={audioRef} src={MUSIC_OPTIONS.find((option) => option.id === selectedMusic)?.url} loop />

      {/* הודעות למשתמש */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: "100%" }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default SimpleSlideshowMaker