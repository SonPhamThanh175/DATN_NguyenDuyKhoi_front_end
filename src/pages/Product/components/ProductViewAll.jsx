import React, { useEffect, useState } from 'react';
import Banner from '../../../components/Banner';
import ProductList from './ProductList';
import ProductClear from './ProductClear';
import Banner2 from '../../../components/Banner2';
import axios from 'axios';
import { Button } from 'antd';
import SloganSimple from '../../../components/SloganSimple';
import MembershipBanner from '../../../components/MembershipBanner';

function ProductViewAll(props) {
    const [allProducts, setAllProducts] = useState([]);
    const [visibleCount, setVisibleCount] = useState(16); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products/get-all');
                console.log("response",response);
                
                setAllProducts(response.data); 
            } catch (error) {
                console.log('Failed to fetch products:', error);
            }
        };
        fetchData();
    }, []);

    // Lấy danh sách sản phẩm hiển thị dựa theo visibleCount
    const visibleProducts = allProducts.slice(0, visibleCount);

    // Xử lý khi bấm "Xem thêm"
    const handleViewMore = () => {
        setVisibleCount((prev) => prev + 16);
    };

    return (
        <div marginTop='200px'>
            <Banner />
            <div style={{ padding: '50px' }}>
                {visibleProducts.length > 0 ? (
                    <>
                        <ProductList data={visibleProducts} />
                        {visibleCount < allProducts.length && (
                            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                <Button
                                    onClick={handleViewMore}
                                    style={{
                                        padding: "12px 24px",
                                        background: "#000",
                                        color: "#fff",
                                        border: "none",
                                        borderRadius: "30px",
                                        fontSize: "16px",
                                        fontWeight: "600",
                                        cursor: "pointer",
                                        transition: "background-color 0.2s",
                                    }}
                                >
                                    Xem thêm
                                </Button>
                            </div>
                        )}
                    </>
                ) : (
                    <ProductClear />
                )}
            </div>
            <div style={{ padding: '150px' }}>
                <Banner2 />
            </div>

            <div style={{ padding: '0px 540px 50px 140px' }}>
                <SloganSimple />
            </div>
            <MembershipBanner />
            
        </div>
    );
}

export default ProductViewAll;
