export const collageStyles = {
    // Dialog styles
    dialog: {
      borderRadius: 25,
      background: "rgba(255, 255, 255, 0.08)",
      backdropFilter: "blur(30px)",
      border: "1px solid rgba(255, 255, 255, 0.15)",
      boxShadow: "0 25px 80px rgba(0, 0, 0, 0.3)",
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
      right: 35,
      top: "50%",
      transform: "translateY(-50%)",
      color: "white",
      background: "rgba(255, 255, 255, 0.1)",
      width: 40,
      height: 40,
      "&:hover": {
        background: "rgba(255, 255, 255, 0.2)",
        transform: "translateY(-50%) scale(1.1)",
      },
    },
  
    dialogContent: {
      padding: "24px",
      background: "rgba(255, 255, 255, 0.02)",
    },
  
    dialogActions: {
      p: 3,
      background: "rgba(255, 255, 255, 0.05)",
      borderTop: "1px solid rgba(255, 255, 255, 0.1)",
    },
  
    cancelButton: {
      color: "rgba(255, 255, 255, 0.7)",
      "&:hover": { color: "white" },
    },
  
    saveButton: {
      borderRadius: 20,
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
  
    // Canvas styles
    canvasContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      mb: 2,
      borderRadius: 20,
      p: 2,
      minHeight: 350,
      background: "transparent",
      border: "none",
    },
  
    canvas: {
      maxWidth: "100%",
      maxHeight: "100%",
      display: "block",
      borderRadius: "15px",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
    },
  
    // Controls styles
    formControl: {
      mb: 3,
      mt: 2,
    },
  
    inputLabel: {
      color: "rgba(255, 255, 255, 0.7)",
      "&.Mui-focused": { color: "#00d4ff" },
      top: -8,
    },
  
    select: {
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
  
    slider: {
      mb: 3,
      color: "#00d4ff",
      "& .MuiSlider-thumb": {
        background: "linear-gradient(135deg, #00d4ff 0%, #ff6ec7 100%)",
        width: 20,
        height: 20,
      },
      "& .MuiSlider-track": {
        background: "linear-gradient(135deg, #00d4ff 0%, #ff6ec7 100%)",
        height: 6,
      },
      "& .MuiSlider-rail": {
        background: "rgba(255, 255, 255, 0.2)",
        height: 6,
      },
    },
  
    colorPalette: {
      display: "flex",
      gap: 1.5,
      mb: 3,
      flexWrap: "wrap",
    },
  
    colorBox: {
      width: 35,
      height: 35,
      borderRadius: "50%",
      cursor: "pointer",
      transition: "all 0.3s ease",
      "&:hover": {
        transform: "scale(1.15)",
        boxShadow: "0 4px 15px rgba(0, 212, 255, 0.4)",
      },
    },
  
    textField: {
      mb: 3,
      "& .MuiOutlinedInput-root": {
        borderRadius: 15,
        backgroundColor: "rgba(255, 255, 255, 0.08)",
        color: "white",
        "& fieldset": {
          borderColor: "rgba(255, 255, 255, 0.15)",
        },
        "&:hover fieldset": {
          borderColor: "#00d4ff",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#00d4ff",
        },
      },
      "& .MuiInputLabel-root": {
        color: "rgba(255, 255, 255, 0.7)",
        "&.Mui-focused": {
          color: "#00d4ff",
        },
      },
    },
  }
  