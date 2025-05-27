// "use client"

// import { useForm, type SubmitHandler } from "react-hook-form"
// import { useUserContext } from "../context/UserContext"
// import axios from "axios"
// import { TextField, Button, Container, Typography, Box, Paper, Avatar } from "@mui/material"
// import { useNavigate, Link } from "react-router-dom"
// import { object, string } from "yup"
// import { yupResolver } from "@hookform/resolvers/yup"
// import PersonAddIcon from "@mui/icons-material/PersonAdd"
// import EmailIcon from "@mui/icons-material/Email"
// import PhoneIcon from "@mui/icons-material/Phone"
// import LockIcon from "@mui/icons-material/Lock"
// import PersonIcon from "@mui/icons-material/Person"
// import ArrowBackIcon from "@mui/icons-material/ArrowBack"
// import styles from "../styles/register.styles"

// // סכימת וואפ
// const validationSchema = object({
//   UserName: string().required("UserName is required").max(20, "UserName cannot be more than 20 characters"),
//   Password: string().required("Password is required").min(6, "Password must be at least 6 characters"),
//   Phone: string().required("Phone is required"),
//   Email: string().required("Email is required").email("Email is not valid"),
// })

// // סוג חדש עבור הטופס
// type RegisterForm = {
//   UserName: string
//   Password: string
//   Phone: string
//   Email: string
// }

// // סוג User
// export type User = {
//   UserId: number
//   UserName: string
//   Email: string
//   Phone: string
//   Password: string
// }

// export default function Register() {
//   const navigate = useNavigate()

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<RegisterForm>({
//     resolver: yupResolver(validationSchema),
//   })

//   const { setMyUser } = useUserContext()

//   const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
//     try {
//       console.log("submitted")
//       const response = await registerUser(data)
//       localStorage.setItem("UserId", response.UserId.toString())
//       setMyUser({ ...data, UserId: response.UserId })
//       navigate("/Login")
//     } catch (error) {
//       console.error(error)
//     }
//   }

//   const registerUser = async (user: RegisterForm): Promise<User> => {
//     try {
//       const response = await axios.post<{ userId: number }>("https://localhost:7259/api/User/register", user, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       })

//       console.log("Registration response:", response.data)
//       return { UserId: response.data.userId, ...user } // כאן מתקן את השם ל-userId
//     } catch (error) {
//       console.error("Registration error:", error)
//       throw new Error("Failed to register user.")
//     }
//   }

//   return (
//     <Box sx={styles.container}>
//       {/* Main background image */}
//       <Box sx={styles.background} />

//       {/* Overlay gradient */}
//       <Box sx={styles.overlay} />

//       {/* Decorative flower elements */}
//       <Box sx={styles.decorElement1} />
//       <Box sx={styles.decorElement2} />

//       <Container maxWidth="sm" sx={styles.contentContainer}>
//         <Paper elevation={0} sx={styles.paper}>
//           <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={styles.backButton}>
//             חזרה
//           </Button>
//           <Box sx={styles.headerBox}>
//             <Avatar sx={styles.avatar}>
//               <PersonAddIcon sx={styles.avatarIcon} />
//             </Avatar>
//             <Typography
//               variant="h4"
//               component="h1"
//               gutterBottom
//               align="center"
//               fontWeight="bold"
//               color="#333"
//               sx={styles.title}
//             >
//               הרשמה
//             </Typography>
//             <Typography variant="body1" color="#555" align="center" sx={styles.subtitle}>
//               צור חשבון חדש כדי להתחיל לנהל את האלבומים שלך
//             </Typography>
//           </Box>

//           <form onSubmit={handleSubmit(onSubmit)}>
//             <Box sx={styles.inputContainer}>
//               <PersonIcon sx={styles.inputIcon} />
//               <TextField
//                 {...register("UserName")}
//                 label="שם משתמש"
//                 variant="outlined"
//                 fullWidth
//                 sx={styles.textField}
//                 error={!!errors.UserName}
//                 helperText={errors.UserName ? errors.UserName.message : ""}
//               />
//             </Box>

//             <Box sx={styles.inputContainer}>
//               <LockIcon sx={styles.inputIcon} />
//               <TextField
//                 type="password"
//                 {...register("Password")}
//                 label="סיסמה"
//                 variant="outlined"
//                 fullWidth
//                 sx={styles.textField}
//                 error={!!errors.Password}
//                 helperText={errors.Password ? errors.Password.message : ""}
//               />
//             </Box>

//             <Box sx={styles.inputContainer}>
//               <PhoneIcon sx={styles.inputIcon} />
//               <TextField
//                 {...register("Phone")}
//                 label="טלפון"
//                 variant="outlined"
//                 fullWidth
//                 sx={styles.textField}
//                 error={!!errors.Phone}
//                 helperText={errors.Phone ? errors.Phone.message : ""}
//               />
//             </Box>

//             <Box sx={styles.inputContainer}>
//               <EmailIcon sx={styles.inputIcon} />
//               <TextField
//                 {...register("Email")}
//                 label="דואר אלקטרוני"
//                 variant="outlined"
//                 fullWidth
//                 sx={styles.textField}
//                 error={!!errors.Email}
//                 helperText={errors.Email ? errors.Email.message : ""}
//               />
//             </Box>

//             <Button type="submit" variant="contained" fullWidth sx={styles.submitButton}>
//               הרשם
//             </Button>

//             <Box sx={styles.loginLink}>
//               <Typography variant="body2" color="#555">
//                 כבר יש לך חשבון?{" "}
//                 <Link to="/login" style={styles.link}>
//                   התחבר כאן
//                 </Link>
//               </Typography>
//             </Box>
//           </form>
//         </Paper>
//       </Container>
//     </Box>
//   )
// }
"use client"

import { useForm, type SubmitHandler } from "react-hook-form"
import { useUserContext } from "../context/UserContext"
import axios from "axios"
import { TextField, Button, Container, Typography, Box, Paper, Avatar } from "@mui/material"
import { useNavigate, Link } from "react-router-dom"
import { object, string } from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import styles from "../styles/register.styles"

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
      const response = await axios.post<{ userId: number }>("https://localhost:7259/api/User/register", user, {
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

            <TextField
              type="password"
              {...register("Password")}
              label="סיסמה"
              variant="outlined"
              fullWidth
              sx={styles.textField}
              error={!!errors.Password}
              helperText={errors.Password ? errors.Password.message : ""}
            />

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
