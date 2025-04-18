import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Card, Button } from 'antd';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { formatPrice } from '../../../utils/common';
import './SuggestedProducts.scss';

const { Meta } = Card;

const SuggestedProducts = ({ productId }) => {
  const [products, setProducts] = useState([]);
  const containerRef = useRef(null);
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

  useEffect(() => {
    const fetchSuggestedProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/recommend/${productId}`
        );
        
        setProducts(response.data);
        console.log("response :",response);
      } catch (error) {
        console.error('Failed to fetch suggested products', error);
      }
    };

    fetchSuggestedProducts();
  }, [productId]);

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: containerRef.current.clientWidth / 2,
        behavior: 'smooth',
      });
    }
  };

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -(containerRef.current.clientWidth / 2),
        behavior: 'smooth',
      });
    }
  };

  const handleCardClick = (productId) => {
    // console.log(productId);
    // debugger
    navigate(`/products/${productId}`); 
  };

  return (
    <div style={{ padding: '20px', position: 'relative' }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
      <h1 style={{ fontFamily: 'monospace' , fontWeight:'bold'}}>Có thể bạn cũng thích</h1>
      </div>
      <div
        ref={containerRef}
        className="suggested-products-container"
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '20px',
          overflowX: 'auto',
          paddingRight: '50px',
          scrollBehavior: 'smooth',
        }}
      >
        {products.map((product) => {
          const thumbnailUrl = product?.images?.[0]
            ? product.images[0]
            : 'https://www.toprankindonesia.com/wp-content/uploads/2023/10/4.-Apa-itu-404-not-Found-scaled.jpg';

          return (
            <Card
              hoverable
              key={product.productId} 
              onClick={() => handleCardClick(product._id)} 
              style={{ width: 265, height: '300px', flex: '0 0 auto' }}
              cover={
                <img
                  alt={product.name}
                  src={thumbnailUrl}
                  style={{ height: 200, objectFit: 'cover', width: '100%' }}
                />
              }
            >
              <Meta
                title={product.name}
                description={`Giá: ${formatPrice(product.salePrice)}`}
                style={{ textAlign: 'center', fontFamily: 'monospace' }}
              />
            </Card>
          );
        })}
      </div>

      <Button
        icon={<LeftOutlined />}
        onClick={scrollLeft}
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          transform: 'translateY(-50%)',
          zIndex: 1,
          backgroundColor: '#fff',
          borderColor: '#d9d9d9',
        }}
      />

      <Button
        icon={<RightOutlined />}
        onClick={scrollRight}
        style={{
          position: 'absolute',
          top: '50%',
          right: 0,
          transform: 'translateY(-50%)',
          zIndex: 1,
          backgroundColor: '#fff',
          borderColor: '#d9d9d9',
        }}
      />
    </div>
  );
};

export default SuggestedProducts;