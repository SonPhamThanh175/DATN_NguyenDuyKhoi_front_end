"use client"

import { Box, Typography, Button } from "@mui/material"
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt"

const MembershipBanner = () => {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#f5e800", // Bright yellow
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: { xs: "16px", md: "24px 48px" },
        flexDirection: { xs: "column", sm: "row" },
        gap: { xs: "16px", sm: "0" },
      }}
    >
      <Typography
        variant="h5"
        component="h2"
        sx={{
          color: "#000",
          fontWeight: "bold",
          fontSize: { xs: "18px", sm: "20px", md: "24px" },
          textAlign: { xs: "center", sm: "left" },
          textTransform: "uppercase",
        }}
      >
        TRỞ THÀNH HỘI VIÊN & HƯỞNG ƯU ĐÃI 15%
      </Typography>

      <Button
        variant="contained"
        endIcon={<ArrowRightAltIcon />}
        sx={{
          backgroundColor: "#000",
          color: "#fff",
          padding: "12px 24px",
          borderRadius: 0,
          fontWeight: "bold",
          textTransform: "uppercase",
          "&:hover": {
            backgroundColor: "#333",
          },
          whiteSpace: "nowrap",
        }}
      >
        ĐĂNG KÝ MIỄN PHÍ
      </Button>
    </Box>
  )
}

export default MembershipBanner
