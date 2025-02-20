// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import { Box, Card, CardContent, CardMedia, Typography } from '@material-ui/core';
// import { useNavigate } from 'react-router-dom';
// import { discountPercentage, formatPrice } from '../../../utils/common';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

// function Product({ product }) {
//     const navigate = useNavigate();
//     const [isHovered, setIsHovered] = useState(false);

//     const handleClick = () => {
//         navigate(`/products/${product._id}`);
//     };

//     const thumbnailUrl = product.images[0] 
//         ? `${product.images[0]}`
//         : 'https://via.placeholder.com/444';

//     const thumbnailUrl2 = product.images[1] 
//         ? `${product.images[1]}`
//         : 'https://via.placeholder.com/444';

//     const promotionPercent = discountPercentage(product.originalPrice, product.salePrice);

//     return (
//         <Card
//             style={{
//                 background: 'transparent',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 boxShadow: 'none',
//                 border: 'none',
//                 width: '100%',
//                 height: '420px',
//                 borderRadius: '0px',
//                 position: 'relative',
//                 cursor: "pointer",
//                 border : isHovered ? '1px solid black' : 'none'
//             }}
//             onClick={handleClick}
//             onMouseEnter={() => setIsHovered(true)}
//             onMouseLeave={() => setIsHovered(false)}
//         >
//             <Box style={{ position: 'relative', width: '100%', height: '422px' }}>
//                 {promotionPercent > 0 && (
//                     <Box
//                         style={{
//                             position: 'absolute',
//                             top: '15px',
//                             right: '15px',
//                             color: 'black',
//                             padding: '5px 5px',
//                             borderRadius: '0px',
//                             fontWeight: '600',
//                             zIndex: 1,
//                             // width:'56px',
//                             display:'flex',
//                             justifyContent: 'center',
//                         }}
//                     >
//                         <FavoriteBorderIcon/>
//                     </Box>
//                 )}
//                 <CardMedia
//                     component='img'
//                     alt={product.name}
//                     image={isHovered ? thumbnailUrl2 : thumbnailUrl}
//                     style={{
//                         width: '100%',
//                         height: '100%',
//                         objectFit: 'cover',
//                         transition: 'transform 0.3s ease',
//                         transform: isHovered ? 'scale(1.05)' : 'scale(1)',
//                     }}
//                 />
//             </Box>
//             <CardContent sx={{ flexGrow: 1 }} style={{ margin: '0', padding: "10px" }}>
//                 <Typography
//                     variant='h6'
//                     component='div'
//                     style={{
//                         overflow: 'hidden',
//                         textOverflow: 'ellipsis',
//                         whiteSpace: 'nowrap',
//                         fontWeight: 'bold',
//                         color: '#333',
                        
//                     }}
//                 >
//                     {product.name}
//                 </Typography>
//                 <Box
//                     style={{
//                         display: 'flex',
//                         flexDirection: 'row',
//                         alignItems: 'center',
//                         background: 'transparent',
//                         margin: '0',
//                         padding: '0'
//                     }}
//                 >
//                     <Box>
//                         <Typography
//                             variant='h6'
//                             component='div'
//                             style={{
//                                 marginRight: '12px',
//                                 fontWeight: 'bold',
//                                 color: '#333',
                                 
//                                 fontSize: '1rem',
//                             }}
//                         >
//                             {formatPrice(product.salePrice)}
//                         </Typography>
//                     </Box>
//                     <Box>
//                         <Typography
//                             variant='body2'
//                             component='div'
//                             style={{
//                                 color: '#808089',
//                                 textDecoration: 'line-through',
//                                 fontSize: '0.875rem',
                                 
//                             }}
//                         >
//                             {formatPrice(product.originalPrice)}
//                         </Typography>
//                     </Box>
//                 </Box>
//             </CardContent>
//         </Card>
//     );
// }

