
// import { useEffect, useRef, useState } from "react"
// import axios from "axios"
// import { useNavigate } from "react-router-dom"
// import {
//   Container,
//   Typography,
//   Button,
//   Grid,
//   Box,
//   TextField,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   CircularProgress,
//   IconButton,
//   Tooltip,
//   Alert,
//   Fab,
//   SvgIcon,
//   Snackbar,
// } from "@mui/material"
// import FolderIcon from "@mui/icons-material/Folder"
// import EditIcon from "@mui/icons-material/Edit"
// import DeleteIcon from "@mui/icons-material/Delete"
// import AddIcon from "@mui/icons-material/Add"
// import CloseIcon from "@mui/icons-material/Close"
// import { useUserContext } from "../context/UserContext"
// import { folderListStyles } from "../styles/folderList.styles"

// interface Folder {
//   albumId: number
//   title: string
//   userId: number
//   description: string
// }

// const FolderList = () => {
//   const [folders, setFolders] = useState<Folder[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [editingFolder, setEditingFolder] = useState<Folder | null>(null)
//   const [newTitle, setNewTitle] = useState<string>("")
//   const [currentDescription, setCurrentDescription] = useState<string>("")
//   const [saving, setSaving] = useState(false)
//   const [isEditing, setIsEditing] = useState(false)
//   const [successMessage, setSuccessMessage] = useState<string | null>(null)
//   const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false)
//   const [folderIdToDelete, setFolderIdToDelete] = useState<number | null>(null)
//   const [snackbarOpen, setSnackbarOpen] = useState(false)
//   const navigate = useNavigate()
//   const token = localStorage.getItem("token")
//   const { user } = useUserContext()
//   const inputRef = useRef<HTMLInputElement | null>(null)

//   useEffect(() => {
//     if (isEditing) {
//       setTimeout(() => {
//         inputRef.current?.focus()
//       }, 50)
//     }
//   }, [isEditing])

//   useEffect(() => {
//     const fetchFolders = async () => {
//       if (!token || !user?.UserId) {
//         setError("המשתמש אינו מחובר. אנא התחבר.")
//         setLoading(false)
//         navigate("/Login")
//         return
//       }

//       try {
//         const response = await axios.get("https://localhost:7259/api/album", {
//           headers: { Authorization: `Bearer ${token}` },
//         })

//         const userFolders = response.data.filter((folder: Folder) => folder.userId === user?.UserId)
//         setFolders(userFolders)
//       } catch (err) {
//         setError(axios.isAxiosError(err) ? err.message : "שגיאה לא ידועה")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchFolders()
//   }, [user])

//   const openFolder = async (folder: Folder) => {
//     if (isEditing) return
//     navigate("/FolderImages", { state: { folderId: folder.albumId, userId: folder.userId } })
//   }

//   const handleDeleteFolder = async () => {
//     if (!token || !folderIdToDelete) return;

//     try {
//       await axios.delete(`https://localhost:7259/api/album/${folderIdToDelete}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })

//       setFolders((prev) => prev.filter((f) => f.albumId !== folderIdToDelete))
//       setSuccessMessage("האלבום נמחק בהצלחה")
//       setSnackbarOpen(true) // פתח את ה-Snackbar
//     } catch (err) {
//       alert(axios.isAxiosError(err) ? err.message : "שגיאה לא ידועה")
//     } finally {
//       setDeleteDialogOpen(false);
//       setFolderIdToDelete(null);
//     }
//   }

//   const startEditing = (folder: Folder) => {
//     setEditingFolder(folder)
//     setNewTitle(folder.title)
//     setCurrentDescription(folder.description)
//     setIsEditing(true)
//   }

//   const saveTitle = async () => {
//     const userId = user?.UserId
//     if (!token || !editingFolder) {
//       return
//     }
//     setSaving(true)
//     try {
//       await axios.put(
//         `https://localhost:7259/api/album/${editingFolder.albumId}`,
//         {
//           albumId: editingFolder.albumId,
//           title: newTitle,
//           userId: userId,
//           description: currentDescription,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         },
//       )

//       setFolders((prev) =>
//         prev.map((f) =>
//           f.albumId === editingFolder.albumId ? { ...f, title: newTitle, description: currentDescription } : f,
//         ),
//       )

//       setIsEditing(false)
//       setEditingFolder(null)
//       setSuccessMessage("האלבום עודכן בהצלחה");
//       setSnackbarOpen(true); // פתח את ה-Snackbar
//           } catch (err) {
//       alert(axios.isAxiosError(err) ? err.message : "שגיאה לא ידועה")
//     } finally {
//       setSaving(false)
//     }
//   }

