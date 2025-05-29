
// import "./App.css"
// import Register from "./companents/Register"
// import Login from "./companents/Login"
// import Layout from "./companents/Layout"
// import UserProvider from "./context/UserContext"
// import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
// import AddAlbum from "./companents/AddAlbum"
// import AlbumList from "./companents/AlbumsList"
// import FolderList from "./companents/AlbumsList"
// import FolderImages from "./companents/FolderImages"
// import HomePage from "./companents/HomePage"
// import { useState, useEffect } from "react"
// import { AISuggestionsProvider } from "./companents/ai-assistant/ai-suggestions-provider"
// import AIAssistantButton from "./companents/ai-assistant/ai-assistant-button"
// import AIWelcomeAnimation from "./companents/ai-welcome-animation/ai-welcome-animation"

// // קומפוננטה פנימית שמאפשרת לנו לקבל את המיקום הנוכחי
// const AppContent = () => {
//   const location = useLocation()
//   const [showWelcome, setShowWelcome] = useState(false)
//   const userName = localStorage.getItem("UserName")

//   // בדיקה אם להציג את אנימציית הברוכים הבאים
//   useEffect(() => {
//     const hasSeenWelcome = localStorage.getItem("hasSeenWelcome")
//     if (!hasSeenWelcome && location.pathname === "/") {
//       setShowWelcome(true)
//     }
//   }, [location.pathname])

//   const handleWelcomeClose = () => {
//     setShowWelcome(false)
//     localStorage.setItem("hasSeenWelcome", "true")
//   }

//   return (
//     <AISuggestionsProvider currentPage={location.pathname.split("/")[1] || "HomePage"}>
//       <Layout>
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/addAlbum" element={<AddAlbum />} />
//           <Route path="/AlbumsList" element={<AlbumList />} />
//           <Route path="/FolderList" element={<FolderList />} />
//           <Route path="/FolderImages" element={<FolderImages />} />
//         </Routes>

//         {/* כפתור העוזר החכם */}
//         <AIAssistantButton />

//         {/* אנימציית ברוכים הבאים */}
//         {showWelcome && <AIWelcomeAnimation userName={userName} onClose={handleWelcomeClose} />}
//       </Layout>
//     </AISuggestionsProvider>
//   )
// }

// function App() {
//   return (
//     <>
//       <UserProvider>
//         <Router>
//           <AppContent />
//         </Router>
//       </UserProvider>
//     </>
//   )
// }

// export default App
import "./App.css"
import Register from "./companents/Register"
import Login from "./companents/Login"
import Layout from "./companents/Layout"
import UserProvider, { useUserContext } from "./context/UserContext"
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import AddAlbum from "./companents/AddAlbum"
import AlbumList from "./companents/AlbumsList"
import FolderList from "./companents/AlbumsList"
import FolderImages from "./companents/FolderImages"
import HomePage from "./companents/HomePage"
import { useState, useEffect } from "react"
import { AISuggestionsProvider } from "./companents/ai-assistant/ai-suggestions-provider"
import AIAssistantButton from "./companents/ai-assistant/ai-assistant-button"
import AIWelcomeAnimation from "./companents/ai-welcome-animation/ai-welcome-animation"

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

  // טעינת המשתמש מ־localStorage (חד פעמי)
  useEffect(() => {
    const token = localStorage.getItem("token")
    const userJson = localStorage.getItem("user")
console.log("Loading user from localStorage:", userJson);

    if (token && userJson && !user) {
      const user = JSON.parse(userJson)
      setMyUser({
        UserId: user.id,
        UserName: user.userName,
        Email: user.email,
        Phone: user.phone,
        Password: "", // אין צורך לשמור סיסמה
      })
    }
  }, [])

  return (
    <AISuggestionsProvider currentPage={location.pathname.split("/")[1] || "HomePage"}>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addAlbum" element={<AddAlbum />} />
          <Route path="/AlbumsList" element={<AlbumList />} />
          <Route path="/FolderList" element={<FolderList />} />
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
