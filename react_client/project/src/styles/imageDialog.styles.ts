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
    right: 8,
    top: "50%",
    transform: "translate(-50%, -50%)",
    color: "white",
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(20px)",
    width: 40,
    height: 40,
    borderRadius: 20,
    border: "2px solid #A45EBE",
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
}

export default styles
