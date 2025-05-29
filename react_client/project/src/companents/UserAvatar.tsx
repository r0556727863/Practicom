import type React from "react"
import { Avatar, Box, Tooltip, Menu, MenuItem, ListItemIcon, Typography } from "@mui/material"
import { useUserContext } from "../context/UserContext"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import LogoutIcon from "@mui/icons-material/Logout"

const UserAvatar = () => {
  const { user, setMyUser } = useUserContext()
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  if (!user) return null

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    setMyUser(null as any)
    localStorage.removeItem("token")
    navigate("/")
    handleClose()
  }

  const firstLetter = user.UserName?.charAt(0).toUpperCase()

  return (
    <Box>
      <Tooltip title="לחצי לפתיחת תפריט">
        <Avatar
          onClick={handleClick}
          sx={{
            background: "linear-gradient(135deg, #00d4ff 0%, #9c27b0 50%, #ff6ec7 100%)",
            width: 40,
            height: 40,
            position: "fixed",
            top: 16,
            right: 16,
            cursor: "pointer",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 4px 15px rgba(0, 212, 255, 0.3)",
            "&:hover": {
              transform: "scale(1.1)",
              boxShadow: "0 6px 20px rgba(0, 212, 255, 0.4)",
            },
            transition: "all 0.3s ease",
          }}
        >
          {firstLetter}
        </Avatar>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            borderRadius: 15,
            background: "rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(30px)",
            boxShadow: "0 15px 40px rgba(0, 0, 0, 0.2)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            color: "white",
          },
        }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle1" fontWeight="bold" color="white">
            {user.UserName}
          </Typography>
          <Typography variant="body2" color="rgba(255,255,255,0.7)">
            {user.Email}
          </Typography>
        </Box>
        <MenuItem
          onClick={handleLogout}
          sx={{ color: "white", "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" } }}
        >
          <ListItemIcon>
            <LogoutIcon fontSize="small" sx={{ color: "#ff6ec7" }} />
          </ListItemIcon>
          התנתק
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default UserAvatar