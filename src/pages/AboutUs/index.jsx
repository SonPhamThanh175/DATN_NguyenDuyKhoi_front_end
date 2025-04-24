"use client"

// SVG Icons
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

const CheckIcon = () => (
  <svg
    style={{ width: "20px", height: "20px", marginRight: "8px" }}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
)

const GlobeIcon = () => (
  <svg
    style={{ width: "24px", height: "24px", marginBottom: "16px" }}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
)

const UsersIcon = () => (
  <svg
    style={{ width: "24px", height: "24px", marginBottom: "16px" }}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
)

const StoreIcon = () => (
  <svg
    style={{ width: "24px", height: "24px", marginBottom: "16px" }}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
)

const LeafIcon = () => (
  <svg
    style={{ width: "24px", height: "24px", marginBottom: "16px" }}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"></path>
    <line x1="4" y1="21" x2="20" y2="21"></line>
  </svg>
)

// Timeline component
const TimelineItem = ({ year, title, description, isLast = false }) => {
  const styles = {
    container: {
      display: "flex",
      marginBottom: isLast ? 0 : "32px",
      position: "relative",
    },
    yearContainer: {
      width: "120px",
      flexShrink: 0,
      paddingRight: "24px",
      position: "relative",
    },
    year: {
      fontSize: "24px",
      fontWeight: "700",
      color: "#000",
    },
    line: {
      position: "absolute",
      top: "40px",
      bottom: isLast ? "0" : "-32px",
      right: "12px",
      width: "2px",
      background: isLast ? "linear-gradient(to bottom, #000 50%, transparent 50%)" : "#000",
    },
    dot: {
      position: "absolute",
      top: "12px",
      right: "6px",
      width: "14px",
      height: "14px",
      borderRadius: "50%",
      backgroundColor: "#000",
    },
    content: {
      flex: 1,
    },
    title: {
      fontSize: "18px",
      fontWeight: "600",
      marginBottom: "8px",
      color: "#000",
    },
    description: {
      fontSize: "16px",
      lineHeight: "1.6",
      color: "#555",
    },
  }

  return (
    <div style={styles.container}>
      <div style={styles.yearContainer}>
        <div style={styles.year}>{year}</div>
        <div style={styles.line}></div>
        <div style={styles.dot}></div>
      </div>
      <div style={styles.content}>
        <h3 style={styles.title}>{title}</h3>
        <p style={styles.description}>{description}</p>
      </div>
    </div>
  )
}

// Stats component
const StatItem = ({ number, label, icon }) => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      padding: "24px",
    },
    number: {
      fontSize: "48px",
      fontWeight: "700",
      marginBottom: "8px",
      color: "#000",
    },
    label: {
      fontSize: "16px",
      color: "#555",
    },
  }

  return (
    <div style={styles.container}>
      {icon}
      <div style={styles.number}>{number}</div>
      <div style={styles.label}>{label}</div>
    </div>
  )
}

// Value component
const ValueItem = ({ title, description }) => {
  const styles = {
    container: {
      marginBottom: "24px",
    },
    title: {
      fontSize: "18px",
      fontWeight: "600",
      marginBottom: "8px",
      display: "flex",
      alignItems: "center",
      color: "#000",
    },
    description: {
      fontSize: "16px",
      lineHeight: "1.6",
      color: "#555",
      paddingLeft: "28px",
    },
  }

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>
        <CheckIcon />
        {title}
      </h3>
      <p style={styles.description}>{description}</p>
    </div>
  )
}

