// // import type React from "react"
// // import { IconButton, Tooltip } from "@mui/material"
// // import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"

// // interface AIImageButtonProps {
// //   onClick: () => void
// //   tooltip?: string
// // }

// // const AIImageButton: React.FC<AIImageButtonProps> = ({ onClick, tooltip = "נתח תמונה עם AI" }) => {
// //   return (
// //     <Tooltip title={tooltip}>
// //       <IconButton
// //         onClick={onClick}
// //         size="small"
// //         sx={{
// //           color: "white",
// //           background: "linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)",
// //           boxShadow: "0 2px 8px rgba(255, 117, 140, 0.3)",
// //           "&:hover": {
// //             background: "linear-gradient(135deg, #ff758c 0%, #ff7eb3 80%)",
// //             transform: "translateY(-2px)",
// //             boxShadow: "0 4px 12px rgba(255, 117, 140, 0.4)",
// //           },
// //           transition: "all 0.3s ease",
// //         }}
// //       >
// //         <AutoAwesomeIcon fontSize="small" />
// //       </IconButton>
// //     </Tooltip>
// //   )
// // }

// // export default AIImageButton
// "use client"

// import type React from "react"
// import { IconButton, Tooltip } from "@mui/material"
// import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"

// interface AIImageButtonProps {
//   onClick: () => void
//   tooltip?: string
// }

// const AIImageButton: React.FC<AIImageButtonProps> = ({ onClick, tooltip = "נתח תמונה עם AI" }) => {
//   return (
//     <Tooltip title={tooltip}>
//       <IconButton
//         onClick={onClick}
//         size="small"
//         sx={{
//           color: "white",
//           background: "linear-gradient(135deg, #00d4ff 0%, #9c27b0 50%, #ff6ec7 100%)",
//           backdropFilter: "blur(20px)",
//           border: "1px solid rgba(255, 255, 255, 0.2)",
//           boxShadow: "0 4px 20px rgba(0, 212, 255, 0.3)",
//           "&:hover": {
//             background: "linear-gradient(135deg, #00b8e6 0%, #8e24aa 50%, #e91e63 100%)",
//             transform: "translateY(-2px)",
//             boxShadow: "0 6px 25px rgba(0, 212, 255, 0.4)",
//           },
//           transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//         }}
//       >
//         <AutoAwesomeIcon fontSize="small" />
//       </IconButton>
//     </Tooltip>
//   )
// }

// export default AIImageButton
"use client"

import type React from "react"
import { IconButton, Tooltip } from "@mui/material"
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"

interface AIImageButtonProps {
  onClick: () => void
}

const AIImageButton: React.FC<AIImageButtonProps> = ({ onClick }) => {
  return (
    <Tooltip title="ניתוח תמונה באמצעות AI">
      <IconButton
        size="small"
        onClick={onClick}
        sx={{
          background: "linear-gradient(135deg, #00d4ff 0%, #9c27b0 50%, #ff6ec7 100%)",
          color: "white",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 4px 15px rgba(0, 212, 255, 0.3)",
          "&:hover": {
            background: "linear-gradient(135deg, #00b8e6 0%, #8e24aa 50%, #e91e63 100%)",
            transform: "scale(1.1)",
            boxShadow: "0 6px 20px rgba(0, 212, 255, 0.5)",
          },
          transition: "all 0.3s ease",
        }}
      >
        <AutoAwesomeIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  )
}

export default AIImageButton
