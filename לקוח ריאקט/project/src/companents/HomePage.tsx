"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Box, Button, Container, Typography } from "@mui/material"
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate"
import CollectionsIcon from "@mui/icons-material/Collections"
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary"
import AutoStoriesIcon from "@mui/icons-material/AutoStories"
import { homePageStyles } from "../styles/homePage.styles"

const HomePage = () => {
  const navigate = useNavigate()
  const [userName, setUserName] = useState<string | null>(null)

  useEffect(() => {
    // Get username from localStorage if available
    const storedName = localStorage.getItem("UserName")
    if (storedName) {
      setUserName(storedName)
    }
  }, [])

  return (
    <Box sx={homePageStyles.container}>
      {/* Main background image */}
      <Box sx={homePageStyles.background} />

      {/* Overlay gradient */}
      <Box sx={homePageStyles.overlay} />

      {/* Decorative flower elements */}
      <Box sx={homePageStyles.decorElement1} />
      <Box sx={homePageStyles.decorElement2} />

      {/* Hero Section */}
      <Container maxWidth="lg" sx={homePageStyles.heroContainer}>
        <Box sx={homePageStyles.heroContent}>
          <Box sx={homePageStyles.heroTextContent}>
            <Typography variant="h1" component="h1" sx={homePageStyles.heroTitle}>
              {userName ? `שלום ${userName}!` : "אלבום התמונות שלך"}
              <Box sx={homePageStyles.heroTitleUnderline} />
            </Typography>

            <Typography variant="h5" sx={homePageStyles.heroSubtitle}>
              שמור, ארגן ושתף את הרגעים היפים שלך בצורה מושלמת עם אלבום התמונות המתקדם שלנו
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
              {/* Floating album effect */}
              <Box sx={homePageStyles.floatingAlbum1}>
                <PhotoLibraryIcon sx={homePageStyles.floatingAlbumIcon1} />
              </Box>

              {/* Second floating album */}
              <Box sx={homePageStyles.floatingAlbum2}>
                <AutoStoriesIcon sx={homePageStyles.floatingAlbumIcon2} />
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Features Section */}
        <Box sx={homePageStyles.featuresSection}>
          <Typography variant="h3" component="h2" sx={homePageStyles.featuresTitle}>
            ?למה לבחור בנו
            <Box sx={homePageStyles.featuresTitleUnderline} />
          </Typography>

          <Box sx={homePageStyles.featuresContainer}>
            {/* Feature 1 */}
            <Box sx={homePageStyles.featureBox}>
              <Box sx={homePageStyles.featureHighlight} />
              <Box sx={homePageStyles.featureIconContainer}>
                <PhotoLibraryIcon sx={homePageStyles.featureIcon1} />
              </Box>
              <Typography variant="h6" component="h3" align="center" gutterBottom sx={homePageStyles.featureTitle}>
                ארגון מושלם
              </Typography>
              <Typography align="center" sx={homePageStyles.featureDescription}>
                סדר את התמונות שלך באלבומים נפרדים לפי אירועים, תאריכים או כל קטגוריה שתבחר
              </Typography>
            </Box>

            {/* Feature 2 */}
            <Box sx={homePageStyles.featureBox}>
              <Box sx={homePageStyles.featureHighlight2} />
              <Box sx={homePageStyles.featureIconContainer}>
                <CollectionsIcon sx={homePageStyles.featureIcon2} />
              </Box>
              <Typography variant="h6" component="h3" align="center" gutterBottom sx={homePageStyles.featureTitle}>
                תצוגת גלריה מרהיבה
              </Typography>
              <Typography align="center" sx={homePageStyles.featureDescription}>
                צפה בתמונות שלך בתצוגת גלריה מרשימה עם אפשרויות להגדלה ותצוגה מלאה
              </Typography>
            </Box>

            {/* Feature 3 */}
            <Box sx={homePageStyles.featureBox}>
              <Box sx={homePageStyles.featureHighlight3} />
              <Box sx={homePageStyles.featureIconContainer}>
                <AddPhotoAlternateIcon sx={homePageStyles.featureIcon3} />
              </Box>
              <Typography variant="h6" component="h3" align="center" gutterBottom sx={homePageStyles.featureTitle}>
                העלאה פשוטה
              </Typography>
              <Typography align="center" sx={homePageStyles.featureDescription}>
                העלה תמונות בקלות ובמהירות עם ממשק משתמש ידידותי ואינטואיטיבי
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Call to Action */}
        <Box sx={homePageStyles.ctaSection}>
          <Box sx={homePageStyles.ctaHighlight} />
          <Typography variant="h4" component="h2" gutterBottom sx={homePageStyles.ctaTitle}>
            התחל לארגן את התמונות שלך עוד היום
          </Typography>
          <Typography variant="body1" sx={homePageStyles.ctaDescription}>
            אלבום התמונות שלנו מאפשר לך לשמור, לארגן ולשתף את הרגעים המיוחדים שלך בצורה פשוטה ואלגנטית. הצטרף עכשיו
            והתחל ליצור אלבומים מרהיבים.
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