//   const cancelEditing = () => {
//     setIsEditing(false)
//     setEditingFolder(null)
//   }

//   return (
//     <Box sx={folderListStyles.container}>
//       <Box sx={folderListStyles.background} />
//       <Box sx={folderListStyles.overlay} />
//       <Container maxWidth="lg" sx={folderListStyles.contentContainer}>
//       <Snackbar
//   open={snackbarOpen}
//   autoHideDuration={3000}
//   onClose={() => setSnackbarOpen(false)}
//   anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // שינוי המיקום כאן
//   sx={{ zIndex: 3300, marginTop: '50px' }} // הוסף מרווח מהחלק העליון
// >
//   <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
//     {successMessage}
//   </Alert>
// </Snackbar>
//         <Box sx={folderListStyles.header}>
//           <Button
//             variant="contained"
//             startIcon={<AddIcon />}
//             onClick={() => navigate("/AddAlbum")}
//             sx={folderListStyles.addButton}
//           >
//             הוסף אלבום חדש
//           </Button>
//           <Typography variant="h4" component="h1" fontWeight="bold" color="#333">
//             האלבומים שלי
//           </Typography>
//         </Box>

//         {loading ? (
//           <Box sx={folderListStyles.loadingContainer}>
//             <CircularProgress size={60} sx={{ color: "#ff758c" }} />
//           </Box>
//         ) : error ? (
//           <Alert severity="error" sx={folderListStyles.errorAlert}>
//             שגיאה: {error}
//           </Alert>
//         ) : folders.length === 0 ? (
//           <Box sx={folderListStyles.emptyState}>
//             <FolderIcon sx={folderListStyles.emptyStateIcon} />
//             <Typography variant="h5" gutterBottom fontWeight="bold" color="#333">
//               אין אלבומים להצגה
//             </Typography>
//             <Typography variant="body1" color="#555" paragraph sx={folderListStyles.emptyStateText}>
//               התחל ליצור אלבומים חדשים לארגון התמונות שלך
//             </Typography>
//             <Button
//               variant="contained"
//               startIcon={<AddIcon />}
//               onClick={() => navigate("/AddAlbum")}
//               sx={folderListStyles.createFirstAlbumButton}
//             >
//               צור אלבום ראשון
//             </Button>
//           </Box>
//         ) : (
//           <Grid container spacing={8}>
//             {folders.map((folder) => (
//               <Grid key={folder.albumId}>
//                 <Box onClick={() => openFolder(folder)} sx={folderListStyles.folderItem}>
//                   <SvgIcon sx={folderListStyles.folderIcon}>
//                     <defs>
//                       <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
//                         <stop offset="0%" style={{ stopColor: "#FF6F91", stopOpacity: 1 }} />
//                         <stop offset="100%" style={{ stopColor: "#9B59B6", stopOpacity: 1 }} />
//                       </linearGradient>
//                     </defs>
//                     <FolderIcon sx={{ fill: "url(#gradient)" }} />
//                   </SvgIcon>
//                   <Typography variant="h6" sx={folderListStyles.folderTitle}>
//                     {folder.title}
//                   </Typography>
//                   <Typography variant="body2" sx={folderListStyles.folderDescription}>
//                     {folder.description}
//                   </Typography>
//                   <Box sx={folderListStyles.actionButtons} onClick={(e) => e.stopPropagation()}>
//                     <Tooltip title="ערוך">
//                       <IconButton size="small" onClick={(e) => { e.stopPropagation(); startEditing(folder); }} sx={folderListStyles.editButton}>
//                         <EditIcon fontSize="small" />
//                       </IconButton>
//                     </Tooltip>
//                     <Tooltip title="מחק">
//                       <IconButton size="small" onClick={(e) => { e.stopPropagation(); setFolderIdToDelete(folder.albumId); setDeleteDialogOpen(true); }} sx={folderListStyles.deleteButton}>
//                         <DeleteIcon fontSize="small" />
//                       </IconButton>
//                     </Tooltip>
//                   </Box>
//                 </Box>
//               </Grid>
//             ))}
//           </Grid>
//         )}

