// // styles/common.styles.ts
// import { SxProps, Theme } from "@mui/material";

// export const commonStyles = {
//   pageContainer: {
//     position: "relative",
//     minHeight: "100vh",
//     py: 8,
//     mb: 8,
//   },
//   pageBackground: {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundImage: `url('/placeholder.svg?height=1080&width=1920')`,
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     backgroundAttachment: "fixed",
//     zIndex: -2,
//     filter: "brightness(0.9)",
//   },
//   gradientOverlay: {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     background: `linear-gradient(135deg, rgba(245, 169, 184, 0.7) 0%, rgba(169, 222, 245, 0.7) 100%)`,
//     zIndex: -1,
//   },
//   card: {
//     borderRadius: 4,
//     background: "rgba(255, 255, 255, 0.15)",
//     backdropFilter: "blur(10px)",
//     border: "1px solid rgba(255, 255, 255, 0.2)",
//     boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
//   },
//   gradientButton: {
//     borderRadius: 2,
//     background: "linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)",
//     boxShadow: "0 4px 12px rgba(255, 117, 140, 0.3)",
//     transition: "transform 0.3s ease, box-shadow 0.3s ease",
//     "&:hover": {
//       transform: "translateY(-3px)",
//       boxShadow: "0 6px 16px rgba(255, 117, 140, 0.4)",
//     },
//   },
//   floatingElement: (i: number): SxProps<Theme> => ({
//     position: "absolute",
//     width: Math.random() * 60 + 20,
//     height: Math.random() * 60 + 20,
//     borderRadius: "50%",
//     background:
//       i % 3 === 0
//         ? "rgba(245, 169, 184, 0.4)"
//         : i % 3 === 1
//         ? "rgba(169, 222, 245, 0.4)"
//         : "rgba(186, 169, 245, 0.4)",
//     opacity: 0.4,
//     filter: "blur(8px)",
//     top: `${Math.random() * 100}%`,
//     left: `${Math.random() * 100}%`,
//     animation: `float-${i} ${Math.random() * 10 + 10}s infinite ease-in-out`,
//   }),
//   loadingContainer: {
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     alignItems: "center",
//     height: "70vh",
//     gap: 2,
//   },
//   errorAlert: {
//     borderRadius: 2,
//     background: "rgba(211, 47, 47, 0.8)",
//     color: "white",
//   },
//   paperCard: {
//     p: 4,
//     borderRadius: 4,
//     background: "rgba(255, 255, 255, 0.15)",
//     backdropFilter: "blur(10px)",
//     border: "1px solid rgba(255, 255, 255, 0.2)",
//     boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
//   },
// };

// export default commonStyles;