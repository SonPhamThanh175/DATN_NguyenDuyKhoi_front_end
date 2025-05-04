"use client"

import { useState } from "react"
import {
  Box,
  Container,
  Typography,
  Grid,
  Link,
  IconButton,
  useMediaQuery,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import { useTheme } from "@mui/material/styles"

// Icons
import FacebookIcon from "@mui/icons-material/Facebook"
import InstagramIcon from "@mui/icons-material/Instagram"
import TwitterIcon from "@mui/icons-material/Twitter"
import YouTubeIcon from "@mui/icons-material/YouTube"
import PinterestIcon from "@mui/icons-material/Pinterest"
import TelegramIcon from "@mui/icons-material/Telegram"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

// Styled components
const FooterContainer = styled(Box)(({ theme }) => ({
  borderTop: "2px solid white",
  backgroundColor: "#000",
  color: "#fff",
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(3),
  // marginTop: theme.spacing(4),
}))

const FooterTitle = styled(Typography)(({ theme }) => ({
  fontSize: "0.875rem",
  fontWeight: 700,
  marginBottom: theme.spacing(2),
  letterSpacing: "1px",
}))

const FooterLink = styled(Link)(({ theme }) => ({
  color: "#999",
  fontSize: "0.875rem",
  textDecoration: "none",
  display: "block",
  marginBottom: theme.spacing(1.5),
  transition: "color 0.2s ease",
  cursor: "pointer",
  "&:hover": {
    color: "#fff",
    textDecoration: "none",
  },
}))

const SocialIconButton = styled(IconButton)(({ theme }) => ({
  color: "#fff",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  marginRight: theme.spacing(1),
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: "#fff",
    color: "#000",
    transform: "translateY(-3px)",
  },
}))

const FooterBottom = styled(Box)(({ theme }) => ({
  borderTop: "1px solid rgba(255, 255, 255, 0.1)",
  paddingTop: theme.spacing(2),
  marginTop: theme.spacing(4),
  fontSize: "0.75rem",
  color: "#999",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: theme.spacing(1),
  },
}))

const FooterBottomLink = styled(Link)(({ theme }) => ({
  color: "#999",
  textDecoration: "none",
  marginRight: theme.spacing(2),
  fontSize: "0.75rem",
  transition: "color 0.2s ease",
  "&:hover": {
    color: "#fff",
    textDecoration: "none",
  },
}))

const MobileAccordion = styled(Accordion)(({ theme }) => ({
  backgroundColor: "transparent",
  color: "#fff",
  boxShadow: "none",
  "&:before": {
    display: "none",
  },
  "& .MuiAccordionSummary-root": {
    padding: 0,
    minHeight: "auto",
  },
  "& .MuiAccordionSummary-content": {
    margin: theme.spacing(1, 0),
  },
  "& .MuiAccordionDetails-root": {
    padding: theme.spacing(0, 0, 1, 0),
  },
}))

