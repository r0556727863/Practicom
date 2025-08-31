// import type React from "react"
// import { Button, Tooltip } from "@mui/material"
// import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"

// interface AIAlbumButtonProps {
//   onClick: () => void
//   variant?: "text" | "outlined" | "contained"
//   size?: "small" | "medium" | "large"
//   fullWidth?: boolean
// }

// const AIAlbumButton: React.FC<AIAlbumButtonProps> = ({
//   onClick,
//   variant = "contained",
//   size = "medium",
//   fullWidth = false,
// }) => {
//   return (
//     <Tooltip title="קבל הצעות חכמות לאלבומים">
//       <Button
//         variant={variant}
//         size={size}
//         fullWidth={fullWidth}
//         onClick={onClick}
//         startIcon={<AutoAwesomeIcon />}
//         sx={{
//           borderRadius: 25,
//           background:
//             variant === "contained" ? "linear-gradient(135deg, #00d4ff 0%, #9c27b0 50%, #ff6ec7 100%)" : undefined,
//           backdropFilter: "blur(20px)",
//           border: "1px solid rgba(255, 255, 255, 0.2)",
//           boxShadow: variant === "contained" ? "0 8px 30px rgba(0, 212, 255, 0.3)" : undefined,
//           transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
//           fontWeight: 600,
//           textTransform: "none",
//           fontSize: size === "large" ? "1.1rem" : "1rem",
//           "&:hover": {
//             background:
//               variant === "contained" ? "linear-gradient(135deg, #00b8e6 0%, #8e24aa 50%, #e91e63 100%)" : undefined,
//             transform: "translateY(-3px)",
//             boxShadow: variant === "contained" ? "0 12px 40px rgba(0, 212, 255, 0.4)" : undefined,
//           },
//         }}
//       >
//         הצעות חכמות לאלבומים
//       </Button>
//     </Tooltip>
//   )
// }

// export default AIAlbumButton
