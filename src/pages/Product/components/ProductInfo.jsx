'use client';

import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { enqueueSnackbar } from 'notistack';
import { addToCart } from '../../Cart/cartSlice';

import cartsApi from '../../../api/cartApi';
import orderApi from '../../../api/ordersApi';
import userApi from '../../../api/userApi';
import { discountPercentage, formatPrice } from '../../../utils/common';

// SVG Icons
const ChevronRightIcon = () => (
    <svg
        style={{ width: '16px', height: '16px', margin: '0 8px' }}
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
    >
        <polyline points='9 18 15 12 9 6'></polyline>
    </svg>
);

const ShoppingCartIcon = () => (
    <svg
        style={{ width: '20px', height: '20px', marginRight: '8px' }}
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
    >
        <circle
            cx='9'
            cy='21'
            r='1'
        ></circle>
        <circle
            cx='20'
            cy='21'
            r='1'
        ></circle>
        <path d='M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6'></path>
    </svg>
);

const HeartIcon = () => (
    <svg
        style={{ width: '20px', height: '20px', marginRight: '8px' }}
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
    >
        <path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'></path>
    </svg>
);

const TruckIcon = () => (
    <svg
        style={{ width: '20px', height: '20px', marginRight: '8px' }}
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
    >
        <rect
            x='1'
            y='3'
            width='15'
            height='13'
        ></rect>
        <polygon points='16 8 20 8 23 11 23 16 16 16 16 8'></polygon>
        <circle
            cx='5.5'
            cy='18.5'
            r='2.5'
        ></circle>
        <circle
            cx='18.5'
            cy='18.5'
            r='2.5'
        ></circle>
    </svg>
);

const RefreshIcon = () => (
    <svg
        style={{ width: '20px', height: '20px', marginRight: '8px' }}
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
    >
        <path d='M23 4v6h-6'></path>
        <path d='M1 20v-6h6'></path>
        <path d='M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15'></path>
    </svg>
);

const ShieldIcon = () => (
    <svg
        style={{ width: '20px', height: '20px', marginRight: '8px' }}
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
    >
        <path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'></path>
        <path d='M9 12l2 2 4-4'></path>
    </svg>
);

// Render star rating
const renderRating = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            {[...Array(5)].map((_, i) => (
                <svg
                    key={i}
                    style={{
                        width: '16px',
                        height: '16px',
                        color:
                            i < fullStars
                                ? '#FACC15'
                                : i === fullStars && hasHalfStar
                                ? '#FACC15'
                                : '#D1D5DB',
                        marginRight: '2px',
                    }}
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                </svg>
            ))}
        </div>
    );
};

// Badge component
const Badge = ({ children, variant }) => {
    const styles = {
        container: {
            display: 'inline-block',
            padding: '2px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: '500',
            backgroundColor: variant === 'green' ? '#ECFDF5' : '#F3F4F6',
            color: variant === 'green' ? '#065F46' : '#374151',
            border: variant === 'outline' ? '1px solid #E5E7EB' : 'none',
        },
    };

    return <span style={styles.container}>{children}</span>;
};

// Button component
const StyledButton = ({ children, variant, onClick, disabled, fullWidth, icon }) => {
    const baseStyles = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '12px 24px',
        borderRadius: '6px',
        fontWeight: '600',
        fontSize: '14px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s ease',
        opacity: disabled ? 0.6 : 1,
        width: fullWidth ? '100%' : 'auto',
    };

    const variants = {
        primary: {
            backgroundColor: '#000',
            color: '#fff',
            border: 'none',
            ':hover': {
                backgroundColor: '#333',
            },
        },
        outline: {
            backgroundColor: '#fff',
            color: '#000',
            border: '2px solid #000',
            ':hover': {
                backgroundColor: '#f5f5f5',
            },
        },
        ghost: {
            backgroundColor: 'transparent',
            color: '#6B7280',
            border: 'none',
            padding: '8px 12px',
            ':hover': {
                backgroundColor: '#F3F4F6',
            },
        },
    };

    const style = {
        ...baseStyles,
        ...variants[variant],
    };

    return (
        <button
            style={style}
            onClick={onClick}
            disabled={disabled}
        >
            {icon}
            {children}
        </button>
    );
};

