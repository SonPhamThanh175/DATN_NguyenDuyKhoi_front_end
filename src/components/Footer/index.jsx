import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h3>SẢN PHẨM</h3>
          <ul>
            <li>Giày</li>
            <li>Quần áo</li>
            <li>Phụ kiện</li>
            <li>Hàng Mới Về</li>
            <li>Release Dates</li>
            <li>Top Sellers</li>
            <li>Member exclusives</li>
            <li>Outlet</li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>THỂ THAO</h3>
          <ul>
            <li>Chạy</li>
            <li>Đánh gôn</li>
            <li>Gym & Training</li>
            <li>Bóng đá</li>
            <li>Bóng Rổ</li>
            <li>Quần vợt</li>
            <li>Ngoài trời</li>
            <li>Bơi lội</li>
            <li>Motorsport</li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>BỘ SƯU TẬP</h3>
          <ul>
            <li>Pharrell Williams</li>
            <li>Ultra Boost</li>
            <li>Pureboost</li>
            <li>Predator</li>
            <li>Superstar</li>
            <li>Stan Smith</li>
            <li>NMD</li>
            <li>Adicolor</li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>THÔNG TIN VỀ CÔNG TY</h3>
          <ul>
            <li>Giới Thiệu Về Chúng Tôi</li>
            <li>Cơ Hội Nghề Nghiệp</li>
            <li>Tin tức</li>
            <li>adidas stories</li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>HỖ TRỢ</h3>
          <ul>
            <li>Trợ Giúp</li>
            <li>Công cụ tìm kiếm cửa hàng</li>
            <li>Biểu Đồ Kích Cỡ</li>
            <li>Thanh toán</li>
            <li>Giao hàng</li>
            <li>Trả Hàng & Hoàn Tiền</li>
            <li>Khuyến mãi</li>
            <li>Sơ đồ trang web</li>
            <li>Trợ Giúp Dịch Vụ Khách Hàng</li>
          </ul>
        </div>
        <div className="footer-column social-media">
          <h3>THEO DÕI CHÚNG TÔI</h3>
          <div className="social-icons">
            <span>🔵</span>
            <span>🔵</span>
            <span>🔵</span>
            <span>🔵</span>
            <span>🔵</span>
            <span>🔵</span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Cài Đặt Cookie | Chính sách Bảo mật | Điều Khoản và Điều Kiện | XUẤT BẢN BỞI | © 2020 Công ty TNHH adidas Việt Nam</p>
      </div>
    </footer>
  );
};

export default Footer;