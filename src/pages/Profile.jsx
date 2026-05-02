import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import toast from "react-hot-toast"

import { useAuth } from "../context/AuthContext.jsx"
import { useCart } from "../context/CartContext.jsx"

function Profile() {
  const { user, logout } = useAuth()
  const { cartItems } = useCart()

  const [orders, setOrders] = useState([])
  const [tab, setTab] = useState("active")

  useEffect(() => {
    if (user) {
      const storedOrders = JSON.parse(localStorage.getItem("orders")) || []
      setOrders(storedOrders)
    }
  }, [user])

  function handleLogout() {
    logout()
    toast.success("Вы вышли из аккаунта")
  }

  function handleRepeat(order) {
    const cart = [...cartItems]

    order.items.forEach((item) => {
      const existingItem = cart.find((cartItem) => cartItem.id === item.id)

      if (existingItem) {
        existingItem.quantity += item.quantity
      } else {
        cart.push({ ...item })
      }
    })

    localStorage.setItem("cart", JSON.stringify(cart))
    toast.success("Товары добавлены в корзину")
    window.location.reload()
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-[#1f0d07] px-6 pb-20 pt-28 text-[#fff8c9] md:px-12 md:pt-32">
        <section className="mx-auto max-w-[1100px]">
          <p className="mb-4 text-lg uppercase tracking-[0.25em] text-[#fff8c9]/60 md:text-xl">
            Account
          </p>

          <h1 className="mb-10 text-5xl uppercase leading-none md:text-7xl">
            Личный
            <br />
            кабинет
          </h1>

          <div className="grid gap-6 md:grid-cols-2">
            <Link
              to="/login"
              className="group flex min-h-[300px] flex-col justify-between border border-[#fff8c9] p-6 transition duration-300 hover:-translate-y-2 hover:bg-[#fff8c9] hover:text-[#1f0d07] md:min-h-[340px] md:p-8"
            >
              <div>
                <p className="text-base uppercase tracking-[0.2em] text-[#fff8c9]/60 group-hover:text-[#1f0d07]/60 md:text-xl">
                  Уже есть аккаунт
                </p>

                <h2 className="mt-6 text-5xl uppercase leading-none md:text-6xl">
                  Войти
                </h2>
              </div>

              <p className="max-w-[460px] text-lg uppercase leading-tight text-[#fff8c9]/70 group-hover:text-[#1f0d07]/70 md:text-xl">
                Авторизуйся, чтобы открыть профиль и продолжить покупки.
              </p>
            </Link>

            <Link
              to="/register"
              className="group flex min-h-[300px] flex-col justify-between border border-[#fff8c9] p-6 transition duration-300 hover:-translate-y-2 hover:bg-[#fff8c9] hover:text-[#1f0d07] md:min-h-[340px] md:p-8"
            >
              <div>
                <p className="text-base uppercase tracking-[0.2em] text-[#fff8c9]/60 group-hover:text-[#1f0d07]/60 md:text-xl">
                  Новый пользователь
                </p>

                <h2 className="mt-6 text-5xl uppercase leading-none md:text-6xl">
                  Регистрация
                </h2>
              </div>

              <p className="max-w-[460px] text-lg uppercase leading-tight text-[#fff8c9]/70 group-hover:text-[#1f0d07]/70 md:text-xl">
                Создай аккаунт, чтобы быстрее оформлять заказы.
              </p>
            </Link>
          </div>
        </section>
      </main>
    )
  }

  const activeOrders = orders.filter((order) => order.status === "Активный")
  const completedOrders = orders.filter((order) => order.status === "Завершённый")
  const historyOrders = [...activeOrders, ...completedOrders]
  const displayedOrders = tab === "active" ? activeOrders : historyOrders

  return (
    <main className="min-h-screen bg-[#1f0d07] px-6 pb-20 pt-28 text-[#fff8c9] md:px-12 md:pt-32">
      <h1 className="mb-10 text-5xl uppercase md:text-7xl">Профиль</h1>

      <section className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div className="border border-[#fff8c9] p-6">
          <h2 className="mb-8 text-4xl uppercase">Данные аккаунта</h2>

          <div className="space-y-5 text-2xl">
            <p>
              <span className="text-[#fff8c9]/60">Имя:</span> {user.name}
            </p>

            <p>
              <span className="text-[#fff8c9]/60">Почта:</span> {user.email}
            </p>

            <p>
              <span className="text-[#fff8c9]/60">Телефон:</span> {user.phone}
            </p>
          </div>
        </div>

        <aside className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 border border-[#fff8c9] p-6">
            <Link
              to="/profile/edit"
              className="border border-[#fff8c9] px-6 py-3 text-center uppercase transition hover:bg-[#fff8c9] hover:text-[#1f0d07]"
            >
              Редактировать
            </Link>

            <button
              onClick={handleLogout}
              className="border border-[#fff8c9] px-6 py-3 uppercase transition hover:bg-[#fff8c9] hover:text-[#1f0d07]"
            >
              Выйти
            </button>
          </div>

          <div className="border border-[#fff8c9] p-6">
            <h2 className="mb-6 text-3xl uppercase">Мои заказы</h2>

            <div className="mb-6 flex gap-4">
              <button
                onClick={() => setTab("active")}
                className={
                  tab === "active"
                    ? "border border-[#fff8c9] bg-[#fff8c9] px-4 py-2 uppercase text-[#1f0d07]"
                    : "border border-[#fff8c9] px-4 py-2 uppercase transition hover:bg-[#fff8c9] hover:text-[#1f0d07]"
                }
              >
                Активные
              </button>

              <button
                onClick={() => setTab("history")}
                className={
                  tab === "history"
                    ? "border border-[#fff8c9] bg-[#fff8c9] px-4 py-2 uppercase text-[#1f0d07]"
                    : "border border-[#fff8c9] px-4 py-2 uppercase transition hover:bg-[#fff8c9] hover:text-[#1f0d07]"
                }
              >
                История
              </button>
            </div>

            {displayedOrders.length === 0 ? (
              <p className="text-[#fff8c9]/70">Заказы отсутствуют</p>
            ) : (
              <div className="space-y-4">
                {displayedOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex flex-col gap-2 border border-[#fff8c9]/30 p-4"
                  >
                    <div className="flex justify-between gap-4">
                      <span>Заказ №{order.id}</span>
                      <span className="uppercase">{order.status}</span>
                    </div>

                    <div className="grid gap-1 border-t border-[#fff8c9]/20 pt-2 text-[#fff8c9]/70">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex justify-between gap-4">
                          <span>
                            {item.name} × {item.quantity}
                          </span>
                          <span>{item.price * item.quantity} ₽</span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => handleRepeat(order)}
                      className="mt-2 border border-[#fff8c9] px-3 py-2 uppercase transition hover:bg-[#fff8c9] hover:text-[#1f0d07]"
                    >
                      Повторить заказ
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>
      </section>
    </main>
  )
}

export default Profile