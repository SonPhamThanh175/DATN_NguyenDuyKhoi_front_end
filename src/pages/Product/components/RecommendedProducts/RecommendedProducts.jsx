import { useState, useEffect, useRef } from "react"
import { Card, Typography, Tag, Spin, Badge, Image, Divider, Empty, Button } from "antd"
import { LeftOutlined, RightOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"

const { Title, Text } = Typography

const RecommendedProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const containerRef = useRef(null)
  const userId = localStorage.getItem("userId")
  const navigate = useNavigate()

  const handleCardClick = (productId) => {
    navigate(`/products/${productId}`)
  }

  useEffect(() => {
    const fetchRecommendedProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch(`http://localhost:5000/api/recommendations/${userId}`)

        if (!response.ok) {
          throw new Error("Failed to fetch recommended products")
        }

        const data = await response.json()
        setProducts(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendedProducts()
  }, [])

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price)
  }

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      })
    }
  }

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      })
    }
  }

  if (loading) {
    return (
      <div className="adidas-loading-container" style={{ textAlign: "center", padding: "40px" }}>
        <Spin size="large" />
        <Text className="adidas-loading-text" style={{ display: "block", marginTop: "16px" }}>
          ĐANG TẢI SẢN PHẨM...
        </Text>
      </div>
    )
  }

  if (error) {
    return (
      <div className="adidas-error-container" style={{ textAlign: "center", padding: "40px" }}>
        <Text type="danger" className="adidas-error-text" style={{ fontSize: "16px" }}>
          {error}
        </Text>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="adidas-empty-container" style={{ textAlign: "center", padding: "40px" }}>
        <Empty description="Không tìm thấy sản phẩm gợi ý" />
      </div>
    )
  }

  return (
    <div className="adidas-products-section" style={{ position: "relative", margin: "20px 0" }}>
      <Title level={2} className="adidas-section-title" style={{ textAlign: "center", marginBottom: "16px" }}>
        NHỮNG NGƯỜI KHÁC CŨNG ĐÃ MUA
      </Title>
      <Divider className="adidas-divider" style={{ margin: "16px 0 24px" }} />

      <div style={{ position: "relative" }}>
        <Button
          icon={<LeftOutlined />}
          onClick={scrollLeft}
          style={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            border: "1px solid #ddd",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "white",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        />

        <div
          ref={containerRef}
          style={{
            display: "flex",
            overflowX: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            padding: "10px 50px",
            scrollBehavior: "smooth",
            gap: "16px",
          }}
          className="adidas-carousel-container"
        >
          {products.map((product) => (
            <div
              key={product._id}
              style={{
                flex: "0 0 280px",
                maxWidth: "280px",
                marginRight: "16px",
              }}
            >
              <Badge.Ribbon
                text={`${Math.round((1 - product.salePrice / product.originalPrice) * 100)}% GIẢM`}
                color="black"
                style={{ display: product.salePrice < product.originalPrice ? "block" : "none" }}
              >
                <Card
                  hoverable
                  className="adidas-product-card"
                  style={{ width: "100%", height: "100%" }}
                  onClick={() => handleCardClick(product._id)}
                  cover={
                    <div style={{ height: "200px", overflow: "hidden" }}>
                      <Image
                        src={product.images[0] || "https://placeholder.pics/svg/300x300/DEDEDE/555555/Hình%20ảnh"}
                        alt={product.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        fallback="https://placeholder.pics/svg/300x300/DEDEDE/555555/Hình%20ảnh"
                        preview={{
                          visible: false,
                          images:
                            product.images.filter((img) => img).length > 0
                              ? product.images.filter((img) => img)
                              : ["https://placeholder.pics/svg/300x300/DEDEDE/555555/Hình%20ảnh"],
                        }}
                      />
                    </div>
                  }
                >
                  <div style={{ padding: "8px 0" }}>
                    <Title
                      level={5}
                      style={{
                        margin: "0 0 8px",
                        fontSize: "16px",
                        lineHeight: "1.2",
                        height: "38px",
                        overflow: "hidden",
                      }}
                    >
                      {product.name}
                    </Title>

                    <Text
                      style={{
                        display: "block",
                        margin: "0 0 12px",
                        color: "#666",
                        fontSize: "14px",
                        height: "40px",
                        overflow: "hidden",
                      }}
                    >
                      {product.description}
                    </Text>

                    <div style={{ marginBottom: "8px" }}>
                      <Text
                        delete={product.salePrice < product.originalPrice}
                        type="secondary"
                        style={{ marginRight: "8px", fontSize: "14px" }}
                      >
                        {formatPrice(product.originalPrice)}
                      </Text>
                      {product.salePrice < product.originalPrice && (
                        <Text type="danger" strong style={{ fontSize: "16px" }}>
                          {formatPrice(product.salePrice)}
                        </Text>
                      )}
                    </div>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "8px" }}>
                      {Array.isArray(product.Color) ? (
                        product.Color.map((color, index) => (
                          <Tag key={index} style={{ margin: "0" }}>
                            {color}
                          </Tag>
                        ))
                      ) : (
                        <Tag style={{ margin: "0" }}>{product.Color}</Tag>
                      )}
                    </div>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "8px" }}>
                      {Array.isArray(product.size) ? (
                        product.size.map((size, index) => (
                          <Tag key={index} style={{ margin: "0" }}>
                            {size}
                          </Tag>
                        ))
                      ) : (
                        <Tag style={{ margin: "0" }}>{product.size}</Tag>
                      )}
                    </div>

                    <div>
                      <Text type={product.quantity > 0 ? "success" : "danger"} style={{ fontSize: "14px" }}>
                        {product.quantity > 0 ? `Còn hàng: ${product.quantity}` : "Hết hàng"}
                      </Text>
                    </div>
                  </div>
                </Card>
              </Badge.Ribbon>
            </div>
          ))}
        </div>

        <Button
          icon={<RightOutlined />}
          onClick={scrollRight}
          style={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            border: "1px solid #ddd",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "white",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        />
      </div>
    </div>
  )
}

export default RecommendedProducts
