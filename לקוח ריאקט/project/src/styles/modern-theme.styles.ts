// // // נושא עיצוב אחיד לכל האתר - קובץ חדש!
// // export const modernTheme = {
// //     // צבעים עיקריים מתוחכמים (סגול כחלחל רך במקום כחול חזק)
// //     colors: {
// //       primary: {
// //         main: "#4f46e5", // סגול כחלחל רך יותר
// //         light: "#818cf8",
// //         dark: "#3730a3",
// //         gradient: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
// //       },
// //       secondary: {
// //         main: "#ec4899", // ורוד אלגנטי
// //         light: "#f472b6",
// //         dark: "#be185d",
// //         gradient: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)",
// //       },
// //       accent: {
// //         main: "#06b6d4", // טורקיז רך
// //         light: "#67e8f9",
// //         dark: "#0891b2",
// //         gradient: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
// //       },
// //       background: {
// //         main: "linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)",
// //         overlay: "rgba(15, 23, 42, 0.3)",
// //         glass: "rgba(255, 255, 255, 0.1)",
// //         card: "rgba(255, 255, 255, 0.05)",
// //       },
// //     },
  
// //     // אפקטים ואנימציות
// //     effects: {
// //       blur: "blur(20px)",
// //       shadow: {
// //         small: "0 4px 15px rgba(79, 70, 229, 0.2)",
// //         medium: "0 8px 25px rgba(79, 70, 229, 0.3)",
// //         large: "0 15px 35px rgba(79, 70, 229, 0.4)",
// //         glow: "0 0 30px rgba(79, 70, 229, 0.5)",
// //       },
// //       border: "1px solid rgba(255, 255, 255, 0.2)",
// //       borderRadius: {
// //         small: "12px",
// //         medium: "20px",
// //         large: "25px",
// //         full: "50px",
// //       },
// //     },
  
// //     // רכיבים משותפים
// //     components: {
// //       button: {
// //         primary: {
// //           borderRadius: "50px",
// //           px: 4,
// //           py: 1.5,
// //           fontSize: "1.1rem",
// //           fontWeight: "bold",
// //           background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
// //           boxShadow: "0 8px 25px rgba(79, 70, 229, 0.4)",
// //           transition: "all 0.3s ease",
// //           "&:hover": {
// //             transform: "translateY(-3px)",
// //             boxShadow: "0 12px 30px rgba(79, 70, 229, 0.5)",
// //             background: "linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)",
// //           },
// //         },
// //       },
// //       card: {
// //         background: "rgba(255, 255, 255, 0.1)",
// //         backdropFilter: "blur(20px)",
// //         border: "1px solid rgba(255, 255, 255, 0.2)",
// //         borderRadius: "25px",
// //         boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)",
// //         transition: "all 0.3s ease",
// //         "&:hover": {
// //           transform: "translateY(-5px)",
// //           background: "rgba(255, 255, 255, 0.15)",
// //           boxShadow: "0 30px 60px rgba(0, 0, 0, 0.4)",
// //         },
// //       },
// //       textField: {
// //         "& .MuiOutlinedInput-root": {
// //           borderRadius: "15px",
// //           backgroundColor: "rgba(255, 255, 255, 0.9)",
// //           "&:hover .MuiOutlinedInput-notchedOutline": {
// //             borderColor: "#4f46e5",
// //           },
// //           "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
// //             borderColor: "#4f46e5",
// //             borderWidth: 2,
// //           },
// //         },
// //         "& .MuiInputLabel-root.Mui-focused": {
// //           color: "#4f46e5",
// //         },
// //       },
// //     },
// //   }
  
// //   // פונקציות עזר לאלמנטים מרחפים
// //   export const createFloatingElements = (count: number) => {
// //     return [...Array(count)].map((_, i) => ({
// //       position: "absolute",
// //       width: Math.random() * 80 + 40,
// //       height: Math.random() * 80 + 40,
// //       borderRadius: "50%",
// //       background: `linear-gradient(45deg, 
// //         ${
// //           i % 4 === 0
// //             ? "rgba(79, 70, 229, 0.3)"
// //             : i % 4 === 1
// //               ? "rgba(236, 72, 153, 0.3)"
// //               : i % 4 === 2
// //                 ? "rgba(6, 182, 212, 0.3)"
// //                 : "rgba(124, 58, 237, 0.3)"
// //         }, transparent)`,
// //       top: `${Math.random() * 100}%`,
// //       left: `${Math.random() * 100}%`,
// //       filter: "blur(1px)",
// //       opacity: 0.6,
// //       animation: `float-${i % 8} ${8 + (i % 4)}s infinite ease-in-out`,
// //       "@keyframes float-0": {
// //         "0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
// //         "50%": { transform: "translate(60px, -60px) rotate(180deg)" },
// //       },
// //       "@keyframes float-1": {
// //         "0%, 100%": { transform: "translate(0, 0) scale(1)" },
// //         "50%": { transform: "translate(-40px, 40px) scale(1.2)" },
// //       },
// //       "@keyframes float-2": {
// //         "0%, 100%": { transform: "translateY(0)" },
// //         "50%": { transform: "translateY(-80px)" },
// //       },
// //       "@keyframes float-3": {
// //         "0%, 100%": { transform: "translateX(0) rotate(0deg)" },
// //         "50%": { transform: "translateX(80px) rotate(-180deg)" },
// //       },
// //       "@keyframes float-4": {
// //         "0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
// //         "50%": { transform: "translate(50px, 50px) rotate(90deg)" },
// //       },
// //       "@keyframes float-5": {
// //         "0%, 100%": { transform: "translate(0, 0) scale(1)" },
// //         "50%": { transform: "translate(-60px, -30px) scale(0.8)" },
// //       },
// //       "@keyframes float-6": {
// //         "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
// //         "50%": { transform: "translateY(100px) rotate(180deg)" },
// //       },
// //       "@keyframes float-7": {
// //         "0%, 100%": { transform: "translate(0, 0) scale(1)" },
// //         "50%": { transform: "translate(80px, -80px) scale(1.3)" },
// //       },
// //     }))
// //   }
  
