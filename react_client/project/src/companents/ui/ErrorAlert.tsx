"use client"

import type React from "react"
import { Alert, AlertTitle } from "@mui/material"

interface ErrorAlertProps {
    error: string
    title?: string
    onClose?: () => void
}

// קומפוננטה כללית לשגיאות - 25 שורות
const ErrorAlert: React.FC<ErrorAlertProps> = ({ error, title = "שגיאה", onClose }) => {
    return (
        <Alert
            severity="error"
            onClose={onClose}
            sx={{
                borderRadius: 12,
                background: "rgba(244, 67, 54, 0.1)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(244, 67, 54, 0.3)",
                color: "white",
                mb: 2,
            }}
        >
            <AlertTitle>{title}</AlertTitle>
            {error}
        </Alert>
    )
}

export default ErrorAlert
