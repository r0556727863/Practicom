export const homePageStyles = {
  container: {
    position: "relative",
    minHeight: "100vh",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
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

  floatingElement: (i: number) => ({
    position: "absolute",
    width: Math.random() * 60 + 30,
    height: Math.random() * 60 + 30,
    borderRadius: "50%",
    background:
      i % 3 === 0
        ? "linear-gradient(135deg, rgba(0, 212, 255, 0.4), rgba(0, 212, 255, 0.1))"
        : i % 3 === 1
          ? "linear-gradient(135deg, rgba(156, 39, 176, 0.4), rgba(156, 39, 176, 0.1))"
          : "linear-gradient(135deg, rgba(255, 110, 199, 0.4), rgba(255, 110, 199, 0.1))",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    animation: `float-element-${i} ${Math.random() * 25 + 20}s infinite ease-in-out`,
    [`@keyframes float-element-${i}`]: {
      "0%, 100%": {
        transform: `translate(0, 0) rotate(0deg)`,
        opacity: 0.3,
      },
      "50%": {
        transform: `translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) rotate(180deg)`,
        opacity: 0.7,
      },
    },
    '@media (max-height: 1200px)': {
        display: 'none', // ייעלמו כאשר גובה המסך קטן מ-1200 פיקסלים
    },
  }),


  heroContainer: {
    position: "relative",
    zIndex: 1,
    py: 8,
  },

  heroContent: {
    display: "flex",
    flexDirection: { xs: "column", lg: "row" },
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    mb: 12,
  },

  heroTextContent: {
    flex: 1,
    textAlign: { xs: "center", lg: "right" },
    maxWidth: { lg: "600px" },
  },

  heroTitle: {
    fontSize: { xs: "3rem", sm: "4rem", lg: "5rem" },
    fontWeight: 900,
    color: "white",
    mb: 4,
    lineHeight: 1.1,
    textShadow: "0 8px 40px rgba(0, 0, 0, 0.5)",
    position: "relative",
  },

  heroSubtitle: {
    fontSize: { xs: "1.3rem", sm: "1.5rem" },
    color: "rgba(255, 255, 255, 0.9)",
    mb: 6,
    lineHeight: 1.6,
    fontWeight: 400,
    textShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
  },

  heroButtons: {
    display: "flex",
    gap: 3,
    mb: 6,
    flexDirection: { xs: "column", sm: "row" },
    justifyContent: { xs: "center", lg: "flex-start" },
  },

  primaryButton: {
    borderRadius: 50,
    px: 8,
    py: 2.5,
    fontSize: "1.2rem",
    fontWeight: 700,
    textTransform: "none",
    background: "linear-gradient(135deg, #00d4ff 0%, #9c27b0 50%, #ff6ec7 100%)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "0 15px 50px rgba(0, 212, 255, 0.4)",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      transform: "translateY(-8px) scale(1.05)",
      boxShadow: "0 25px 70px rgba(0, 212, 255, 0.6)",
      background: "linear-gradient(135deg, #00b8e6 0%, #8e24aa 50%, #e91e63 100%)",
    },
  },

  secondaryButton: {
    borderRadius: 50,
    px: 8,
    py: 2.5,
    fontSize: "1.2rem",
    fontWeight: 700,
    textTransform: "none",
    color: "white",
    borderColor: "rgba(255, 255, 255, 0.3)",
    borderWidth: 2,
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(20px)",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      transform: "translateY(-8px) scale(1.05)",
      borderColor: "rgba(255, 255, 255, 0.5)",
      background: "rgba(255, 255, 255, 0.2)",
      boxShadow: "0 25px 70px rgba(255, 255, 255, 0.3)",
    },
  },

  heroImageContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    height: { xs: "400px", lg: "500px" },
  },

  floatingAlbumContainer: {
    position: "relative",
    width: "100%",
    height: "100%",
    perspective: "1000px",
  },

  floatingAlbum1: {
    position: "absolute",
    width: "220px",
    height: "280px",
    borderRadius: 20,
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(30px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "0 30px 80px rgba(0, 212, 255, 0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    top: "5%",
    right: "15%",
    transform: "rotateY(-20deg) rotateX(10deg)",
    animation: "float-album1 10s ease-in-out infinite",
    "@keyframes float-album1": {
      "0%, 100%": {
        transform: "rotateY(-20deg) rotateX(10deg) translateY(0px)",
      },
      "50%": {
        transform: "rotateY(-15deg) rotateX(15deg) translateY(-30px)",
      },
    },
  },

  floatingAlbumIcon1: {
    fontSize: 90,
    color: "rgba(255, 255, 255, 0.8)",
  },

  floatingAlbum2: {
    position: "absolute",
    width: "180px",
    height: "220px",
    borderRadius: 20,
    background: "rgba(255, 255, 255, 0.08)",
    backdropFilter: "blur(25px)",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    boxShadow: "0 25px 60px rgba(156, 39, 176, 0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    bottom: "15%",
    left: "10%",
    transform: "rotateY(25deg) rotateX(-10deg)",
    animation: "float-album2 12s ease-in-out infinite reverse",
    "@keyframes float-album2": {
      "0%, 100%": {
        transform: "rotateY(25deg) rotateX(-10deg) translateY(0px)",
      },
      "50%": {
        transform: "rotateY(30deg) rotateX(-15deg) translateY(-25px)",
      },
    },
  },

  floatingAlbumIcon2: {
    fontSize: 80,
    color: "rgba(255, 255, 255, 0.7)",
  },

  floatingAlbum3: {
    position: "absolute",
    width: "160px",
    height: "190px",
    borderRadius: 20,
    background: "rgba(255, 255, 255, 0.06)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 20px 50px rgba(255, 110, 199, 0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    top: "45%",
    left: "45%",
    transform: "translate(-50%, -50%) rotateY(10deg) rotateX(20deg)",
    animation: "float-album3 14s ease-in-out infinite",
    "@keyframes float-album3": {
      "0%, 100%": {
        transform: "translate(-50%, -50%) rotateY(10deg) rotateX(20deg) translateY(0px)",
      },
      "50%": {
        transform: "translate(-50%, -50%) rotateY(15deg) rotateX(25deg) translateY(-20px)",
      },
    },
  },

  floatingAlbumIcon3: {
    fontSize: 70,
    color: "rgba(255, 255, 255, 0.6)",
  },

  featuresSection: {
    mb: 12,
  },

  featuresTitle: {
    fontSize: { xs: "2.5rem", md: "3.5rem" },
    fontWeight: 800,
    color: "white",
    textAlign: "center",
    mb: 8,
    textShadow: "0 8px 30px rgba(0, 0, 0, 0.4)",
  },

  featuresContainer: {
    display: "grid",
    gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
    gap: 4,
  },

  featureBox: {
    position: "relative",
    p: 5,
    borderRadius: 25,
    background: "rgba(255, 255, 255, 0.08)",
    backdropFilter: "blur(30px)",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.2)",
    transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
    overflow: "hidden",
    "&:hover": {
      transform: "translateY(-15px) scale(1.02)",
      background: "rgba(255, 255, 255, 0.12)",
      boxShadow: "0 30px 80px rgba(0, 0, 0, 0.3)",
    },
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "3px",
      background: "linear-gradient(90deg, #00d4ff 0%, #9c27b0 50%, #ff6ec7 100%)",
    },
  },

  featureIconContainer: {
    display: "flex",
    justifyContent: "center",
    mb: 3,
  },

  featureIcon1: {
    fontSize: 70,
    color: "#00d4ff",
    filter: "drop-shadow(0 4px 15px rgba(0, 212, 255, 0.4))",
  },

  featureIcon2: {
    fontSize: 70,
    color: "#9c27b0",
    filter: "drop-shadow(0 4px 15px rgba(156, 39, 176, 0.4))",
  },

  featureIcon3: {
    fontSize: 70,
    color: "#ff6ec7",
    filter: "drop-shadow(0 4px 15px rgba(255, 110, 199, 0.4))",
  },

  featureTitle: {
    color: "white",
    fontWeight: 700,
    mb: 2,
    textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
  },

  featureDescription: {
    color: "rgba(255, 255, 255, 0.8)",
    lineHeight: 1.6,
  },

  ctaSection: {
    position: "relative",
    textAlign: "center",
    p: 8,
    borderRadius: 30,
    background: "rgba(255, 255, 255, 0.08)",
    backdropFilter: "blur(30px)",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    boxShadow: "0 25px 80px rgba(0, 0, 0, 0.2)",
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "4px",
      background: "linear-gradient(90deg, #00d4ff 0%, #9c27b0 50%, #ff6ec7 100%)",
    },
  },

  ctaTitle: {
    color: "white",
    fontWeight: 800,
    mb: 3,
    textShadow: "0 4px 20px rgba(0, 0, 0, 0.4)",
  },

  ctaDescription: {
    color: "rgba(255, 255, 255, 0.9)",
    mb: 5,
    lineHeight: 1.6,
    maxWidth: "600px",
    mx: "auto",
    fontSize: "1.1rem",
  },

  ctaButton: {
    borderRadius: 50,
    px: 8,
    py: 3,
    fontSize: "1.3rem",
    fontWeight: 700,
    textTransform: "none",
    background: "linear-gradient(135deg, #00d4ff 0%, #9c27b0 50%, #ff6ec7 100%)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "0 15px 50px rgba(0, 212, 255, 0.4)",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      transform: "translateY(-8px) scale(1.05)",
      boxShadow: "0 25px 70px rgba(0, 212, 255, 0.6)",
      background: "linear-gradient(135deg, #00b8e6 0%, #8e24aa 50%, #e91e63 100%)",
    },
  },
}
