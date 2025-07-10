"use client"

import type React from "react"
import { Snackbar, Alert } from "@mui/material"

interface SuccessSnackbarProps {
    open: boolean
    message: string
    onClose: () => void
    autoHideDuration?: number
}

// קומפוננטה כללית להודעות הצלחה - 25 שורות
const SuccessSnackbar: React.FC<SuccessSnackbarProps> = ({ open, message, onClose, autoHideDuration = 3000 }) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={autoHideDuration}
            onClose={onClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            sx={{ zIndex: 3300, marginTop: "50px" }}
        >
            <Alert onClose={onClose} severity="success" sx={{ width: "100%" }}>
                {message}
            </Alert>
        </Snackbar>
    )
}

export default SuccessSnackbar
