"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import {
  Container,
  Typography,
  Button,
  Grid,
  Box,
  TextField,
  Alert,
  CircularProgress,
  Fab,
  InputAdornment,
} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import SearchIcon from "@mui/icons-material/Search"
import FolderIcon from "@mui/icons-material/Folder"
import { useUserContext } from "../../context/UserContext"
import AlbumCard from "./AlbumCard"
import AlbumEditDialog from "./AlbumEditDialog"
import SuccessSnackbar from "../ui/SuccessSnackbar"
import { folderListStyles } from "../../styles/albumsList.styles"
import AlbumDeleteDialog from "./AlbumDeleteDialog"

interface Folder {
  albumId: number
  title: string
  userId: number
  description: string
}

// קומפוננטה ראשית לרשימת אלבומים - ~100 שורות
const AlbumsList = () => {
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

  useEffect(() => {
    const fetchFolders = async () => {
      if (!token || !user?.UserId) {
        setError("המשתמש אינו מחובר. אנא התחבר.")
        setLoading(false)
        navigate("/login")
        return
      }
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/album`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        const userFolders = response.data.filter((folder: Folder) => folder.userId === user.UserId)
        setFolders(userFolders)
        setFilteredFolders(userFolders)
      } catch (err) {
        setError(axios.isAxiosError(err) ? err.message : "שגיאה לא ידועה")
      } finally {
        setLoading(false)
      }
    }

    fetchFolders()
  }, [user, token, navigate])

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
      await axios.delete(`${import.meta.env.VITE_API_URL}/album/${folderIdToDelete}`, {
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
        `${import.meta.env.VITE_API_URL}/album/${editingFolder.albumId}`,
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
        <SuccessSnackbar open={snackbarOpen} message={successMessage || ""} onClose={() => setSnackbarOpen(false)} />

        <Box sx={folderListStyles.header}>
          <Typography variant="h4" component="h1" fontWeight="bold" color="white">
            האלבומים שלי
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate("/addAlbum")}
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
              dir: "rtl",
              lang: "he",
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
            <Typography variant="body1" color="rgba(255,255,255,0.8)" paragraph sx={folderListStyles.emptyStateText}>
              {searchTerm ? "נסה לחפש במילים אחרות או נקה את החיפוש" : "התחל ליצור אלבומים חדשים לארגון התמונות שלך"}
            </Typography>
            {!searchTerm && (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => navigate("/addAlbum")}
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
                <AlbumCard
                  folder={folder}
                  onOpen={openFolder}
                  onEdit={startEditing}
                  onDelete={(folderId) => {
                    setFolderIdToDelete(folderId)
                    setDeleteDialogOpen(true)
                  }}
                />
              </Grid>
            ))}
          </Grid>
        )}

        <AlbumEditDialog
          isEditing={isEditing}
          newTitle={newTitle}
          setNewTitle={setNewTitle}
          currentDescription={currentDescription}
          setCurrentDescription={setCurrentDescription}
          saving={saving}
          onSave={saveTitle}
          onCancel={cancelEditing}
        />

        <AlbumDeleteDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          onConfirm={handleDeleteFolder}
        />

        <Box sx={folderListStyles.mobileFab}>
          <Fab color="primary" aria-label="add" onClick={() => navigate("/addAlbum")} sx={folderListStyles.fab}>
            <AddIcon />
          </Fab>
        </Box>
      </Container>
    </Box>
  )
}

export default AlbumsList
