import "./App.css"
import Register from "./companents/Register"
import Login from "./companents/Login"
import Layout from "./companents/Layout"
import UserProvider from "./context/UserContext"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AddAlbum from "./companents/AddAlbum"
import AlbumList from "./companents/AlbumsList"
import FolderList from "./companents/AlbumsList"
import FolderImages from "./companents/FolderImages"
import HomePage from "./companents/HomePage"

function App() {
  return (
    <>
      <UserProvider>
        <Router>
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
          </Layout>
        </Router>
      </UserProvider>
    </>
  )
}

export default App
