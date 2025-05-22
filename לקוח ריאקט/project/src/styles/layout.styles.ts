const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
    },
    appBar: {
      background: "linear-gradient(135deg, #ff758c 0%, #a9def5 100%)",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
    },
    toolbar: {
      justifyContent: "space-between",
      padding: { xs: "0 8px", sm: "0 16px" },
    },
    logoLink: {
      textDecoration: "none",
      display: "flex",
      alignItems: "center",
      marginRight: "auto",
    },
    logoIcon: {
      mr: 1,
      color: "white",
      fontSize: "2rem",
    },
    logoText: {
      fontWeight: "bold",
      color: "white",
      display: { xs: "none", sm: "block" },
    },
    desktopNav: {
      display: "flex",
      gap: 2,
      marginLeft: "auto",
      alignItems: "center",
    },
    navButton: {
      color: "white",
      "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
    },
    loginButton: {
      bgcolor: "white",
      color: "#ff758c",
      "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
    },
    menuButton: {
      color: "white",
    },
    drawer: {
      width: 280,
      background: "linear-gradient(180deg, #ff758c 0%, #a9def5 100%)",
    },
    drawerHeader: {
      p: 3,
      display: "flex",
      alignItems: "center",
      borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
    },
    drawerLogo: {
      mr: 1,
      color: "white",
      fontSize: "2rem",
    },
    drawerTitle: {
      fontWeight: "bold",
      color: "white",
    },
    drawerList: {
      pt: 2,
    },
    drawerItem: {
      py: 1.5,
      borderRadius: "0 24px 24px 0",
      mr: 2,
      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
      },
    },
    drawerItemIcon: {
      color: "white",
      minWidth: 40,
    },
    drawerItemText: {
      fontWeight: "medium",
      color: "white",
    },
    main: {
      flexGrow: 1,
      pt: "64px",
    },
    footer: {
      py: 3,
      backgroundColor: "rgba(244, 113, 194, 0.8)",
      backdropFilter: "blur(10px)",
      color: "rgba(255, 255, 255, 0.8)",
      textAlign: "center",
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      width: "100%",
      zIndex: 10,
    },
  }
  
  export default styles
  