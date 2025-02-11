import React from "react";
import PropTypes from "prop-types";
import "../HomePage/style.scss";
// import ImageProduct from '../assets/images/NewImageProduct.png'
import newImageProduct from "../../assets/images/adidas_new_product (1).webp";

function HomePage(props) {
  return (
    <div style={{}} className="wrapper">
      <section className="wrapper__home">
        <div className="wrapper__home__content">
          <h1>Bước Chạy Đột Phá</h1>
          <h3>Giới Hạn Là Không Giới Hạn!</h3>
          <p>
            Trải nghiệm bộ sưu tập giày Adidas mới nhất – kết hợp công nghệ tiên
            tiến với phong cách hiện đại. Nhẹ hơn, bền hơn, giúp bạn bứt phá
            trên mọi chặng đường.
          </p>
          <a href="products" className="wrapper__home__content__button">
            KHÁM PHÁ NGAY
          </a>
        </div>

        <div className="wrapper__home__image">
          <div className="wrapper__home__image__rhombus">
            <img src={newImageProduct} alt="Detroit Watch Model 2" />
            {/* <img src="https://via.placeholder.com/1920x1080" alt="Car Dealing Experian" /> */}
          </div>
        </div>

        <div className="wrapper__home__rhombus2"></div>
      </section>
    </div>
  );
}

HomePage.propTypes = {};

export default HomePage;