//         <Dialog
//           open={isEditing}
//           onClose={cancelEditing}
//           disableEnforceFocus
//           PaperProps={{
//             sx: folderListStyles.dialogPaper,
//           }}
//         >
//           <DialogTitle sx={folderListStyles.dialogTitle}>
//             עריכת אלבום
//             <IconButton aria-label="close" onClick={cancelEditing} sx={folderListStyles.closeButton}>
//               <CloseIcon />
//             </IconButton>
//           </DialogTitle>
//           <DialogContent>
//             <TextField
//               inputRef={inputRef}
//               autoFocus
//               margin="dense"
//               label="שם האלבום"
//               fullWidth
//               value={newTitle}
//               onChange={(e) => setNewTitle(e.target.value)}
//               variant="outlined"
//               sx={folderListStyles.titleField}
//               InputProps={{
//                 sx: folderListStyles.inputProps,
//               }}
//               InputLabelProps={{
//                 sx: folderListStyles.inputLabelProps,
//               }}
//             />
//             <TextField
//               margin="dense"
//               label="תיאור האלבום"
//               fullWidth
//               multiline
//               rows={4}
//               value={currentDescription}
//               onChange={(e) => setCurrentDescription(e.target.value)}
//               variant="outlined"
//               InputProps={{
//                 sx: folderListStyles.inputProps,
//               }}
//               InputLabelProps={{
//                 sx: folderListStyles.inputLabelProps,
//               }}
//             />
//           </DialogContent>
//           <DialogActions sx={folderListStyles.dialogActions}>
//             <Button onClick={cancelEditing} color="inherit" sx={folderListStyles.cancelButton}>
//               ביטול
//             </Button>
//             <Button onClick={saveTitle} variant="contained" disabled={saving} sx={folderListStyles.saveButton}>
//               {saving ? <CircularProgress size={24} /> : "שמור שינויים"}
//             </Button>
//           </DialogActions>
//         </Dialog>

//         {/* Dialog for delete confirmation */}
//         <Dialog
//           open={isDeleteDialogOpen}
//           onClose={() => setDeleteDialogOpen(false)}
//           PaperProps={{
//             sx: folderListStyles.dialogPaper,
//           }}
//         >
//           <DialogTitle dir='rtl'>אישור מחיקה</DialogTitle>
//           <DialogContent dir="rtl">
//             <Typography>האם אתה בטוח שברצונך למחוק את האלבום?</Typography>
//           </DialogContent>
//           <DialogActions sx={{ justifyContent: 'flex-start' }}>
//             <Button onClick={() => setDeleteDialogOpen(false)} color="inherit">
//               לא
//             </Button>
//             <Button onClick={handleDeleteFolder} variant="contained" color="error">
//               כן, מחק
//             </Button>
//           </DialogActions>
//         </Dialog>

//         <Box sx={folderListStyles.mobileFab}>
//           <Fab color="primary" aria-label="add" onClick={() => navigate("/AddAlbum")} sx={folderListStyles.fab}>
//             <AddIcon />
//           </Fab>
//         </Box>
//       </Container>
//     </Box>
//   )
// }

// export default FolderList

import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import {
  Container, Typography, Button, Grid, Box, TextField, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress,
  IconButton, Tooltip, Alert, Fab, SvgIcon, Snackbar, InputAdornment,
} from "@mui/material"
import FolderIcon from "@mui/icons-material/Folder"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import AddIcon from "@mui/icons-material/Add"
import CloseIcon from "@mui/icons-material/Close"
import SearchIcon from "@mui/icons-material/Search"
import { useUserContext } from "../context/UserContext"
import { folderListStyles } from "../styles/folderList.styles"

interface Folder {
  albumId: number
  title: string
  userId: number
  description: string
}

