import type React from "react"
import { Box, CircularProgress, Typography } from "@mui/material"
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary"

interface LoadingSpinnerProps {
    message?: string
    size?: number
}

// קומפוננטה כללית לטעינה - 30 שורות
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = "טוען...", size = 60 }) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "200px",
                textAlign: "center",
                p: 4,
                borderRadius: 20,
                background: "rgba(255, 255, 255, 0.08)",
                backdropFilter: "blur(30px)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
            }}
        >
            <Box
                sx={{
                    mb: 3,
                    animation: "pulse 2s ease-in-out infinite",
                    "@keyframes pulse": {
                        "0%, 100%": { opacity: 0.7, transform: "scale(1)" },
                        "50%": { opacity: 1, transform: "scale(1.05)" },
                    },
                }}
            >
                <PhotoLibraryIcon sx={{ fontSize: 80, color: "white" }} />
            </Box>
            <CircularProgress size={size} sx={{ color: "#00d4ff", mb: 2 }} />
            <Typography variant="h6" color="white">
                {message}
            </Typography>
        </Box>
    )
}

export default LoadingSpinner
