// "use client"

// import React, { useState, useEffect } from "react"
// import {
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     Button,
//     Typography,
//     Box,
//     CircularProgress,
//     List,
//     //   ListItem,
//     ListItemIcon,
//     ListItemText,
//     IconButton,
//     Divider,
//     TextField,
//     ListItem,
// } from "@mui/material"
// import CloseIcon from "@mui/icons-material/Close"
// import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"
// import FolderSpecialIcon from "@mui/icons-material/FolderSpecial"
// import CheckCircleIcon from "@mui/icons-material/CheckCircle"
// import SendIcon from "@mui/icons-material/Send"
// import axios from "axios"
// import { useNavigate } from "react-router-dom"

// interface AIAlbumSuggestionsProps {
//     open: boolean
//     onClose: () => void
// }

// interface AlbumSuggestion {
//     title: string
//     description: string
//     selected: boolean
// }

// const AIAlbumSuggestions: React.FC<AIAlbumSuggestionsProps> = ({ open, onClose }) => {
//     const [loading, setLoading] = useState(false)
//     const [suggestions, setSuggestions] = useState<AlbumSuggestion[]>([])
//     const [error, setError] = useState<string | null>(null)
//     const [prompt, setPrompt] = useState<string>("הצע לי רעיונות לאלבומים")
//     const token = localStorage.getItem("token")
//     const navigate = useNavigate()

//     const generateSuggestions = async () => {
//         setLoading(true)
//         setError(null)

//         try {
//             // שליחת בקשה ל-AI לקבלת הצעות לאלבומים
//             const response = await axios.post(
//                 "https://localhost:7259/api/AiDescription/aidescription",
//                 {
//                     GeneratedText: prompt,
//                 },
//                 {
//                     headers: {
//                         Authorization: token ? `Bearer ${token}` : "",
//                         "Content-Type": "application/json",
//                     },
//                 },
//             )

//             const aiResponse = response.data.description || ""

//             // עיבוד התשובה לרשימת הצעות
//             const processedSuggestions = processAIResponse(aiResponse)
//             setSuggestions(processedSuggestions)
//         } catch (error) {
//             console.error("Error generating album suggestions:", error)
//             setError("אירעה שגיאה בקבלת הצעות לאלבומים. אנא נסה שוב מאוחר יותר.")
//         } finally {
//             setLoading(false)
//         }
//     }

//     // עיבוד התשובה מה-AI לרשימת הצעות
//     const processAIResponse = (response: string): AlbumSuggestion[] => {
//         // פיצול התשובה לשורות
//         const lines = response.split("\n").filter((line) => line.trim() !== "")

//         const suggestions: AlbumSuggestion[] = []

//         // ניסיון לחלץ כותרות ותיאורים
//         for (let i = 0; i < lines.length; i++) {
//             const line = lines[i].trim()

//             // חיפוש כותרות (שורות שמתחילות בספרה או בסימן כלשהו)
//             if (/^[\d.\-*]+\s+(.+)/.test(line) || /^[א-ת]+:/.test(line)) {
//                 const title = line.replace(/^[\d.\-*]+\s+/, "").replace(/:$/, "")
//                 let description = ""

//                 // בדיקה אם השורה הבאה היא תיאור
//                 if (i + 1 < lines.length && !/^[\d.\-*]+\s+/.test(lines[i + 1])) {
//                     description = lines[i + 1].trim()
//                     i++ // דילוג על שורת התיאור
//                 }

//                 suggestions.push({
//                     title,
//                     description,
//                     selected: false,
//                 })
//             }
//         }

//         // אם לא הצלחנו לחלץ הצעות בפורמט מובנה, ניצור הצעות כלליות
//         if (suggestions.length === 0) {
//             // חלוקה לפסקאות או משפטים
//             const segments = response.split(/[.!?]/).filter((s) => s.trim().length > 10)

//             for (let i = 0; i < Math.min(segments.length, 5); i++) {
//                 const segment = segments[i].trim()
//                 const words = segment.split(" ")

//                 // שימוש במילים הראשונות ככותרת והשאר כתיאור
//                 const title = words.slice(0, 3).join(" ")
//                 const description = words.slice(3).join(" ")

//                 suggestions.push({
//                     title,
//                     description,
//                     selected: false,
//                 })
//             }
//         }

//         // אם עדיין אין הצעות, נחזיר הצעות ברירת מחדל
//         if (suggestions.length === 0) {
//             return [
//                 { title: "אלבום משפחתי", description: "תמונות של המשפחה מאירועים שונים", selected: false },
//                 { title: "טיולים בארץ", description: "תמונות מטיולים ברחבי הארץ", selected: false },
//                 { title: "חגים ומועדים", description: "תמונות מחגיגות החגים השונים", selected: false },
//                 { title: 'חופשות בחו"ל', description: 'תמונות מחופשות בחו"ל', selected: false },
//                 { title: "אירועים מיוחדים", description: "תמונות מאירועים מיוחדים כמו חתונות ובר מצוות", selected: false },
//             ]
//         }