// //   export default modernTheme
//   // נושא עיצוב מתקדם ואחיד לכל האתר
// export const modernTheme = {
//     // צבעים מתוחכמים - סגול כחלחל רך ומרשים
//     colors: {
//       primary: {
//         main: "#6366f1", // סגול כחלחל מודרני
//         light: "#818cf8",
//         dark: "#4338ca",
//         gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
//       },
//       secondary: {
//         main: "#ec4899", // ורוד אלגנטי
//         light: "#f472b6",
//         dark: "#be185d",
//         gradient: "linear-gradient(135deg, #ec4899 0%, #a855f7 100%)",
//       },
//       accent: {
//         main: "#06b6d4", // טורקיז רך
//         light: "#67e8f9",
//         dark: "#0891b2",
//         gradient: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
//       },
//       success: {
//         main: "#10b981",
//         light: "#34d399",
//         dark: "#059669",
//       },
//       warning: {
//         main: "#f59e0b",
//         light: "#fbbf24",
//         dark: "#d97706",
//       },
//       error: {
//         main: "#ef4444",
//         light: "#f87171",
//         dark: "#dc2626",
//       },
//       background: {
//         main: "linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)",
//         overlay: "rgba(15, 23, 42, 0.4)",
//         glass: "rgba(255, 255, 255, 0.1)",
//         card: "rgba(255, 255, 255, 0.08)",
//         paper: "rgba(255, 255, 255, 0.95)",
//       },
//       neutral: {
//         50: "#f8fafc",
//         100: "#f1f5f9",
//         200: "#e2e8f0",
//         300: "#cbd5e1",
//         400: "#94a3b8",
//         500: "#64748b",
//         600: "#475569",
//         700: "#334155",
//         800: "#1e293b",
//         900: "#0f172a",
//       },
//     },
  
//     // אפקטים ואנימציות מתקדמות
//     effects: {
//       blur: "blur(20px)",
//       shadow: {
//         small: "0 4px 15px rgba(99, 102, 241, 0.2)",
//         medium: "0 8px 25px rgba(99, 102, 241, 0.3)",
//         large: "0 15px 35px rgba(99, 102, 241, 0.4)",
//         glow: "0 0 30px rgba(99, 102, 241, 0.5)",
//         glass: "0 8px 32px rgba(31, 38, 135, 0.37)",
//       },
//       border: "1px solid rgba(255, 255, 255, 0.18)",
//       borderRadius: {
//         small: "12px",
//         medium: "20px",
//         large: "25px",
//         full: "50px",
//       },
//       glassmorphism: {
//         background: "rgba(255, 255, 255, 0.1)",
//         backdropFilter: "blur(20px)",
//         border: "1px solid rgba(255, 255, 255, 0.18)",
//         boxShadow: "0 8px 32px rgba(31, 38, 135, 0.37)",
//       },
//     },
  
//     // אנימציות
//     animations: {
//       pulse: {
//         animation: "pulse 2s infinite",
//         "@keyframes pulse": {
//           "0%": { boxShadow: "0 0 0 0 rgba(99, 102, 241, 0.7)" },
//           "70%": { boxShadow: "0 0 0 15px rgba(99, 102, 241, 0)" },
//           "100%": { boxShadow: "0 0 0 0 rgba(99, 102, 241, 0)" },
//         },
//       },
//       shimmer: {
//         animation: "shimmer 2s infinite",
//         "@keyframes shimmer": {
//           "0%": { backgroundPosition: "-200px 0" },
//           "100%": { backgroundPosition: "200px 0" },
//         },
//       },
//       float: {
//         animation: "float 6s ease-in-out infinite",
//         "@keyframes float": {
//           "0%, 100%": { transform: "translateY(0px)" },
//           "50%": { transform: "translateY(-20px)" },
//         },
//       },
//       backgroundShift: {
//         animation: "backgroundShift 20s ease-in-out infinite",
//         "@keyframes backgroundShift": {
//           "0%, 100%": { transform: "scale(1) rotate(0deg)" },
//           "50%": { transform: "scale(1.1) rotate(3deg)" },
//         },
//       },
//     },
  
