import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext.jsx"
import toast from "react-hot-toast"

function ProductCard({ product }) {
  const { addToCart } = useCart()

  function handleAddToCart(e) {
    e.preventDefault()
    addToCart(product)
    toast.success(`${product.name} добавлен в корзину`)
  }

  return (
    <Link
      to={`/product/${product.id}`}
      className="group flex flex-col border border-[#fff8c9]/20 bg-[#fff8c9]/5 transition hover:border-[#fff8c9]/60"
    >
      <div className="relative aspect-square overflow-hidden bg-[#fff8c9]/10">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-[#1f0d07]/20 opacity-0 transition group-hover:opacity-100" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs uppercase tracking-widest text-[#fff8c9]/50">
            {product.category}
          </p>
          <p className="text-sm font-medium text-[#d58b2a]">{product.price} ₽</p>
        </div>

        <h3 className="mb-6 text-xl uppercase tracking-tight text-[#fff8c9]">
          {product.name}
        </h3>

        <button
          onClick={handleAddToCart}
          className="mt-auto border border-[#fff8c9] py-3 text-sm uppercase transition hover:bg-[#fff8c9] hover:text-[#1f0d07]"
        >
          В корзину
        </button>
      </div>
    </Link>
  )
}

export default ProductCard