// Modal component
const Modal = ({ isOpen, onClose, title, children, footer }) => {
    if (!isOpen) return null;

    const styles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
        },
        modal: {
            backgroundColor: '#fff',
            borderRadius: '8px',
            padding: '24px',
            width: '400px',
            maxWidth: '90%',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
        },
        header: {
            marginBottom: '16px',
        },
        title: {
            fontSize: '18px',
            fontWeight: '600',
            color: '#111827',
        },
        content: {
            marginBottom: '24px',
        },
        footer: {
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '12px',
        },
    };

    return (
        <div
            style={styles.overlay}
            onClick={onClose}
        >
            <div
                style={styles.modal}
                onClick={(e) => e.stopPropagation()}
            >
                <div style={styles.header}>
                    <h3 style={styles.title}>{title}</h3>
                </div>
                <div style={styles.content}>{children}</div>
                <div style={styles.footer}>{footer}</div>
            </div>
        </div>
    );
};

// Card component
const Card = ({ children, style }) => {
    const cardStyle = {
        backgroundColor: '#fff',
        borderRadius: '8px',
        border: '1px solid #E5E7EB',
        padding: '16px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        ...style,
    };

    return <div style={cardStyle}>{children}</div>;
};

// Separator component
const Separator = () => {
    return <div style={{ height: '1px', backgroundColor: '#E5E7EB', margin: '16px 0' }} />;
};

