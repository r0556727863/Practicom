export const fileUploaderStyles = {
    card: {
      maxWidth: 500,
      mx: "auto",
      borderRadius: 4,
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
      position: "relative",
      overflow: "visible",
      background: "rgba(255, 255, 255, 0.9)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
    },
    closeButton: {
      position: "absolute",
      top: 8,
      right: 8,
      zIndex: 1,
      bgcolor: "rgba(0,0,0,0.05)",
      "&:hover": {
        bgcolor: "rgba(0,0,0,0.1)",
      },
    },
    cardContent: {
      p: 4,
    },
    headerBox: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      mb: 3,
    },
    avatar: {
      width: 70,
      height: 70,
      bgcolor: "#ff758c",
      mb: 2,
      boxShadow: "0 4px 12px rgba(255, 117, 140, 0.3)",
    },
    avatarIcon: {
      fontSize: 40,
    },
    dropZone: {
      border: "2px dashed rgba(255, 117, 140, 0.3)",
      borderRadius: 2,
      p: 3,
      textAlign: "center",
      mb: 3,
      transition: "all 0.2s",
      "&:hover": {
        borderColor: "#ff758c",
        bgcolor: "rgba(255, 117, 140, 0.05)",
      },
    },
    dropZoneContent: {
      cursor: "pointer",
      py: 2,
    },
    uploadIcon: {
      fontSize: 48,
      color: "#ff758c",
      mb: 1,
    },
    progressContainer: {
      mb: 3,
    },
    progressLabels: {
      display: "flex",
      justifyContent: "space-between",
      mb: 1,
    },
    progressBar: {
      borderRadius: 1,
      height: 8,
      "& .MuiLinearProgress-bar": {
        background: "linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)",
      },
    },
    alert: {
      mb: 3,
      borderRadius: 2,
    },
    uploadButton: {
      mt: 2,
      borderRadius: 2,
      py: 1.5,
      background: "linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)",
      boxShadow: "0 4px 12px rgba(255, 117, 140, 0.3)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      "&:hover": {
        transform: "translateY(-3px)",
        boxShadow: "0 6px 16px rgba(255, 117, 140, 0.4)",
      },
    },
  }
  