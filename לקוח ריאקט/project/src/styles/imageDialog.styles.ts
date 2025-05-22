const styles = {
    dialogPaper: {
      borderRadius: 4,
      maxHeight: "90vh",
      mb: 8, // מרווח מהפוטר הקבוע
      background: "rgba(255, 255, 255, 0.15)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
    },
    dialogTitle: {
      position: "relative",
      pb: 1,
    },
    closeButton: {
      position: "absolute",
      right: 8,
      top: 8,
      color: "#ff758c",
    },
    title: {
      pr: 4,
      color: "white",
    },
    tabs: {
      borderBottom: 1,
      borderColor: "rgba(255, 255, 255, 0.2)",
      "& .MuiTabs-indicator": {
        height: 3,
        borderRadius: "3px 3px 0 0",
        backgroundColor: "#ff758c",
      },
      "& .MuiTab-root": {
        color: "rgba(255, 255, 255, 0.7)",
        "&.Mui-selected": {
          color: "white",
        },
      },
    },
    emptyGallery: {
      textAlign: "center",
      py: 6,
    },
    uploadButton: {
      mt: 2,
      borderRadius: 2,
      background: "linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)",
      boxShadow: "0 4px 12px rgba(255, 117, 140, 0.3)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      "&:hover": {
        transform: "translateY(-3px)",
        boxShadow: "0 6px 16px rgba(255, 117, 140, 0.4)",
      },
    },
    imageCard: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      transition: "transform 0.2s, box-shadow 0.2s",
      "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
      },
      borderRadius: 3,
      overflow: "hidden",
      background: "rgba(255, 255, 255, 0.15)",
      backdropFilter: "blur(5px)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
    },
    cardMedia: {
      cursor: "pointer",
      objectFit: "cover",
    },
    cardContent: {
      flexGrow: 1,
      p: 2,
    },
    editTitleBox: {
      display: "flex",
      alignItems: "center",
      gap: 1,
    },
    editTextField: {
      borderRadius: 1.5,
      color: "white",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "rgba(255, 255, 255, 0.3)",
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "rgba(255, 255, 255, 0.5)",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "rgba(255, 255, 255, 0.7)",
      },
    },
    imageTitle: {
      color: "white",
    },
    divider: {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
    cardActions: {
      justifyContent: "flex-end",
      p: 1,
    },
    saveButton: {
      color: "#a9def5",
    },
    cancelButton: {
      color: "#ff758c",
    },
    editIcon: {
      color: "white",
    },
    deleteIcon: {
      color: "#ff758c",
    },
    uploadButtonContainer: {
      display: "flex",
      justifyContent: "center",
      pb: 3,
    },
    fullImageDialog: {
      borderRadius: 4,
      overflow: "hidden",
      mb: 8, // מרווח מהפוטר הקבוע
      background: "rgba(0, 0, 0, 0.85)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
    },
    fullImageCloseButton: {
      position: "absolute",
      right: 8,
      top: 8,
      color: "white",
      bgcolor: "rgba(0,0,0,0.3)",
      "&:hover": {
        bgcolor: "rgba(0,0,0,0.5)",
      },
      zIndex: 1,
    },
    fullImageContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      p: 2,
      position: "relative",
    },
    fullImage: {
      maxWidth: "100%",
      maxHeight: "80vh",
      objectFit: "contain",
    },
    zoomControls: {
      position: "absolute",
      bottom: 5,
      left: "50%",
      transform: "translateX(-50%)",
      display: "flex",
      borderRadius: 4,
      overflow: "hidden",
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      backdropFilter: "blur(5px)",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
      zIndex: 10,
    },
    zoomButton: {
      color: "white",
      padding: 0.5,
      "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
    },
  }
  
  export default styles
  