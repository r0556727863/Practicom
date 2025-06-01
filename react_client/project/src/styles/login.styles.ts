const styles = {
  container: {
    position: "relative",
    minHeight: "100vh",
    py: 4, // הקטנתי מ-8 ל-4
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 20% 80%, rgba(0, 212, 255, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(156, 39, 176, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(255, 110, 199, 0.2) 0%, transparent 50%),
      linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)
    `,
    zIndex: -2,
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      linear-gradient(135deg, 
        rgba(0, 212, 255, 0.1) 0%, 
        rgba(156, 39, 176, 0.1) 50%, 
        rgba(255, 110, 199, 0.1) 100%
      )
    `,
    zIndex: -1,
  },
  contentContainer: {
    position: "relative",
    zIndex: 1,
  },
  paper: {
    p: 4, // הקטנתי מ-6 ל-4
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 20, // הקטנתי מ-25 ל-20
    background: "rgba(255, 255, 255, 0.08)",
    backdropFilter: "blur(30px)",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)", // הקטנתי קצת
    maxWidth: "400px", // הוספתי הגבלת רוחב
    width: "100%",
  },
  avatar: {
    m: 1.5, // הקטנתי מ-2 ל-1.5
    width: 60, // הקטנתי מ-80 ל-60
    height: 60, // הקטנתי מ-80 ל-60
    background: "linear-gradient(135deg, #00d4ff 0%, #9c27b0 50%, #ff6ec7 100%)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "0 10px 30px rgba(0, 212, 255, 0.4)", // הקטנתי
  },
  avatarIcon: {
    fontSize: 30, // הקטנתי מ-40 ל-30
  },
  title: {
    fontWeight: "bold",
    color: "white",
    textShadow: "0 4px 20px rgba(0, 0, 0, 0.4)",
    fontSize: "1.5rem", // הקטנתי קצת
  },
  subtitle: {
    mb: 2, // הקטנתי מ-3 ל-2
    fontSize: "0.9rem",
  },
  form: {
    width: "100%",
    mt: 1, // הקטנתי מ-2 ל-1
  },
  textField: {
    mb: 1.5, // הקטנתי מ-2 ל-1.5
    "& .MuiOutlinedInput-root": {
      borderRadius: 12, // הקטנתי מ-15 ל-12
      backgroundColor: "rgba(255, 255, 255, 0.08)",
      backdropFilter: "blur(20px)",
      border: "1px solid rgba(255, 255, 255, 0.15)",
      color: "white",
      fontSize: "0.95rem", // הקטנתי קצת
      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.12)",
        borderColor: "rgba(0, 212, 255, 0.5)",
      },
      "&.Mui-focused": {
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        borderColor: "#00d4ff",
        boxShadow: "0 0 15px rgba(0, 212, 255, 0.3)", // הקטנתי
      },
      "& .MuiOutlinedInput-notchedOutline": {
        border: "none",
      },
    },
    "& .MuiInputLabel-root": {
      color: "rgba(255, 255, 255, 0.7)",
      fontSize: "0.9rem", // הקטנתי
      "&.Mui-focused": {
        color: "#00d4ff",
      },
      "&.MuiInputLabel-shrink": {
        backgroundColor: "rgba(15, 15, 35, 0.8)",
        padding: "0 6px", // הקטנתי
        borderRadius: "6px",
        transform: "translate(14px, -9px) scale(0.75)",
      },
    },
    "& .MuiFormHelperText-root": {
      color: "rgba(255, 255, 255, 0.6)",
      fontSize: "0.8rem",
    },
  },
  alert: {
    mt: 1.5, // הקטנתי מ-2 ל-1.5
    borderRadius: 12, // הקטנתי מ-15 ל-12
    background: "rgba(244, 67, 54, 0.1)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(244, 67, 54, 0.3)",
    color: "white",
    fontSize: "0.85rem",
  },
  submitButton: {
    mt: 2, // הקטנתי מ-3 ל-2
    borderRadius: 20, // הקטנתי מ-25 ל-20
    py: 1.5, // הקטנתי מ-2 ל-1.5
    background: "linear-gradient(135deg, #00d4ff 0%, #9c27b0 50%, #ff6ec7 100%)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "0 10px 30px rgba(0, 212, 255, 0.4)", // הקטנתי
    fontSize: "1rem",
    fontWeight: 600,
    "&:hover": {
      background: "linear-gradient(135deg, #00b8e6 0%, #8e24aa 50%, #e91e63 100%)",
      transform: "translateY(-2px)", // הקטנתי מ-3 ל-2
      boxShadow: "0 15px 40px rgba(0, 212, 255, 0.5)", // הקטנתי
    },
    transition: "all 0.4s ease",
  },
  registerLink: {
    textAlign: "center",
    mt: 2, // הקטנתי מ-3 ל-2
  },
  link: {
    color: "#00d4ff",
    fontWeight: "bold",
    textDecoration: "none",
    fontSize: "0.9rem",
    "&:hover": {
      textDecoration: "underline",
      textShadow: "0 0 8px rgba(0, 212, 255, 0.5)", // הקטנתי
    },
  },
}

export default styles