const Footer = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const [expanded, setExpanded] = useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const footerSections = [
    {
      title: "SẢN PHẨM",
      links: [
        "Giày",
        "Quần áo",
        "Phụ kiện",
        "Hàng Mới Về",
        "Release Dates",
        "Top Sellers",
        "Member exclusives",
        "Outlet",
      ],
    },
    {
      title: "THỂ THAO",
      links: [
        "Chạy",
        "Đánh gôn",
        "Gym & Training",
        "Bóng đá",
        "Bóng Rổ",
        "Quần vợt",
        "Ngoài trời",
        "Bơi lội",
        "Motorsport",
      ],
    },
    {
      title: "BỘ SƯU TẬP",
      links: [
        "Pharrell Williams",
        "Ultra Boost",
        "Pureboost",
        "Predator",
        "Superstar",
        "Stan Smith",
        "NMD",
        "Adicolor",
      ],
    },
    {
      title: "THÔNG TIN VỀ CÔNG TY",
      links: ["Giới Thiệu Về Chúng Tôi", "Cơ Hội Nghề Nghiệp", "Tin tức", "adidas stories"],
    },
    {
      title: "HỖ TRỢ",
      links: [
        "Trợ Giúp",
        "Công cụ tìm kiếm cửa hàng",
        "Biểu Đồ Kích Cỡ",
        "Thanh toán",
        "Giao hàng",
        "Trả Hàng & Hoàn Tiền",
        "Khuyến mãi",
        "Sơ đồ trang web",
        "Trợ Giúp Dịch Vụ Khách Hàng",
      ],
    },
  ]

  const socialIcons = [
    { icon: <FacebookIcon />, label: "Facebook" },
    { icon: <InstagramIcon />, label: "Instagram" },
    { icon: <TwitterIcon />, label: "Twitter" },
    { icon: <YouTubeIcon />, label: "YouTube" },
    { icon: <PinterestIcon />, label: "Pinterest" },
    { icon: <TelegramIcon />, label: "Telegram" },
  ]

  return (
    <FooterContainer>
      <Container maxWidth="lg">
        {isMobile ? (
          // Mobile view with accordions
          <>
            {footerSections.map((section, index) => (
              <MobileAccordion
                key={index}
                expanded={expanded === `panel${index}`}
                onChange={handleChange(`panel${index}`)}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}>
                  <FooterTitle variant="subtitle1">{section.title}</FooterTitle>
                </AccordionSummary>
                <AccordionDetails>
                  {section.links.map((link, linkIndex) => (
                    <FooterLink key={linkIndex} href="#">
                      {link}
                    </FooterLink>
                  ))}
                </AccordionDetails>
              </MobileAccordion>
            ))}

            <Box sx={{ mt: 4 }}>
              <FooterTitle variant="subtitle1">THEO DÕI CHÚNG TÔI</FooterTitle>
              <Box sx={{ display: "flex", flexWrap: "wrap", mt: 1 }}>
                {socialIcons.map((social, index) => (
                  <SocialIconButton key={index} aria-label={social.label} size="small">
                    {social.icon}
                  </SocialIconButton>
                ))}
              </Box>
            </Box>
          </>
        ) : (
          // Desktop view with grid
          <Grid container spacing={4}>
            {footerSections.map((section, index) => (
              <Grid item xs={6} sm={4} md={2} key={index}>
                <FooterTitle variant="subtitle1">{section.title}</FooterTitle>
                {section.links.map((link, linkIndex) => (
                  <FooterLink key={linkIndex} href="#">
                    {link}
                  </FooterLink>
                ))}
              </Grid>
            ))}

            <Grid item xs={6} sm={4} md={2}>
              <FooterTitle variant="subtitle1">THEO DÕI CHÚNG TÔI</FooterTitle>
              <Box sx={{ display: "flex", flexWrap: "wrap", mt: 1 }}>
                {socialIcons.map((social, index) => (
                  <SocialIconButton key={index} aria-label={social.label} size="small">
                    {social.icon}
                  </SocialIconButton>
                ))}
              </Box>
            </Grid>
          </Grid>
        )}

        <FooterBottom>
          <Box sx={{ display: "flex", flexWrap: "wrap", mb: { xs: 2, md: 0 } }}>
            <FooterBottomLink href="#">Cài Đặt Cookie</FooterBottomLink>
            <FooterBottomLink href="#">Chính sách Bảo mật</FooterBottomLink>
            <FooterBottomLink href="#">Điều Khoản và Điều Kiện</FooterBottomLink>
            <FooterBottomLink href="#">XUẤT BẢN BỞI</FooterBottomLink>
          </Box>
          <Typography variant="caption" color="inherit">
            © 2020 Công ty TNHH adidas Việt Nam
          </Typography>
        </FooterBottom>
      </Container>
    </FooterContainer>
  )
}

export default Footer
