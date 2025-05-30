// "use client"

// import type React from "react"
// import { useState } from "react"
// import {
//   Box,
//   Fab,
//   Tooltip,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   TextField,
//   Typography,
//   CircularProgress,
//   IconButton,
//   Paper,
// } from "@mui/material"
// import SmartToyIcon from "@mui/icons-material/SmartToy"
// import CloseIcon from "@mui/icons-material/Close"
// import SendIcon from "@mui/icons-material/Send"
// import axios from "axios"

// interface Message {
//   text: string
//   sender: "user" | "ai"
//   timestamp: Date
// }

// const AIAssistantButton: React.FC = () => {
//   const [open, setOpen] = useState(false)
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       text: "שלום! אני העוזר החכם של אלבומיקס. איך אוכל לעזור לך עם האלבומים שלך?",
//       sender: "ai",
//       timestamp: new Date(),
//     },
//   ])
//   const [input, setInput] = useState("")
//   const [loading, setLoading] = useState(false)
//   const token = localStorage.getItem("token")

//   const handleOpen = () => {
//     setOpen(true)
//   }

//   const handleClose = () => {
//     setOpen(false)
//   }

//   const handleSend = async () => {
//     if (!input.trim()) return

//     // הוסף את ההודעה של המשתמש
//     const userMessage: Message = {
//       text: input,
//       sender: "user",
//       timestamp: new Date(),
//     }
//     setMessages((prev) => [...prev, userMessage])
//     setInput("")
//     setLoading(true)

//     try {
//       // שליחת בקשה ל-AI
//       const response = await axios.post(
//         "https://localhost:7259/api/AiDescription/chat",
//         {
//           generatedText: input,
//         },
//         {
//           headers: {
//             Authorization: token ? `Bearer ${token}` : "",
//             "Content-Type": "application/json",
//           },
//         },
//       )

//       // הוספת התשובה מה-AI
//       const aiMessage: Message = {
//         text: response.data.answer || "לא הצלחתי לייצר תשובה. אנא נסה שוב.",
//         sender: "ai",
//         timestamp: new Date(),
//       }
//       setMessages((prev) => [...prev, aiMessage])
//     } catch (error) {
//       console.error("Error fetching AI response:", error)
//       // הוספת הודעת שגיאה
//       const errorMessage: Message = {
//         text: "אירעה שגיאה בתקשורת עם ה-AI. אנא נסה שוב מאוחר יותר.",
//         sender: "ai",
//         timestamp: new Date(),
//       }
//       setMessages((prev) => [...prev, errorMessage])
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault()
//       handleSend()
//     }
//   }

//   return (
//     <>
//       <Tooltip title="עוזר AI חכם" placement="left">
//         <Fab
//           color="primary"
//           aria-label="AI Assistant"
//           onClick={handleOpen}
//           sx={{
//             position: "fixed",
//             bottom: 11,
//             right: 16,
//             zIndex: 1000,
//             background: "linear-gradient(135deg,rgb(186, 73, 92) 0%,rgb(250, 109, 168) 100%)",
//             boxShadow: "0 4px 20px rgba(108, 64, 71, 0.4)",
//             "&:hover": {
//               background: "linear-gradient(135deg, #ff758c 0%, #ff7eb3 80%)",
//             },
//           }}
//         >
//           <SmartToyIcon />
//         </Fab>
//       </Tooltip>

//       <Dialog
//         open={open}
//         onClose={handleClose}
//         maxWidth="sm"
//         fullWidth
//         PaperProps={{
//           sx: {
//             borderRadius: 3,
//             background: "rgba(255, 255, 255, 0.95)",
//             backdropFilter: "blur(10px)",
//             boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
//             overflow: "hidden",
//             direction: "rtl",
//           },
//         }}
//       >
//         <DialogTitle sx={{ pb: 1, pt: 2 }}>
//           <Box display="flex" alignItems="center" justifyContent="space-between">
//             <Box display="flex" alignItems="center" gap={1}>
//               <SmartToyIcon sx={{ color: "#ff758c" }} />
//               <Typography variant="h6" fontWeight="bold">
//                 עוזר AI חכם
//               </Typography>
//             </Box>
//             <IconButton onClick={handleClose} edge="end" aria-label="close">
//               <CloseIcon />
//             </IconButton>
//           </Box>
//         </DialogTitle>

//         <DialogContent sx={{ p: 0 }}>
//           <Box
//             sx={{
//               height: "50vh",
//               overflowY: "auto",
//               p: 2,
//               display: "flex",
//               flexDirection: "column",
//               gap: 2,
//             }}
//           >
//             {messages.map((message, index) => (
//               <Box
//                 key={index}
//                 sx={{
//                   display: "flex",
//                   justifyContent: message.sender === "user" ? "flex-start" : "flex-end",
//                 }}
//               >
//                 <Paper
//                   elevation={1}
//                   sx={{
//                     p: 2,
//                     maxWidth: "80%",
//                     borderRadius: 3,
//                     ...(message.sender === "user"
//                       ? {
//                           bgcolor: "#f0f0f0",
//                           color: "#333",
//                         }
//                       : {
//                           background: "linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)",
//                           color: "white",
//                         }),
//                   }}
//                 >
//                   <Typography variant="body1">{message.text}</Typography>
//                   <Typography variant="caption" sx={{ opacity: 0.7, display: "block", mt: 0.5 }}>
//                     {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
//                   </Typography>
//                 </Paper>
//               </Box>
//             ))}
//             {loading && (
//               <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
//                 <Paper
//                   elevation={1}
//                   sx={{
//                     p: 2,
//                     borderRadius: 3,
//                     background: "linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)",
//                     color: "white",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 1,
//                   }}
//                 >
//                   <CircularProgress size={20} sx={{ color: "white" }} />
//                   <Typography variant="body2">חושב...</Typography>
//                 </Paper>
//               </Box>
//             )}
//           </Box>
//         </DialogContent>