// Team member component
const TeamMember = ({ name, position, image }) => {
  const styles = {
    container: {
      textAlign: "center",
    },
    imageContainer: {
      width: "200px",
      height: "200px",
      borderRadius: "50%",
      overflow: "hidden",
      margin: "0 auto 16px",
      border: "1px solid #eee",
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    name: {
      fontSize: "18px",
      fontWeight: "600",
      marginBottom: "4px",
      color: "#000",
    },
    position: {
      fontSize: "14px",
      color: "#666",
    },
  }

  return (
    <div style={styles.container}>
      <div style={styles.imageContainer}>
        <img src={image || "/placeholder.svg?height=200&width=200"} alt={name} style={styles.image} />
      </div>
      <h3 style={styles.name}>{name}</h3>
      <p style={styles.position}>{position}</p>
    </div>
  )
}

// Main component
const AboutUs = () => {
  // Timeline data
  const timelineData = [
    {
      year: "1949",
      title: "Sự ra đời của Adidas",
      description:
        "Adi Dassler chính thức đăng ký thương hiệu Adidas, bắt đầu hành trình của một trong những thương hiệu thể thao lớn nhất thế giới.",
    },
    {
      year: "1954",
      title: "Chiến thắng World Cup",
      description:
        "Đội tuyển Đức mang giày Adidas với đinh tháo rời đã giành chiến thắng tại World Cup, đánh dấu cột mốc quan trọng cho thương hiệu.",
    },
    {
      year: "1967",
      title: "Tracksuit đầu tiên",
      description:
        "Adidas giới thiệu bộ tracksuit đầu tiên, mở đầu cho xu hướng trang phục thể thao trong đời sống hàng ngày.",
    },
    {
      year: "1972",
      title: "Logo ba lá",
      description: "Logo Trefoil (ba lá) ra đời, trở thành biểu tượng nhận diện mạnh mẽ của Adidas Originals sau này.",
    },
    {
      year: "1996",
      title: "Công nghệ Torsion",
      description:
        "Adidas giới thiệu công nghệ Torsion, cải tiến đột phá trong thiết kế đế giày, cung cấp sự hỗ trợ và linh hoạt tối ưu.",
    },
    {
      year: "2013",
      title: "Công nghệ Boost",
      description:
        "Ra mắt công nghệ đệm Boost cách mạng, mang lại sự thoải mái và phản hồi năng lượng vượt trội cho người dùng.",
    },
    {
      year: "2015",
      title: "Parley for the Oceans",
      description:
        "Adidas hợp tác với Parley for the Oceans, sản xuất giày từ rác thải nhựa đại dương, khởi đầu cho cam kết bền vững.",
    },
    {
      year: "2023",
      title: "Phát triển bền vững",
      description:
        "Adidas tiếp tục đẩy mạnh các sáng kiến bền vững, với mục tiêu sử dụng 100% polyester tái chế vào năm 2024.",
    },
  ]

  // Values data
  const valuesData = [
    {
      title: "Hiệu suất",
      description:
        "Chúng tôi luôn đặt hiệu suất lên hàng đầu, không ngừng đổi mới để tạo ra những sản phẩm giúp vận động viên đạt được thành tích tốt nhất.",
    },
    {
      title: "Đam mê",
      description:
        "Niềm đam mê thể thao và sự sáng tạo là động lực thúc đẩy mọi quyết định và hành động của chúng tôi.",
    },
    {
      title: "Chính trực",
      description:
        "Chúng tôi hoạt động với sự trung thực, minh bạch và tôn trọng trong mọi mối quan hệ với đối tác, khách hàng và cộng đồng.",
    },
    {
      title: "Đa dạng",
      description:
        "Chúng tôi tôn trọng và đề cao sự đa dạng, tạo ra một môi trường nơi mọi người đều có thể là chính mình và phát huy hết tiềm năng.",
    },
    {
      title: "Bền vững",
      description:
        "Chúng tôi cam kết giảm thiểu tác động đến môi trường và đóng góp tích cực cho cộng đồng thông qua các sáng kiến bền vững.",
    },
  ]

  // Team data
  const teamData = [
    {
      name: "Kasper Rorsted",
      position: "CEO",
      image: "data:image/jpeg;base64,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",
    },
    {
      name: "Roland Auschel",
      position: "Global Sales",
      image: "data:image/jpeg;base64,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",
    },
    {
      name: "Brian Grevy",
      position: "Global Brands",
      image: "data:image/jpeg;base64,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",
    },
    {
      name: "Harm Ohlmeyer",
      position: "CFO",
      image: "data:image/jpeg;base64,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",
    },
  ]

  // Styles
  const styles = {
    // Container
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 16px",
      fontFamily: "Helvetica, Arial, sans-serif",
    },

    // Hero section
    hero: {
      position: "relative",
      height: "600px",
      marginBottom: "64px",
      overflow: "hidden",
    },
    heroImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      filter: "brightness(0.7)",
    },
    heroContent: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      textAlign: "center",
      color: "white",
      width: "90%",
      maxWidth: "800px",
    },
    heroTitle: {
      fontSize: "64px",
      fontWeight: "700",
      marginBottom: "16px",
      textTransform: "uppercase",
    },
    heroSubtitle: {
      fontSize: "24px",
      fontWeight: "300",
      marginBottom: "32px",
      lineHeight: "1.4",
    },
    heroButton: {
      display: "inline-flex",
      alignItems: "center",
      padding: "12px 24px",
      backgroundColor: "white",
      color: "black",
      border: "none",
      borderRadius: "30px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "background-color 0.2s, transform 0.2s",
    },

    // Section styles
    section: {
      marginBottom: "80px",
    },
    sectionTitle: {
      fontSize: "36px",
      fontWeight: "700",
      marginBottom: "16px",
      textAlign: "center",
      color: "#000",
    },
    sectionSubtitle: {
      fontSize: "18px",
      textAlign: "center",
      maxWidth: "800px",
      margin: "0 auto 48px",
      lineHeight: "1.6",
      color: "#555",
    },

    // Mission section
    missionContainer: {
      display: "flex",
      flexWrap: "wrap",
      gap: "32px",
      alignItems: "center",
    },
    missionImage: {
      flex: "1 1 400px",
      height: "400px",
      objectFit: "cover",
      borderRadius: "8px",
    },
    missionContent: {
      flex: "1 1 400px",
    },
    missionTitle: {
      fontSize: "28px",
      fontWeight: "700",
      marginBottom: "16px",
      color: "#000",
    },
    missionText: {
      fontSize: "16px",
      lineHeight: "1.8",
      color: "#555",
      marginBottom: "24px",
    },

    // Timeline section
    timelineContainer: {
      maxWidth: "800px",
      margin: "0 auto",
      padding: "32px 0",
    },

    // Values section
    valuesContainer: {
      display: "flex",
      flexWrap: "wrap",
      gap: "32px",
      alignItems: "center",
    },
    valuesImage: {
      flex: "1 1 400px",
      height: "500px",
      objectFit: "cover",
      borderRadius: "8px",
    },
    valuesContent: {
      flex: "1 1 400px",
    },

    // Stats section
    statsContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "16px",
      backgroundColor: "#f8f8f8",
      borderRadius: "8px",
      overflow: "hidden",
    },

    // Team section
    teamContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "32px",
      margin: "0 auto",
    },

    // Sustainability section
    sustainabilityContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      backgroundColor: "#f8f8f8",
      padding: "64px 32px",
      borderRadius: "8px",
    },
    sustainabilityTitle: {
      fontSize: "28px",
      fontWeight: "700",
      marginBottom: "16px",
      color: "#000",
    },
    sustainabilityText: {
      fontSize: "16px",
      lineHeight: "1.8",
      color: "#555",
      maxWidth: "800px",
      marginBottom: "32px",
    },
    sustainabilityStats: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "48px",
      margin: "32px 0",
    },
    sustainabilityStat: {
      textAlign: "center",
    },
    sustainabilityNumber: {
      fontSize: "48px",
      fontWeight: "700",
      color: "#000",
    },
    sustainabilityLabel: {
      fontSize: "16px",
      color: "#555",
    },

    // CTA section
    ctaContainer: {
      textAlign: "center",
      padding: "64px 32px",
      backgroundColor: "#000",
      color: "white",
      borderRadius: "8px",
    },
    ctaTitle: {
      fontSize: "36px",
      fontWeight: "700",
      marginBottom: "16px",
    },
    ctaText: {
      fontSize: "18px",
      lineHeight: "1.6",
      maxWidth: "800px",
      margin: "0 auto 32px",
      opacity: "0.9",
    },
    ctaButton: {
      display: "inline-flex",
      alignItems: "center",
      padding: "14px 32px",
      backgroundColor: "white",
      color: "black",
      border: "none",
      borderRadius: "30px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "transform 0.2s",
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
      {/* Hero Section */}
      <section style={styles.hero}>
        <img
          src="https://statics.vincom.com.vn/vincom-ho/image7-1668481316.png"
          alt="Adidas Headquarters"
          style={styles.heroImage}
        />
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Về Chúng Tôi</h1>
          <p style={styles.heroSubtitle}>
            Hơn 70 năm đổi mới và sáng tạo, chúng tôi không ngừng vượt qua giới hạn để tạo ra những sản phẩm tốt nhất
            cho vận động viên trên toàn thế giới.
          </p>
          <button
            style={styles.heroButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#f0f0f0"
              e.currentTarget.style.transform = "translateY(-2px)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "white"
              e.currentTarget.style.transform = "translateY(0)"
            }}
          >
            Khám phá thêm
            <ArrowRightIcon />
          </button>
        </div>
      </section>

      {/* Mission Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Sứ mệnh của chúng tôi</h2>
        <p style={styles.sectionSubtitle}>
          Chúng tôi cam kết trở thành thương hiệu thể thao hàng đầu thế giới, không ngừng đổi mới để tạo ra những sản
          phẩm tốt nhất cho vận động viên.
        </p>

        <div style={styles.missionContainer}>
          <img
            src="https://tomaz.vn/uploads/2022/1/giay-dep-la-san-pham-noi-troi-nhat-trong-cac-dong-san-pham-den-tu-thuong-hieu-adidas-61d79e311b8a3.jpg"
            alt="Adidas Mission"
            style={styles.missionImage}
          />
          <div style={styles.missionContent}>
            <h3 style={styles.missionTitle}>Thay đổi cuộc sống thông qua thể thao</h3>
            <p style={styles.missionText}>
              Tại Adidas, chúng tôi tin rằng thể thao có sức mạnh thay đổi cuộc sống. Thể thao giữ cho tâm trí minh mẫn,
              cơ thể khỏe mạnh và tinh thần phấn chấn. Thể thao mang mọi người lại gần nhau, xây dựng cộng đồng và tạo
              ra cơ hội.
            </p>
            <p style={styles.missionText}>
              Chúng tôi cam kết tạo ra những sản phẩm đổi mới, bền vững và chất lượng cao, giúp mọi người đạt được thành
              tích tốt nhất, từ vận động viên chuyên nghiệp đến những người mới bắt đầu.
            </p>
            <p style={styles.missionText}>
              Với hơn 70 năm kinh nghiệm, chúng tôi không ngừng vượt qua giới hạn của công nghệ, thiết kế và sự sáng tạo
              để mang đến những trải nghiệm tốt nhất cho khách hàng trên toàn thế giới.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Lịch sử phát triển</h2>
        <p style={styles.sectionSubtitle}>
          Hành trình hơn 70 năm của Adidas, từ một xưởng sản xuất giày nhỏ đến thương hiệu thể thao toàn cầu.
        </p>

        <div style={styles.timelineContainer}>
          {timelineData.map((item, index) => (
            <TimelineItem
              key={index}
              year={item.year}
              title={item.title}
              description={item.description}
              isLast={index === timelineData.length - 1}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Adidas toàn cầu</h2>
        <p style={styles.sectionSubtitle}>
          Với sự hiện diện trên toàn thế giới, chúng tôi kết nối và truyền cảm hứng cho hàng triệu người mỗi ngày.
        </p>

        <div style={styles.statsContainer}>
          <StatItem number="62,000+" label="Nhân viên trên toàn thế giới" icon={<UsersIcon />} />
          <StatItem number="160+" label="Quốc gia có mặt sản phẩm" icon={<GlobeIcon />} />
          <StatItem number="2,500+" label="Cửa hàng bán lẻ" icon={<StoreIcon />} />
          <StatItem number="900M+" label="Sản phẩm sản xuất mỗi năm" icon={<LeafIcon />} />
        </div>
      </section>

      {/* Values Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Giá trị cốt lõi</h2>
        <p style={styles.sectionSubtitle}>
          Những giá trị định hướng mọi quyết định và hành động của chúng tôi, từ thiết kế sản phẩm đến trách nhiệm xã
          hội.
        </p>

        <div style={styles.valuesContainer}>
          <div style={styles.valuesContent}>
            {valuesData.map((value, index) => (
              <ValueItem key={index} title={value.title} description={value.description} />
            ))}
          </div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFwFU5diZQlDDkcyEEOPLnV5X5--8lV4_HLw&shttps://a-connection.com.vn/upload/images/Adidas-02.jpg"
            alt="Adidas Values"
            style={styles.valuesImage}
          />
        </div>
      </section>

      {/* Team Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Đội ngũ lãnh đạo</h2>
        <p style={styles.sectionSubtitle}>
          Những người dẫn dắt Adidas tiến về phía trước với tầm nhìn, đam mê và cam kết đổi mới.
        </p>

        <div style={styles.teamContainer}>
          {teamData.map((member, index) => (
            <TeamMember key={index} name={member.name} position={member.position} image={member.image} />
          ))}
        </div>
      </section>

      {/* Sustainability Section */}
      <section style={styles.section}>
        <div style={styles.sustainabilityContainer}>
          <h2 style={styles.sustainabilityTitle}>Cam kết bền vững</h2>
          <p style={styles.sustainabilityText}>
            Chúng tôi tin rằng thể thao có sức mạnh thay đổi cuộc sống và thế giới. Đó là lý do tại sao chúng tôi cam
            kết tạo ra những sản phẩm không chỉ hiệu suất cao mà còn bền vững với môi trường.
          </p>

          <div style={styles.sustainabilityStats}>
            <div style={styles.sustainabilityStat}>
              <div style={styles.sustainabilityNumber}>100%</div>
              <div style={styles.sustainabilityLabel}>Polyester tái chế vào năm 2024</div>
            </div>
            <div style={styles.sustainabilityStat}>
              <div style={styles.sustainabilityNumber}>15M+</div>
              <div style={styles.sustainabilityLabel}>Đôi giày từ rác thải đại dương</div>
            </div>
            <div style={styles.sustainabilityStat}>
              <div style={styles.sustainabilityNumber}>60%</div>
              <div style={styles.sustainabilityLabel}>Giảm phát thải carbon vào năm 2030</div>
            </div>
          </div>

          <p style={styles.sustainabilityText}>
            Từ việc sử dụng vật liệu tái chế, giảm thiểu chất thải đến tối ưu hóa quy trình sản xuất, chúng tôi đang nỗ
            lực mỗi ngày để giảm thiểu tác động đến môi trường và xây dựng một tương lai bền vững hơn cho thế hệ sau.
          </p>

          <button
            style={styles.heroButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#f0f0f0"
              e.currentTarget.style.transform = "translateY(-2px)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "white"
              e.currentTarget.style.transform = "translateY(0)"
            }}
          >
            Tìm hiểu thêm về bền vững
            <ArrowRightIcon />
          </button>
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.section}>
        <div style={styles.ctaContainer}>
          <h2 style={styles.ctaTitle}>Tham gia cùng chúng tôi</h2>
          <p style={styles.ctaText}>
            Hãy trở thành một phần của cộng đồng Adidas toàn cầu. Cùng nhau, chúng ta có thể đạt được nhiều hơn, vượt
            qua giới hạn và tạo ra những điều không tưởng.
          </p>
          <button
            style={styles.ctaButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)"
            }}
          >
            Khám phá cơ hội nghề nghiệp
            <ArrowRightIcon />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>© 2023 Adidas Clone. Tất cả các quyền được bảo lưu.</p>
      </footer>
    </div>
  )
}

export default AboutUs
