import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

import { useCart } from "../context/CartContext.jsx"

function ProductCard({ product }) {
  const navigate = useNavigate()

  const {
    cartItems,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart()

  const item = cartItems.find((cartItem) => cartItem.id === product.id)

  function showCartToast() {
    toast(
      (t) => (
        <button
          onClick={() => {
            toast.dismiss(t.id)
            navigate("/cart")
          }}
          className="text-left uppercase"
        >
          Товар добавлен в корзину.{" "}
          <span className="underline">Перейти</span>
        </button>
      ),
      {
        duration: 4000,
      },
    )
  }

  function handleAddToCart() {
    addToCart(product)
    showCartToast()
  }

  return (
    <div className="group overflow-hidden border border-[#fff8c9] bg-[#fff8c9] text-[#1f0d07] transition duration-300 hover:-translate-y-2">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="h-[320px] w-full object-cover brightness-90 transition duration-300 group-hover:scale-105"
        />
      </Link>

      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-2xl uppercase transition hover:text-[#8b2f1d]">
            {product.name}
          </h3>
        </Link>

        <p className="mt-2 text-xl">{product.price} ₽</p>

        {item && (
          <p className="mt-2 text-sm uppercase text-[#1f0d07]/70">
            В корзине: {item.quantity} шт.
          </p>
        )}

        {!item ? (
          <button
            onClick={handleAddToCart}
            className="mt-4 w-full border border-[#1f0d07] py-2 uppercase transition hover:bg-[#1f0d07] hover:text-[#fff8c9]"
          >
            В корзину
          </button>
        ) : (
          <div className="mt-4 grid grid-cols-[50px_1fr_50px] border border-[#1f0d07]">
            <button
              onClick={() => decreaseQuantity(product.id)}
              className="py-2 text-2xl transition hover:bg-[#1f0d07] hover:text-[#fff8c9]"
            >
              -
            </button>

            <div className="flex items-center justify-center border-x border-[#1f0d07] text-xl">
              {item.quantity}
            </div>

            <button
              onClick={() => increaseQuantity(product.id)}
              className="py-2 text-2xl transition hover:bg-[#1f0d07] hover:text-[#fff8c9]"
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