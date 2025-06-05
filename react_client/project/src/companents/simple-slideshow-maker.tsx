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
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 25,
            background: "rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(30px)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            boxShadow: "0 25px 80px rgba(0, 0, 0, 0.3)",
            overflow: "hidden",
            direction: "rtl",
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
          <Box display="flex" alignItems="center" justifyContent="center">
            <AutoAwesomeIcon sx={{ mr: 1 }} />
            <Typography variant="h6">תצוגת שקופיות מתקדמת</Typography>
          </Box>
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 37,
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

        <DialogContent
          sx={{
            overflow: slideshowReady ? "hidden" : "auto",
            padding: 3,
            background: "rgba(255, 255, 255, 0.02)",
          }}
        >
          {!slideshowReady ? (
            <>
              {!generating && (
                <>
                  <Box mb={3}>
                    <Box display="flex" alignItems="center" gap={2} mb={2}>
                      <Typography variant="h6" gutterBottom sx={{ color: "white" }}>
                        בחר תמונות לתצוגה
                      </Typography>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={handleSelectAllImages}
                        sx={{
                          borderColor: "#00d4ff",
                          color: "#00d4ff",
                          "&:hover": {
                            borderColor: "#ff6ec7",
                            color: "#ff6ec7",
                            background: "rgba(255, 110, 199, 0.1)",
                          },
                        }}
                      >
                        {selectedImages.length === images.length ? "בטל בחירת הכל" : "בחר הכל"}
                      </Button>
                    </Box>

                    <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)" }} mb={1}>
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
                      <Typography sx={{ color: "white" }}>אין תמונות</Typography>
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
                              borderRadius: 15,
                              overflow: "hidden",
                              border: selected ? "3px solid #00d4ff" : "1px solid rgba(255, 255, 255, 0.3)",
                              cursor: "pointer",
                              position: "relative",
                              transition: "all 0.3s ease",
                              "&:hover": {
                                transform: "scale(1.05)",
                                boxShadow: "0 8px 25px rgba(0, 212, 255, 0.4)",
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
                                  top: 8,
                                  right: 8,
                                  background: "linear-gradient(135deg, #00d4ff 0%, #ff6ec7 100%)",
                                  color: "white",
                                  borderRadius: "50%",
                                  width: 24,
                                  height: 24,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: 14,
                                  fontWeight: "bold",
                                  boxShadow: "0 4px 15px rgba(0, 212, 255, 0.3)",
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
                    <Typography gutterBottom display="flex" alignItems="center" sx={{ color: "white" }}>
                      <SpeedIcon sx={{ mr: 1, color: "#00d4ff" }} />
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
                      sx={{
                        color: "#00d4ff",
                        "& .MuiSlider-thumb": {
                          background: "linear-gradient(135deg, #00d4ff 0%, #ff6ec7 100%)",
                        },
                        "& .MuiSlider-track": {
                          background: "linear-gradient(135deg, #00d4ff 0%, #ff6ec7 100%)",
                        },
                      }}
                    />
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Typography gutterBottom display="flex" alignItems="center" sx={{ color: "white" }}>
                      <MusicNoteIcon sx={{ mr: 1, color: "#00d4ff" }} />
                      מוזיקת רקע למצגת
                    </Typography>

                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel sx={{ color: "rgba(255, 255, 255, 0.7)", "&.Mui-focused": { color: "#00d4ff" } }}>
                        בחר מוזיקה
                      </InputLabel>
                      <Select
                        value={selectedMusic}
                        onChange={(e) => handleMusicChange(e as any)}
                        label="בחר מוזיקה"
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
                        {MUSIC_OPTIONS.map((option) => (
                          <MenuItem key={option.id} value={option.id}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <Box display="flex" alignItems="center" gap={2}>
                      <IconButton
                        onClick={toggleMusic}
                        sx={{
                          color: isMusicPlaying ? "#00d4ff" : "rgba(255, 255, 255, 0.5)",
                          background: "rgba(255, 255, 255, 0.1)",
                          "&:hover": {
                            background: "rgba(0, 212, 255, 0.2)",
                            transform: "scale(1.1)",
                          },
                        }}
                      >
                        {isMusicPlaying ? <VolumeUpIcon /> : <VolumeOffIcon />}
                      </IconButton>
                      <Typography variant="body2" sx={{ minWidth: 100, color: "white" }}>
                        {isMusicPlaying ? "מוזיקה פועלת" : "מוזיקה כבויה"}
                      </Typography>
                      <Slider
                        value={volume}
                        onChange={handleVolumeChange}
                        aria-labelledby="volume-slider"
                        sx={{
                          flex: 1,
                          color: "#00d4ff",
                          "& .MuiSlider-thumb": {
                            background: "linear-gradient(135deg, #00d4ff 0%, #ff6ec7 100%)",
                          },
                          "& .MuiSlider-track": {
                            background: "linear-gradient(135deg, #00d4ff 0%, #ff6ec7 100%)",
                          },
                        }}
                        disabled={!isMusicPlaying}
                      />
                    </Box>
                  </Box>
                </>
              )}

              {generating && (
                <Box textAlign="center" py={4}>
                  <CircularProgress size={60} sx={{ mb: 3, color: "#00d4ff" }} />
                  <Typography variant="h6" sx={{ color: "white" }}>
                    מכין מצגת מרהיבה...
                  </Typography>
                  <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
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
                  borderRadius: 20,
                  overflow: "hidden",
                  boxShadow: "0 0 30px rgba(0, 212, 255, 0.5)",
                  border: "3px solid",
                  borderImage: "linear-gradient(135deg, #00d4ff 0%, #9c27b0 50%, #ff6ec7 100%) 1",
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
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(20px)",
                    borderRadius: "30px",
                    px: 3,
                    py: 1,
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                  }}
                >
                  {!playing ? (
                    <IconButton
                      onClick={startSlideshow}
                      sx={{
                        color: "#00d4ff",
                        "&:hover": {
                          background: "rgba(0, 212, 255, 0.2)",
                          transform: "scale(1.1)",
                        },
                      }}
                    >
                      <PlayArrowIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      onClick={pauseSlideshow}
                      sx={{
                        color: "#ff6ec7",
                        "&:hover": {
                          background: "rgba(255, 110, 199, 0.2)",
                          transform: "scale(1.1)",
                        },
                      }}
                    >
                      <PauseIcon />
                    </IconButton>
                  )}
                  <IconButton
                    onClick={toggleMusic}
                    sx={{
                      color: isMusicPlaying ? "#00d4ff" : "rgba(255, 255, 255, 0.5)",
                      "&:hover": {
                        background: "rgba(0, 212, 255, 0.2)",
                        transform: "scale(1.1)",
                      },
                    }}
                  >
                    {isMusicPlaying ? <VolumeUpIcon /> : <VolumeOffIcon />}
                  </IconButton>
                </Box>
              </Box>
            </>
          )}
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
            סגור
          </Button>
          {!slideshowReady && !generating && (
            <Button
              onClick={generateSlideshow}
              variant="contained"
              disabled={selectedImages.length === 0}
              startIcon={<AutoAwesomeIcon />}
              sx={{
                borderRadius: 15,
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
              התחל תצוגת שקופיות
            </Button>
          )}
        </DialogActions>
      </Dialog>

      <audio ref={audioRef} src={MUSIC_OPTIONS.find((option) => option.id === selectedMusic)?.url} loop />

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
