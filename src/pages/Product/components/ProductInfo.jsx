import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Modal, Typography } from '@material-ui/core';
import { Button, Select, Rate } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { enqueueSnackbar } from 'notistack';
import { addToCart } from '../../Cart/cartSlice';

import cartsApi from '../../../api/cartApi';
import orderApi from '../../../api/ordersApi';
import userApi from '../../../api/userApi';
import { discountPercentage, formatPrice } from '../../../utils/common';

const { Option } = Select;

ProductInfo.propTypes = {
  product: PropTypes.object,
};

const useStyles = makeStyles((theme) => ({
  // Tổng thể trang
  wrapper: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: theme.spacing(2),
    fontFamily: 'Helvetica, Arial, sans-serif',
  },

  // Breadcrumb
  breadcrumb: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    fontSize: '0.9rem',
    color: '#555',
    '& a': {
      textDecoration: 'none',
      color: '#555',
      marginRight: '8px',
    },
    '& span': {
      margin: '0 8px',
    },
  },

  // Container hiển thị 2 cột
  productContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(2),
  },

  // Bên trái - Gallery ảnh
  gallery: {
    flex: '1 1 70%',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  mainImage: {
    width: '100%',
    borderRadius: '4px',
    objectFit: 'cover',
  },
  smallImagesWrapper: {
    display: 'flex',
    gap: theme.spacing(1),
  },
  smallImage: {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
    borderRadius: '4px',
    cursor: 'pointer',
    border: '4px solid transparent',
    '&:hover': {
      borderColor: '#000',
    },
  },
  smallImageActive: {
    borderColor: '#000',
  },

  // Bên phải - Thông tin sản phẩm
  info: {
    flex: '1 1 50%',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },

  // Danh mục + đánh giá
  categoryRating: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.9rem',
    color: '#555',
  },

  // Tên sản phẩm
  productName: {
    fontSize: '2rem',
    fontWeight: 700,
  },

  // Giá
  priceBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  salePrice: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#d32f2f',
  },
  originalPrice: {
    fontSize: '1rem',
    textDecoration: 'line-through',
    color: '#888',
  },
  promotionPercent: {
    fontSize: '1rem',
    color: '#388e3c',
    fontWeight: 500,
  },

  // Màu sắc
  colorBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  colorTitle: {
    fontWeight: 600,
  },
  colorList: {
    display: 'flex',
    gap: theme.spacing(1),
    flexWrap: 'wrap',
  },
  colorItem: {
    width: '60px',
    height: '60px',
    borderRadius: '4px',
    cursor: 'pointer',
    border: '2px solid transparent',
    '&:hover': {
      borderColor: '#000',
    },
  },
  colorItemActive: {
    borderColor: '#000',
  },

  // Kích cỡ
  sizeBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  sizeTitle: {
    fontWeight: 600,
  },
  sizeGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  sizeOption: {
    minWidth: '60px',
    padding: '6px 8px',
    border: '2px solid #ccc',
    borderRadius: '4px',
    textAlign: 'center',
    cursor: 'pointer',
    '&:hover': {
      borderColor: '#000',
    },
  },
  sizeOptionActive: {
    borderColor: '#000',
    backgroundColor: '#f5f5f5',
  },

  // Nút hành động
  actions: {
    display: 'flex',
    gap: '16px',
    marginTop: theme.spacing(2),
  },
  btnAddCart: {
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '4px',
    fontWeight: 600,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#333',
    },
  },
  btnBuyNow: {
    backgroundColor: '#fff',
    color: '#000',
    border: '2px solid #000',
    padding: '12px 24px',
    borderRadius: '4px',
    fontWeight: 600,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#f0f0f0',
    },
  },

  // Mô tả ngắn
  description: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: '#fafafa',
    borderRadius: '4px',
    fontSize: '1rem',
    lineHeight: 1.6,
    color: '#333',
  },

  // Modal
  modalStyle: {
    position: 'absolute',
    width: 400,
    backgroundColor: '#fff',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '8px',
    outline: 'none',
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(2),
  },
}));

function ProductInfo({ product = {} }) {
  const classes = useStyles();
  const {
    name,
    description,
    salePrice,
    originalPrice,
    size,
    _id,
    images = [],
    rating = 4.5,
    // ví dụ, có thể có thêm brand, category, colorOptions, ...
    // brand, category, colorOptions,
  } = product;

  // Giả định: brand = 'Nam', category = 'Chạy', colorOptions = ['#000','red','green','blue'], v.v.
  // Tuỳ thuộc vào cấu trúc data thực tế từ API của bạn
  const brand = product.brand || 'Nam';
  const category = product.category || 'Chạy';
  const colorOptions = product.colorOptions || images; // Hoặc 1 mảng các mã màu, link ảnh
  const reviewCount = product.reviewCount || 277;

  const userId = localStorage.getItem('userId');
  const promotionPercent = discountPercentage(originalPrice, salePrice);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState([]);
  const [error, setError] = useState('');

  // Ảnh đang được hiển thị chính
  const [selectedImage, setSelectedImage] = useState(images[0] || '');

  // Nếu size là mảng, ta để người dùng chọn
  // Nếu size là chuỗi, thì chỉ có 1 lựa chọn
  const [selectedSize, setSelectedSize] = useState(
    Array.isArray(size) ? size[0] : size
  );

  // Giả định colorOptions là mảng 4 ảnh hoặc mảng các mã màu
  // Ở đây ta dùng link ảnh luôn (vì Adidas hiển thị màu dưới dạng ảnh)
  const [selectedColor, setSelectedColor] = useState(colorOptions[0] || '');

  // Thông tin shipping
  const shippingInfo = {
    receiver: userInfo.displayName,
    phone: userInfo.contactPhone,
    address: userInfo.address,
    addressDetail: userInfo.addressDetail,
    isInCart: false,
  };

  // Lấy thông tin user
  useEffect(() => {
    if (!userId) {
      setError('No user ID found in local storage');
      return;
    }
    (async () => {
      try {
        const info = await userApi.getInfo(userId);
        setUserInfo(info);
      } catch (error) {
        setError('Failed to fetch account info');
      }
    })();
  }, [userId]);

  // Cập nhật ảnh chính, size, màu khi product thay đổi
  useEffect(() => {
    if (images && images.length > 0) {
      setSelectedImage(images[0]);
    }
    if (size) {
      setSelectedSize(Array.isArray(size) ? size[0] : size);
    }
    if (colorOptions && colorOptions.length > 0) {
      setSelectedColor(colorOptions[0]);
    }
  }, [images, size, colorOptions]);

  // Payload cho Add to cart
  const productId = _id ? _id.toString() : '';
  const quantity = 1;
  const payload = {
    userId,
    productId,
    quantity,
    size: selectedSize,
    color: selectedColor,
  };

  // Xử lý thêm vào giỏ hàng
  const handleAddToCart = async () => {
    if (!userId) {
      setOpenModal(true);
      return;
    }
    try {
      await cartsApi.add(payload);
      dispatch(
        addToCart({
          id: product._id,
          product,
          quantity: 1,
          size: selectedSize,
          color: selectedColor,
        })
      );
      enqueueSnackbar('Đã thêm vào giỏ hàng', { variant: 'success' });
    } catch (error) {
      console.error('Add to cart failed:', error);
      enqueueSnackbar('Đã xảy ra lỗi!', { variant: 'error' });
    }
  };

  // Payload cho Buy now
  const price = salePrice;
  const urlImage = selectedImage;
  const products = [
    {
      productId,
      price,
      quantity,
      urlImage,
      size: selectedSize,
      color: selectedColor,
    },
  ];
  const payloadPay = { userId, products, shippingInfo };

  // Xử lý mua ngay
  const handleBuyNow = async () => {
    if (!userId) {
      setOpenModal(true);
      return;
    }
    try {
      const req = await orderApi.add(payloadPay);
      navigate(`/orders?id=${req.orderExist._id}`);
    } catch (error) {
      enqueueSnackbar('Đã xảy ra lỗi! Vui lòng thử lại sau.', { variant: 'error' });
    }
  };

  // Đóng / mở modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleNavigate = () => {
    navigate('/login');
  };

  // Chọn size
  const handleSelectSize = (s) => {
    setSelectedSize(s);
  };

  // Chọn màu (ở đây ta giả định colorOptions là mảng URL ảnh)
  const handleSelectColor = (colorUrl) => {
    setSelectedColor(colorUrl);
    // Giả sử khi chọn màu thì thay luôn ảnh chính
    setSelectedImage(colorUrl);
  };

  return (
    <Box className={classes.wrapper}>
      {/* BREADCRUMB */}
      <Box className={classes.breadcrumb}>
        <a href="#back">Trở lại</a>
        <span>/</span>
        <a href="#home">Trang chủ</a>
        <span>/</span>
        <a href="#category">{brand}</a>
        <span>/</span>
        <a href="#subCategory">{category}</a>
      </Box>

      {/* Container 2 cột */}
      <Box className={classes.productContainer}>
        {/* Cột ảnh */}
        <Box className={classes.gallery}>
          {/* Ảnh chính */}
          {selectedImage ? (
            <img src={selectedImage} alt="main-product" className={classes.mainImage} />
          ) : (
            <Typography variant="body1">No Image Available</Typography>
          )}

          {/* Danh sách ảnh nhỏ (nếu có) */}
          {images.length > 1 && (
            <Box className={classes.smallImagesWrapper}>
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`thumb-${idx}`}
                  className={
                    selectedImage === img
                      ? `${classes.smallImage} ${classes.smallImageActive}`
                      : classes.smallImage
                  }
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </Box>
          )}
        </Box>

        {/* Cột thông tin */}
        <Box className={classes.info}>
          {/* Danh mục, đánh giá */}
          <Box className={classes.categoryRating}>
            <Typography>{brand} • {category}</Typography>
            <Rate disabled allowHalf defaultValue={Math.round(rating * 2) / 2} />
            <Typography>({reviewCount})</Typography>
          </Box>

          {/* Tên sản phẩm */}
          <Typography className={classes.productName}>{name}</Typography>

          {/* Giá */}
          <Box className={classes.priceBox}>
            <Typography className={classes.salePrice}>{formatPrice(salePrice)}</Typography>
            {promotionPercent > 0 && (
              <>
                <Typography className={classes.originalPrice}>
                  {formatPrice(originalPrice)}
                </Typography>
                <Typography className={classes.promotionPercent}>
                  {promotionPercent}% OFF
                </Typography>
              </>
            )}
          </Box>

          {/* Màu sắc (nếu có) */}
          {colorOptions && colorOptions.length > 0 && (
            <Box className={classes.colorBox}>
              <Typography className={classes.colorTitle}>Màu sắc</Typography>
              <Box className={classes.colorList}>
                {colorOptions.map((col, idx) => (
                  <img
                    key={idx}
                    src={col}
                    alt={`color-${idx}`}
                    className={
                      selectedColor === col
                        ? `${classes.colorItem} ${classes.colorItemActive}`
                        : classes.colorItem
                    }
                    onClick={() => handleSelectColor(col)}
                  />
                ))}
              </Box>
            </Box>
          )}

          {/* Kích cỡ */}
          {Array.isArray(size) && size.length > 0 ? (
            <Box className={classes.sizeBox}>
              <Typography className={classes.sizeTitle}>Kích cỡ</Typography>
              <Box className={classes.sizeGrid}>
                {size.map((s) => (
                  <Box
                    key={s}
                    className={
                      s === selectedSize
                        ? `${classes.sizeOption} ${classes.sizeOptionActive}`
                        : classes.sizeOption
                    }
                    onClick={() => handleSelectSize(s)}
                  >
                    {s}
                  </Box>
                ))}
              </Box>
            </Box>
          ) : (
            <Box className={classes.sizeBox}>
              <Typography className={classes.sizeTitle}>Kích cỡ</Typography>
              <Box className={classes.sizeGrid}>
                <Box className={`${classes.sizeOption} ${classes.sizeOptionActive}`}>
                  {size || 'Free Size'}
                </Box>
              </Box>
            </Box>
          )}

          {/* Nút hành động */}
          <Box className={classes.actions}>
            <Button className={classes.btnAddCart} onClick={handleAddToCart}>
              Thêm vào giỏ
            </Button>
            <Button className={classes.btnBuyNow} onClick={handleBuyNow}>
              Mua ngay
            </Button>
          </Box>

          {/* Mô tả ngắn gọn */}
          <Box className={classes.description}>
            <Typography variant="body1">
              {description || 'Hiện chưa có mô tả cho sản phẩm này.'}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Modal yêu cầu đăng nhập */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className={classes.modalStyle}>
          <Typography variant="h6" id="modal-title">
            Vui lòng đăng nhập để tiếp tục
          </Typography>
          <Box className={classes.modalActions}>
            <Button onClick={handleCloseModal} style={{ borderRadius: '4px', padding: '8px 16px' }}>
              Đóng
            </Button>
            <Button
              onClick={handleNavigate}
              style={{
                borderRadius: '4px',
                padding: '8px 16px',
                background: '#000',
                color: '#fff',
                border: 'none',
              }}
            >
              Đăng nhập
            </Button>
          </Box>
        </div>
      </Modal>
    </Box>
  );
}

export default ProductInfo;