// Product.propTypes = {
//     product: PropTypes.shape({
//         _id: PropTypes.string.isRequired,
//         name: PropTypes.string.isRequired,
//         salePrice: PropTypes.number.isRequired,
//         originalPrice: PropTypes.number.isRequired,
//         images: PropTypes.array.isRequired,
//     }).isRequired,
// };

// export default Product;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { discountPercentage, formatPrice } from '../../../utils/common';

function Product({ product }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  // Điều hướng sang trang chi tiết sản phẩm
  const handleClick = () => {
    navigate(`/products/${product._id}`);
  };

  // Ảnh chính và ảnh thứ 2 (dùng để hover)
  const thumbnailUrl = product.images?.[0]
    ? product.images[0]
    : 'https://via.placeholder.com/444';
  const thumbnailUrl2 = product.images?.[1]
    ? product.images[1]
    : 'https://via.placeholder.com/444';

  // Tính phần trăm khuyến mãi (nếu có)
  const promotionPercent = discountPercentage(product.originalPrice, product.salePrice);

  return (
    <Card
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        // Trắng, không viền, hiển thị dạng cột
        background: '#fff',
        boxShadow: 'none',
        borderRadius: 0,
        width: '100%',
        height: '420px',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        // Tạo viền mảnh khi hover (giống Adidas có hiệu ứng nhẹ)
        border: isHovered ? '2px solid black' : '2px solid transparent',
        transition: 'border 0.2s ease',
      }}
    >
      {/* Vùng ảnh */}
      <Box style={{ position: 'relative', width: '100%', height: '280px' }}>
        <CardMedia
          component='img'
          alt={product.name}
          image={isHovered ? thumbnailUrl2 : thumbnailUrl}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
            transform: isHovered ? 'scale(1.0)' : 'scale(1)',
          }}
        />
      </Box>

      {/* Nội dung text */}
      <CardContent style={{ padding: '10px', flexGrow: 1 }}>
        {/* Giá khuyến mãi (hoặc giá gốc nếu không giảm) */}
        <Box style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
          <Typography
            variant='h6'
            style={{
              fontSize: '1rem',
              fontWeight: 'bold',
              marginRight: '8px',
            }}
          >
            {formatPrice(product.salePrice)}
          </Typography>

          {/* Nếu có khuyến mãi, hiển thị giá gốc & % giảm */}
          {promotionPercent > 0 && (
            <>
              <Typography
                variant='body2'
                style={{
                  color: '#808089',
                  textDecoration: 'line-through',
                  fontSize: '0.875rem',
                  marginRight: '8px',
                }}
              >
                {formatPrice(product.originalPrice)}
              </Typography>
              <Typography
                variant='body2'
                style={{
                  color: '#d32f2f',
                  fontWeight: 'bold',
                  fontSize: '0.875rem',
                }}
              >
                -{promotionPercent}%
              </Typography>
            </>
          )}
        </Box>

        {/* Tên sản phẩm */}
        <Typography
          variant='body1'
          style={{
            fontWeight: 500,
            fontSize: '0.95rem',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            marginBottom: '4px',
          }}
        >
          {product.name}
        </Typography>

        {/* Ví dụ hiển thị category, v.v. (tuỳ bạn) */}
        {/* Ở ảnh mẫu Adidas: hiển thị Nữ Tập Luyện | 3 colours | Mới, ... */}
        {product.category && (
          <Typography variant='body2' style={{ color: '#666' }}>
            {product.category}
          </Typography>
        )}
        {product.colors?.length > 1 && (
          <Typography variant='body2' style={{ color: '#666' }}>
            {product.colors.length} colours
          </Typography>
        )}
        {product.isNew && (
          <Typography variant='body2' style={{ color: '#666' }}>
            Mới
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

Product.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    salePrice: PropTypes.number.isRequired,
    originalPrice: PropTypes.number.isRequired,
    images: PropTypes.array.isRequired,
    category: PropTypes.string,
    colors: PropTypes.array,
    isNew: PropTypes.bool,
  }).isRequired,
};

export default Product;
