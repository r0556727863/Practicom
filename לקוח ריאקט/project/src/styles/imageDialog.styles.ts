// const styles = {
//     dialogPaper: {
//       borderRadius: 4,
//       maxHeight: "90vh",
//       mb: 8, // מרווח מהפוטר הקבוע
//       background: "rgba(255, 255, 255, 0.15)",
//       backdropFilter: "blur(10px)",
//       border: "1px solid rgba(255, 255, 255, 0.2)",
//       boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
//     },
//     dialogTitle: {
//       position: "relative",
//       pb: 1,
//     },
//     closeButton: {
//       position: "absolute",
//       right: 8,
//       top: 8,
//       color: "#ff758c",
//     },
//     title: {
//       pr: 4,
//       color: "white",
//     },
//     tabs: {
//       borderBottom: 1,
//       borderColor: "rgba(255, 255, 255, 0.2)",
//       "& .MuiTabs-indicator": {
//         height: 3,
//         borderRadius: "3px 3px 0 0",
//         backgroundColor: "#ff758c",
//       },
//       "& .MuiTab-root": {
//         color: "rgba(255, 255, 255, 0.7)",
//         "&.Mui-selected": {
//           color: "white",
//         },
//       },
//     },
//     emptyGallery: {
//       textAlign: "center",
//       py: 6,
//     },
//     uploadButton: {
//       mt: 2,
//       borderRadius: 2,
//       background: "linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)",
//       boxShadow: "0 4px 12px rgba(255, 117, 140, 0.3)",
//       transition: "transform 0.3s ease, box-shadow 0.3s ease",
//       "&:hover": {
//         transform: "translateY(-3px)",
//         boxShadow: "0 6px 16px rgba(255, 117, 140, 0.4)",
//       },
//     },
//     imageCard: {
//       height: "100%",
//       display: "flex",
//       flexDirection: "column",
//       transition: "transform 0.2s, box-shadow 0.2s",
//       "&:hover": {
//         transform: "translateY(-5px)",
//         boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
//       },
//       borderRadius: 3,
//       overflow: "hidden",
//       background: "rgba(255, 255, 255, 0.15)",
//       backdropFilter: "blur(5px)",
//       border: "1px solid rgba(255, 255, 255, 0.2)",
//     },
//     cardMedia: {
//       cursor: "pointer",
//       objectFit: "cover",
//     },
//     cardContent: {
//       flexGrow: 1,
//       p: 2,
//     },
//     editTitleBox: {
//       display: "flex",
//       alignItems: "center",
//       gap: 1,
//     },
//     editTextField: {
//       borderRadius: 1.5,
//       color: "white",
//       "& .MuiOutlinedInput-notchedOutline": {
//         borderColor: "rgba(255, 255, 255, 0.3)",
//       },
//       "&:hover .MuiOutlinedInput-notchedOutline": {
//         borderColor: "rgba(255, 255, 255, 0.5)",
//       },
//       "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//         borderColor: "rgba(255, 255, 255, 0.7)",
//       },
//     },
//     imageTitle: {
//       color: "white",
//     },
//     divider: {
//       backgroundColor: "rgba(255, 255, 255, 0.1)",
//     },
//     cardActions: {
//       justifyContent: "flex-end",
//       p: 1,
//     },
//     saveButton: {
//       color: "#a9def5",
//     },
//     cancelButton: {
//       color: "#ff758c",
//     },
//     editIcon: {
//       color: "white",
//     },
//     deleteIcon: {
//       color: "#ff758c",
//     },
//     uploadButtonContainer: {
//       display: "flex",
//       justifyContent: "center",
//       pb: 3,
//     },
//     fullImageDialog: {
//       borderRadius: 4,
//       overflow: "hidden",
//       mb: 8, // מרווח מהפוטר הקבוע
//       background: "rgba(0, 0, 0, 0.85)",
//       backdropFilter: "blur(10px)",
//       border: "1px solid rgba(255, 255, 255, 0.1)",
//     },
//     fullImageCloseButton: {
//       position: "absolute",
//       right: 8,
//       top: 8,
//       color: "white",
//       bgcolor: "rgba(0,0,0,0.3)",
//       "&:hover": {
//         bgcolor: "rgba(0,0,0,0.5)",
//       },
//       zIndex: 1,
//     },
//     fullImageContainer: {
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       p: 2,
//       position: "relative",
//     },
//     fullImage: {
//       maxWidth: "100%",
//       maxHeight: "80vh",
//       objectFit: "contain",
//     },
//     zoomControls: {
//       position: "absolute",
//       bottom: 5,
//       left: "50%",
//       transform: "translateX(-50%)",
//       display: "flex",
//       borderRadius: 4,
//       overflow: "hidden",
//       backgroundColor: "rgba(0, 0, 0, 0.4)",
//       backdropFilter: "blur(5px)",
//       boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
//       zIndex: 10,
//     },
//     zoomButton: {
//       color: "white",
//       padding: 0.5,
//       "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
//     },
//   }

