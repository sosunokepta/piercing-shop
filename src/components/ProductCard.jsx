import { Link } from "react-router-dom"
import toast from "react-hot-toast"
import { useCart } from "../context/CartContext"

function ProductCard({ product }) {
  const {
    cartItems,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart()

  const item = cartItems.find((i) => i.id === product.id)

  return (
    <div className="group relative overflow-hidden border border-[#fff8c9]/20 bg-[#1f0d07] text-[#fff8c9] transition duration-300 hover:border-[#fff8c9]">
      
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="h-[320px] w-full object-cover transition duration-500 group-hover:scale-105 group-hover:brightness-75"
        />
      </Link>

      <div className="p-5">
        <h3 className="text-2xl uppercase">{product.name}</h3>
        <p className="mt-2 text-xl text-[#fff8c9]/70">{product.price} ₽</p>

        {!item ? (
          <button
            onClick={() => {
              addToCart(product)
              toast.success("Добавлено")
            }}
            className="mt-5 w-full border border-[#fff8c9] py-3 uppercase transition hover:bg-[#fff8c9] hover:text-[#1f0d07]"
          >
            В корзину
          </button>
        ) : (
          <div className="mt-5 flex items-center justify-between border border-[#fff8c9]">
            <button
              onClick={() => decreaseQuantity(product.id)}
              className="px-4 text-2xl"
            >
              -
            </button>

            <span className="text-xl">{item.quantity}</span>

            <button
              onClick={() => increaseQuantity(product.id)}
              className="px-4 text-2xl"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductCard