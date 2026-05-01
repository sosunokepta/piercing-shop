import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"

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

  if (!user) {
    return (
      <main className="min-h-screen bg-[#1f0d07] px-6 pb-20 pt-32 text-[#fff8c9] md:px-12">
        <section className="mx-auto max-w-[760px] border border-[#fff8c9] p-8 text-center">
          <p className="mb-4 text-xl uppercase tracking-[0.25em] text-[#fff8c9]/60">
            Checkout
          </p>

          <h1 className="text-5xl uppercase md:text-7xl">Нет доступа</h1>

          <p className="mt-6 text-xl uppercase leading-relaxed text-[#fff8c9]/70">
            Чтобы оформить заказ, сначала войдите в аккаунт или зарегистрируйтесь.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/login"
              className="border border-[#fff8c9] px-8 py-4 text-xl uppercase transition hover:bg-[#fff8c9] hover:text-[#1f0d07]"
            >
              Войти
            </Link>

            <Link
              to="/register"
              className="border border-[#fff8c9] px-8 py-4 text-xl uppercase transition hover:bg-[#fff8c9] hover:text-[#1f0d07]"
            >
              Регистрация
            </Link>
          </div>
        </section>
      </main>
    )
  }

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

    clearCart()
    toast.success("Заказ оформлен")

    navigate(`/order-success/${orderNumber}`)
  }

  return (
    <main className="min-h-screen bg-[#1f0d07] px-6 pb-20 pt-32 text-[#fff8c9] md:px-12">
      <div className="mb-12">
        <p className="mb-4 text-xl uppercase tracking-[0.25em] text-[#fff8c9]/60">
          Checkout
        </p>

        <h1 className="text-5xl uppercase md:text-7xl">
          Оформление заказа
        </h1>
      </div>

      {cartItems.length === 0 ? (
        <section className="border border-[#fff8c9] p-8">
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
        <section className="grid gap-12 lg:grid-cols-[1fr_420px]">
          <form onSubmit={handleSubmit} className="border border-[#fff8c9] p-6 md:p-8">
            <h2 className="mb-8 text-4xl uppercase">Данные получателя</h2>

            <div className="space-y-6">
              <label className="block">
                <span className="mb-3 block text-lg uppercase text-[#fff8c9]/70">
                  Имя
                </span>
                <input
                  type="text"
                  name="name"
                  placeholder="Ваше имя"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-[#fff8c9] bg-transparent px-5 py-4 text-xl text-[#fff8c9] outline-none placeholder:text-[#fff8c9]/35 focus:bg-[#fff8c9] focus:text-[#1f0d07]"
                />
              </label>

              <label className="block">
                <span className="mb-3 block text-lg uppercase text-[#fff8c9]/70">
                  Телефон
                </span>
                <input
                  type="text"
                  name="phone"
                  placeholder="+7 999 999 99 99"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-[#fff8c9] bg-transparent px-5 py-4 text-xl text-[#fff8c9] outline-none placeholder:text-[#fff8c9]/35 focus:bg-[#fff8c9] focus:text-[#1f0d07]"
                />
              </label>

              <label className="block">
                <span className="mb-3 block text-lg uppercase text-[#fff8c9]/70">
                  Город
                </span>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleCityChange}
                  className="w-full border border-[#fff8c9] bg-[#1f0d07] px-5 py-4 text-xl text-[#fff8c9] outline-none"
                >
                  <option value="">Выберите город</option>
                  <option value="Владивосток">Владивосток</option>
                  <option value="Москва">Москва</option>
                  <option value="Санкт-Петербург">Санкт-Петербург</option>
                </select>
              </label>

              {formData.city && (
                <label className="block">
                  <span className="mb-3 block text-lg uppercase text-[#fff8c9]/70">
                    Пункт СДЭК
                  </span>
                  <select
                    name="point"
                    value={formData.point}
                    onChange={handleChange}
                    className="w-full border border-[#fff8c9] bg-[#1f0d07] px-5 py-4 text-xl text-[#fff8c9] outline-none"
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
                <span className="mb-3 block text-lg uppercase text-[#fff8c9]/70">
                  Комментарий к заказу
                </span>
                <textarea
                  name="comment"
                  placeholder="Например: удобное время для связи"
                  value={formData.comment}
                  onChange={handleChange}
                  className="h-[140px] w-full resize-none border border-[#fff8c9] bg-transparent px-5 py-4 text-xl text-[#fff8c9] outline-none placeholder:text-[#fff8c9]/35 focus:bg-[#fff8c9] focus:text-[#1f0d07]"
                />
              </label>

              <button
                type="submit"
                className="w-full border border-[#fff8c9] bg-[#fff8c9] py-5 text-xl uppercase text-[#1f0d07] transition hover:bg-transparent hover:text-[#fff8c9]"
              >
                Подтвердить заказ
              </button>
            </div>
          </form>

          <aside className="h-fit border border-[#fff8c9] p-6 md:p-8">
            <h2 className="mb-8 text-4xl uppercase">Ваш заказ</h2>

            <div className="space-y-5">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[80px_1fr] gap-4 border-b border-[#fff8c9]/20 pb-5"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-20 w-20 object-cover brightness-90"
                  />

                  <div>
                    <h3 className="text-xl uppercase">{item.name}</h3>
                    <p className="mt-1 text-[#fff8c9]/70">
                      {item.quantity} × {item.price} ₽
                    </p>
                    <p className="mt-2 text-xl">
                      {item.quantity * item.price} ₽
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-[#fff8c9] pt-6">
              <div className="flex justify-between text-2xl uppercase">
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