//   export default styles
const styles = {
  dialogPaper: {
    borderRadius: 20,
    background: "rgba(255, 255, 255, 0.08)",
    backdropFilter: "blur(30px)",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
    overflow: "hidden",
  },
  dialogTitle: {
    background: "linear-gradient(135deg, #00d4ff 0%, #9c27b0 50%, #ff6ec7 100%)",
    color: "white",
    position: "relative",
    textAlign: "center",
    py: 2.5,
  },
  closeButton: {
    position: "absolute",
    right: 8, // הקטנת הערך כדי להזיז שמאלה
    top: "50%",
    transform: "translate(-50%, -50%)", // דחיפת הכפתור שמאלה
    color: "white",
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(20px)",
    width: 40,
    height: 40,
    borderRadius: 20, // שמירה על צורת עיגול
    border: "2px solid #A45EBE", // הוספת מסגרת סגולה בהירה יותר
  
    "&:hover": {
      background: "rgba(255, 255, 255, 0.2)",
      transform: "translate(-50%, -50%) scale(1.05)",
    },
    transition: "all 0.3s ease",
  },
  
  title: {
    textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
  },
  tabs: {
    background: "rgba(255, 255, 255, 0.05)",
    "& .MuiTab-root": {
      color: "rgba(255, 255, 255, 0.7)",
      "&.Mui-selected": {
        color: "#00d4ff",
      },
    },
    "& .MuiTabs-indicator": {
      background: "linear-gradient(135deg, #00d4ff 0%, #ff6ec7 100%)",
      height: 3,
    },
  },
  emptyGallery: {
    textAlign: "center",
    p: 6,
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(20px)",
    borderRadius: 15,
    m: 3,
  },
  imageCard: {
    borderRadius: 15,
    background: "rgba(255, 255, 255, 0.08)",
    backdropFilter: "blur(30px)",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    boxShadow: "0 12px 35px rgba(0, 0, 0, 0.2)",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    overflow: "hidden",
    "&:hover": {
      transform: "translateY(-6px) scale(1.02)",
      boxShadow: "0 20px 50px rgba(0, 0, 0, 0.3)",
      borderColor: "rgba(0, 212, 255, 0.3)",
    },
  },
  cardMedia: {
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "scale(1.03)",
    },
  },
  cardContent: {
    p: 2,
    background: "rgba(255, 255, 255, 0.05)",
  },
  editTitleBox: {
    display: "flex",
    alignItems: "center",
    gap: 1,
  },
  editTextField: {
    "& .MuiOutlinedInput-root": {
      borderRadius: 8,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      color: "white",
      "& fieldset": {
        borderColor: "rgba(255, 255, 255, 0.3)",
      },
      "&:hover fieldset": {
        borderColor: "#00d4ff",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#00d4ff",
      },
    },
  },
  saveButton: {
    color: "#4caf50",
    background: "rgba(76, 175, 80, 0.1)",
    borderRadius: 8,
    "&:hover": {
      background: "rgba(76, 175, 80, 0.2)",
      transform: "scale(1.05)",
    },
  },
  cancelButton: {
    color: "#f44336",
    background: "rgba(244, 67, 54, 0.1)",
    borderRadius: 8,
    "&:hover": {
      background: "rgba(244, 67, 54, 0.2)",
      transform: "scale(1.05)",
    },
  },
  imageTitle: {
    color: "white",
    fontWeight: "500",
  },
  divider: {
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  cardActions: {
    justifyContent: "center",
    p: 1.5,
    background: "rgba(255, 255, 255, 0.03)",
    gap: 1,
  },
  editIcon: {
    color: "#00d4ff",
    background: "rgba(0, 212, 255, 0.1)",
    borderRadius: 8,
    "&:hover": {
      background: "rgba(0, 212, 255, 0.2)",
      transform: "scale(1.05)",
    },
    transition: "all 0.3s ease",
  },
  deleteIcon: {
    color: "#f44336",
    background: "rgba(244, 67, 54, 0.1)",
    borderRadius: 8,
    "&:hover": {
      background: "rgba(244, 67, 54, 0.2)",
      transform: "scale(1.05)",
    },
    transition: "all 0.3s ease",
  },
  uploadButtonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    p: 3,
    gap: 2,
  },
  uploadButton: {
    borderRadius: 15,
    px: 4,
    py: 1.5,
    background: "linear-gradient(135deg, #00d4ff 0%, #9c27b0 50%, #ff6ec7 100%)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "0 6px 25px rgba(0, 212, 255, 0.3)",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      transform: "translateY(-3px) scale(1.05)",
      boxShadow: "0 12px 40px rgba(0, 212, 255, 0.5)",
      background: "linear-gradient(135deg, #00b8e6 0%, #8e24aa 50%, #e91e63 100%)",
    },
  },
  fullImageDialog: {
    "& .MuiDialog-paper": {
      background: "rgba(0, 0, 0, 0.9)",
      backdropFilter: "blur(20px)",
      borderRadius: 15,
      border: "1px solid rgba(255, 255, 255, 0.1)",
    },
  },
  fullImageCloseButton: {
    position: "absolute",
    top: 12,
    right: 12,
    color: "purple", // צבע האיקס סגול כהה
    background: "transparent", // רקע שקוף
    zIndex: 10,
    width: 44,
    height: 44,
    fontSize: "24px", // גודל האיקס
    border: "2px solid rgba(255, 105, 180, 0.5)", // עיגול ורוד שקוף
    borderRadius: "50%", // עיגול מלא
    cursor: "pointer", // שינוי העכבר לאצבע
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      transform: "scale(1.1)", // הגדלה קלה בה hover
    },
  },
  
  fullImageContainer: {
    position: "relative",
    minHeight: "80vh", // הגדרת גובה מינימלי
    height: "auto", // אפשר גובה אוטומטי
    width: "auto", // אפשר רוחב אוטומטי
    maxHeight: "80vh", // הוסף את זה כדי שהתמונה לא תחרוג
    border: "5px solid rgba(0, 212, 255, 0.7)",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    margin: 0,
    overflow: "visible", // ודא שאין חיתוך
  },
  
  fullImage: {
    width: "100%", // השתמש ב-100% כדי למלא את המיכל
    height: "auto", // שמור על יחס התמונה
    maxWidth: "100%",
    maxHeight: "80vh", // הוסף את זה כדי שהתמונה לא תחרוג  
    objectFit: 'contain'as 'contain', // שמור על יחס התמונה
    display: "block",
    margin: 0,
  },

  zoomControls: {
    position: "absolute",
    bottom: -5,
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: 1,
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(20px)",
    borderRadius: 20,
    p: 0.5, // הקטנת ה-padding
    border: "1px solid rgba(255, 255, 255, 0.2)",
  },
  zoomButton: {
    color: "white",
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
    "&:hover": {
      background: "rgba(0, 212, 255, 0.2)",
      transform: "scale(1.05)",
    },
    transition: "all 0.3s ease",
  },
}

export default styles
