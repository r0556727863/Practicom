export const albumUploaderStyles = {
    container: {
      position: "relative",
      minHeight: "100vh",
      py: 8,
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
      backgroundImage: `url('/placeholder.svg?height=1080&width=1920')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      zIndex: -2,
      filter: "brightness(0.9)",
    },
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `linear-gradient(135deg, rgba(245, 169, 184, 0.7) 0%, rgba(169, 222, 245, 0.7) 100%)`,
      zIndex: -1,
    },
    decorElement: {
      position: "absolute",
      width: "calc(Math.random() * 60 + 20)px",
      height: "calc(Math.random() * 60 + 20)px",
      borderRadius: "50%",
      opacity: 0.4,
      filter: "blur(8px)",
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
    },
    "float-0": {
      animation: `float-0 ${Math.random() * 10 + 10}s infinite ease-in-out`,
      "@keyframes float-0": {
        "0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
        "50%": { transform: "translate(100px, -100px) rotate(180deg)" },
      },
    },
    "float-1": {
      animation: `float-1 ${Math.random() * 10 + 10}s infinite ease-in-out`,
      "@keyframes float-1": {
        "0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
        "50%": { transform: "translate(-120px, 50px) rotate(-180deg)" },
      },
    },
    "float-2": {
      animation: `float-2 ${Math.random() * 10 + 10}s infinite ease-in-out`,
      "@keyframes float-2": {
        "0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
        "50%": { transform: "translate(70px, 120px) rotate(90deg)" },
      },
    },
    "float-3": {
      animation: `float-3 ${Math.random() * 10 + 10}s infinite ease-in-out`,
      "@keyframes float-3": {
        "0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
        "50%": { transform: "translate(-50px, -80px) rotate(-90deg)" },
      },
    },
    "float-4": {
      animation: `float-4 ${Math.random() * 10 + 10}s infinite ease-in-out`,
      "@keyframes float-4": {
        "0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
        "50%": { transform: "translate(120px, 30px) rotate(180deg)" },
      },
    },
    "float-5": {
      animation: `float-5 ${Math.random() * 10 + 10}s infinite ease-in-out`,
      "@keyframes float-5": {
        "0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
        "50%": { transform: "translate(-90px, 90px) rotate(-180deg)" },
      },
    },
    "float-6": {
      animation: `float-6 ${Math.random() * 10 + 10}s infinite ease-in-out`,
      "@keyframes float-6": {
        "0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
        "50%": { transform: "translate(110px, -70px) rotate(90deg)" },
      },
    },
    "float-7": {
      animation: `float-7 ${Math.random() * 10 + 10}s infinite ease-in-out`,
      "@keyframes float-7": {
        "0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
        "50%": { transform: "translate(-60px, -120px) rotate(-90deg)" },
      },
    },
    "float-8": {
      animation: `float-8 ${Math.random() * 10 + 10}s infinite ease-in-out`,
      "@keyframes float-8": {
        "0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
        "50%": { transform: "translate(80px, 80px) rotate(180deg)" },
      },
    },
    "float-9": {
      animation: `float-9 ${Math.random() * 10 + 10}s infinite ease-in-out`,
      "@keyframes float-9": {
        "0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
        "50%": { transform: "translate(-100px, 40px) rotate(-180deg)" },
      },
    },
    "float-10": {
      animation: `float-10 ${Math.random() * 10 + 10}s infinite ease-in-out`,
      "@keyframes float-10": {
        "0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
        "50%": { transform: "translate(90px, -90px) rotate(90deg)" },
      },
    },
    "float-11": {
      animation: `float-11 ${Math.random() * 10 + 10}s infinite ease-in-out`,
      "@keyframes float-11": {
        "0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
        "50%": { transform: "translate(-70px, -40px) rotate(-90deg)" },
      },
    },
    "float-12": {
      animation: `float-12 ${Math.random() * 10 + 10}s infinite ease-in-out`,
      "@keyframes float-12": {
        "0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
        "50%": { transform: "translate(60px, 110px) rotate(180deg)" },
      },
    },
    "float-13": {
      animation: `float-13 ${Math.random() * 10 + 10}s infinite ease-in-out`,
      "@keyframes float-13": {
        "0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
        "50%": { transform: "translate(-110px, 60px) rotate(-180deg)" },
      },
    },
    "float-14": {
      animation: `float-14 ${Math.random() * 10 + 10}s infinite ease-in-out`,
      "@keyframes float-14": {
        "0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
        "50%": { transform: "translate(40px, -110px) rotate(90deg)" },
      },
    },
    floatingIcon1: {
      position: "absolute",
      top: "15%",
      left: "10%",
      animation: "float-icon1 15s infinite ease-in-out",
      "@keyframes float-icon1": {
        "0%, 100%": { transform: "translateY(0)" },
        "50%": { transform: "translateY(-30px)" },
      },
    },
    floatingIconImage1: {
      fontSize: 60,
      color: "rgba(255, 255, 255, 0.7)",
    },
    floatingIcon2: {
      position: "absolute",
      top: "25%",
      right: "15%",
      animation: "float-icon2 18s infinite ease-in-out",
      "@keyframes float-icon2": {
        "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
        "50%": { transform: "translateY(40px) rotate(10deg)" },
      },
    },
    floatingIconImage2: {
      fontSize: 50,
      color: "rgba(255, 255, 255, 0.6)",
    },
    floatingIcon3: {
      position: "absolute",
      bottom: "20%",
      left: "20%",
      animation: "float-icon3 20s infinite ease-in-out",
      "@keyframes float-icon3": {
        "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
        "50%": { transform: "translateY(-50px) rotate(-15deg)" },
      },
    },
    floatingIconImage3: {
      fontSize: 70,
      color: "rgba(255, 255, 255, 0.5)",
    },
    floatingIcon4: {
      position: "absolute",
      bottom: "30%",
      right: "10%",
      animation: "float-icon4 17s infinite ease-in-out",
      "@keyframes float-icon4": {
        "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
        "50%": { transform: "translateY(30px) rotate(20deg)" },
      },
    },
    floatingIconImage4: {
      fontSize: 55,
      color: "rgba(255, 255, 255, 0.6)",
    },
    contentContainer: {
      position: "relative",
      zIndex: 1,
    },
    backButton: {
      position: "absolute",
      top: -60,
      right: 0,
      color: "white",
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      backdropFilter: "blur(10px)",
      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.3)",
      },
    },
    paper: {
      borderRadius: "30px",
      overflow: "hidden",
      background: "rgba(255, 255, 255, 0.15)",
      backdropFilter: "blur(20px)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.1)",
    },
    headerBox: {
      background: "linear-gradient(45deg, rgba(245, 169, 184, 0.8), rgba(169, 222, 245, 0.8), rgba(186, 169, 245, 0.8))",
      p: 4,
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
    },
    headerDecor1: {
      position: "absolute",
      top: -20,
      left: -20,
      width: 100,
      height: 100,
      borderRadius: "50%",
      background: "rgba(255, 255, 255, 0.2)",
    },
    headerDecor2: {
      position: "absolute",
      bottom: -30,
      right: -30,
      width: 120,
      height: 120,
      borderRadius: "50%",
      background: "rgba(255, 255, 255, 0.15)",
    },
    avatar: {
      width: 100,
      height: 100,
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      margin: "0 auto 20px",
      boxShadow: "0 10px 30px rgba(245, 169, 184, 0.3)",
      animation: "pulse 2s infinite",
      "@keyframes pulse": {
        "0%": {
          boxShadow: "0 0 0 0 rgba(245, 169, 184, 0.7)",
        },
        "70%": {
          boxShadow: "0 0 0 15px rgba(245, 169, 184, 0)",
        },
        "100%": {
          boxShadow: "0 0 0 0 rgba(245, 169, 184, 0)",
        },
      },
    },
    avatarIcon: {
      fontSize: 50,
      color: "#f5a9b8",
    },
    title: {
      textShadow: "2px 2px 8px rgba(0,0,0,0.2)",
      mb: 1,
    },
    subtitle: {
      textShadow: "1px 1px 4px rgba(0,0,0,0.2)",
      opacity: 0.9,
      mt: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 1,
    },
    formContainer: {
      p: 4,
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      position: "relative",
      overflow: "hidden",
    },
    formDecor1: {
      position: "absolute",
      top: "20%",
      left: "-5%",
      width: "30%",
      height: "60%",
      borderRadius: "50%",
      background: "linear-gradient(45deg, rgba(245, 169, 184, 0.1), rgba(169, 222, 245, 0.1))",
      transform: "rotate(-20deg)",
    },
    formDecor2: {
      position: "absolute",
      bottom: "10%",
      right: "-10%",
      width: "40%",
      height: "40%",
      borderRadius: "50%",
      background: "linear-gradient(45deg, rgba(169, 222, 245, 0.1), rgba(186, 169, 245, 0.1))",
      transform: "rotate(15deg)",
    },
    formTitle: {
      mb: 3,
      display: "flex",
      alignItems: "center",
      gap: 1,
    },
    textFieldInput: {
      borderRadius: "15px",
      color: "#333",
      background: "rgba(255, 255, 255, 0.8)",
      "&:hover": {
        background: "rgba(255, 255, 255, 0.95)",
      },
      "&.Mui-focused": {
        background: "rgba(255, 255, 255, 0.95)",
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "#f5a9b8",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#f5a9b8",
        borderWidth: 2,
      },
    },
    textFieldLabel: {
      color: "#666",
      "&.MuiInputLabel-shrink": {
        transform: "translate(14px, -9px) scale(0.75)",
        background: "white",
        padding: "0 5px",
      },
      "&.Mui-focused": {
        color: "#f5a9b8",
      },
    },
    alert: {
      mt: 3,
      borderRadius: "15px",
      boxShadow: "0 4px 12px rgba(16, 185, 129, 0.2)",
      animation: "fadeIn 0.5s",
      "@keyframes fadeIn": {
        from: { opacity: 0, transform: "translateY(10px)" },
        to: { opacity: 1, transform: "translateY(0)" },
      },
    },
    submitButton: {
      mt: 4,
      borderRadius: "15px",
      py: 2,
      background: "linear-gradient(45deg, #f5a9b8, #a9def5)",
      color: "white",
      fontWeight: "bold",
      fontSize: "1.1rem",
      boxShadow: "0 10px 20px rgba(245, 169, 184, 0.3)",
      transition: "all 0.3s ease",
      "&:hover": {
        background: "linear-gradient(45deg, #f5a9b8, #a9def5)",
        transform: "translateY(-5px)",
        boxShadow: "0 15px 25px rgba(245, 169, 184, 0.4)",
      },
      "&:active": {
        transform: "translateY(-2px)",
      },
    },
  }
  