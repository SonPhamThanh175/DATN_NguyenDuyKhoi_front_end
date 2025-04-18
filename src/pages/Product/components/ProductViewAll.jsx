// import React, { useEffect, useMemo, useState } from 'react';
// import PropTypes from 'prop-types';
// import Banner from '../../../components/Banner';
// import ProductList from './ProductList';
// import { Pagination } from 'antd';
// import ProductClear from './ProductClear';
// import { useLocation, useNavigate } from 'react-router-dom';
// import queryString from 'query-string';
// import productsApi from '../../../api/productApi';
// import Banner2 from '../../../components/Banner2';
// import axios from 'axios';

// function ProductViewAll(props) {
//     const [productList, setProductList] = useState([]);
//     const [totalProducts, setTotalProducts] = useState(0);
//     const navigate = useNavigate();
//     const location = useLocation();

//     const queryParams = useMemo(() => {
//         const params = queryString.parse(location.search);
//         return {
//             ...params,
//             _page: Number.parseInt(params._page) || 1,
//             _limit: Number.parseInt(params._limit) || 16,
//             _sort: params._sort || 'asc',
//         };
//     }, [location.search]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const data = await axios.get('http://localhost:5000/api/products/get-all')
//                 console.log(data);
//                 setProductList(data.data);
//                 setTotalProducts(data.totalProducts);
//             } catch (error) {
//                 console.log('Failed to get all products:', error);
//             }
//         };
//         fetchData();
//     }, [queryParams]);
//     const handleFiltersChange = (newFilters) => {
//         const filters = {
//             ...queryParams,
//             ...newFilters,
//         };

//         navigate({
//             pathname: location.pathname,
//             search: queryString.stringify(filters),
//         });
//     };
//     return (
//         <div marginTop='200px'>
//             <Banner />
//             <div style={{ padding: '50px' }}>
//             {productList && productList.length > 0 ? (
//                 <>
//                     <ProductList data={productList} />
//                     <Pagination
//                         className='custom-pagination'
//                         align='center'
//                         current={Number.parseInt(queryParams._page)}
//                         total={totalProducts}
//                         pageSize={queryParams._limit}
//                         onChange={(page) => handleFiltersChange({ _page: page })}
//                     />
//                 </>
//             ) : (
//                 <ProductClear />
//             )}
//             </div>
//             <div style={{ padding: '150px' }}>
//             <Banner2 />
//             </div>
//         </div>
//     );
// }

// ProductViewAll.propTypes = {};

// export default ProductViewAll;

import React, { useEffect, useState } from 'react';
import Banner from '../../../components/Banner';
import ProductList from './ProductList';
import ProductClear from './ProductClear';
import Banner2 from '../../../components/Banner2';
import axios from 'axios';
import { Button } from 'antd';
import SloganSimple from '../../../components/SloganSimple';

function ProductViewAll(props) {
    const [allProducts, setAllProducts] = useState([]);
    const [visibleCount, setVisibleCount] = useState(16); // số sản phẩm đang hiển thị

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products/get-all');
                setAllProducts(response.data); // giả sử trả về mảng
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
                                        backgroundColor: 'black',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: 0,
                                        padding: '8px 24px',
                                        fontWeight: 'bold',
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
        </div>
    );
}

export default ProductViewAll;
