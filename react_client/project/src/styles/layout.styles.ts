const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  appBar: {
    background: "rgba(255, 255, 255, 0.08)",
    backdropFilter: "blur(30px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 8px 40px rgba(0, 0, 0, 0.2)",
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
    filter: "drop-shadow(0 4px 15px rgba(0, 212, 255, 0.5))",
  },
  logoText: {
    fontWeight: "bold",
    color: "white",
    display: { xs: "none", sm: "block" },
    textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
  },
  desktopNav: {
    display: "flex",
    gap: 2,
    marginLeft: "auto",
    alignItems: "center",
  },
  navButton: {
    color: "white",
    borderRadius: 3,
    backdropFilter: "blur(10px)",
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.1)",
      transform: "translateY(-2px)",
    },
    transition: "all 0.3s ease",
  },
  loginButton: {
    background: "linear-gradient(135deg, #00d4ff 0%, #9c27b0 100%)",
    color: "white",
    borderRadius: 3,
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    "&:hover": {
      background: "linear-gradient(135deg, #00b8e6 0%, #8e24aa 100%)",
      transform: "translateY(-2px)",
    },
    transition: "all 0.3s ease",
  },
  menuButton: {
    color: "white",
  },
  drawer: {
    width: 280,
    background: "rgba(15, 15, 35, 0.95)",
    backdropFilter: "blur(30px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  drawerHeader: {
    p: 3,
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
  },
  drawerLogo: {
    mr: 1,
    color: "white",
    fontSize: "2rem",
    filter: "drop-shadow(0 4px 15px rgba(0, 212, 255, 0.5))",
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
    background: "rgba(255, 255, 255, 0.08)",
    backdropFilter: "blur(30px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    color: "rgba(255, 255, 255, 0.9)",
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
