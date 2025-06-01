import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Box, Button, Container, Typography } from "@mui/material"
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate"
import CollectionsIcon from "@mui/icons-material/Collections"
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary"
import AutoStoriesIcon from "@mui/icons-material/AutoStories"
import CameraAltIcon from "@mui/icons-material/CameraAlt"
import { homePageStyles } from "../styles/homePage.styles"

const HomePage = () => {
  const navigate = useNavigate()
  const [userName, setUserName] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const storedName = localStorage.getItem("UserName")
    if (storedName) {
      setUserName(storedName)
    }
    setTimeout(() => setIsVisible(true), 300)
  }, [])

  return (
    <Box sx={homePageStyles.container}>
      <Box sx={homePageStyles.background} />
      <Box sx={homePageStyles.overlay} />

      {/* אלמנטים מרחפים יפים - מוקטנים */}
      {[...Array(8)].map((_, i) => (
        <Box
          key={i}
          sx={{
            ...homePageStyles.floatingElement(i),
            opacity: isVisible ? 0.4 : 0,
            transition: `opacity 2s ease ${i * 0.3}s`,
          }}
        />
      ))}

      <Container maxWidth="lg" sx={homePageStyles.heroContainer}>
        <Box
          sx={{
            ...homePageStyles.heroContent,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(50px)",
            transition: "all 1.5s ease 0.5s",
          }}
        >
          <Box sx={homePageStyles.heroTextContent}>
            <Typography variant="h1" component="h1" sx={homePageStyles.heroTitle}>
              {userName ? (
                <>
                  שלום <span style={{ color: "#00d4ff" }}>{userName}</span>
                  <br />
                  <span style={{ fontSize: "0.6em", opacity: 0.9 }}>ברוך השב לאלבומיקס</span>
                </>
              ) : (
                <>
                  אלבומיקס
                  <br />
                  <span
                    style={{
                      background: "linear-gradient(135deg, #00d4ff 0%, #9c27b0 50%, #ff6ec7 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontSize: "0.7em",
                    }}
                  >
                    אלבום התמונות המושלם
                  </span>
                </>
              )}
            </Typography>

            <Typography variant="h5" sx={homePageStyles.heroSubtitle}>
              שמור, ארגן ושתף את הרגעים היפים שלך
              <br />
              בצורה פשוטה ואלגנטית
            </Typography>

            <Box sx={homePageStyles.heroButtons}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate("/addAlbum")}
                startIcon={<AddPhotoAlternateIcon />}
                sx={homePageStyles.primaryButton}
              >
                צור אלבום חדש
              </Button>

              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate("/AlbumsList")}
                startIcon={<CollectionsIcon />}
                sx={homePageStyles.secondaryButton}
              >
                האלבומים שלי
              </Button>
            </Box>
          </Box>

          <Box sx={homePageStyles.heroImageContainer}>
            <Box sx={homePageStyles.floatingAlbumContainer}>
              <Box sx={homePageStyles.floatingAlbum1}>
                <PhotoLibraryIcon sx={homePageStyles.floatingAlbumIcon1} />
              </Box>
              <Box sx={homePageStyles.floatingAlbum2}>
                <AutoStoriesIcon sx={homePageStyles.floatingAlbumIcon2} />
              </Box>
              <Box sx={homePageStyles.floatingAlbum3}>
                <CameraAltIcon sx={homePageStyles.floatingAlbumIcon3} />
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Features Section - מוקטן */}
        <Box
          sx={{
            ...homePageStyles.featuresSection,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 1.2s ease 1.5s",
          }}
        >
          <Typography variant="h3" component="h2" sx={homePageStyles.featuresTitle}>
            ?למה לבחור באלבומיקס
          </Typography>

          <Box sx={homePageStyles.featuresContainer}>
            <Box sx={homePageStyles.featureBox}>
              <Box sx={homePageStyles.featureIconContainer}>
                <PhotoLibraryIcon sx={homePageStyles.featureIcon1} />
              </Box>
              <Typography variant="h6" component="h3" align="center" gutterBottom sx={homePageStyles.featureTitle}>
                ארגון מושלם
              </Typography>
              <Typography align="center" sx={homePageStyles.featureDescription}>
                סדר את התמונות שלך באלבומים נפרדים לפי אירועים ותאריכים
              </Typography>
            </Box>

            <Box sx={homePageStyles.featureBox}>
              <Box sx={homePageStyles.featureIconContainer}>
                <CollectionsIcon sx={homePageStyles.featureIcon2} />
              </Box>
              <Typography variant="h6" component="h3" align="center" gutterBottom sx={homePageStyles.featureTitle}>
                תצוגה מרהיבה
              </Typography>
              <Typography align="center" sx={homePageStyles.featureDescription}>
                צפה בתמונות שלך בתצוגת גלריה מרשימה עם אפשרויות מתקדמות
              </Typography>
            </Box>

            <Box sx={homePageStyles.featureBox}>
              <Box sx={homePageStyles.featureIconContainer}>
                <AddPhotoAlternateIcon sx={homePageStyles.featureIcon3} />
              </Box>
              <Typography variant="h6" component="h3" align="center" gutterBottom sx={homePageStyles.featureTitle}>
                העלאה פשוטה
              </Typography>
              <Typography align="center" sx={homePageStyles.featureDescription}>
                העלה תמונות בקלות עם ממשק משתמש ידידותי ואינטואיטיבי
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Call to Action - מוקטן */}
        <Box
          sx={{
            ...homePageStyles.ctaSection,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "scale(1)" : "scale(0.95)",
            transition: "all 1s ease 2s",
          }}
        >
          <Typography variant="h4" component="h2" gutterBottom sx={homePageStyles.ctaTitle}>
            התחל לארגן את התמונות שלך עוד היום
          </Typography>
          <Typography variant="body1" sx={homePageStyles.ctaDescription}>
            אלבומיקס מאפשר לך לשמור, לארגן ולשתף את הרגעים המיוחדים שלך בצורה פשוטה ואלגנטית.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate(localStorage.getItem("token") ? "/AlbumsList" : "/Register")}
            sx={homePageStyles.ctaButton}
          >
            {localStorage.getItem("token") ? "צפה באלבומים שלי" : "הרשם עכשיו"}
          </Button>
        </Box>
      </Container>
    </Box>
  )
}

export default HomePage

