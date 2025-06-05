import { useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import axios from "axios"
import { useUserContext } from "../context/UserContext"
import { useNavigate } from "react-router-dom"
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
  Avatar,
  Link as MuiLink,
} from "@mui/material"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import { Link } from "react-router-dom"
import styles from "../styles/login.styles"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import IconButton from "@mui/material/IconButton"
import InputAdornment from "@mui/material/InputAdornment"

interface LoginResponse {
  token: string
  user: {
    id: number
    userName: string
    email: string
    phone: string
  }
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ Email: string; Password: string }>()
  const { setMyUser } = useUserContext()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)


  const loginUser = async (user: { Email: string; Password: string }): Promise<LoginResponse | null> => {
    try {
      const response = await axios.post<LoginResponse>(`${import.meta.env.VITE_API_URL}/Auth/login`,user, {
        headers: { "Content-Type": "application/json" },
      })
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error("אחד מהנתונים לא נכון. אנא בדוק את הדואר האלקטרוני או הסיסמה שלך.")
        }
        throw new Error(error.response?.data || error.message)
      }
      throw new Error("שגיאה בהתחברות")
    }
  }
  const toggleShowPassword = () => setShowPassword((prev) => !prev)

  const onSubmit: SubmitHandler<{ Email: string; Password: string }> = async (data) => {
    setLoading(true)
    setError(null)

    try {
      const response = await loginUser(data)
      if (response?.token && response.user) {
        localStorage.setItem("token", response.token)

        setMyUser({
          UserId: response.user.id,
          UserName: response.user.userName,
          Email: response.user.email,
          Phone: response.user.phone,
          Password: data.Password,
        })

        navigate("/")
      } else {
        throw new Error("התגובה לא כללה את פרטי המשתמש")
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "שגיאה כללית")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.background} />
      <Box sx={styles.overlay} />

      <Container maxWidth="xs" sx={styles.contentContainer}>
        <Paper elevation={0} sx={styles.paper}>
          <Avatar sx={styles.avatar}>
            <LockOutlinedIcon sx={styles.avatarIcon} />
          </Avatar>
          <Typography component="h1" variant="h5" fontWeight="bold" gutterBottom color="white" sx={styles.title}>
            התחברות
          </Typography>
          <Typography variant="body2" color="rgba(255,255,255,0.8)" align="center" sx={styles.subtitle}>
            ברוך השב! התחבר לחשבון שלך
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={styles.form}>
            <TextField
              margin="normal"
              fullWidth
              label="דואר אלקטרוני"
              {...register("Email", {
                required: "דואר אלקטרוני הוא שדה חובה",
                // pattern: {
                //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                //   message: "כתובת דואר אלקטרוני לא תקינה",
                // },
              })}
              error={!!errors.Email}
              helperText={errors.Email?.message}
              sx={styles.textField}
            />
 <Box sx={{ position: "relative", mt: 2 }}>
  <TextField
    fullWidth
    type={showPassword ? "text" : "password"}
    label="סיסמה"
    {...register("Password", {
      required: "סיסמה היא שדה חובה",
      // minLength: {
      //   value: 2,
      //   message: "הסיסמה חייבת להכיל לפחות 2 תווים",
      // },
    })}
    error={!!errors.Password}
    helperText={errors.Password?.message}
    sx={styles.textField} // אותו עיצוב כמו המייל
  />

  <IconButton
    onClick={() => setShowPassword(!showPassword)}
    edge="end"
    sx={{
      position: "absolute",
      top: "45%",
      right: 12,
      transform: "translateY(-50%)",
      color: "#333333", // עינית כהה כמו שביקשת
    }}
  >
    {showPassword ? <VisibilityOff /> : <Visibility />}
  </IconButton>
</Box>

            {error && (
              <Alert severity="error" sx={styles.alert}>
                {error}
              </Alert>
            )}
            <Button type="submit" fullWidth variant="contained" disabled={loading} sx={styles.submitButton}>
              {loading ? <CircularProgress size={24} color="inherit" /> : "התחבר"}
            </Button>
            <Box sx={styles.registerLink}>
              <Typography variant="body2" color="rgba(255,255,255,0.8)">
                אין לך חשבון?{" "}
                <MuiLink component={Link} to="/Register" sx={styles.link}>
                  הירשם עכשיו
                </MuiLink>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}
