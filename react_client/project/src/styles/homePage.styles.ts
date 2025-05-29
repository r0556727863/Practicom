// export const homePageStyles = {
//     container: {
//       position: "relative",
//       minHeight: "100vh",
//       overflow: "hidden",
//       display: "flex",
//       flexDirection: "column",
//       justifyContent: "center",
//     },
//     background: {
//       position: "fixed",
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       backgroundImage: `url('/placeholder.svg?height=1080&width=1920')`,
//       backgroundSize: "cover",
//       backgroundPosition: "center",
//       backgroundAttachment: "fixed",
//       zIndex: -2,
//       filter: "brightness(0.9)",
//     },
//     overlay: {
//       position: "fixed",
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       background: `linear-gradient(135deg, rgba(245, 169, 184, 0.7) 0%, rgba(169, 222, 245, 0.7) 100%)`,
//       zIndex: -1,
//     },
//     decorElement1: {
//       position: "absolute",
//       top: "5%",
//       left: "5%",
//       width: "150px",
//       height: "150px",
//       backgroundImage: `url('/placeholder.svg?height=150&width=150')`,
//       backgroundSize: "contain",
//       backgroundPosition: "center",
//       backgroundRepeat: "no-repeat",
//       opacity: 0.6,
//       zIndex: 0,
//     },
//     decorElement2: {
//       position: "absolute",
//       bottom: "5%",
//       right: "5%",
//       width: "180px",
//       height: "180px",
//       backgroundImage: `url('/placeholder.svg?height=180&width=180')`,
//       backgroundSize: "contain",
//       backgroundPosition: "center",
//       backgroundRepeat: "no-repeat",
//       opacity: 0.6,
//       zIndex: 0,
//       transform: "rotate(180deg)",
//     },
//     heroContainer: {
//       position: "relative",
//       zIndex: 1,
//       py: 8,
//     },
//     heroContent: {
//       display: "flex",
//       flexDirection: { xs: "column", md: "row" },
//       alignItems: "center",
//       justifyContent: "space-between",
//       gap: 4,
//       mb: 6,
//     },
//     heroTextContent: {
//       flex: 1,
//       textAlign: { xs: "center", md: "left" },
//     },
//     heroTitle: {
//       fontWeight: 800,
//       fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4rem" },
//       color: "#333",
//       mb: 2,
//       textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
//       position: "relative",
//       display: "inline-block",
//     },
//     heroTitleUnderline: {
//       position: "absolute",
//       bottom: -10,
//       left: 0,
//       width: "80%",
//       height: "6px",
//       background: "linear-gradient(90deg, #ff758c 0%, #a9def5 100%)",
//       borderRadius: "3px",
//     },
//     heroSubtitle: {
//       color: "#555",
//       mb: 4,
//       maxWidth: "600px",
//       mx: { xs: "auto", md: 0 },
//       fontWeight: 400,
//     },
//     heroButtons: {
//       display: "flex",
//       gap: 2,
//       justifyContent: { xs: "center", md: "flex-start" },
//       flexWrap: "wrap",
//     },
//     primaryButton: {
//       borderRadius: 2,
//       py: 1.5,
//       px: 4,
//       boxShadow: "0 10px 20px rgba(255, 117, 140, 0.3)",
//       background: `linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)`,
//       transition: "all 0.3s ease",
//       "&:hover": {
//         transform: "translateY(-5px)",
//         boxShadow: "0 15px 25px rgba(255, 117, 140, 0.4)",
//       },
//     },
//     secondaryButton: {
//       borderRadius: 2,
//       py: 1.5,
//       px: 4,
//       borderWidth: 2,
//       borderColor: "#555",
//       color: "#555",
//       transition: "all 0.3s ease",
//       "&:hover": {
//         borderWidth: 2,
//         borderColor: "#333",
//         transform: "translateY(-5px)",
//         boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
//         backgroundColor: "rgba(255, 255, 255, 0.2)",
//       },
//     },
//     heroImageContainer: {
//       flex: 1,
//       display: "flex",
//       justifyContent: "center",
//       position: "relative",
//     },
//     floatingAlbumContainer: {
//       width: { xs: "280px", sm: "350px", md: "400px" },
//       height: { xs: "280px", sm: "350px", md: "400px" },
//       position: "relative",
//       perspective: "1000px",
//     },
//     floatingAlbum1: {
//       position: "absolute",
//       width: "100%",
//       height: "100%",
//       borderRadius: "10px",
//       background: "rgba(255, 255, 255, 0.8)",
//       boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
//       transform: "rotateY(-15deg) rotateX(5deg)",
//       animation: "float 6s ease-in-out infinite",
//       "@keyframes float": {
//         "0%": {
//           transform: "rotateY(-15deg) rotateX(5deg) translateY(0px)",
//         },
//         "50%": {
//           transform: "rotateY(-10deg) rotateX(10deg) translateY(-20px)",
//         },
//         "100%": {
//           transform: "rotateY(-15deg) rotateX(5deg) translateY(0px)",
//         },
//       },
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       overflow: "hidden",
//     },
//     floatingAlbumIcon1: {
//       fontSize: { xs: "120px", sm: "150px", md: "180px" },
//       color: "#ff758c",
//       opacity: 0.8,
//     },
//     floatingAlbum2: {
//       position: "absolute",
//       width: "80%",
//       height: "80%",
//       borderRadius: "10px",
//       background: "rgba(255, 255, 255, 0.9)",
//       boxShadow: "0 15px 35px rgba(0, 0, 0, 0.2)",
//       top: "10%",
//       left: "-15%",
//       transform: "rotateY(10deg) rotateX(-5deg)",
//       animation: "float2 7s ease-in-out infinite",
//       "@keyframes float2": {
//         "0%": {
//           transform: "rotateY(10deg) rotateX(-5deg) translateY(0px)",
//         },
//         "50%": {
//           transform: "rotateY(15deg) rotateX(-10deg) translateY(-15px)",
//         },
//         "100%": {
//           transform: "rotateY(10deg) rotateX(-5deg) translateY(0px)",
//         },
//       },
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       overflow: "hidden",
//       zIndex: -1,
//     },
//     floatingAlbumIcon2: {
//       fontSize: { xs: "80px", sm: "100px", md: "120px" },
//       color: "#a9def5",
//       opacity: 0.8,
//     },
//     featuresSection: {
//       mt: 10,
//       position: "relative",
//     },
//     featuresTitle: {
//       textAlign: "center",
//       fontWeight: 700,
//       color: "#333",
//       mb: 6,
//       position: "relative",
//       display: "inline-block",
//       left: "50%",
//       transform: "translateX(-50%)",
//     },
//     featuresTitleUnderline: {
//       position: "absolute",
//       bottom: -5,
//       left: 0,
//       right: 0,
//       height: "6px",
//       background: "linear-gradient(90deg, #ff758c 0%, #a9def5 100%)",
//       borderRadius: "3px",
//       width: "60%",
//       mx: "auto",
//     },
//     featuresContainer: {
//       display: "flex",
//       flexWrap: "wrap",
//       justifyContent: "center",
//       gap: 3,
//       mb: 8,
//     },
//     featureBox: {
//       width: { xs: "100%", sm: "30%", md: "30%" },
//       maxWidth: "300px",
//       p: 3,
//       borderRadius: "20px",
//       background: "rgba(255, 255, 255, 0.85)",
//       backdropFilter: "blur(10px)",
//       boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
//       transition: "transform 0.3s ease, box-shadow 0.3s ease",
//       "&:hover": {
//         transform: "translateY(-10px)",
//         boxShadow: "0 15px 35px rgba(0, 0, 0, 0.15)",
//       },
//       position: "relative",
//       overflow: "hidden",
//     },
//     featureHighlight: {
//       position: "absolute",
//       top: 0,
//       left: 0,
//       width: "100%",
//       height: "5px",
//       background: "linear-gradient(90deg, #ff758c 0%, #ff7eb3 100%)",
//     },
//     featureHighlight2: {
//       position: "absolute",
//       top: 0,
//       left: 0,
//       width: "100%",
//       height: "5px",
//       background: "linear-gradient(90deg, #a9def5 0%, #7fd6f7 100%)",
//     },
//     featureHighlight3: {
//       position: "absolute",
//       top: 0,
//       left: 0,
//       width: "100%",
//       height: "5px",
//       background: "linear-gradient(90deg, #d4a5ff 0%, #b57dff 100%)",
//     },
//     featureIconContainer: {
//       textAlign: "center",
//       mb: 2,
//     },
//     featureIcon1: {
//       fontSize: 50,
//       color: "#ff758c",
//     },
//     featureIcon2: {
//       fontSize: 50,
//       color: "#a9def5",
//     },
//     featureIcon3: {
//       fontSize: 50,
//       color: "#d4a5ff",
//     },
//     featureTitle: {
//       color: "#333",
//       fontWeight: 600,
//     },
//     featureDescription: {
//       color: "#555",
//       variant: "body2",
//     },
//     ctaSection: {
//       mt: 8,
//       p: 6,
//       borderRadius: "20px",
//       background: "rgba(255, 255, 255, 0.85)",
//       backdropFilter: "blur(10px)",
//       boxShadow: "0 15px 50px rgba(0, 0, 0, 0.1)",
//       textAlign: "center",
//       position: "relative",
//       overflow: "hidden",
//     },
//     ctaHighlight: {
//       position: "absolute",
//       top: 0,
//       left: 0,
//       right: 0,
//       height: "5px",
//       background: "linear-gradient(90deg, #ff758c 0%, #a9def5 100%)",
//     },
//     ctaTitle: {
//       color: "#333",
//       fontWeight: "bold",
//     },
//     ctaDescription: {
//       color: "#555",
//       mb: 4,
//       maxWidth: "800px",
//       mx: "auto",
//     },
//     ctaButton: {
//       borderRadius: "30px",
//       py: 1.5,
//       px: 6,
//       background: `linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)`,
//       boxShadow: "0 10px 20px rgba(255, 117, 140, 0.3)",
//       transition: "all 0.3s ease",
//       "&:hover": {
//         transform: "translateY(-5px)",
//         boxShadow: "0 15px 30px rgba(255, 117, 140, 0.4)",
//       },
//     },
//   }
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
