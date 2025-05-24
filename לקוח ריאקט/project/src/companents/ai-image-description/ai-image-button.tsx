import type React from "react"
import { IconButton, Tooltip } from "@mui/material"
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"

interface AIImageButtonProps {
  onClick: () => void
  tooltip?: string
}

const AIImageButton: React.FC<AIImageButtonProps> = ({ onClick, tooltip = "נתח תמונה עם AI" }) => {
  return (
    <Tooltip title={tooltip}>
      <IconButton
        onClick={onClick}
        size="small"
        sx={{
          color: "white",
          background: "linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)",
          boxShadow: "0 2px 8px rgba(255, 117, 140, 0.3)",
          "&:hover": {
            background: "linear-gradient(135deg, #ff758c 0%, #ff7eb3 80%)",
            transform: "translateY(-2px)",
            boxShadow: "0 4px 12px rgba(255, 117, 140, 0.4)",
          },
          transition: "all 0.3s ease",
        }}
      >
        <AutoAwesomeIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  )
}

export default AIImageButton