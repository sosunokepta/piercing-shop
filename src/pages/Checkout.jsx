import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

import { useCart } from "../context/CartContext.jsx"
import { useAuth } from "../context/AuthContext.jsx"

function Checkout() {
  const navigate = useNavigate()
  const { cartItems, totalPrice, clearCart } = useCart()
  const { user } = useAuth()

  const deliveryPoints = {
    Владивосток: [
      "СДЭК — ул. Шепеткова, 60",
      "СДЭК — ул. Русская, 46",
      "СДЭК — ул. Светланская, 12",
    ],
    Москва: [
      "СДЭК — ул. Арбат, 10",
      "СДЭК — ул. Тверская, 22",
      "СДЭК — Ленинградский проспект, 36",
    ],
    "Санкт-Петербург": [
      "СДЭК — Невский проспект, 50",
      "СДЭК — Лиговский проспект, 100",
      "СДЭК — Московский проспект, 73",
    ],
  }

  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    city: "",
    point: "",
    comment: "",
  })

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  function handleCityChange(event) {
    setFormData({
      ...formData,
      city: event.target.value,
      point: "",
    })
  }

  function validatePhone(phone) {
    const cleanPhone = phone.replace(/\D/g, "")

    return (
      (cleanPhone.length === 11 && cleanPhone.startsWith("7")) ||
      (cleanPhone.length === 11 && cleanPhone.startsWith("8"))
    )
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (cartItems.length === 0) {
      toast.error("Корзина пустая")
      return
    }

    if (!formData.name || !formData.phone || !formData.city || !formData.point) {
      toast.error("Заполни обязательные поля")
      return
    }

    if (!validatePhone(formData.phone)) {
      toast.error("Неверный номер телефона")
      return
    }

    const orderNumber = Math.floor(100000 + Math.random() * 900000)

    const newOrder = {
      id: orderNumber,
      date: new Date().toLocaleString("ru-RU"),
      status: "Активный",
      items: cartItems,
      total: totalPrice,
      city: formData.city,
      point: formData.point,
    }

    const savedOrders = JSON.parse(localStorage.getItem("orders")) || []
    localStorage.setItem("orders", JSON.stringify([newOrder, ...savedOrders]))

    clearCart()
    toast.success("Заказ оформлен")
    navigate(`/order-success/${orderNumber}`)
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-[#1f0d07] px-6 pb-20 pt-28 text-[#fff8c9] md:px-12 md:pt-32">
        <section className="mx-auto max-w-[760px] border border-[#fff8c9] p-6 text-center md:p-8">
          <p className="mb-4 text-lg uppercase tracking-[0.25em] text-[#fff8c9]/60 md:text-xl">
            Checkout
          </p>

          <h1 className="text-5xl uppercase md:text-7xl">Нет доступа</h1>

          <p className="mt-6 text-lg uppercase leading-relaxed text-[#fff8c9]/70 md:text-xl">
            Чтобы оформить заказ, сначала войдите в аккаунт или
            зарегистрируйтесь.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              to="/login"
              className="border border-[#fff8c9] px-8 py-4 text-lg uppercase transition hover:bg-[#fff8c9] hover:text-[#1f0d07] md:text-xl"
            >
              Войти
            </Link>

            <Link
              to="/register"
              className="border border-[#fff8c9] px-8 py-4 text-lg uppercase transition hover:bg-[#fff8c9] hover:text-[#1f0d07] md:text-xl"
            >
              Регистрация
            </Link>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#1f0d07] px-6 pb-20 pt-28 text-[#fff8c9] md:px-12 md:pt-32">
      <div className="mb-10 md:mb-12">
        <p className="mb-4 text-lg uppercase tracking-[0.25em] text-[#fff8c9]/60 md:text-xl">
          Checkout
        </p>

        <h1 className="text-5xl uppercase md:text-7xl">
          Оформление заказа
        </h1>
      </div>

      {cartItems.length === 0 ? (
        <section className="border border-[#fff8c9] p-6 md:p-8">
          <h2 className="text-4xl uppercase">Корзина пустая</h2>

          <p className="mt-4 text-xl text-[#fff8c9]/70">
            Добавьте товары в корзину перед оформлением заказа.
          </p>

          <Link
            to="/catalog"
            className="mt-8 inline-block border border-[#fff8c9] px-8 py-4 text-xl uppercase transition hover:bg-[#fff8c9] hover:text-[#1f0d07]"
          >
            Перейти в каталог
          </Link>
        </section>
      ) : (
        <section className="grid gap-8 lg:grid-cols-[1fr_420px] lg:gap-12">
          <form
            onSubmit={handleSubmit}
            className="border border-[#fff8c9] p-5 md:p-8"
          >
            <h2 className="mb-8 text-3xl uppercase md:text-4xl">
              Данные получателя
            </h2>

            <div className="space-y-6">
              <label className="block">
                <span className="mb-3 block text-base uppercase text-[#fff8c9]/70 md:text-lg">
                  Имя
                </span>
                <input
                  type="text"
                  name="name"
                  placeholder="Ваше имя"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-[#fff8c9] bg-transparent px-4 py-4 text-lg text-[#fff8c9] outline-none placeholder:text-[#fff8c9]/35 focus:bg-[#fff8c9] focus:text-[#1f0d07] md:px-5 md:text-xl"
                />
              </label>

              <label className="block">
                <span className="mb-3 block text-base uppercase text-[#fff8c9]/70 md:text-lg">
                  Телефон
                </span>
                <input
                  type="text"
                  name="phone"
                  placeholder="+7 999 999 99 99"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-[#fff8c9] bg-transparent px-4 py-4 text-lg text-[#fff8c9] outline-none placeholder:text-[#fff8c9]/35 focus:bg-[#fff8c9] focus:text-[#1f0d07] md:px-5 md:text-xl"
                />
              </label>

              <label className="block">
                <span className="mb-3 block text-base uppercase text-[#fff8c9]/70 md:text-lg">
                  Город
                </span>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleCityChange}
                  className="w-full border border-[#fff8c9] bg-[#1f0d07] px-4 py-4 text-lg text-[#fff8c9] outline-none md:px-5 md:text-xl"
                >
                  <option value="">Выберите город</option>
                  <option value="Владивосток">Владивосток</option>
                  <option value="Москва">Москва</option>
                  <option value="Санкт-Петербург">Санкт-Петербург</option>
                </select>
              </label>

              {formData.city && (
                <label className="block">
                  <span className="mb-3 block text-base uppercase text-[#fff8c9]/70 md:text-lg">
                    Пункт СДЭК
                  </span>
                  <select
                    name="point"
                    value={formData.point}
                    onChange={handleChange}
                    className="w-full border border-[#fff8c9] bg-[#1f0d07] px-4 py-4 text-lg text-[#fff8c9] outline-none md:px-5 md:text-xl"
                  >
                    <option value="">Выберите пункт выдачи</option>
                    {deliveryPoints[formData.city].map((point) => (
                      <option key={point} value={point}>
                        {point}
                      </option>
                    ))}
                  </select>
                </label>
              )}

              <label className="block">
                <span className="mb-3 block text-base uppercase text-[#fff8c9]/70 md:text-lg">
                  Комментарий к заказу
                </span>
                <textarea
                  name="comment"
                  placeholder="Например: удобное время для связи"
                  value={formData.comment}
                  onChange={handleChange}
                  className="h-[140px] w-full resize-none border border-[#fff8c9] bg-transparent px-4 py-4 text-lg text-[#fff8c9] outline-none placeholder:text-[#fff8c9]/35 focus:bg-[#fff8c9] focus:text-[#1f0d07] md:px-5 md:text-xl"
                />
              </label>

              <button
                type="submit"
                className="w-full border border-[#fff8c9] bg-[#fff8c9] py-5 text-lg uppercase text-[#1f0d07] transition hover:bg-transparent hover:text-[#fff8c9] md:text-xl"
              >
                Подтвердить заказ
              </button>
            </div>
          </form>

          <aside className="h-fit border border-[#fff8c9] p-5 md:p-8 lg:sticky lg:top-28">
            <h2 className="mb-8 text-3xl uppercase md:text-4xl">
              Ваш заказ
            </h2>

            <div className="space-y-5">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[70px_1fr] gap-4 border-b border-[#fff8c9]/20 pb-5 md:grid-cols-[80px_1fr]"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-[70px] w-[70px] object-cover brightness-90 md:h-20 md:w-20"
                  />

                  <div>
                    <h3 className="text-lg uppercase md:text-xl">
                      {item.name}
                    </h3>

                    <p className="mt-1 text-sm text-[#fff8c9]/70 md:text-base">
                      {item.quantity} × {item.price} ₽
                    </p>

                    <p className="mt-2 text-lg md:text-xl">
                      {item.quantity * item.price} ₽
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-[#fff8c9] pt-6">
              <div className="flex justify-between gap-4 text-2xl uppercase">
                <span>Итого</span>
                <span>{totalPrice} ₽</span>
              </div>

              <p className="mt-4 text-sm uppercase leading-relaxed text-[#fff8c9]/60">
                Доставка осуществляется до выбранного пункта выдачи СДЭК.
              </p>
            </div>
          </aside>
        </section>
      )}
    </main>
  )
}

export default Checkout