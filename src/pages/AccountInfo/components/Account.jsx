import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Avatar,
  Divider,
  CircularProgress,
  makeStyles,
} from "@material-ui/core"
import { Formik, Field, Form } from "formik"
import * as Yup from "yup"
import { useDispatch } from "react-redux"
import { unwrapResult } from "@reduxjs/toolkit"
import { useSnackbar } from "notistack"
import userApi from "../../../api/userApi"
import { logout, update } from "../../Auth/userSlice"
import PersonIcon from "@material-ui/icons/Person"
import HomeIcon from "@material-ui/icons/Home"
import LocationOnIcon from "@material-ui/icons/LocationOn"
import PhoneIcon from "@material-ui/icons/Phone"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import SaveIcon from "@material-ui/icons/Save"

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4, 0),
    backgroundColor: "#f8f9fa",
    minHeight: "calc(100vh - 64px)",
  },
  container: {
    maxWidth: 800,
    margin: "0 auto",
  },
  paper: {
    padding: theme.spacing(4),
    borderRadius: theme.spacing(1),
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    backgroundColor: "#fff",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: theme.spacing(4),
    padding: theme.spacing(3, 0),
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  title: {
    fontSize: 28,
    fontWeight: 700,
    marginBottom: theme.spacing(1),
    fontFamily: "monospace",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: theme.palette.text.secondary,
    fontFamily: "monospace",
  },
  avatarContainer: {
    position: "relative",
    marginBottom: theme.spacing(2),
  },
  avatar: {
    width: 120,
    height: 120,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    border: `4px solid ${theme.palette.background.paper}`,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    backgroundColor: theme.palette.grey[200],
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    border: `4px solid ${theme.palette.background.paper}`,
  },
  avatarIcon: {
    fontSize: 60,
    color: theme.palette.grey[400],
  },
  formContainer: {
    marginTop: theme.spacing(2),
  },
  formItem: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(3),
  },
  formIcon: {
    marginRight: theme.spacing(2),
    color: theme.palette.primary.main,
  },
  formLabel: {
    width: 180,
    fontWeight: 600,
    fontFamily: "monospace",
    fontSize: 15,
  },
  formField: {
    flex: 1,
    "& .MuiOutlinedInput-root": {
      borderRadius: 8,
    },
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(4),
    gap: theme.spacing(2),
  },
  updateButton: {
    padding: theme.spacing(1.5, 4),
    fontWeight: 600,
    borderRadius: 0,
    backgroundColor: "#000",
    color: "#fff",
    fontFamily: "monospace",
    "&:hover": {
      backgroundColor: "#333",
    },
  },
  logoutButton: {
    padding: theme.spacing(1.5, 4),
    fontWeight: 600,
    borderRadius: 0,
    backgroundColor: "#fff",
    color: "#000",
    border: "1px solid #000",
    fontFamily: "monospace",
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
  },
  buttonIcon: {
    marginRight: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(3, 0),
  },
  errorMessage: {
    textAlign: "center",
    color: theme.palette.error.main,
    marginBottom: theme.spacing(2),
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 400,
  },
}))

const validationSchema = Yup.object().shape({
  displayName: Yup.string().required("Tên hiển thị là bắt buộc"),
  contactPhone: Yup.string()
    .matches(/^[0-9]+$/, "Số điện thoại chỉ được chứa số")
    .min(10, "Số điện thoại phải có ít nhất 10 số")
    .required("Số điện thoại là bắt buộc"),
  address: Yup.string().required("Địa chỉ là bắt buộc"),
})

function Account() {
  const userId = localStorage.getItem("userId")
  const [formData, setFormData] = useState({
    displayName: "",
    address: "",
    addressDetail: "",
    contactPhone: "",
    profileImage: "",
    email: "",
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const classes = useStyles()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    if (!userId) {
      setError("Không tìm thấy ID người dùng")
      setLoading(false)
      return
    }

    const fetchUserData = async () => {
      try {
        const userData = await userApi.getInfo(userId)
        setFormData(userData)
      } catch (error) {
        setError("Không thể tải thông tin tài khoản")
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [userId])

  const handleLogout = () => {
    const action = logout()
    dispatch(action)
    enqueueSnackbar("Đăng xuất thành công", { variant: "info" })
    navigate("/")
  }

  const handleUpdateUser = async (values, { setSubmitting }) => {
    try {
      const action = update({ id: userId, ...values })
      const resultAction = await dispatch(action)
      unwrapResult(resultAction)
      enqueueSnackbar("Cập nhật thông tin thành công!", { variant: "success" })
    } catch (error) {
      enqueueSnackbar("Cập nhật thông tin thành công!", { variant: "success" })
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <Box className={classes.root}>
        <Container className={classes.container}>
          <Paper className={classes.paper}>
            <Box className={classes.loadingContainer}>
              <CircularProgress />
            </Box>
          </Paper>
        </Container>
      </Box>
    )
  }

  return (
    <Box className={classes.root}>
      <div className={classes.container}>
        <div className={classes.paper} elevation={0}>
          <Box className={classes.header}>
            <Box className={classes.avatarContainer}>
              {formData.avaUrl ? (
                <Avatar src={formData.avaUrl} alt="Profile" className={classes.avatar} />
              ) : (
                <Avatar className={classes.avatarPlaceholder}>
                  <PersonIcon className={classes.avatarIcon} />
                </Avatar>
              )}
            </Box>
            <Typography variant="h4" className={classes.title}>
              Thông tin tài khoản
            </Typography>
            {formData.email && (
              <Typography variant="subtitle1" className={classes.subtitle}>
                {formData.email}
              </Typography>
            )}
          </Box>

          {error && <Typography className={classes.errorMessage}>{error}</Typography>}

          <Formik
            initialValues={formData}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={handleUpdateUser}
          >
            {({ handleChange, handleBlur, errors, touched, isSubmitting }) => (
              <Form className={classes.formContainer}>
                <Box className={classes.formItem}>
                  <PersonIcon className={classes.formIcon} />
                  <Typography className={classes.formLabel}>Tên hiển thị</Typography>
                  <Field
                    as={TextField}
                    name="displayName"
                    className={classes.formField}
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.displayName && Boolean(errors.displayName)}
                    helperText={touched.displayName && errors.displayName}
                  />
                </Box>

                <Box className={classes.formItem}>
                  <HomeIcon className={classes.formIcon} />
                  <Typography className={classes.formLabel}>Địa chỉ (Phường/Quận/Thành Phố)</Typography>
                  <Field
                    as={TextField}
                    name="address"
                    className={classes.formField}
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.address && Boolean(errors.address)}
                    helperText={touched.address && errors.address}
                  />
                </Box>

                <Box className={classes.formItem}>
                  <LocationOnIcon className={classes.formIcon} />
                  <Typography className={classes.formLabel}>Số nhà, tên đường</Typography>
                  <Field
                    as={TextField}
                    name="addressDetail"
                    className={classes.formField}
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Box>

                <Box className={classes.formItem}>
                  <PhoneIcon className={classes.formIcon} />
                  <Typography className={classes.formLabel}>Số điện thoại</Typography>
                  <Field
                    as={TextField}
                    name="contactPhone"
                    className={classes.formField}
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.contactPhone && Boolean(errors.contactPhone)}
                    helperText={touched.contactPhone && errors.contactPhone}
                  />
                </Box>

                <Divider className={classes.divider} />

                <Box className={classes.buttonContainer}>
                  <Button
                    className={classes.updateButton}
                    variant="contained"
                    type="submit"
                    disabled={isSubmitting}
                    startIcon={<SaveIcon />}
                  >
                    {isSubmitting ? "Đang cập nhật..." : "Cập nhật"}
                  </Button>
                  <Button
                    className={classes.logoutButton}
                    variant="outlined"
                    onClick={handleLogout}
                    startIcon={<ExitToAppIcon />}
                  >
                    Đăng xuất
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Box>
  )
}

export default Account
