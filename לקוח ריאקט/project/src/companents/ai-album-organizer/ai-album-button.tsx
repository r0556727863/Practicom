import type React from "react"
import { Button, Tooltip } from "@mui/material"
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"

interface AIAlbumButtonProps {
  onClick: () => void
  variant?: "text" | "outlined" | "contained"
  size?: "small" | "medium" | "large"
  fullWidth?: boolean
}

const AIAlbumButton: React.FC<AIAlbumButtonProps> = ({
  onClick,
  variant = "contained",
  size = "medium",
  fullWidth = false,
}) => {
  return (
    <Tooltip title="קבל הצעות חכמות לאלבומים">
      <Button
        variant={variant}
        size={size}
        fullWidth={fullWidth}
        onClick={onClick}
        startIcon={<AutoAwesomeIcon />}
        sx={{
          borderRadius: 2,
          background: variant === "contained" ? "linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)" : undefined,
          boxShadow: variant === "contained" ? "0 4px 12px rgba(255, 117, 140, 0.3)" : undefined,
          transition: "all 0.3s ease",
          "&:hover": {
            background: variant === "contained" ? "linear-gradient(135deg, #ff758c 0%, #ff7eb3 80%)" : undefined,
            transform: "translateY(-3px)",
            boxShadow: variant === "contained" ? "0 6px 16px rgba(255, 117, 140, 0.4)" : undefined,
          },
        }}
      >
        הצעות AI לאלבומים
      </Button>
    </Tooltip>
  )
}

export default AIAlbumButton
