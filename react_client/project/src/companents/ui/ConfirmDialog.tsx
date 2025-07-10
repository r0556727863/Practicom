"use client"

import type React from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button } from "@mui/material"

interface ConfirmDialogProps {
    open: boolean
    title: string
    message: string
    confirmText?: string
    cancelText?: string
    onConfirm: () => void
    onCancel: () => void
    confirmColor?: "primary" | "error" | "warning"
}

// קומפוננטה כללית לאישור פעולות - 45 שורות
const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
    open,
    title,
    message,
    confirmText = "אישור",
    cancelText = "ביטול",
    onConfirm,
    onCancel,
    confirmColor = "primary",
}) => {
    return (
        <Dialog
            open={open}
            onClose={onCancel}
            PaperProps={{
                sx: {
                    borderRadius: 20,
                    background: "rgba(255, 255, 255, 0.08)",
                    backdropFilter: "blur(30px)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
                    padding: 2,
                },
            }}
        >
            <DialogTitle dir="rtl" sx={{ color: "white" }}>
                {title}
            </DialogTitle>
            <DialogContent dir="rtl">
                <Typography color="rgba(255, 255, 255, 0.8)">{message}</Typography>
            </DialogContent>
            <DialogActions sx={{ justifyContent: "flex-start" }}>
                <Button onClick={onCancel} color="inherit">
                    {cancelText}
                </Button>
                <Button onClick={onConfirm} variant="contained" color={confirmColor}>
                    {confirmText}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog
