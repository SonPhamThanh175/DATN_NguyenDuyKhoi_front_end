"use client"

import { useEffect, useState } from "react"
import { Box, Container, Paper, Typography, makeStyles, Breadcrumbs, Link, Divider } from "@material-ui/core"
import { unwrapResult } from "@reduxjs/toolkit"
import { useSnackbar } from "notistack"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, Route, Routes, useLocation, useNavigate } from "react-router-dom"
import HomeIcon from "@material-ui/icons/Home"
import PersonIcon from "@material-ui/icons/Person"
import NavigateNextIcon from "@material-ui/icons/NavigateNext"

import userApi from "../../api/userApi"
import { logout, update } from "../Auth/userSlice"
import Account from "./components/Account"
import AccountAdditional from "./components/AccountAdditional"
import AccountMenu from "./components/AccountMenu"

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: "#f8f9fa",
    minHeight: "calc(100vh - 64px)",
    // paddingTop: theme.spacing(3),
    // paddingBottom: theme.spacing(6),
    marginTop: 100,
  },
  container: {
    maxWidth: 1200,
    margin: "0 auto",
  },
  pageHeader: {
    marginBottom: theme.spacing(4),
  },
  breadcrumbs: {
    marginBottom: theme.spacing(2),
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 700,
    color: "#333",
    fontFamily: "monospace",
    marginBottom: theme.spacing(1),
  },
  pageDescription: {
    color: theme.palette.text.secondary,
    maxWidth: 600,
  },
  contentWrapper: {
    backgroundColor: "#fff",
    borderRadius: theme.spacing(1),
    boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)",
    overflow: "hidden",
  },
  menuContainer: {
    marginBottom: theme.spacing(3),
  },
  contentContainer: {
    padding: theme.spacing(3),
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(2),
    },
  },
  divider: {
    margin: theme.spacing(3, 0),
  },
  icon: {
    fontSize: 20,
    marginRight: theme.spacing(0.5),
    verticalAlign: "middle",
  },
  link: {
    display: "flex",
    alignItems: "center",
    color: theme.palette.text.secondary,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
      color: theme.palette.primary.main,
    },
  },
}))

function AccountInfo() {
  const userId = localStorage.getItem("userId")
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    birthday: "",
    gender: "",
    password: "",
    profileImage: "",
    contactPhone: "",
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const navigate = useNavigate()
  const classes = useStyles()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const currentUser = useSelector((state) => state.user)
  const location = useLocation()

  // Fetch user information
  useEffect(() => {
    if (!userId) {
      setError("No user ID found in local storage")
      setLoading(false)
      return
    }

    const fetchUserData = async () => {
      try {
        const userData = await userApi.getInfo(userId)
        setFormData(userData)
      } catch (error) {
        setError("Failed to fetch account info")
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [userId])

  const handleLogout = () => {
    const action = logout()
    dispatch(action)
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

  // Determine which section is active for breadcrumbs
  const isAdditional = location.pathname.includes("/additional")
  const activeSectionName = isAdditional ? "Thông tin vận chuyển" : "Thông tin cá nhân"

  return (
    <Box className={classes.root}>
      <Container className={classes.container}>
        {/* Page Header */}
        <Box className={classes.pageHeader}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
            className={classes.breadcrumbs}
          >
            <Link href="/" className={classes.link}>
              <HomeIcon className={classes.icon} />
              Trang chủ
            </Link>
            <Link href="/account" className={classes.link}>
              <PersonIcon className={classes.icon} />
              Tài khoản
            </Link>
            <Typography color="textPrimary" style={{ display: "flex", alignItems: "center" }}>
              {activeSectionName}
            </Typography>
          </Breadcrumbs>

          {/* <Typography variant="h4" className={classes.pageTitle}>
            Quản lý tài khoản
          </Typography>
          <Typography variant="body1" className={classes.pageDescription}>
            Quản lý thông tin cá nhân và thông tin vận chuyển của bạn
          </Typography> */}
        </Box>

        {/* Main Content */}
        <div elevation={0} className={classes.contentWrapper}>
          {/* Navigation Menu */}
          <Box className={classes.menuContainer}>
            <AccountMenu />
          </Box>

          <Divider />

          {/* Content Area */}
          <Box className={classes.contentContainer}>
            {/* <Routes>
              <Route path="/" element={<Account />} />
              <Route path="/additional" element={<AccountAdditional />} />
            </Routes> */}
            <Outlet />
          </Box>
        </div>
      </Container>
    </Box>
  )
}

export default AccountInfo
