import type React from "react"
import { Box, Typography, Slider, FormControl, InputLabel, Select, MenuItem, IconButton } from "@mui/material"
import SpeedIcon from "@mui/icons-material/Speed"
import MusicNoteIcon from "@mui/icons-material/MusicNote"
import VolumeUpIcon from "@mui/icons-material/VolumeUp"
import VolumeOffIcon from "@mui/icons-material/VolumeOff"
import slideshowStyles from "../../styles/slideshow.styles"

interface MusicOption {
  id: string
  name: string
  url: string
}

interface SlideshowControlsProps {
  slideSpeed: number
  onSlideSpeedChange: (event: Event, value: number | number[]) => void
  selectedMusic: string
  onMusicChange: (event: React.ChangeEvent<{ value: unknown }>) => void
  isMusicPlaying: boolean
  onToggleMusic: () => void
  volume: number
  onVolumeChange: (event: Event, value: number | number[]) => void
  musicOptions: MusicOption[]
}

// קומפוננטת הפקדים - מהירות ומוזיקה
const SlideshowControls: React.FC<SlideshowControlsProps> = ({
  slideSpeed,
  onSlideSpeedChange,
  selectedMusic,
  onMusicChange,
  isMusicPlaying,
  onToggleMusic,
  volume,
  onVolumeChange,
  musicOptions,
}) => {
  return (
    <>
      <Box sx={slideshowStyles.controlSection}>
        <Typography gutterBottom display="flex" alignItems="center" sx={{ color: "white" }}>
          <SpeedIcon sx={{ mr: 1, color: "#00d4ff" }} />
          מהירות החלפת שקופיות: {slideSpeed / 1000} שניות
        </Typography>
        <Slider
          value={slideSpeed}
          onChange={onSlideSpeedChange}
          min={1000}
          max={10000}
          step={500}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `${value / 1000}s`}
          sx={slideshowStyles.sliderContainer}
        />
      </Box>
      <Box sx={slideshowStyles.controlSection}>
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
            onChange={(e) => onMusicChange(e as any)}
            label="בחר מוזיקה"
            sx={slideshowStyles.musicSelect}
          >
            {musicOptions.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={slideshowStyles.musicControls}>
          <IconButton
            onClick={onToggleMusic}
            sx={{
              ...slideshowStyles.musicButton,
              color: isMusicPlaying ? "#00d4ff" : "rgba(255, 255, 255, 0.5)",
            }}
          >
            {isMusicPlaying ? <VolumeUpIcon /> : <VolumeOffIcon />}
          </IconButton>
          <Typography variant="body2" sx={{ minWidth: 100, color: "white" }}>
            {isMusicPlaying ? "מוזיקה פועלת" : "מוזיקה כבויה"}
          </Typography>
          <Slider
            value={volume}
            onChange={onVolumeChange}
            aria-labelledby="volume-slider"
            sx={{
              flex: 1,
              ...slideshowStyles.sliderContainer,
            }}
            disabled={!isMusicPlaying}
          />
        </Box>
      </Box>
    </>
  )
}

export default SlideshowControls