//     // רכיבים משותפים
//     components: {
//       button: {
//         primary: {
//           borderRadius: "50px",
//           px: 4,
//           py: 1.5,
//           fontSize: "1.1rem",
//           fontWeight: "bold",
//           background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
//           boxShadow: "0 8px 25px rgba(99, 102, 241, 0.4)",
//           transition: "all 0.3s ease",
//           "&:hover": {
//             transform: "translateY(-3px)",
//             boxShadow: "0 12px 30px rgba(99, 102, 241, 0.5)",
//             background: "linear-gradient(135deg, #5b21b6 0%, #7c3aed 100%)",
//           },
//         },
//         secondary: {
//           borderRadius: "50px",
//           px: 4,
//           py: 1.5,
//           fontSize: "1.1rem",
//           fontWeight: "bold",
//           color: "white",
//           borderColor: "rgba(255, 255, 255, 0.5)",
//           backdropFilter: "blur(10px)",
//           background: "rgba(255, 255, 255, 0.1)",
//           transition: "all 0.3s ease",
//           "&:hover": {
//             transform: "translateY(-3px)",
//             borderColor: "white",
//             background: "rgba(255, 255, 255, 0.2)",
//             boxShadow: "0 12px 30px rgba(255, 255, 255, 0.2)",
//           },
//         },
//       },
//       card: {
//         borderRadius: "25px",
//         transition: "all 0.3s ease",
//         "&:hover": {
//           transform: "translateY(-5px)",
//           background: "rgba(255, 255, 255, 0.15)",
//           boxShadow: "0 30px 60px rgba(0, 0, 0, 0.4)",
//         },
//       },
//       textField: {
//         "& .MuiOutlinedInput-root": {
//           borderRadius: "15px",
//           backgroundColor: "rgba(255, 255, 255, 0.9)",
//           backdropFilter: "blur(10px)",
//           "&:hover .MuiOutlinedInput-notchedOutline": {
//             borderColor: "#6366f1",
//           },
//           "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//             borderColor: "#6366f1",
//             borderWidth: 2,
//           },
//         },
//         "& .MuiInputLabel-root.Mui-focused": {
//           color: "#6366f1",
//         },
//       },
//     },
//   }
  
//   // פונקציות עזר לאלמנטים מרחפים
//   export const createFloatingElements = (count: number) => {
//     return [...Array(count)].map((_, i) => ({
//       position: "absolute",
//       width: Math.random() * 80 + 40,
//       height: Math.random() * 80 + 40,
//       borderRadius: "50%",
//       background: `linear-gradient(45deg, 
//         ${
//           i % 4 === 0
//             ? "rgba(99, 102, 241, 0.3)"
//             : i % 4 === 1
//               ? "rgba(236, 72, 153, 0.3)"
//               : i % 4 === 2
//                 ? "rgba(6, 182, 212, 0.3)"
//                 : "rgba(139, 92, 246, 0.3)"
//         }, transparent)`,
//       top: `${Math.random() * 100}%`,
//       left: `${Math.random() * 100}%`,
//       filter: "blur(1px)",
//       opacity: 0.6,
//       animation: `float-${i % 8} ${8 + (i % 4)}s infinite ease-in-out`,
//       "@keyframes float-0": {
//         "0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
//         "50%": { transform: "translate(60px, -60px) rotate(180deg)" },
//       },
//       "@keyframes float-1": {
//         "0%, 100%": { transform: "translate(0, 0) scale(1)" },
//         "50%": { transform: "translate(-40px, 40px) scale(1.2)" },
//       },
//       "@keyframes float-2": {
//         "0%, 100%": { transform: "translateY(0)" },
//         "50%": { transform: "translateY(-80px)" },
//       },
//       "@keyframes float-3": {
//         "0%, 100%": { transform: "translateX(0) rotate(0deg)" },
//         "50%": { transform: "translateX(80px) rotate(-180deg)" },
//       },
//       "@keyframes float-4": {
//         "0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
//         "50%": { transform: "translate(50px, 50px) rotate(90deg)" },
//       },
//       "@keyframes float-5": {
//         "0%, 100%": { transform: "translate(0, 0) scale(1)" },
//         "50%": { transform: "translate(-60px, -30px) scale(0.8)" },
//       },
//       "@keyframes float-6": {
//         "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
//         "50%": { transform: "translateY(100px) rotate(180deg)" },
//       },
//       "@keyframes float-7": {
//         "0%, 100%": { transform: "translate(0, 0) scale(1)" },
//         "50%": { transform: "translate(80px, -80px) scale(1.3)" },
//       },
//     }))
//   }
  
//   export default modernTheme
  