function ProductInfo({ product = {} }) {
    const {
        name,
        description,
        descriptionFull,
        Color,
        salePrice,
        originalPrice,
        size,
        _id,
        images = [],
        rating,
        quantity,
    } = product;

    const brand = product.brand || 'Nike';
    const category = product.category || 'Running';
    const colorOptions = product.colorOptions || images;
    const reviewCount = product.reviewCount || 277;

    const userId = localStorage.getItem('userId');
    const promotionPercent = discountPercentage(originalPrice, salePrice);
    const [openModal, setOpenModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState([]);
    const [error, setError] = useState('');

    // Ảnh đang được hiển thị chính
    const [selectedImage, setSelectedImage] = useState(images[0] || '');
    const [selectedSize, setSelectedSize] = useState(Array.isArray(size) ? size[0] : size);
    const [selectedColor, setSelectedColor] = useState(colorOptions[0] || '');

    const shippingInfo = {
        receiver: userInfo.displayName,
        phone: userInfo.contactPhone,
        address: userInfo.address,
        addressDetail: userInfo.addressDetail,
        isInCart: false,
    };

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
    const payloadQuantity = 1;
    const payload = {
        userId,
        productId,
        quantity: payloadQuantity,
        size: selectedSize,
        color: selectedColor,
    };

    // Xử lý thêm vào giỏ hàng
    const handleAddToCart = async () => {
        if (!userId) {
            setOpenModal(true);
            return;
        }

        setIsLoading(true);
        try {
            await cartsApi.add(payload);
            dispatch(
                addToCart({
                    id: product._id,
                    product,
                    quantity: 1,
                    size: selectedSize,
                    color: selectedColor,
                }),
            );
            enqueueSnackbar('Đã thêm vào giỏ hàng', { variant: 'success' });
        } catch (error) {
            console.error('Add to cart failed:', error);
            enqueueSnackbar('Đã xảy ra lỗi!', { variant: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    // Payload cho Buy now
    const price = salePrice;
    const urlImage = selectedImage;
    const products = [
        {
            productId,
            price,
            quantity: payloadQuantity,
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

        setIsLoading(true);
        try {
            const req = await orderApi.add(payloadPay);
            navigate(`/orders?id=${req.orderExist._id}`);
        } catch (error) {
            enqueueSnackbar('Đã xảy ra lỗi! Vui lòng thử lại sau.', { variant: 'error' });
        } finally {
            setIsLoading(false);
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

    // Styles
    const styles = {
        // Container styles
        container: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '16px',
            fontFamily: 'Helvetica, Arial, sans-serif',
        },

        // Breadcrumb
        breadcrumb: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: '16px',
            fontSize: '14px',
            color: '#6B7280',
        },
        breadcrumbLink: {
            textDecoration: 'none',
            color: '#6B7280',
            marginRight: '8px',
            transition: 'color 0.2s',
        },

        // Product container
        productContainer: {
            display: 'flex',
            flexDirection: 'row',
            gap: '32px',
            flexWrap: 'no-wrap',
        },

        // Gallery
        gallery: {
            flex: '1 1 500px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
        },
        mainImage: {
            width: '100%',
            borderRadius: '8px',
            objectFit: 'cover',
            aspectRatio: '1/1',
            border: '1px solid #E5E7EB',
        },
        thumbnailContainer: {
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '8px',
        },
        thumbnail: {
            width: '80px',
            height: '80px',
            objectFit: 'cover',
            borderRadius: '6px',
            cursor: 'pointer',
            border: '2px solid transparent',
            transition: 'border-color 0.2s',
        },
        thumbnailActive: {
            borderColor: '#000',
        },

        // Product info
        info: {
            flex: '1 1 400px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
        },

        // Category and rating
        categoryRating: {
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            fontSize: '14px',
            color: '#6B7280',
            flexWrap: 'wrap',
        },
        badgeContainer: {
            display: 'flex',
            gap: '8px',
        },

        // Product name
        productName: {
            fontSize: '32px',
            fontWeight: '700',
            color: '#111827',
            marginTop: '8px',
            marginBottom: '8px',
        },

        // Price
        priceContainer: {
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            flexWrap: 'wrap',
        },
        salePrice: {
            fontSize: '28px',
            fontWeight: '700',
            color: '#111827',
        },
        originalPrice: {
            fontSize: '18px',
            textDecoration: 'line-through',
            color: '#6B7280',
        },

        // Color selection
        colorSection: {
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
        },
        sectionTitle: {
            fontSize: '16px',
            fontWeight: '600',
            color: '#111827',
        },
        colorGrid: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
        },
        colorOption: {
            width: '56px',
            height: '56px',
            borderRadius: '6px',
            cursor: 'pointer',
            overflow: 'hidden',
            position: 'relative',
        },
        colorImage: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
        },
        colorBorder: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            border: '2px solid transparent',
            borderRadius: '6px',
            transition: 'border-color 0.2s',
        },
        colorBorderActive: {
            borderColor: '#000',
        },

        // Size selection
        sizeSection: {
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
        },
        sizeHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        sizeGuideLink: {
            fontSize: '14px',
            color: '#4F46E5',
            textDecoration: 'none',
        },
        sizeGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))',
            gap: '8px',
        },
        sizeOption: {
            padding: '8px 12px',
            borderRadius: '6px',
            border: '1px solid #E5E7EB',
            textAlign: 'center',
            cursor: 'pointer',
            fontSize: '14px',
            transition: 'all 0.2s',
        },
        sizeOptionActive: {
            backgroundColor: '#000',
            color: '#fff',
            borderColor: '#000',
        },

        // Stock info
        stockInfo: {
            fontSize: '14px',
            fontWeight: '500',
        },
        inStock: {
            color: '#059669',
        },
        outOfStock: {
            color: '#DC2626',
        },

        // Actions
        actions: {
            display: 'flex',
            gap: '12px',
            marginTop: '16px',
            flexWrap: 'wrap',
        },

        // Benefits section
        benefitsCard: {
            backgroundColor: '#F9FAFB',
            marginTop: '24px',
        },
        benefitsGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
        },
        benefitItem: {
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px',
        },
        benefitText: {
            display: 'flex',
            flexDirection: 'column',
        },
        benefitTitle: {
            fontSize: '14px',
            fontWeight: '600',
            color: '#111827',
        },
        benefitDescription: {
            fontSize: '12px',
            color: '#6B7280',
        },

        // Description
        descriptionSection: {
            marginTop: '24px',
        },
        descriptionTitle: {
            fontSize: '18px',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '8px',
        },
        descriptionText: {
            fontSize: '14px',
            lineHeight: '1.6',
            color: '#4B5563',
        },
        descriptionText2: {
            fontSize: '14px',
            lineHeight: '1.6',
            color: '#4B5563',
            fontWeight: 'bold',
        },
    };

    return (
        <div style={styles.container}>
            {/* Breadcrumb */}
            <div style={styles.breadcrumb}>
                <a
                    href='#'
                    style={styles.breadcrumbLink}
                >
                    Trang chủ
                </a>
                <ChevronRightIcon />
                <a
                    href='#'
                    style={styles.breadcrumbLink}
                >
                    {brand}
                </a>
                <ChevronRightIcon />
                <a
                    href='#'
                    style={styles.breadcrumbLink}
                >
                    {category}
                </a>
                <ChevronRightIcon />
                <span style={{ color: '#111827', fontWeight: '500' }}>{name}</span>
            </div>

            {/* Product Container */}
            <div style={styles.productContainer}>
                {/* Gallery */}
                <div style={styles.gallery}>
                    {/* Main Image */}
                    {selectedImage ? (
                        <img
                            src={selectedImage || '/placeholder.svg'}
                            alt={name}
                            style={styles.mainImage}
                        />
                    ) : (
                        <div style={styles.gallery}>
                            <img
                                src='data:image/png;base64,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'
                                alt={name}
                                style={styles.mainImage}
                            />
                        </div>
                    )}

                    {/* Thumbnails */}
                    {/* {images.length > 1 && (
            <div style={styles.thumbnailContainer}>
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img || "/placeholder.svg"}
                  alt={`${name} - View ${idx + 1}`}
                  style={{
                    ...styles.thumbnail,
                    ...(selectedImage === img ? styles.thumbnailActive : {}),
                  }}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          )} */}
                </div>

                {/* Product Info */}
                <div style={styles.info}>
                    {/* Badges */}
                    <div style={styles.badgeContainer}>
                        <Badge variant='outline'>{brand}</Badge>
                        <Badge variant='outline'>{category}</Badge>
                    </div>

                    {/* Product Name */}
                    <h1 style={styles.productName}>{name}</h1>

                    {/* Rating */}
                    <div style={styles.categoryRating}>
                        {renderRating(rating)}
                        <span style={{ marginLeft: '8px' }}>({reviewCount} đánh giá)</span>
                    </div>

                    {/* Price */}
                    <div style={styles.priceContainer}>
                        <span style={styles.salePrice}>{formatPrice(salePrice)}</span>
                        {promotionPercent > 0 && (
                            <>
                                <span style={styles.originalPrice}>
                                    {formatPrice(originalPrice)}
                                </span>
                                <Badge variant='green'>-{promotionPercent}%</Badge>
                            </>
                        )}
                    </div>

                    <Separator />
                    {/* Color Selection */}

                    <div style={styles.colorSection}>
                        {/* <h3 style={styles.sectionTitle}>Màu sắc</h3> */}
                        <div style={styles.colorGrid}>
                            {Array.isArray(Color) && (
                                <div
                                    style={{
                                        padding: '8px 0px',
                                        // border: '1px solid #e5e7eb',
                                        // borderRadius: '4px',
                                        cursor: 'pointer',
                                        backgroundColor: '#fff',
                                        color: '#000',
                                        display: 'inline-block',
                                    }}
                                >
                                    {Color.join(' / ')}
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Color Selection */}
                    {colorOptions && colorOptions.length > 0 && (
                        <div style={styles.colorSection}>
                            <h3 style={styles.sectionTitle}>Kiểu dáng</h3>
                            <div style={styles.colorGrid}>
                                {colorOptions.map((color, idx) => (
                                    <div
                                        key={idx}
                                        style={styles.colorOption}
                                        onClick={() => handleSelectColor(color)}
                                    >
                                        <img
                                            src={color || '/placeholder.svg'}
                                            alt={`Color option ${idx + 1}`}
                                            style={styles.colorImage}
                                        />
                                        <div
                                            style={{
                                                ...styles.colorBorder,
                                                borderColor:
                                                    selectedColor === color
                                                        ? '#000'
                                                        : 'transparent',
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Size Selection */}
                    <div style={styles.sizeSection}>
                        <div style={styles.sizeHeader}>
                            <h3 style={styles.sectionTitle}>Kích cỡ</h3>
                            <a
                                href='#'
                                style={styles.sizeGuideLink}
                            >
                                Hướng dẫn chọn size
                            </a>
                        </div>
                        <div style={styles.sizeGrid}>
                            {Array.isArray(size) && size.length > 0 ? (
                                size.map((s) => (
                                    <div
                                        key={s}
                                        style={{
                                            ...styles.sizeOption,
                                            ...(s === selectedSize ? styles.sizeOptionActive : {}),
                                        }}
                                        onClick={() => handleSelectSize(s)}
                                    >
                                        {s}
                                    </div>
                                ))
                            ) : (
                                <div
                                    style={{
                                        ...styles.sizeOption,
                                        ...styles.sizeOptionActive,
                                    }}
                                >
                                    {size || 'Free Size'}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Stock Info */}
                    <div
                        style={{
                            ...styles.stockInfo,
                            ...(quantity > 0 ? styles.inStock : styles.outOfStock),
                        }}
                    >
                        {quantity > 0 ? `Còn lại: ${quantity} sản phẩm` : 'Hết hàng'}
                    </div>

                    {/* Actions */}
                    <div style={styles.actions}>
                        <StyledButton
                            variant='outline'
                            onClick={handleAddToCart}
                            disabled={isLoading || quantity <= 0}
                            icon={<ShoppingCartIcon />}
                            style={{ width: '50%' }}
                        >
                            Thêm vào giỏ
                        </StyledButton>
                        <StyledButton
                            variant='primary'
                            onClick={handleBuyNow}
                            disabled={isLoading || quantity <= 0}
                        >
                            Mua ngay
                        </StyledButton>
                    </div>

                    {/* Wishlist */}
                    <StyledButton
                        variant='ghost'
                        fullWidth
                        icon={<HeartIcon />}
                    >
                        Thêm vào danh sách yêu thích
                    </StyledButton>

                    {/* Benefits */}
                    <Card style={styles.benefitsCard}>
                        <div style={styles.benefitsGrid}>
                            <div style={styles.benefitItem}>
                                <TruckIcon />
                                <div style={styles.benefitText}>
                                    <span style={styles.benefitTitle}>Miễn phí vận chuyển</span>
                                    <span style={styles.benefitDescription}>Cho đơn từ 500K</span>
                                </div>
                            </div>
                            <div style={styles.benefitItem}>
                                <RefreshIcon />
                                <div style={styles.benefitText}>
                                    <span style={styles.benefitTitle}>Đổi trả dễ dàng</span>
                                    <span style={styles.benefitDescription}>
                                        Trong vòng 30 ngày
                                    </span>
                                </div>
                            </div>
                            <div style={styles.benefitItem}>
                                <ShieldIcon />
                                <div style={styles.benefitText}>
                                    <span style={styles.benefitTitle}>Bảo hành chính hãng</span>
                                    <span style={styles.benefitDescription}>12 tháng</span>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Description */}
                    <div style={styles.descriptionSection}>
                        <h3 style={styles.descriptionTitle}>Mô tả sản phẩm</h3>
                        <p style={styles.descriptionText2}>
                            {description || 'Hiện chưa có mô tả cho sản phẩm này.'}
                        </p>
                        <p style={styles.descriptionText}>
                            {descriptionFull || 'Hiện chưa có mô tả cho sản phẩm này.'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Login Modal */}
            <Modal
                isOpen={openModal}
                onClose={handleCloseModal}
                title='Vui lòng đăng nhập để tiếp tục'
                footer={
                    <>
                        <StyledButton
                            variant='outline'
                            onClick={handleCloseModal}
                        >
                            Đóng
                        </StyledButton>
                        <StyledButton
                            variant='primary'
                            onClick={handleNavigate}
                        >
                            Đăng nhập
                        </StyledButton>
                    </>
                }
            >
                <p style={{ fontSize: '14px', color: '#4B5563' }}>
                    Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng hoặc mua ngay.
                </p>
            </Modal>
        </div>
    );
}

ProductInfo.propTypes = {
    product: PropTypes.object,
};

export default ProductInfo;
