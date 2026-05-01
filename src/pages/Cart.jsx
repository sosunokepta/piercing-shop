import { Link } from "react-router-dom"

import { useCart } from "../context/CartContext"

function Cart() {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
  } = useCart()

  return (
    <main className="min-h-screen bg-[#1f0d07] px-12 pt-32 text-[#fff8c9]">
      <h1 className="mb-12 text-7xl uppercase">Корзина</h1>

      {cartItems.length === 0 ? (
        <div>
          <p className="text-2xl uppercase text-[#fff8c9]/70">
            Корзина пока пустая.
          </p>

          <Link
            to="/catalog"
            className="mt-8 inline-block border border-[#fff8c9] px-8 py-4 text-xl uppercase transition hover:bg-[#fff8c9] hover:text-[#1f0d07]"
          >
            Перейти в каталог
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-[1fr_380px] gap-12">
          <div className="space-y-6">
            {cartItems.map((item) => (
              <article
                key={item.id}
                className="grid grid-cols-[180px_1fr_auto] gap-6 border border-[#fff8c9] bg-[#fff8c9] p-4 text-[#1f0d07]"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-[180px] w-full object-cover brightness-75"
                />

                <div>
                  <h2 className="text-3xl uppercase">{item.name}</h2>
                  <p className="mt-3 text-2xl">{item.price} ₽</p>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="mt-6 border border-[#1f0d07] px-5 py-2 uppercase transition hover:bg-[#1f0d07] hover:text-[#fff8c9]"
                  >
                    Удалить
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="h-10 w-10 border border-[#1f0d07] text-2xl"
                  >
                    -
                  </button>

                  <span className="text-2xl">{item.quantity}</span>

                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="h-10 w-10 border border-[#1f0d07] text-2xl"
                  >
                    +
                  </button>
                </div>
              </article>
            ))}
          </div>

          <aside className="h-fit border border-[#fff8c9] p-6">
            <h2 className="text-4xl uppercase">Итого</h2>

            <p className="mt-6 text-3xl">{totalPrice} ₽</p>

            <Link
              to="/checkout"
              className="mt-8 block w-full border border-[#fff8c9] px-8 py-4 text-center text-xl uppercase transition hover:bg-[#fff8c9] hover:text-[#1f0d07]"
            >
              Оформить заказ
            </Link>
          </aside>
        </div>
      )}
    </main>
  )
}

export default Cart