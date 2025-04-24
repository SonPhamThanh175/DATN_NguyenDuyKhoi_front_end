"use client"

import { useState } from "react"

// Mock data for blog posts
const blogPosts = [
  {
    id: 1,
    title: "Cách chọn giày chạy bộ phù hợp với bàn chân của bạn",
    category: "Running",
    date: "15/05/2023",
    image:
      "https://tomaz.vn/uploads/2022/1/giay-dep-la-san-pham-noi-troi-nhat-trong-cac-dong-san-pham-den-tu-thuong-hieu-adidas-61d79e311b8a3.jpg",
    excerpt:
      "Tìm hiểu cách chọn giày chạy bộ phù hợp với kiểu bàn chân và phong cách chạy của bạn để có trải nghiệm tốt nhất.",
    author: "Minh Tuấn",
    readTime: "5 phút đọc",
    featured: true,
  },
  {
    id: 2,
    title: "Bộ sưu tập mới: Originals Summer 2023",
    category: "Originals",
    date: "02/06/2023",
    image:
      "https://tomaz.vn/uploads/2022/1/adidas-thuong-hieu-voi-hiem-hoi-dot-giam-gia-san-pham-61d79f4d25b1a.jpg",
    excerpt: "Khám phá bộ sưu tập Originals mới nhất với những thiết kế đầy phong cách cho mùa hè này.",
    author: "Thu Hà",
    readTime: "3 phút đọc",
  },
  {
    id: 3,
    title: "Hướng dẫn bảo quản giày thể thao đúng cách",
    category: "Lifestyle",
    date: "20/05/2023",
    image:
      "https://tomaz.vn/uploads/2022/1/mot-trong-nhung-cua-hang-ban-le-trong-chuoi-phan-phoi-cua-adidas-61d79f9d9c473.jpg",
    excerpt: "Những mẹo đơn giản giúp giày thể thao của bạn luôn như mới và kéo dài tuổi thọ sử dụng.",
    author: "Văn Đức",
    readTime: "7 phút đọc",
  },
  {
    id: 4,
    title: "Phỏng vấn độc quyền với Sơn Tùng M-TP về bộ sưu tập giới hạn",
    category: "Collaborations",
    date: "10/06/2023",
    image:
      "https://tomaz.vn/uploads/2022/1/chien-luoc-marketing-sang-tao-va-day-nang-luong-cua-adidas-61d7a0097fe70.jpg",
    excerpt: "Trò chuyện cùng Sơn Tùng M-TP về cảm hứng đằng sau bộ sưu tập giới hạn mới nhất của anh.",
    author: "Thanh Huyền",
    readTime: "10 phút đọc",
  },
  {
    id: 5,
    title: "5 bài tập cardio hiệu quả bạn có thể thực hiện tại nhà",
    category: "Training",
    date: "05/06/2023",
    image:
      "https://statics.vincom.com.vn/vincom-ho/image7-1668481316.png",
    excerpt: "Những bài tập cardio đơn giản nhưng hiệu quả giúp bạn duy trì vóc dáng ngay tại nhà.",
    author: "Hồng Nhung",
    readTime: "6 phút đọc",
  },
  {
    id: 6,
    title: "Lịch sử phát triển của dòng giày Superstar",
    category: "Originals",
    date: "28/05/2023",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsN20m49JQpBCRdvlYk0YXtg8s8_ksx2O4Ww&s",
    excerpt: "Hành trình từ sân bóng rổ đến biểu tượng văn hóa đường phố của dòng giày Superstar huyền thoại.",
    author: "Quang Minh",
    readTime: "8 phút đọc",
  },
  {
    id: 7,
    title: "Cách phối đồ thể thao cho ngày hè năng động",
    category: "Lifestyle",
    date: "12/06/2023",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9R4LAbSreY8BfakazbGYOcd9c4qw2M-t7-A&s",
    excerpt: "Những gợi ý phối đồ thể thao vừa thoải mái vừa phong cách cho những ngày hè năng động.",
    author: "Minh Anh",
    readTime: "4 phút đọc",
  },
  {
    id: 8,
    title: "Công nghệ Boost: Cuộc cách mạng trong thiết kế đế giày",
    category: "Technology",
    date: "01/06/2023",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFwFU5diZQlDDkcyEEOPLnV5X5--8lV4_HLw&s",
    excerpt: "Tìm hiểu về công nghệ Boost đột phá đã thay đổi ngành công nghiệp giày thể thao như thế nào.",
    author: "Đức Thành",
    readTime: "9 phút đọc",
  },
]

// Categories for filter
const categories = ["Tất cả", "Running", "Originals", "Lifestyle", "Training", "Collaborations", "Technology"]

// Popular tags
const popularTags = [
  "Ultraboost",
  "Originals",
  "Superstar",
  "Running",
  "Stan Smith",
  "NMD",
  "Workout",
  "Sustainable",
  "Forum",
  "Samba",
]

// SVG Icons
const SearchIcon = () => (
  <svg
    style={{ width: "20px", height: "20px" }}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
)

const ClockIcon = () => (
  <svg
    style={{ width: "16px", height: "16px", marginRight: "4px" }}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
)

const UserIcon = () => (
  <svg
    style={{ width: "16px", height: "16px", marginRight: "4px" }}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
)

const CalendarIcon = () => (
  <svg
    style={{ width: "16px", height: "16px", marginRight: "4px" }}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
)

const ArrowRightIcon = () => (
  <svg
    style={{ width: "20px", height: "20px", marginLeft: "8px" }}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
)

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState("Tất cả")
  const [searchQuery, setSearchQuery] = useState("")

  // Filter posts based on active category and search query
  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = activeCategory === "Tất cả" || post.category === activeCategory
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Get featured post
  const featuredPost = blogPosts.find((post) => post.featured)

  // Get popular posts (just using the first 3 for this example)
  const popularPosts = blogPosts.slice(0, 3)

  // Styles
  const styles = {
    // Container
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 16px",
      fontFamily: "Helvetica, Arial, sans-serif",
    },

    // Header
    header: {
      padding: "40px 0 20px",
      textAlign: "center",
    },
    headerTitle: {
      fontSize: "36px",
      fontWeight: "700",
      marginBottom: "16px",
      color: "#000",
    },
    headerSubtitle: {
      fontSize: "18px",
      color: "#666",
      maxWidth: "600px",
      margin: "0 auto",
      lineHeight: "1.5",
    },

    // Search bar
    searchContainer: {
      display: "flex",
      maxWidth: "600px",
      margin: "32px auto",
      position: "relative",
    },
    searchInput: {
      width: "100%",
      padding: "14px 20px",
      fontSize: "16px",
      border: "1px solid #e5e5e5",
      borderRadius: "30px",
      outline: "none",
      transition: "border-color 0.2s, box-shadow 0.2s",
    },
    searchButton: {
      position: "absolute",
      right: "12px",
      top: "50%",
      transform: "translateY(-50%)",
      background: "none",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#000",
    },

    // Categories
    categoriesContainer: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "12px",
      margin: "32px 0",
    },
    categoryButton: {
      padding: "8px 16px",
      borderRadius: "20px",
      border: "1px solid #e5e5e5",
      background: "white",
      fontSize: "14px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.2s",
    },
    categoryButtonActive: {
      background: "#000",
      color: "#fff",
      borderColor: "#000",
    },

    // Featured post
    featuredSection: {
      marginBottom: "48px",
    },
    featuredPost: {
      position: "relative",
      borderRadius: "12px",
      overflow: "hidden",
      height: "500px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    },
    featuredImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    featuredOverlay: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)",
      padding: "32px",
      color: "white",
    },
    featuredCategory: {
      display: "inline-block",
      padding: "6px 12px",
      background: "white",
      color: "black",
      borderRadius: "4px",
      fontSize: "12px",
      fontWeight: "600",
      marginBottom: "16px",
    },
    featuredTitle: {
      fontSize: "32px",
      fontWeight: "700",
      marginBottom: "16px",
      lineHeight: "1.2",
    },
    featuredMeta: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
      fontSize: "14px",
      opacity: "0.9",
    },
    featuredMetaItem: {
      display: "flex",
      alignItems: "center",
    },
    featuredExcerpt: {
      marginTop: "16px",
      fontSize: "16px",
      lineHeight: "1.6",
      opacity: "0.9",
    },
    featuredButton: {
      display: "inline-flex",
      alignItems: "center",
      marginTop: "24px",
      color: "white",
      fontWeight: "600",
      fontSize: "16px",
      cursor: "pointer",
      background: "none",
      border: "none",
      padding: "0",
    },

    // Main content
    mainContent: {
      display: "flex",
      gap: "32px",
      flexWrap: "wrap",
    },
    postsContainer: {
      flex: "1 1 700px",
    },
    sidebar: {
      flex: "1 1 300px",
    },

    // Blog posts grid
    postsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "24px",
      marginBottom: "48px",
    },
    postCard: {
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
      transition: "transform 0.3s, box-shadow 0.3s",
      background: "white",
    },
    postCardHover: {
      transform: "translateY(-5px)",
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
    },
    postImage: {
      width: "100%",
      height: "200px",
      objectFit: "cover",
    },
    postContent: {
      padding: "20px",
    },
    postCategory: {
      display: "inline-block",
      padding: "4px 8px",
      background: "#f5f5f5",
      borderRadius: "4px",
      fontSize: "12px",
      fontWeight: "600",
      marginBottom: "12px",
      color: "#333",
    },
    postTitle: {
      fontSize: "18px",
      fontWeight: "700",
      marginBottom: "12px",
      lineHeight: "1.3",
      color: "#000",
    },
    postMeta: {
      display: "flex",
      flexWrap: "wrap",
      gap: "12px",
      fontSize: "12px",
      color: "#666",
      marginBottom: "12px",
    },
    postMetaItem: {
      display: "flex",
      alignItems: "center",
    },
    postExcerpt: {
      fontSize: "14px",
      lineHeight: "1.5",
      color: "#666",
      marginBottom: "16px",
    },
    postReadMore: {
      display: "inline-flex",
      alignItems: "center",
      color: "#000",
      fontWeight: "600",
      fontSize: "14px",
      textDecoration: "none",
      borderBottom: "2px solid #000",
      paddingBottom: "2px",
    },

    // Load more button
    loadMoreContainer: {
      textAlign: "center",
      margin: "32px 0 48px",
    },
    loadMoreButton: {
      padding: "12px 24px",
      background: "#000",
      color: "#fff",
      border: "none",
      borderRadius: "30px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "background-color 0.2s",
    },

    // Sidebar
    sidebarSection: {
      marginBottom: "32px",
      background: "white",
      borderRadius: "8px",
      padding: "24px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
    },
    sidebarTitle: {
      fontSize: "20px",
      fontWeight: "700",
      marginBottom: "20px",
      paddingBottom: "12px",
      borderBottom: "1px solid #eee",
      color: "#000",
    },
    popularPostItem: {
      display: "flex",
      gap: "12px",
      marginBottom: "16px",
      padding: "8px 0",
      borderBottom: "1px solid #f5f5f5",
    },
    popularPostImage: {
      width: "80px",
      height: "80px",
      borderRadius: "4px",
      objectFit: "cover",
    },
    popularPostContent: {
      flex: "1",
    },
    popularPostTitle: {
      fontSize: "14px",
      fontWeight: "600",
      marginBottom: "4px",
      color: "#000",
      lineHeight: "1.3",
    },
    popularPostMeta: {
      fontSize: "12px",
      color: "#666",
    },

    // Tags
    tagsContainer: {
      display: "flex",
      flexWrap: "wrap",
      gap: "8px",
    },
    tag: {
      padding: "6px 12px",
      background: "#f5f5f5",
      borderRadius: "20px",
      fontSize: "12px",
      color: "#333",
      cursor: "pointer",
      transition: "background-color 0.2s",
    },
    tagHover: {
      background: "#e5e5e5",
    },

    // Newsletter
    newsletterForm: {
      marginTop: "16px",
    },
    newsletterInput: {
      width: "100%",
      padding: "12px 16px",
      borderRadius: "4px",
      border: "1px solid #e5e5e5",
      marginBottom: "12px",
      fontSize: "14px",
    },
    newsletterButton: {
      width: "100%",
      padding: "12px 16px",
      background: "#000",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      fontSize: "14px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "background-color 0.2s",
    },

    // Footer
    footer: {
      borderTop: "1px solid #eee",
      padding: "32px 0",
      textAlign: "center",
      color: "#666",
      fontSize: "14px",
    },
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>BLOG</h1>
        <p style={styles.headerSubtitle}>
          Khám phá những xu hướng mới nhất, câu chuyện thú vị và lời khuyên hữu ích từ thế giới thể thao và thời trang.
        </p>

        {/* Search bar */}
        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Tìm kiếm bài viết..."
            style={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button style={styles.searchButton}>
            <SearchIcon />
          </button>
        </div>

        {/* Categories */}
        <div style={styles.categoriesContainer}>
          {categories.map((category) => (
            <button
              key={category}
              style={{
                ...styles.categoryButton,
                ...(activeCategory === category ? styles.categoryButtonActive : {}),
              }}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </header>

      {/* Featured post */}
      {featuredPost && (
        <section style={styles.featuredSection}>
          <div style={styles.featuredPost}>
            <img src={featuredPost.image || "/placeholder.svg"} alt={featuredPost.title} style={styles.featuredImage} />
            <div style={styles.featuredOverlay}>
              <span style={styles.featuredCategory}>{featuredPost.category}</span>
              <h2 style={styles.featuredTitle}>{featuredPost.title}</h2>
              <div style={styles.featuredMeta}>
                <span style={styles.featuredMetaItem}>
                  <UserIcon />
                  {featuredPost.author}
                </span>
                <span style={styles.featuredMetaItem}>
                  <CalendarIcon />
                  {featuredPost.date}
                </span>
                <span style={styles.featuredMetaItem}>
                  <ClockIcon />
                  {featuredPost.readTime}
                </span>
              </div>
              <p style={styles.featuredExcerpt}>{featuredPost.excerpt}</p>
              <button style={styles.featuredButton}>
                Đọc tiếp
                <ArrowRightIcon />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Main content */}
      <div style={styles.mainContent}>
        {/* Posts grid */}
        <div style={styles.postsContainer}>
          <div style={styles.postsGrid}>
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                style={styles.postCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)"
                  e.currentTarget.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.1)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "none"
                  e.currentTarget.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.05)"
                }}
              >
                <img src={post.image || "/placeholder.svg"} alt={post.title} style={styles.postImage} />
                <div style={styles.postContent}>
                  <span style={styles.postCategory}>{post.category}</span>
                  <h3 style={styles.postTitle}>{post.title}</h3>
                  <div style={styles.postMeta}>
                    <span style={styles.postMetaItem}>
                      <UserIcon />
                      {post.author}
                    </span>
                    <span style={styles.postMetaItem}>
                      <CalendarIcon />
                      {post.date}
                    </span>
                    <span style={styles.postMetaItem}>
                      <ClockIcon />
                      {post.readTime}
                    </span>
                  </div>
                  <p style={styles.postExcerpt}>{post.excerpt}</p>
                  <a href="#" style={styles.postReadMore}>
                    Đọc tiếp
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Load more button */}
          <div style={styles.loadMoreContainer}>
            <button
              style={styles.loadMoreButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#333"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#000"
              }}
            >
              Xem thêm bài viết
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div style={styles.sidebar}>
          {/* Popular posts */}
          <div style={styles.sidebarSection}>
            <h3 style={styles.sidebarTitle}>Bài viết phổ biến</h3>
            {popularPosts.map((post) => (
              <div key={post.id} style={styles.popularPostItem}>
                <img src={post.image || "/placeholder.svg"} alt={post.title} style={styles.popularPostImage} />
                <div style={styles.popularPostContent}>
                  <h4 style={styles.popularPostTitle}>{post.title}</h4>
                  <div style={styles.popularPostMeta}>
                    <span style={styles.postMetaItem}>
                      <CalendarIcon />
                      {post.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div style={styles.sidebarSection}>
            <h3 style={styles.sidebarTitle}>Tags phổ biến</h3>
            <div style={styles.tagsContainer}>
              {popularTags.map((tag) => (
                <span
                  key={tag}
                  style={styles.tag}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#e5e5e5"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#f5f5f5"
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div style={styles.sidebarSection}>
            <h3 style={styles.sidebarTitle}>Đăng ký nhận tin</h3>
            <p style={{ fontSize: "14px", color: "#666", marginBottom: "16px" }}>
              Nhận thông tin mới nhất về sản phẩm, khuyến mãi và tin tức thể thao.
            </p>
            <form style={styles.newsletterForm}>
              <input type="email" placeholder="Email của bạn" style={styles.newsletterInput} required />
              <button
                type="submit"
                style={styles.newsletterButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#333"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#000"
                }}
              >
                Đăng ký
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>© 2023 Adidas Clone. Tất cả các quyền được bảo lưu.</p>
      </footer>
    </div>
  )
}

export default BlogPage
