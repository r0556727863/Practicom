import { useForm, type SubmitHandler } from "react-hook-form"
import { useUserContext } from "../context/UserContext"
import axios from "axios"
import { TextField, Button, Container, Typography, Box, Paper, Avatar, IconButton } from "@mui/material"
import { useNavigate, Link } from "react-router-dom"
import { object, string } from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import styles from "../styles/register.styles"
import { useState } from "react"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import Visibility from "@mui/icons-material/Visibility"

const validationSchema = object({
  UserName: string().required("UserName is required").max(20, "UserName cannot be more than 20 characters"),
  Password: string().required("Password is required").min(6, "Password must be at least 6 characters"),
  Phone: string().required("Phone is required"),
  Email: string().required("Email is required").email("Email is not valid"),
})

type RegisterForm = {
  UserName: string
  Password: string
  Phone: string
  Email: string
}

export type User = {
  UserId: number
  UserName: string
  Email: string
  Phone: string
  Password: string
}

export default function Register() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: yupResolver(validationSchema),
  })

  const { setMyUser } = useUserContext()

  const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
    try {
      console.log("submitted")
      const response = await registerUser(data)
      localStorage.setItem("UserId", response.UserId.toString())
      setMyUser({ ...data, UserId: response.UserId })
      navigate("/Login")
    } catch (error) {
      console.error(error)
    }
  }

  const registerUser = async (user: RegisterForm): Promise<User> => {
    try {
      const response = await axios.post<{ userId: number }>(`${import.meta.env.VITE_API_URL}/User/register`, user, {
        headers: {
          "Content-Type": "application/json",
        },
      })

      console.log("Registration response:", response.data)
      return { UserId: response.data.userId, ...user }
    } catch (error) {
      console.error("Registration error:", error)
      throw new Error("Failed to register user.")
    }
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.background} />
      <Box sx={styles.overlay} />

      <Container maxWidth="sm" sx={styles.contentContainer}>
        <Paper elevation={0} sx={styles.paper}>
          <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={styles.backButton}>
            חזרה
          </Button>

          <Box sx={styles.headerBox}>
            <Avatar sx={styles.avatar}>
              <PersonAddIcon sx={styles.avatarIcon} />
            </Avatar>
            <Typography
              variant="h5"
              component="h1"
              gutterBottom
              align="center"
              fontWeight="bold"
              color="white"
              sx={styles.title}
            >
              הרשמה
            </Typography>
            <Typography variant="body2" color="rgba(255,255,255,0.8)" align="center" sx={styles.subtitle}>
              צור חשבון חדש כדי להתחיל לנהל את האלבומים שלך
            </Typography>
          </Box>

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register("UserName")}
              label="שם משתמש"
              variant="outlined"
              fullWidth
              sx={styles.textField}
              error={!!errors.UserName}
              helperText={errors.UserName ? errors.UserName.message : ""}
            />

            <Box sx={{ position: "relative", mt: 2 }}>
              <TextField
                {...register("Password")}
                type={showPassword ? "text" : "password"}
                label="סיסמה"
                variant="outlined"
                fullWidth
                sx={{
                  ...styles.textField,
                  borderRadius: "30px",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  input: { color: "#ffffff" },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "30px",
                    "& fieldset": { borderColor: "rgba(255, 255, 255, 0.2)" },
                    "&:hover fieldset": { borderColor: "#ffffff" },
                    "&.Mui-focused fieldset": { borderColor: "#ffffff" },
                    backgroundColor: "transparent",
                  },
                }}
                InputLabelProps={{
                  shrink: true,
                  style: { color: "#ffffff" },
                }}
                error={!!errors.Password}
                helperText={errors.Password?.message}
              />

              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
                sx={{
                  position: "absolute",
                  top: "42%", // הרמה קלה של העין
                  right: 12,
                  transform: "translateY(-50%)",
                  color: "#333333",
                }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </Box>


            <TextField
              {...register("Phone")}
              label="טלפון"
              variant="outlined"
              fullWidth
              sx={styles.textField}
              error={!!errors.Phone}
              helperText={errors.Phone ? errors.Phone.message : ""}
            />

            <TextField
              {...register("Email")}
              label="דואר אלקטרוני"
              variant="outlined"
              fullWidth
              sx={styles.textField}
              error={!!errors.Email}
              helperText={errors.Email ? errors.Email.message : ""}
            />

            <Button type="submit" variant="contained" fullWidth sx={styles.submitButton}>
              הרשם
            </Button>

            <Box sx={styles.loginLink}>
              <Typography variant="body2" color="rgba(255,255,255,0.8)">
                כבר יש לך חשבון?{" "}
                <Link to="/login" style={styles.link}>
                  התחבר כאן
                </Link>
              </Typography>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  )
}
