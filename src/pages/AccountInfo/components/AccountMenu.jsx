"use client"

import { useState, useEffect } from "react"
import { Box, makeStyles } from "@material-ui/core"
import { NavLink, useMatch } from "react-router-dom"
import PersonIcon from "@material-ui/icons/Person"
import LocalShippingIcon from "@material-ui/icons/LocalShipping"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    listStyle: "none",
    padding: 0,
    margin: "0 auto",
    maxWidth: 800,
    backgroundColor: "#fff",
    borderRadius: 8,
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
    // overflow: "hidden",
    // [theme.breakpoints.down("xs")]: {
    //   flexDirection: "column",
    //   width: "100%",
    // },
  },
  menuItem: {
    flex: 1,
    textAlign: "center",
    transition: "all 0.3s ease",
    position: "relative",
    "&:not(:last-child)": {
      borderRight: `1px solid ${theme.palette.divider}`,
      [theme.breakpoints.down("xs")]: {
        borderRight: "none",
        borderBottom: `1px solid ${theme.palette.divider}`,
      },
    },
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.02)",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  link: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2.5, 4),
    color: theme.palette.text.secondary,
    textDecoration: "none",
    fontFamily: "monospace",
    fontWeight: 500,
    fontSize: 15,
    letterSpacing: 0.5,
    transition: "all 0.3s ease",
    width: "100%",
    "&.active": {
      color: "#000",
      fontWeight: "bold",
      backgroundColor: "rgba(0, 0, 0, 0.03)",
      "& $icon": {
        color: "#000",
      },
      "&:after": {
        transform: "scaleX(1)",
      },
    },
    "&:after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      height: 3,
      backgroundColor: "#000",
      transform: "scaleX(0)",
      transformOrigin: "center",
      transition: "transform 0.3s ease",
    },
  },
  icon: {
    marginRight: theme.spacing(1.5),
    fontSize: 20,
    color: theme.palette.text.secondary,
    transition: "color 0.3s ease",
  },
  activeIndicator: {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: 3,
    backgroundColor: "#000",
    transition: "all 0.3s ease",
  },
}))

function AccountMenu() {
  const classes = useStyles()
  const match = useMatch("/account/*")
  const basePath = match ? match.pathnameBase : ""
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const isMobile = windowWidth < 600

  return (
    <Box component="ul" className={classes.root}>
      <li className={classes.menuItem}>
        <NavLink to={basePath} end className={classes.link}>
          <PersonIcon className={classes.icon} />
          THÔNG TIN CÁ NHÂN
        </NavLink>
      </li>
      <li className={classes.menuItem}>
        <NavLink to={`${basePath}/additional`} end className={classes.link}>
          <LocalShippingIcon className={classes.icon} />
          THÔNG TIN VẬN CHUYỂN
        </NavLink>
      </li>
    </Box>
  )
}

export default AccountMenu
