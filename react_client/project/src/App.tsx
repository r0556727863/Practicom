import "./App.css"
import Register from "./companents/Register"
import Login from "./companents/Login"
import Layout from "./companents/Layout"
import UserProvider, { useUserContext } from "./context/UserContext"
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
// import AddAlbum from "./companents/AddAlbum"
// import AlbumList from "./companents/AlbumsList"
// import FolderImages from "./companents/FolderImages"
import HomePage from "./companents/HomePage"
import { useState, useEffect } from "react"
import { AISuggestionsProvider } from "./companents/ai-assistant/ai-suggestions-provider"
import AIAssistantButton from "./companents/ai-assistant/ai-assistant-button"
import AIWelcomeAnimation from "./companents/ai-welcome-animation/ai-welcome-animation"
import AlbumUploader from "./companents/add-album/AlbumUploader"
import AlbumsList from "./companents/albums-list/AlbumsList"
import FolderImages from "./companents/folder-images/FolderImages"

// קומפוננטה פנימית שמאפשרת לנו לקבל את המיקום הנוכחי
const AppContent = () => {
  const location = useLocation()
  const [showWelcome, setShowWelcome] = useState(false)
  const userName = localStorage.getItem("UserName")
  const { user, setMyUser } = useUserContext()

  // בדיקה אם להציג את אנימציית הברוכים הבאים
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem("hasSeenWelcome")
    if (!hasSeenWelcome && location.pathname === "/") {
      setShowWelcome(true)
    }
  }, [location.pathname])

 
  const handleWelcomeClose = () => {
    setShowWelcome(false)
    localStorage.setItem("hasSeenWelcome", "true")
  }

  return (
    <AISuggestionsProvider currentPage={location.pathname.split("/")[1] || "HomePage"}>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addAlbum" element={<AlbumUploader />} />
          <Route path="/AlbumsList" element={<AlbumsList />} />
          
          {/* <Route path="/FolderList" element={<FolderList />} /> */}
          <Route path="/FolderImages" element={<FolderImages />} />
        </Routes>

        {/* כפתור העוזר החכם */}
        <AIAssistantButton />

        {/* אנימציית ברוכים הבאים */}
        {showWelcome && <AIWelcomeAnimation userName={userName} onClose={handleWelcomeClose} />}
      </Layout>
    </AISuggestionsProvider>
  )
}

function App() {
  return (
    <UserProvider>
      <Router>
        <AppContent />
      </Router>
    </UserProvider>
  )
}

export default App
