import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext.jsx"

function Cart() {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
  } = useCart()

  return (
    <main className="min-h-screen bg-[#1f0d07] px-6 pb-20 pt-28 text-[#fff8c9] md:px-12 md:pt-32">
      <h1 className="mb-10 text-5xl uppercase md:text-7xl">Корзина</h1>

      {cartItems.length === 0 ? (
        <section className="border border-[#fff8c9] p-6 md:p-8">
          <p className="text-xl uppercase text-[#fff8c9]/70 md:text-2xl">
            Корзина пока пустая.
          </p>

          <Link
            to="/catalog"
            className="mt-8 inline-block border border-[#fff8c9] px-6 py-4 text-lg uppercase transition hover:bg-[#fff8c9] hover:text-[#1f0d07] md:px-8 md:text-xl"
          >
            Перейти в каталог
          </Link>
        </section>
      ) : (
        <section className="grid gap-8 lg:grid-cols-[1fr_380px] lg:gap-12">
          <div className="space-y-6">
            {cartItems.map((item) => (
              <article
                key={item.id}
                className="grid gap-5 border border-[#fff8c9] bg-[#fff8c9] p-4 text-[#1f0d07] sm:grid-cols-[140px_1fr] md:grid-cols-[180px_1fr_auto]"
              >
                <Link to={`/product/${item.id}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-[220px] w-full object-cover brightness-90 transition hover:brightness-75 sm:h-[140px] md:h-[180px]"
                  />
                </Link>

                <div>
                  <Link to={`/product/${item.id}`}>
                    <h2 className="text-3xl uppercase transition hover:text-[#8b2f1d]">
                      {item.name}
                    </h2>
                  </Link>

                  <p className="mt-3 text-2xl">{item.price} ₽</p>

                  <p className="mt-2 text-sm uppercase text-[#1f0d07]/70">
                    Добавлено: {item.quantity} шт.
                  </p>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="mt-5 border border-[#1f0d07] px-5 py-2 uppercase transition hover:bg-[#1f0d07] hover:text-[#fff8c9]"
                  >
                    Удалить
                  </button>
                </div>

                <div className="grid grid-cols-[50px_1fr_50px] border border-[#1f0d07] md:flex md:items-center md:gap-4 md:border-0">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="py-2 text-2xl md:h-10 md:w-10 md:border md:border-[#1f0d07] md:py-0"
                  >
                    -
                  </button>

                  <span className="flex items-center justify-center border-x border-[#1f0d07] text-2xl md:border-0">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="py-2 text-2xl md:h-10 md:w-10 md:border md:border-[#1f0d07] md:py-0"
                  >
                    +
                  </button>
                </div>
              </article>
            ))}
          </div>

          <aside className="h-fit border border-[#fff8c9] p-6 lg:sticky lg:top-28">
            <h2 className="text-4xl uppercase">Итого</h2>

            <p className="mt-6 text-3xl">{totalPrice} ₽</p>

            <Link
              to="/checkout"
              className="mt-8 block w-full border border-[#fff8c9] px-6 py-4 text-center text-lg uppercase transition hover:bg-[#fff8c9] hover:text-[#1f0d07] md:text-xl"
            >
              Оформить заказ
            </Link>
          </aside>
        </section>
      )}
    </main>
  )
}

export default Cart