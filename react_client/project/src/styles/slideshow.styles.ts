const slideshowStyles = {
    // Dialog styles
    dialogPaper: {
      borderRadius: 25,
      background: "rgba(255, 255, 255, 0.08)",
      backdropFilter: "blur(30px)",
      border: "1px solid rgba(255, 255, 255, 0.15)",
      boxShadow: "0 25px 80px rgba(0, 0, 0, 0.3)",
      overflow: "hidden",
      direction: "rtl",
    },
    dialogTitle: {
      background: "linear-gradient(135deg, #00d4ff 0%, #9c27b0 50%, #ff6ec7 100%)",
      color: "white",
      position: "relative",
      textAlign: "center",
      py: 3,
    },
    closeButton: {
      position: "absolute",
      right: 37,
      top: "50%",
      transform: "translateY(-50%)",
      color: "white",
      background: "rgba(255, 255, 255, 0.1)",
      "&:hover": {
        background: "rgba(255, 255, 255, 0.2)",
        transform: "translateY(-50%) scale(1.1)",
      },
    },
    dialogContent: {
      padding: 3,
      background: "rgba(255, 255, 255, 0.02)",
    },
    dialogActions: {
      p: 3,
      background: "rgba(255, 255, 255, 0.05)",
      borderTop: "1px solid rgba(255, 255, 255, 0.1)",
    },
    // Image selection styles
    selectionHeader: {
      display: "flex",
      alignItems: "center",
      gap: 2,
      mb: 2,
    },
    selectAllButton: {
      borderColor: "#00d4ff",
      color: "#00d4ff",
      "&:hover": {
        borderColor: "#ff6ec7",
        color: "#ff6ec7",
        background: "rgba(255, 110, 199, 0.1)",
      },
    },
    imageGrid: {
      display: "flex",
      flexWrap: "wrap",
      gap: "12px",
      justifyContent: "flex-start",
      mb: 4,
    },
    imageBox: {
      width: 120,
      height: 120,
      borderRadius: 15,
      overflow: "hidden",
      cursor: "pointer",
      position: "relative",
      transition: "all 0.3s ease",
      "&:hover": {
        transform: "scale(1.05)",
        boxShadow: "0 8px 25px rgba(0, 212, 255, 0.4)",
      },
    },
    selectedBadge: {
      position: "absolute",
      top: 8,
      right: 8,
      background: "linear-gradient(135deg, #00d4ff 0%, #ff6ec7 100%)",
      color: "white",
      borderRadius: "50%",
      width: 24,
      height: 24,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 14,
      fontWeight: "bold",
      boxShadow: "0 4px 15px rgba(0, 212, 255, 0.3)",
    },
    // Controls styles
    controlSection: {
      mb: 3,
    },
    sliderContainer: {
      color: "#00d4ff",
      "& .MuiSlider-thumb": {
        background: "linear-gradient(135deg, #00d4ff 0%, #ff6ec7 100%)",
      },
      "& .MuiSlider-track": {
        background: "linear-gradient(135deg, #00d4ff 0%, #ff6ec7 100%)",
      },
    },
    musicSelect: {
      borderRadius: 15,
      backgroundColor: "rgba(255, 255, 255, 0.08)",
      color: "white",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "rgba(255, 255, 255, 0.15)",
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "#00d4ff",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#00d4ff",
      },
    },
    musicControls: {
      display: "flex",
      alignItems: "center",
      gap: 2,
    },
    musicButton: {
      background: "rgba(255, 255, 255, 0.1)",
      "&:hover": {
        background: "rgba(0, 212, 255, 0.2)",
        transform: "scale(1.1)",
      },
    },
    // Slideshow viewer styles
    slideshowContainer: {
      position: "relative",
      width: "100%",
      height: "60vh",
      bgcolor: "black",
      borderRadius: 20,
      overflow: "hidden",
      boxShadow: "0 0 30px rgba(0, 212, 255, 0.5)",
      border: "3px solid",
      borderImage: "linear-gradient(135deg, #00d4ff 0%, #9c27b0 50%, #ff6ec7 100%) 1",
      mb: 2,
    },
    slideshowImage: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      objectFit: "contain",
      transition: "opacity 1s ease",
    },
    slideshowControls: {
      position: "absolute",
      bottom: 20,
      left: "50%",
      transform: "translateX(-50%)",
      display: "flex",
      gap: 2,
      background: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(20px)",
      borderRadius: "30px",
      px: 3,
      py: 1,
      border: "1px solid rgba(255, 255, 255, 0.2)",
    },
    playButton: {
      color: "#00d4ff",
      "&:hover": {
        background: "rgba(0, 212, 255, 0.2)",
        transform: "scale(1.1)",
      },
    },
    pauseButton: {
      color: "#ff6ec7",
      "&:hover": {
        background: "rgba(255, 110, 199, 0.2)",
        transform: "scale(1.1)",
      },
    },
    // Loading styles
    loadingContainer: {
      textAlign: "center",
      py: 4,
    },
    loadingSpinner: {
      mb: 3,
      color: "#00d4ff",
    },
    // Button styles
    startButton: {
      borderRadius: 15,
      px: 4,
      background: "linear-gradient(135deg, #00d4ff 0%, #9c27b0 50%, #ff6ec7 100%)",
      backdropFilter: "blur(20px)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      boxShadow: "0 8px 30px rgba(0, 212, 255, 0.3)",
      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      "&:hover": {
        transform: "translateY(-3px) scale(1.05)",
        boxShadow: "0 15px 40px rgba(0, 212, 255, 0.5)",
        background: "linear-gradient(135deg, #00b8e6 0%, #8e24aa 50%, #e91e63 100%)",
      },
    },
    closeButtonAction: {
      color: "rgba(255, 255, 255, 0.7)",
      "&:hover": { color: "white" },
    },
  }
  
  export default slideshowStyles
  