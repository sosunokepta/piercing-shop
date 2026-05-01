import { useState } from "react"
import { useSearchParams } from "react-router-dom"

import products from "../data/products"
import ProductCard from "../components/ProductCard"

function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams()

  const categoryFromUrl = searchParams.get("category") || "all"

  const [activeCategory, setActiveCategory] = useState(categoryFromUrl)
  const [sortType, setSortType] = useState("default")

  const categories = [
    { value: "all", label: "Все" },
    { value: "piercing", label: "Пирсинг" },
    { value: "tunnels", label: "Тоннели" },
    { value: "earrings", label: "Серьги" },
  ]

  function handleCategoryChange(category) {
    setActiveCategory(category)

    if (category === "all") {
      setSearchParams({})
    } else {
      setSearchParams({ category })
    }
  }

  const filteredProducts = products
    .filter((product) => {
      if (activeCategory === "all") {
        return true
      }

      return product.category === activeCategory
    })
    .sort((a, b) => {
      if (sortType === "price-low") {
        return a.price - b.price
      }

      if (sortType === "price-high") {
        return b.price - a.price
      }

      return 0
    })

  return (
    <main className="min-h-screen bg-[#1f0d07] px-6 pb-20 pt-32 text-[#fff8c9] md:px-12">
      <div className="mb-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-4 text-lg uppercase tracking-[0.2em] text-[#fff8c9]/70 md:text-xl">
            Old school jewelry
          </p>

          <h1 className="text-5xl uppercase md:text-7xl">Каталог</h1>
        </div>

        <select
          value={sortType}
          onChange={(event) => setSortType(event.target.value)}
          className="w-full border border-[#fff8c9] bg-[#1f0d07] px-5 py-4 text-lg uppercase text-[#fff8c9] outline-none md:w-auto md:text-xl"
        >
          <option value="default">По умолчанию</option>
          <option value="price-low">Сначала дешевле</option>
          <option value="price-high">Сначала дороже</option>
        </select>
      </div>

      <div className="mb-12 flex flex-wrap gap-4">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => handleCategoryChange(category.value)}
            className={
              activeCategory === category.value
                ? "border border-[#fff8c9] bg-[#fff8c9] px-6 py-3 text-lg uppercase text-[#1f0d07] md:px-7 md:text-xl"
                : "border border-[#fff8c9] px-6 py-3 text-lg uppercase text-[#fff8c9] transition hover:bg-[#fff8c9] hover:text-[#1f0d07] md:px-7 md:text-xl"
            }
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  )
}

export default Catalog