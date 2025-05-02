// import React from 'react';
// import PropTypes from 'prop-types';
// import '../HomePage/style.scss';
// // import ImageProduct from '../assets/images/NewImageProduct.png'
import newImageProduct from '../../assets/images/adidas_new_product (1).webp';

// function HomePage(props) {
//     return (
//         <div
//             style={{}}
//             className='wrapper'
//         >
//             <section className='wrapper__home'>
//                 <div className='wrapper__home__image'>
//                     <div className='wrapper__home__image__rhombus'>
//                         <img
//                             src={newImageProduct}
//                             alt='Detroit Watch Model 2'
//                         />
//                         {/* <img src="https://via.placeholder.com/1920x1080" alt="Car Dealing Experian" /> */}
//                     </div>
//                 </div>
//                 <div className='wrapper__home__content'>
//                     <h1>Bước Chạy Đột Phá</h1>
//                     <h3>Giới Hạn Là Không Giới Hạn!</h3>
//                     <p>
//                         Trải nghiệm bộ sưu tập giày Adidas mới nhất – kết hợp công nghệ tiên tiến
//                         với phong cách hiện đại. Nhẹ hơn, bền hơn, giúp bạn bứt phá trên mọi chặng
//                         đường.
//                     </p>
//                     <a
//                         href='products'
//                         className='wrapper__home__content__button'
//                     >
//                         KHÁM PHÁ NGAY
//                     </a>
//                 </div>

//                 <div className='wrapper__home__rhombus2'></div>
//             </section>
//         </div>
//     );
// }

// HomePage.propTypes = {};

// export default HomePage;


import { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Box, Typography, Button, Container, Grid, useMediaQuery, useTheme } from "@material-ui/core"
import { motion } from "framer-motion"
import ArrowForwardIcon from "@material-ui/icons/ArrowForward"

// Import your image
// import newImageProduct from '../../assets/images/adidas_new_product (1).webp';
// For demo purposes, using a placeholder
// const newImageProduct = "https://via.placeholder.com/800x600"

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundColor: "#f8f9fa",
    overflow: "hidden",
    position: "relative",
  },
  heroSection: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    minHeight: "calc(100vh - 64px)",
    padding: theme.spacing(4, 0),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column-reverse",
      padding: theme.spacing(6, 0),
    },
  },
  contentContainer: {
    position: "relative",
    zIndex: 2,
    padding: theme.spacing(4, 6),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(4, 2),
      textAlign: "center",
    },
  },
  heading: {
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 800,
    fontSize: "3.5rem",
    marginBottom: theme.spacing(2),
    color: "#000",
    position: "relative",
    display: "inline-block",
    "&:after": {
      content: '""',
      position: "absolute",
      bottom: -8,
      left: 0,
      width: "60px",
      height: "4px",
      backgroundColor: "#000",
      [theme.breakpoints.down("sm")]: {
        left: "50%",
        transform: "translateX(-50%)",
      },
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "2.8rem",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "2.2rem",
    },
  },
  subheading: {
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 600,
    fontSize: "1.8rem",
    marginBottom: theme.spacing(3),
    color: "#333",
    [theme.breakpoints.down("md")]: {
      fontSize: "1.5rem",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.3rem",
    },
  },
  description: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: "1.1rem",
    lineHeight: 1.6,
    marginBottom: theme.spacing(4),
    color: "#555",
    maxWidth: "600px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
      margin: "0 auto",
      marginBottom: theme.spacing(4),
    },
  },
  ctaButton: {
    backgroundColor: "#000",
    color: "#fff",
    padding: theme.spacing(1.5, 4),
    fontSize: "1rem",
    fontWeight: 600,
    borderRadius: 0,
    position: "relative",
    overflow: "hidden",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "#333",
      transform: "translateY(-3px)",
      boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
      "& $buttonIcon": {
        transform: "translateX(4px)",
      },
    },
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto",
      display: "flex",
    },
  },
  buttonIcon: {
    marginLeft: theme.spacing(1),
    transition: "transform 0.3s ease",
  },
  imageContainer: {
    position: "relative",
    zIndex: 1,
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(4),
    },
  },
  rhombusContainer: {
    position: "relative",
    width: "100%",
    height: "100%",
    perspective: "1000px",
  },
  rhombus: {
    position: "relative",
    width: "100%",
    maxWidth: "600px",
    height: "auto",
    transform: "rotate(-5deg) skew(5deg, 0deg)",
    overflow: "hidden",
    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
    "&:before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.05)",
      zIndex: 1,
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: "90%",
      margin: "0 auto",
    },
  },
  productImage: {
    width: "100%",
    height: "auto",
    display: "block",
    transform: "scale(1.05)",
    transition: "transform 0.5s ease",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  decorativeShape: {
    position: "absolute",
    width: "300px",
    height: "300px",
    backgroundColor: "#f0f0f0",
    transform: "rotate(45deg)",
    zIndex: 0,
    [theme.breakpoints.down("sm")]: {
      width: "200px",
      height: "200px",
    },
  },
  shape1: {
    top: "10%",
    right: "5%",
    backgroundColor: "rgba(0,0,0,0.03)",
  },
  shape2: {
    bottom: "10%",
    left: "5%",
    backgroundColor: "rgba(0,0,0,0.02)",
  },
}))

function HomePage() {
  const classes = useStyles()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <Box className={classes.root}>
      {/* Decorative shapes */}
      <Box className={`${classes.decorativeShape} ${classes.shape1}`} />
      <Box className={`${classes.decorativeShape} ${classes.shape2}`} />

      <Container maxWidth="lg">
        <Grid container className={classes.heroSection}>
          {/* Content Section */}
          <Grid item xs={12} md={6}>
            <Box className={classes.contentContainer}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Typography variant="h1" className={classes.heading}>
                  Bước Chạy Đột Phá
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Typography variant="h3" className={classes.subheading}>
                  Giới Hạn Là Không Giới Hạn!
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Typography variant="body1" className={classes.description}>
                  Trải nghiệm bộ sưu tập giày Adidas mới nhất – kết hợp công nghệ tiên tiến với phong cách hiện đại. Nhẹ
                  hơn, bền hơn, giúp bạn bứt phá trên mọi chặng đường.
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Button
                  variant="contained"
                  href="/products"
                  className={classes.ctaButton}
                  endIcon={<ArrowForwardIcon className={classes.buttonIcon} />}
                >
                  KHÁM PHÁ NGAY
                </Button>
              </motion.div>
            </Box>
          </Grid>

          {/* Image Section */}
          <Grid item xs={12} md={6}>
            <Box className={classes.imageContainer}>
              <motion.div
                className={classes.rhombusContainer}
                initial={{ opacity: 0, scale: 0.9, rotate: -10 }}
                animate={isLoaded ? { opacity: 1, scale: 1, rotate: -5 } : {}}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <Box className={classes.rhombus}>
                  <img src={newImageProduct} alt="Adidas New Collection" className={classes.productImage} />
                </Box>
              </motion.div>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default HomePage