//         return suggestions
//     }

//     const toggleSelection = (index: number) => {
//         setSuggestions((prev) =>
//             prev.map((suggestion, i) => (i === index ? { ...suggestion, selected: !suggestion.selected } : suggestion)),
//         )
//     }

//     const createSelectedAlbums = () => {
//         // כאן יש להוסיף לוגיקה ליצירת האלבומים שנבחרו
//         const selectedAlbums = suggestions.filter((s) => s.selected)

//         if (selectedAlbums.length > 0) {
//             // שמירת ההצעות שנבחרו ב-localStorage לשימוש בדף יצירת האלבום
//             localStorage.setItem("albumSuggestions", JSON.stringify(selectedAlbums))

//             // מעבר לדף יצירת אלבום
//             navigate("/AddAlbum")
//             onClose()
//         }
//     }

//     useEffect(() => {
//         if (open) {
//             generateSuggestions()
//         }
//     }, [open])

//     return (
//         <Dialog
//             open={open}
//             onClose={onClose}
//             maxWidth="md"
//             fullWidth
//             PaperProps={{
//                 sx: {
//                     borderRadius: 3,
//                     background: "rgba(255, 255, 255, 0.95)",
//                     backdropFilter: "blur(10px)",
//                     boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
//                     overflow: "hidden",
//                     direction: "rtl",
//                 },
//             }}
//         >
//             <DialogTitle sx={{ pb: 1 }}>
//                 <Box display="flex" alignItems="center" justifyContent="space-between">
//                     <Box display="flex" alignItems="center" gap={1}>
//                         <FolderSpecialIcon sx={{ color: "#ff758c" }} />
//                         <Typography variant="h6" fontWeight="bold">
//                             הצעות חכמות לאלבומים
//                         </Typography>
//                     </Box>
//                     <IconButton onClick={onClose} edge="end" aria-label="close">
//                         <CloseIcon />
//                     </IconButton>
//                 </Box>
//             </DialogTitle>

//             <DialogContent>
//                 <Box sx={{ mb: 3 }}>
//                     <Typography variant="body1" paragraph>
//                         ה-AI שלנו יכול להציע לך רעיונות לאלבומים חדשים. בחר את ההצעות שמעניינות אותך ואנחנו ניצור אותן עבורך.
//                     </Typography>

//                     <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
//                         <TextField
//                             fullWidth
//                             variant="outlined"
//                             placeholder="תאר את סוג האלבומים שאתה מחפש..."
//                             value={prompt}
//                             onChange={(e) => setPrompt(e.target.value)}
//                             sx={{
//                                 "& .MuiOutlinedInput-root": {
//                                     borderRadius: 2,
//                                 },
//                             }}
//                         />
//                         <Button
//                             variant="contained"
//                             onClick={generateSuggestions}
//                             disabled={loading}
//                             sx={{
//                                 borderRadius: 2,
//                                 background: "linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)",
//                                 minWidth: "auto",
//                                 px: 2,
//                             }}
//                         >
//                             <SendIcon />
//                         </Button>
//                     </Box>
//                 </Box>

//                 {loading ? (
//                     <Box
//                         sx={{
//                             display: "flex",
//                             flexDirection: "column",
//                             alignItems: "center",
//                             justifyContent: "center",
//                             py: 4,
//                         }}
//                     >
//                         <CircularProgress size={60} sx={{ color: "#ff758c", mb: 3 }} />
//                         <Typography variant="h6">מייצר הצעות לאלבומים...</Typography>
//                         <Typography variant="body2" color="text.secondary">
//                             ה-AI שלנו עובד על יצירת הצעות מותאמות אישית
//                         </Typography>
//                     </Box>
//                 ) : error ? (
//                     <Box
//                         sx={{
//                             p: 3,
//                             bgcolor: "rgba(211, 47, 47, 0.1)",
//                             borderRadius: 2,
//                             color: "error.main",
//                         }}
//                     >
//                         <Typography variant="h6" gutterBottom>
//                             שגיאה
//                         </Typography>
//                         <Typography variant="body2">{error}</Typography>
//                         <Button variant="outlined" color="error" onClick={generateSuggestions} sx={{ mt: 2 }}>
//                             נסה שוב
//                         </Button>
//                     </Box>
//                 ) : (
//                     <List sx={{ bgcolor: "rgba(255, 255, 255, 0.5)", borderRadius: 2 }}>
//                         {suggestions.map((suggestion, index) => (
//                             <React.Fragment key={index}>
//                                 {index > 0 && <Divider component="li" />}
//                                 <ListItem
//                                     component="button" // שינוי ל-"button" במקום "div"
//                                     onClick={() => toggleSelection(index)}
//                                     sx={{
//                                         borderRadius: 2,
//                                         mb: 1,
//                                         bgcolor: suggestion.selected ? "rgba(255, 117, 140, 0.1)" : "transparent",
//                                         "&:hover": {
//                                             bgcolor: suggestion.selected ? "rgba(255, 117, 140, 0.2)" : "rgba(0, 0, 0, 0.04)",
//                                         },
//                                     }}
//                                 >
//                                     <ListItemIcon>
//                                         {suggestion.selected ? (
//                                             <CheckCircleIcon sx={{ color: "#ff758c" }} />
//                                         ) : (
//                                             <FolderSpecialIcon sx={{ color: "#666" }} />
//                                         )}
//                                     </ListItemIcon>
//                                     <ListItemText
//                                         primary={
//                                             <Typography variant="subtitle1" fontWeight={suggestion.selected ? "bold" : "normal"}>
//                                                 {suggestion.title}
//                                             </Typography>
//                                         }
//                                         secondary={suggestion.description}
//                                     />
//                                 </ListItem>

