import type React from "react"
import { type ReactNode, useState } from "react"
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Container,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import { Link } from "react-router-dom"
import MenuIcon from "@mui/icons-material/Menu"
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary"
import LoginIcon from "@mui/icons-material/Login"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder"
import CollectionsIcon from "@mui/icons-material/Collections"
import HomeIcon from "@mui/icons-material/Home"
import UserAvatar from "./UserAvatar"
import styles from "../styles/layout.styles"
import { useUserContext } from "../context/UserContext"

interface LayoutProps {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { user } = useUserContext()
  const token = user !== null

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")
    ) {
      return
    }
    setDrawerOpen(open)
  }

  const menuItems = token
    ? [
        { text: "דף הבית", icon: <HomeIcon />, path: "/" },
        { text: "הוספת אלבום", icon: <CreateNewFolderIcon />, path: "/AddAlbum" },
        { text: "צפיה באלבומים", icon: <CollectionsIcon />, path: "/AlbumsList" },
      ]
    : [
        { text: "דף הבית", icon: <HomeIcon />, path: "/" },
        { text: "הרשמה", icon: <PersonAddIcon />, path: "/Register" },
        { text: "התחברות", icon: <LoginIcon />, path: "/Login" },
      ]

  return (
    <Box sx={styles.container}>
      <AppBar position="fixed" sx={styles.appBar}>
        <Container maxWidth="lg">
          <Toolbar sx={styles.toolbar}>
            <Link to="/" style={styles.logoLink}>
              <PhotoLibraryIcon sx={styles.logoIcon} />
              <Typography variant="h5" component="div" sx={styles.logoText}>
                Albumix
              </Typography>
            </Link>

            {!isMobile && (
              <Box sx={styles.desktopNav}>
                {!token ? (
                  <>
                    <Button component={Link} to="/Register" startIcon={<PersonAddIcon />} sx={styles.navButton}>
                      הרשמה
                    </Button>
                    <Button
                      component={Link}
                      to="/Login"
                      startIcon={<LoginIcon />}
                      variant="contained"
                      sx={styles.loginButton}
                    >
                      התחברות
                    </Button>
                    <Button component={Link} to="/" startIcon={<HomeIcon />} sx={styles.navButton} />
                  </>
                ) : (
                  <>
                    <Button component={Link} to="/AddAlbum" startIcon={<CreateNewFolderIcon />} sx={styles.navButton}>
                      הוספת אלבום
                    </Button>
                    <Button component={Link} to="/AlbumsList" startIcon={<CollectionsIcon />} sx={styles.navButton}>
                      צפיה באלבומים
                    </Button>
                    <UserAvatar />
                    <Button component={Link} to="/" startIcon={<HomeIcon />} sx={styles.navButton} />
                  </>
                )}
              </Box>
            )}

            {isMobile && (
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={styles.menuButton}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: styles.drawer,
        }}
      >
        <Box sx={{ width: 280 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
          <Box sx={styles.drawerHeader}>
            <PhotoLibraryIcon sx={styles.drawerLogo} />
            <Typography variant="h6" component="div" sx={styles.drawerTitle}>
              אלבומיקס
            </Typography>
          </Box>
          <List sx={styles.drawerList}>
            {menuItems.map((item) => (
              <ListItemButton key={item.text} component={Link} to={item.path} sx={styles.drawerItem}>
                <ListItemIcon sx={styles.drawerItemIcon}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} primaryTypographyProps={styles.drawerItemText} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={styles.main}>
        {children}
      </Box>

      <Box component="footer" sx={styles.footer}>
        <Container maxWidth={false} sx={{ width: "100%" }}>
          <Typography variant="body2">&copy; {new Date().getFullYear()} אלבומיקס - כל הזכויות שמורות</Typography>
        </Container>
      </Box>

      <Box sx={{ height: "60px" }} />
    </Box>
  )
}

export default Layout