//         <DialogActions sx={{ p: 2, borderTop: "1px solid rgba(0, 0, 0, 0.1)" }}>
//           <Box sx={{ display: "flex", width: "100%", gap: 1 }}>
//             <TextField
//               fullWidth
//               variant="outlined"
//               placeholder="שאל את ה-AI..."
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyPress={handleKeyPress}
//               disabled={loading}
//               sx={{
//                 "& .MuiOutlinedInput-root": {
//                   borderRadius: 3,
//                   bgcolor: "rgba(0, 0, 0, 0.03)",
//                 },
//               }}
//             />
//             <Button
//               variant="contained"
//               onClick={handleSend}
//               disabled={!input.trim() || loading}
//               sx={{
//                 borderRadius: 2,
//                 background: "linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)",
//                 minWidth: "auto",
//                 px: 2,
//               }}
//             >
//               <SendIcon />
//             </Button>
//           </Box>
//         </DialogActions>
//       </Dialog>
//     </>
//   )
// }

// export default AIAssistantButton


import type React from "react"
import { useState } from "react"
import {
  Box,
  Fab,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  CircularProgress,
  IconButton,
  Paper,
} from "@mui/material"
import SmartToyIcon from "@mui/icons-material/SmartToy"
import CloseIcon from "@mui/icons-material/Close"
import SendIcon from "@mui/icons-material/Send"
import axios from "axios"

interface Message {
  text: string
  sender: "user" | "ai"
  timestamp: Date
}

const AIAssistantButton: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "שלום! אני העוזר החכם של אלבומיקס. איך אוכל לעזור לך עם האלבומים שלך?",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const token = localStorage.getItem("token")

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      text: input,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/AiDescription/chat`,
        {
          generatedText: input,
        },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        },
      )

      const aiMessage: Message = {
        text: response.data.answer || "לא הצלחתי לייצר תשובה. אנא נסה שוב.",
        sender: "ai",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("Error fetching AI response:", error)
      const errorMessage: Message = {
        text: "אירעה שגיאה בתקשורת עם ה-AI. אנא נסה שוב מאוחר יותר.",
        sender: "ai",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      <Tooltip title="עוזר AI חכם" placement="left">
        <Fab
          color="primary"
          aria-label="AI Assistant"
          onClick={handleOpen}
          sx={{
            position: "fixed",
            bottom: 10,
            right: 16,
            zIndex: 1000,
            background: "linear-gradient(135deg, #00d4ff 0%, #9c27b0 50%, #ff6ec7 100%)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 8px 30px rgba(0, 212, 255, 0.4)",
            "&:hover": {
              background: "linear-gradient(135deg, #00b8e6 0%, #8e24aa 50%, #e91e63 100%)",
              transform: "scale(1.1)",
              boxShadow: "0 12px 40px rgba(0, 212, 255, 0.5)",
            },
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <SmartToyIcon />
        </Fab>
      </Tooltip>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 20,
            background: "rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(30px)",
            boxShadow: "0 25px 80px rgba(0, 0, 0, 0.3)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            overflow: "hidden",
            direction: "rtl",
            color: "white",
          },
        }}
      >
        <DialogTitle sx={{ pb: 1, pt: 2 }}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center" gap={1}>
              <SmartToyIcon sx={{ color: "#00d4ff" }} />
              <Typography variant="h6" fontWeight="bold" color="white">
                עוזר AI חכם
              </Typography>
            </Box>
            <IconButton onClick={handleClose} edge="end" aria-label="close" sx={{ color: "white" }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent sx={{ p: 0 }}>
          <Box
            sx={{
              height: "50vh",
              overflowY: "auto",
              p: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {messages.map((message, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: message.sender === "user" ? "flex-start" : "flex-end",
                }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    p: 2,
                    maxWidth: "80%",
                    borderRadius: 15,
                    ...(message.sender === "user"
                      ? {
                          background: "rgba(255, 255, 255, 0.1)",
                          backdropFilter: "blur(10px)",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                          color: "white",
                        }
                      : {
                          background: "linear-gradient(135deg, #00d4ff 0%, #9c27b0 50%, #ff6ec7 100%)",
                          color: "white",
                        }),
                  }}
                >
                  <Typography variant="body1">{message.text}</Typography>
                  <Typography variant="caption" sx={{ opacity: 0.7, display: "block", mt: 0.5 }}>
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </Typography>
                </Paper>
              </Box>
            ))}
            {loading && (
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 2,
                    borderRadius: 15,
                    background: "linear-gradient(135deg, #00d4ff 0%, #9c27b0 50%, #ff6ec7 100%)",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <CircularProgress size={20} sx={{ color: "white" }} />
                  <Typography variant="body2">חושב...</Typography>
                </Paper>
              </Box>
            )}
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 2, borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}>
          <Box sx={{ display: "flex", width: "100%", gap: 1 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="שאל את ה-AI..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 15,
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "white",
                  "& fieldset": { border: "none" },
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "rgba(255, 255, 255, 0.7)",
                },
              }}
            />
            <Button
              variant="contained"
              onClick={handleSend}
              disabled={!input.trim() || loading}
              sx={{
                borderRadius: 15,
                background: "linear-gradient(135deg, #00d4ff 0%, #9c27b0 50%, #ff6ec7 100%)",
                minWidth: "auto",
                px: 3,
                "&:hover": {
                  background: "linear-gradient(135deg, #00b8e6 0%, #8e24aa 50%, #e91e63 100%)",
                },
              }}
            >
              <SendIcon />
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AIAssistantButton
