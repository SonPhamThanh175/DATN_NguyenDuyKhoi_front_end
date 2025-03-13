import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { HeartOutlined } from "@ant-design/icons";
import { discountPercentage, formatPrice } from "../../../utils/common";

function Product({ product }) {
  // console.log(product);

  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    navigate(`/products/${product._id}`);
  };

  const thumbnailUrl =
    product.images?.[0] ||
    "https://azdigi.com/blog/wp-content/uploads/2022/12/404-error.png";
  const thumbnailUrl1 =
    product.images?.[2] ||
    "https://azdigi.com/blog/wp-content/uploads/2022/12/404-error.png";

  return (
    <Card
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        background: "#fff",
        boxShadow: "none",
        borderRadius: 1,
        width: "100%",
        height: "400px",
        border: isHovered ? "2px solid black" : "",
        transition: "border 0.2s ease",
        cursor: "pointer",
        position: "relative",
      }}
    >
      {/* Logo thương hiệu */}
      {/* <Box
        sx={{
          position: 'absolute',
          top: 10,
          left: 10,
          backgroundColor: '#16202A',
          width: 32,
          height: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '4px',
        }}
      >
        <Typography color='white' fontSize={12} fontWeight='bold'>
          LOGO
        </Typography>
      </Box> */}

      {/* Icon trái tim */}
      <Box
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
        }}
      >
        <HeartOutlined style={{ fontSize: 20 }} />
      </Box>

      {/* Ảnh sản phẩm */}
      <CardMedia
        component="img"
        image={isHovered ? thumbnailUrl1 : thumbnailUrl}
        alt={product.name}
        sx={{ height: 300, objectFit: "cover", width: "100%" }}
      />

      <CardContent sx={{ padding: "10px" }}>
        {/* Giá sản phẩm */}
        <Box
          sx={{
            background: "white",
            padding: "4px 8px",
            display: "inline-block",
            fontWeight: "bold",
            borderRadius: 1,
          }}
        >
          {formatPrice(product.salePrice)}
        </Box>

        {/* Tên sản phẩm */}
        <Typography variant="body1" fontWeight={500} mt={1}>
          {product.name}
        </Typography>

        {/* Danh mục */}
        <Typography variant="body2" color="textSecondary">
          {product.category || "Danh mục"}
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
