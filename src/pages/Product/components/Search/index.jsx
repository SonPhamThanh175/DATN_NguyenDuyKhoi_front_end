"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "./SearchComponent.scss"
import { formatPrice } from "../../../../utils/common"

function SearchComponent() {
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredProducts, setFilteredProducts] = useState([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const navigate = useNavigate()

  const removeVietnameseTones = (str) => {
    if (!str) return ""
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
  }

  const searchInText = (text, searchTerm) => {
    if (!text || !searchTerm) return false

    const normalizedText = removeVietnameseTones(text.toLowerCase())
    const normalizedSearchTerm = removeVietnameseTones(searchTerm.toLowerCase())

    if (normalizedText.includes(normalizedSearchTerm)) {
      return true
    }

    const searchWords = normalizedSearchTerm.split(" ").filter((word) => word.length > 0)
    return searchWords.every((word) => normalizedText.includes(word))
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products/get-all")
        setProducts(response.data)
      } catch (error) {
        console.error("Error fetching products:", error)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredProducts([])
      return
    }

    const results = products.filter((product) => {
      const matchName = searchInText(product.name, searchTerm)

      const matchDescription = searchInText(product.description, searchTerm)

      const matchDescriptionFull = searchInText(product.descriptionFull, searchTerm)

      return matchName || matchDescription || matchDescriptionFull
    })

    const sortedResults = results.sort((a, b) => {
      const aNameMatch = searchInText(a.name, searchTerm)
      const bNameMatch = searchInText(b.name, searchTerm)

      if (aNameMatch && !bNameMatch) return -1
      if (!aNameMatch && bNameMatch) return 1

      return 0
    })

    setFilteredProducts(sortedResults)
  }, [searchTerm, products])

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`)
    setSearchTerm("") // Clear search after selection
  }

  const handleSearchClick = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  return (
    <div className="search-component-container">
      <input
        className="search-component-input"
        type="text"
        placeholder="Nhập từ khóa..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm && filteredProducts.length > 0 ? (
        <ul className="search-component-results">
          {filteredProducts.map((product) => (
            <li key={product._id} className="search-component-item" onClick={() => handleProductClick(product._id)}>
              <img src={product.images[0] || "/placeholder.svg"} alt={product.name} width="50" />
              <div style={{ fontWeight: "bold", fontFamily: "monospace" }}>{product.name}</div>
              <div style={{ fontWeight: "bold", fontFamily: "monospace" }}>
                Giá khuyến mãi: {formatPrice(product.salePrice)}
              </div>
            </li>
          ))}
        </ul>
      ) : searchTerm && filteredProducts.length === 0 ? (
        <div className="search-component-no-results">
          <p>Không tìm thấy sản phẩm nào phù hợp với "{searchTerm}"</p>
        </div>
      ) : (
        <button className="search-component-button" onClick={handleSearchClick}>
          Tìm kiếm
        </button>
      )}
    </div>
  )
}

export default SearchComponent
