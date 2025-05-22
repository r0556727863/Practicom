// import { Avatar } from "@mui/material";
// import { useUserContext } from "../context/UserContext";

// const UserAvatar = () => {
//   const { user } = useUserContext();

//   if (!user) return null;
//   const firstLetter = user.UserName?.charAt(0).toUpperCase();

//   return (
//     <Avatar
//       sx={{
//         bgcolor: "pink",
//         width: 40,
//         height: 40,
//         position: "fixed",
//         top: 16,
//         right: 16,
//       }}
//     >
//       {firstLetter}
//     </Avatar>
//   );
// };

// export default UserAvatar;
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
    setMyUser(null as any) // תוודאי שה-type שלך מאפשר null, או שתשני את טיפוס הפונקציה
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
            bgcolor: "pink",
            width: 40,
            height: 40,
            position: "fixed",
            top: 16,
            right: 16,
            cursor: "pointer",
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
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            {user.UserName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user.Email}
          </Typography>
        </Box>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" sx={{ color: "#f44336" }} />
          </ListItemIcon>

          התנתק
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default UserAvatar