const FolderList = () => {
  const [folders, setFolders] = useState<Folder[]>([])
  const [filteredFolders, setFilteredFolders] = useState<Folder[]>([])
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingFolder, setEditingFolder] = useState<Folder | null>(null)
  const [newTitle, setNewTitle] = useState<string>("")
  const [currentDescription, setCurrentDescription] = useState<string>("")
  const [saving, setSaving] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [folderIdToDelete, setFolderIdToDelete] = useState<number | null>(null)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const { user } = useUserContext()
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (isEditing) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 50)
    }
  }, [isEditing])


  useEffect(() => {
    const fetchFolders = async () => {
      if (!token || !user?.UserId) return // עדיין לא מוכן – אל תעשה כלום

      try {
        const response = await axios.get(  `${process.env.REACT_APP_API_URL}/album`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        const userFolders = response.data.filter(
          (folder: Folder) => folder.userId === user.UserId
        )
        setFolders(userFolders)
        setFilteredFolders(userFolders)
      } catch (err) {
        setError(axios.isAxiosError(err) ? err.message : "שגיאה לא ידועה")
      } finally {
        setLoading(false)
      }
    }

    fetchFolders()
  }, [user, token]) // נקרא רק כשהם באמת זמינים



  // חיפוש אלבומים רק לפי שם
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredFolders(folders)
    } else {
      const filtered = folders.filter((folder) => folder.title.toLowerCase().includes(searchTerm.toLowerCase()))
      setFilteredFolders(filtered)
    }
  }, [searchTerm, folders])

  const openFolder = async (folder: Folder) => {
    if (isEditing) return
    navigate("/FolderImages", { state: { folderId: folder.albumId, userId: folder.userId } })
  }

  const handleDeleteFolder = async () => {
    if (!token || !folderIdToDelete) return

    try {
      await axios.delete(  `${process.env.REACT_APP_API_URL}/album/${folderIdToDelete}`,{
        headers: { Authorization: `Bearer ${token}` },
      })

      setFolders((prev) => prev.filter((f) => f.albumId !== folderIdToDelete))
      setSuccessMessage("האלבום נמחק בהצלחה")
      setSnackbarOpen(true)
    } catch (err) {
      alert(axios.isAxiosError(err) ? err.message : "שגיאה לא ידועה")
    } finally {
      setDeleteDialogOpen(false)
      setFolderIdToDelete(null)
    }
  }

  const startEditing = (folder: Folder) => {
    setEditingFolder(folder)
    setNewTitle(folder.title)
    setCurrentDescription(folder.description)
    setIsEditing(true)
  }

  const saveTitle = async () => {
    const userId = user?.UserId
    if (!token || !editingFolder) {
      return
    }
    setSaving(true)
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/album/${editingFolder.albumId}`,
        {
          albumId: editingFolder.albumId,
          title: newTitle,
          userId: userId,
          description: currentDescription,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )

      setFolders((prev) =>
        prev.map((f) =>
          f.albumId === editingFolder.albumId ? { ...f, title: newTitle, description: currentDescription } : f,
        ),
      )

      setIsEditing(false)
      setEditingFolder(null)
      setSuccessMessage("האלבום עודכן בהצלחה")
      setSnackbarOpen(true)
    } catch (err) {
      alert(axios.isAxiosError(err) ? err.message : "שגיאה לא ידועה")
    } finally {
      setSaving(false)
    }
  }

  const cancelEditing = () => {
    setIsEditing(false)
    setEditingFolder(null)
  }

  return (
    <Box sx={folderListStyles.container}>
      <Box sx={folderListStyles.background} />
      <Box sx={folderListStyles.overlay} />

      <Container maxWidth="lg" sx={folderListStyles.contentContainer}>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          sx={{ zIndex: 3300, marginTop: "50px" }}
        >
          <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: "100%" }}>
            {successMessage}
          </Alert>
        </Snackbar>

        <Box sx={folderListStyles.header}>
          <Typography variant="h4" component="h1" fontWeight="bold" color="white">
            האלבומים שלי
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate("/AddAlbum")}
            sx={folderListStyles.addButton}
          >
            הוסף אלבום חדש
          </Button>
        </Box>

        {/* שדה חיפוש */}
        <Box sx={folderListStyles.searchContainer}>
          <TextField
            fullWidth
            placeholder="חפש אלבום לפי שם..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#00d4ff" }} />
                </InputAdornment>
              ),
              sx: folderListStyles.searchInput,
            }}
            sx={folderListStyles.searchField}
            inputProps={{
              dir: "rtl", // קובע שהטקסט ייכתב מימין לשמאל
              lang: "he"  // קובע שהשפה היא עברית
            }}
          />
        </Box>
        {loading ? (
          <Box sx={folderListStyles.loadingContainer}>
            <CircularProgress size={60} sx={{ color: "#00d4ff" }} />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={folderListStyles.errorAlert}>
            שגיאה: {error}
          </Alert>
        ) : filteredFolders.length === 0 ? (
          <Box sx={folderListStyles.emptyState}>
            <FolderIcon sx={folderListStyles.emptyStateIcon} />
            <Typography variant="h5" gutterBottom fontWeight="bold" color="white">
              {searchTerm ? "לא נמצאו אלבומים" : "אין אלבומים להצגה"}
            </Typography>
            <Typography
              variant="body1"
              color="rgba(255,255,255,0.8)"
              paragraph
              sx={folderListStyles.emptyStateText}
            >
              {searchTerm
                ? "נסה לחפש במילים אחרות או נקה את החיפוש"
                : "התחל ליצור אלבומים חדשים לארגון התמונות שלך"}
            </Typography>
            {!searchTerm && (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => navigate("/AddAlbum")}
                sx={folderListStyles.createFirstAlbumButton}
              >
                צור אלבום ראשון
              </Button>
            )}
          </Box>
        ) : (
          <Grid container spacing={4}>
            {filteredFolders.map((folder) => (
              <Grid key={folder.albumId}>
                <Box sx={folderListStyles.folderItem}>
                  <Box onClick={() => openFolder(folder)} sx={folderListStyles.folderClickArea}>
                    <SvgIcon sx={folderListStyles.folderIcon}>
                      <defs>
                        <linearGradient id={`gradient-${folder.albumId}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" style={{ stopColor: "#00d4ff", stopOpacity: 1 }} />
                          <stop offset="50%" style={{ stopColor: "#9c27b0", stopOpacity: 1 }} />
                          <stop offset="100%" style={{ stopColor: "#ff6ec7", stopOpacity: 1 }} />
                        </linearGradient>
                      </defs>
                      <FolderIcon sx={{ fill: `url(#gradient-${folder.albumId})` }} />
                    </SvgIcon>
                    <Typography variant="h6" sx={folderListStyles.folderTitle}>
                      {folder.title}
                    </Typography>
                    <Typography variant="body2" sx={folderListStyles.folderDescription}>
                      {folder.description}
                    </Typography>
                  </Box>

                  <Box sx={folderListStyles.actionButtons}>
                    <Tooltip title="ערוך">
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation()
                          startEditing(folder)
                        }}
                        sx={folderListStyles.editButton}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="מחק">
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation()
                          setFolderIdToDelete(folder.albumId)
                          setDeleteDialogOpen(true)
                        }}
                        sx={folderListStyles.deleteButton}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}

        <Dialog
          open={isEditing}
          onClose={cancelEditing}
          disableEnforceFocus
          PaperProps={{
            sx: folderListStyles.dialogPaper,
          }}
        >
          <DialogTitle sx={folderListStyles.dialogTitle}>
            עריכת אלבום
            <IconButton aria-label="close" onClick={cancelEditing} sx={folderListStyles.closeButton}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <TextField
              inputRef={inputRef}
              autoFocus
              margin="dense"
              label="שם האלבום"
              fullWidth
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              variant="outlined"
              sx={folderListStyles.titleField}
              InputProps={{
                sx: folderListStyles.inputProps,
              }}
              InputLabelProps={{
                sx: folderListStyles.inputLabelProps,
              }}
            />
            <TextField
              margin="dense"
              label="תיאור האלבום"
              fullWidth
              multiline
              rows={4}
              value={currentDescription}
              onChange={(e) => setCurrentDescription(e.target.value)}
              variant="outlined"
              InputProps={{
                sx: folderListStyles.inputProps,
              }}
              InputLabelProps={{
                sx: folderListStyles.inputLabelProps,
              }}
            />
          </DialogContent>
          <DialogActions sx={folderListStyles.dialogActions}>
            <Button onClick={cancelEditing} color="inherit" sx={folderListStyles.cancelButton}>
              ביטול
            </Button>
            <Button onClick={saveTitle} variant="contained" disabled={saving} sx={folderListStyles.saveButton}>
              {saving ? <CircularProgress size={24} /> : "שמור שינויים"}
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={isDeleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          PaperProps={{
            sx: folderListStyles.dialogPaper,
          }}
        >
          <DialogTitle dir="rtl">אישור מחיקה</DialogTitle>
          <DialogContent dir="rtl">
            <Typography>האם אתה בטוח שברצונך למחוק את האלבום?</Typography>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "flex-start" }}>
            <Button onClick={() => setDeleteDialogOpen(false)} color="inherit">
              לא
            </Button>
            <Button onClick={handleDeleteFolder} variant="contained" color="error">
              כן, מחק
            </Button>
          </DialogActions>
        </Dialog>

        <Box sx={folderListStyles.mobileFab}>
          <Fab color="primary" aria-label="add" onClick={() => navigate("/AddAlbum")} sx={folderListStyles.fab}>
            <AddIcon />
          </Fab>
        </Box>
      </Container>
    </Box>
  )
}
export default FolderList