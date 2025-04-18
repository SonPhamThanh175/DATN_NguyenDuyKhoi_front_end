// import React, { useState } from "react";
// import PropTypes from "prop-types";
// import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { HeartOutlined } from "@ant-design/icons";
// import { discountPercentage, formatPrice } from "../../../utils/common";

// function Product({ product }) {
//   // console.log(product);

//   const navigate = useNavigate();
//   const [isHovered, setIsHovered] = useState(false);

//   const handleClick = () => {
//     navigate(`/products/${product._id}`);
//   };

//   const thumbnailUrl =
//     product.images?.[0] ||
//     "https://azdigi.com/blog/wp-content/uploads/2022/12/404-error.png";
//   const thumbnailUrl1 =
//     product.images?.[2] ||
//     "https://azdigi.com/blog/wp-content/uploads/2022/12/404-error.png";

//   return (
//     <Card
//       onClick={handleClick}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       sx={{
//         background: "#fff",
//         boxShadow: "none",
//         borderRadius: 1,
//         width: "100%",
//         height: "400px",
//         border: isHovered ? "2px solid black" : "",
//         transition: "border 0.2s ease",
//         cursor: "pointer",
//         position: "relative",
//       }}
//     >
//       {/* Logo thương hiệu */}
//       {/* <Box
//         sx={{
//           position: 'absolute',
//           top: 10,
//           left: 10,
//           backgroundColor: '#16202A',
//           width: 32,
//           height: 32,
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           borderRadius: '4px',
//         }}
//       >
//         <Typography color='white' fontSize={12} fontWeight='bold'>
//           LOGO
//         </Typography>
//       </Box> */}

//       {/* Icon trái tim */}
//       <Box
//         sx={{
//           position: "absolute",
//           top: 10,
//           right: 10,
//         }}
//       >
//         <HeartOutlined style={{ fontSize: 20 }} />
//       </Box>

//       {/* Ảnh sản phẩm */}
//       <CardMedia
//         component="img"
//         image={isHovered ? thumbnailUrl1 : thumbnailUrl}
//         alt={product.name}
//         sx={{ height: 300, objectFit: "cover", width: "100%" }}
//       />

//       <CardContent sx={{ padding: "10px" }}>
//         {/* Giá sản phẩm */}
//         <Box
//           sx={{
//             background: "white",
//             padding: "4px 8px",
//             display: "inline-block",
//             fontWeight: "bold",
//             borderRadius: 1,
//           }}
//         >
//           {formatPrice(product.salePrice)}
//         </Box>

//         {/* Tên sản phẩm */}
//         <Typography variant="body1" fontWeight={500} mt={1}>
//           {product.name}
//         </Typography>

//         {/* Danh mục */}
//         <Typography variant="body2" color="textSecondary">
//           {product.category || "Danh mục"}
//         </Typography>
//       </CardContent>
//     </Card>
//   );
// }

// Product.propTypes = {
//   product: PropTypes.shape({
//     _id: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     salePrice: PropTypes.number.isRequired,
//     images: PropTypes.array,
//     category: PropTypes.string,
//   }).isRequired,
// };

// export default Product;

'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { HeartOutlined } from '@ant-design/icons';
import { formatPrice } from '../../../utils/common';

function Product({ product }) {
    // console.log(product);

    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = () => {
        navigate(`/products/${product._id}`);
    };

    const thumbnailUrl =
        product.images?.[0] || 'https://azdigi.com/blog/wp-content/uploads/2022/12/404-error.png';
    const thumbnailUrl1 =
        product.images?.[2] || 'https://azdigi.com/blog/wp-content/uploads/2022/12/404-error.png';

    return (
        <Card
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            sx={{
                background: '#fff',
                boxShadow: 'none',
                borderRadius: 0,
                width: '100%',
                height: 'auto',
                cursor: 'pointer',
                position: 'relative',
                transition: 'all 0.2s ease',
                '&:hover': {
                    transform: 'translateY(-5px)',
                },
            }}
        >
            {/* Container for image with gray background */}
            <Box
                sx={{
                    position: 'relative',
                    backgroundColor: '#f0f1f2',
                    width: '100%',
                    paddingTop: '100%', // 1:1 aspect ratio
                }}
            >
                {/* Heart icon */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        zIndex: 2,
                        color: '#000',
                    }}
                >
                    <HeartOutlined style={{ fontSize: 24 }} />
                </Box>

                {/* Price tag */}
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 16,
                        left: 16,
                        zIndex: 2,
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: '14px',
                            fontWeight: 500,
                            color: '#000',
                        }}
                    >
                        {formatPrice(product.salePrice)}
                    </Typography>
                </Box>

                {/* Product image */}
                <CardMedia
                    component='img'
                    image={isHovered ? thumbnailUrl1 : thumbnailUrl}
                    alt={product.name}
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        padding: '20px',
                    }}
                />
            </Box>

            <CardContent
                sx={{
                    padding: '16px 0',
                    '&:last-child': {
                        paddingBottom: '16px',
                    },
                }}
            >
                {/* Product name */}
                <Typography
                    variant='body1'
                    sx={{
                        fontSize: '16px',
                        fontWeight: 500,
                        color: '#000',
                        marginBottom: '4px',
                    }}
                >
                    {product.name}
                </Typography>

                {/* Category/Brand */}
                <Typography
                    variant='body2'
                    sx={{
                        fontSize: '14px',
                        color: '#767676',
                    }}
                >
                    {product.description || 'Originals'}
                </Typography>
            </CardContent>
        </Card>
    );
}

Product.propTypes = {
    product: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        salePrice: PropTypes.number.isRequired,
        images: PropTypes.array,
        category: PropTypes.string,
    }).isRequired,
};

export default Product;
