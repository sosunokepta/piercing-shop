import { Link, useParams } from "react-router-dom"
import toast from "react-hot-toast"

import products from "../data/products"
import { useCart } from "../context/CartContext"

function Product() {
  const { id } = useParams()

  const { cartItems, addToCart, increaseQuantity, decreaseQuantity } =
    useCart()

  const product = products.find((item) => item.id === Number(id))
  const cartItem = product
    ? cartItems.find((item) => item.id === product.id)
    : null

  if (!product) {
    return (
      <main className="min-h-screen bg-[#1f0d07] px-6 pb-20 pt-32 text-[#fff8c9] md:px-12">
        <section className="mx-auto max-w-[800px] border border-[#fff8c9] p-8 text-center">
          <h1 className="text-5xl uppercase md:text-7xl">Товар не найден</h1>

          <p className="mt-6 text-xl uppercase text-[#fff8c9]/70">
            Вернитесь в каталог и выберите другое украшение.
          </p>

          <Link
            to="/catalog"
            className="mt-8 inline-block border border-[#fff8c9] px-8 py-4 text-xl uppercase transition hover:bg-[#fff8c9] hover:text-[#1f0d07]"
          >
            В каталог
          </Link>
        </section>
      </main>
    )
  }

  function handleAddToCart() {
    addToCart(product)
    toast.success("Товар добавлен")
  }

  return (
    <main className="min-h-screen bg-[#1f0d07] px-6 pb-20 pt-32 text-[#fff8c9] md:px-12">
      <Link
        to="/catalog"
        className="mb-8 inline-block text-lg uppercase text-[#fff8c9]/60 transition hover:text-[#d58b2a]"
      >
        ← Назад в каталог
      </Link>

      <section className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
        <div className="overflow-hidden border border-[#fff8c9]/40 bg-[#fff8c9]">
          <img
            src={product.image}
            alt={product.name}
            className="h-[420px] w-full object-cover brightness-90 md:h-[680px]"
          />
        </div>

        <div className="flex flex-col justify-between border border-[#fff8c9]/40 p-6 md:p-8">
          <div>
            <p className="mb-4 text-xl uppercase tracking-[0.2em] text-[#fff8c9]/60">
              {product.category}
            </p>

            <h1 className="text-5xl uppercase leading-none md:text-7xl">
              {product.name}
            </h1>

            <p className="mt-6 text-4xl">{product.price} ₽</p>

            <p className="mt-8 text-xl leading-relaxed text-[#fff8c9]/70">
              Украшение в стиле old school tattoo. Подходит для повседневного
              ношения, подчёркивает индивидуальность и хорошо сочетается с
              тёмной, винтажной эстетикой.
            </p>

            <div className="mt-10 grid gap-4 border-y border-[#fff8c9]/30 py-6 text-lg uppercase text-[#fff8c9]/75">
              <div className="flex justify-between gap-6">
                <span>Материал</span>
                <span>Сталь / титан</span>
              </div>

              <div className="flex justify-between gap-6">
                <span>Стиль</span>
                <span>Old school</span>
              </div>

              <div className="flex justify-between gap-6">
                <span>Категория</span>
                <span>{product.category}</span>
              </div>
            </div>
          </div>

          <div className="mt-10">
            {!cartItem ? (
              <button
                onClick={handleAddToCart}
                className="w-full border border-[#fff8c9] bg-[#fff8c9] py-5 text-xl uppercase text-[#1f0d07] transition hover:bg-transparent hover:text-[#fff8c9]"
              >
                Добавить в корзину
              </button>
            ) : (
              <div className="grid grid-cols-[70px_1fr_70px] border border-[#fff8c9]">
                <button
                  onClick={() => decreaseQuantity(product.id)}
                  className="py-5 text-3xl transition hover:bg-[#fff8c9] hover:text-[#1f0d07]"
                >
                  -
                </button>

                <div className="flex items-center justify-center border-x border-[#fff8c9] text-2xl">
                  {cartItem.quantity}
                </div>

                <button
                  onClick={() => increaseQuantity(product.id)}
                  className="py-5 text-3xl transition hover:bg-[#fff8c9] hover:text-[#1f0d07]"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Product