//                             </React.Fragment>
//                         ))}
//                     </List>
//                 )}
//             </DialogContent>

//             <DialogActions sx={{ p: 2, borderTop: "1px solid rgba(0, 0, 0, 0.1)" }}>
//                 <Button onClick={onClose} color="inherit">
//                     סגור
//                 </Button>
//                 <Button
//                     onClick={createSelectedAlbums}
//                     variant="contained"
//                     disabled={loading || suggestions.filter((s) => s.selected).length === 0}
//                     startIcon={<AutoAwesomeIcon />}
//                     sx={{
//                         borderRadius: 2,
//                         background: "linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)",
//                     }}
//                 >
//                     צור אלבומים נבחרים
//                 </Button>
//             </DialogActions>
//         </Dialog>
//     )
// }

// export default AIAlbumSuggestions
"use client"

import React, { useState, useEffect } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  TextField,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import SendIcon from "@mui/icons-material/Send"
import axios from "axios"
import { useNavigate } from "react-router-dom"

interface AIAlbumSuggestionsProps {
  open: boolean
  onClose: () => void
}

interface AlbumSuggestion {
  title: string
  description: string
  selected: boolean
}

const AIAlbumSuggestions: React.FC<AIAlbumSuggestionsProps> = ({ open, onClose }) => {
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<AlbumSuggestion[]>([])
  const [error, setError] = useState<string | null>(null)
  const [prompt, setPrompt] = useState<string>("הצע לי רעיונות לאלבומים")
  const token = localStorage.getItem("token")
  const navigate = useNavigate()

  const generateSuggestions = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await axios.post(
        "https://localhost:7259/api/AiDescription/aidescription",
        {
          GeneratedText: prompt,
        },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        },
      )

      const aiResponse = response.data.description || ""
      const processedSuggestions = processAIResponse(aiResponse)
      setSuggestions(processedSuggestions)
    } catch (error) {
      console.error("Error generating album suggestions:", error)
      setError("אירעה שגיאה בקבלת הצעות לאלבומים. אנא נסה שוב מאוחר יותר.")
    } finally {
      setLoading(false)
    }
  }

  const processAIResponse = (response: string): AlbumSuggestion[] => {
    const lines = response.split("\n").filter((line) => line.trim() !== "")
    const suggestions: AlbumSuggestion[] = []

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()

      if (/^[\d.\-*]+\s+(.+)/.test(line) || /^[א-ת]+:/.test(line)) {
        const title = line.replace(/^[\d.\-*]+\s+/, "").replace(/:$/, "")
        let description = ""

        if (i + 1 < lines.length && !/^[\d.\-*]+\s+/.test(lines[i + 1])) {
          description = lines[i + 1].trim()
          i++
        }

        suggestions.push({
          title,
          description,
          selected: false,
        })
      }
    }

    if (suggestions.length === 0) {
      const segments = response.split(/[.!?]/).filter((s) => s.trim().length > 10)

      for (let i = 0; i < Math.min(segments.length, 5); i++) {
        const segment = segments[i].trim()
        const words = segment.split(" ")
        const title = words.slice(0, 3).join(" ")
        const description = words.slice(3).join(" ")

        suggestions.push({
          title,
          description,
          selected: false,
        })
      }
    }

    if (suggestions.length === 0) {
      return [
        { title: "אלבום משפחתי", description: "תמונות של המשפחה מאירועים שונים", selected: false },
        { title: "טיולים בארץ", description: "תמונות מטיולים ברחבי הארץ", selected: false },
        { title: "חגים ומועדים", description: "תמונות מחגיגות החגים השונים", selected: false },
        { title: 'חופשות בחו"ל', description: 'תמונות מחופשות בחו"ל', selected: false },
        { title: "אירועים מיוחדים", description: "תמונות מאירועים מיוחדים כמו חתונות ובר מצוות", selected: false },
      ]
    }

    return suggestions
  }

  const toggleSelection = (index: number) => {
    setSuggestions((prev) =>
      prev.map((suggestion, i) => (i === index ? { ...suggestion, selected: !suggestion.selected } : suggestion)),
    )
  }

  const createSelectedAlbums = () => {
    const selectedAlbums = suggestions.filter((s) => s.selected)

    if (selectedAlbums.length > 0) {
      localStorage.setItem("albumSuggestions", JSON.stringify(selectedAlbums))
      navigate("/AddAlbum")
      onClose()
    }
  }

  useEffect(() => {
    if (open) {
      generateSuggestions()
    }
  }, [open])

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
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
      <DialogTitle sx={{ pb: 1 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={1}>
            <FolderSpecialIcon sx={{ color: "#00d4ff" }} />
            <Typography variant="h6" fontWeight="bold" color="white">
              הצעות חכמות לאלבומים
            </Typography>
          </Box>
          <IconButton onClick={onClose} edge="end" aria-label="close" sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" paragraph color="rgba(255,255,255,0.9)">
            ה-AI שלנו יכול להציע לך רעיונות לאלבומים חדשים. בחר את ההצעות שמעניינות אותך ואנחנו ניצור אותן עבורך.
          </Typography>

          <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="תאר את סוג האלבומים שאתה מחפש..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
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
              onClick={generateSuggestions}
              disabled={loading}
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
        </Box>

        {loading ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              py: 4,
            }}
          >
            <CircularProgress size={60} sx={{ color: "#00d4ff", mb: 3 }} />
            <Typography variant="h6" color="white">
              מייצר הצעות לאלבומים...
            </Typography>
            <Typography variant="body2" color="rgba(255,255,255,0.7)">
              ה-AI שלנו עובד על יצירת הצעות מותאמות אישית
            </Typography>
          </Box>
        ) : error ? (
          <Box
            sx={{
              p: 3,
              bgcolor: "rgba(255, 82, 82, 0.2)",
              borderRadius: 15,
              border: "1px solid rgba(255, 82, 82, 0.3)",
              color: "white",
            }}
          >
            <Typography variant="h6" gutterBottom>
              שגיאה
            </Typography>
            <Typography variant="body2">{error}</Typography>
            <Button
              variant="outlined"
              onClick={generateSuggestions}
              sx={{
                mt: 2,
                color: "white",
                borderColor: "rgba(255, 255, 255, 0.3)",
                "&:hover": {
                  borderColor: "rgba(255, 255, 255, 0.5)",
                  background: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              נסה שוב
            </Button>
          </Box>
        ) : (
          <List
            sx={{
              bgcolor: "rgba(255, 255, 255, 0.05)",
              borderRadius: 15,
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            {suggestions.map((suggestion, index) => (
              <React.Fragment key={index}>
                {index > 0 && <Divider component="li" sx={{ borderColor: "rgba(255, 255, 255, 0.1)" }} />}
                <ListItem
                  component="button"
                  onClick={() => toggleSelection(index)}
                  sx={{
                    borderRadius: 10,
                    mb: 1,
                    bgcolor: suggestion.selected ? "rgba(0, 212, 255, 0.2)" : "transparent",
                    "&:hover": {
                      bgcolor: suggestion.selected ? "rgba(0, 212, 255, 0.3)" : "rgba(255, 255, 255, 0.05)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  <ListItemIcon>
                    {suggestion.selected ? (
                      <CheckCircleIcon sx={{ color: "#00d4ff" }} />
                    ) : (
                      <FolderSpecialIcon sx={{ color: "rgba(255, 255, 255, 0.6)" }} />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        variant="subtitle1"
                        fontWeight={suggestion.selected ? "bold" : "normal"}
                        color="white"
                      >
                        {suggestion.title}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
                        {suggestion.description}
                      </Typography>
                    }
                  />
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 3, borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}>
        <Button
          onClick={onClose}
          sx={{
            color: "rgba(255, 255, 255, 0.7)",
            "&:hover": { color: "white" },
          }}
        >
          סגור
        </Button>
        <Button
          onClick={createSelectedAlbums}
          variant="contained"
          disabled={loading || suggestions.filter((s) => s.selected).length === 0}
          startIcon={<AutoAwesomeIcon />}
          sx={{
            borderRadius: 15,
            background: "linear-gradient(135deg, #00d4ff 0%, #9c27b0 50%, #ff6ec7 100%)",
            "&:hover": {
              background: "linear-gradient(135deg, #00b8e6 0%, #8e24aa 50%, #e91e63 100%)",
            },
          }}
        >
          צור אלבומים נבחרים
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AIAlbumSuggestions
