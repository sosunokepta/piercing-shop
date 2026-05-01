import { Link } from "react-router-dom"
import toast from "react-hot-toast"
import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { useCart } from "../context/CartContext"

function Profile() {
  const { user, logout } = useAuth()
  const { cartItems } = useCart()
  const [orders, setOrders] = useState([])
  const [tab, setTab] = useState("active") // active / history

  const { addToCart } = useCart()

  useEffect(() => {
    if (user) {
      const storedOrders = JSON.parse(localStorage.getItem("orders")) || []
      setOrders(storedOrders)
    }
  }, [user])

  if (!user) {
    return (
      <main className="min-h-screen bg-[#1f0d07] px-6 pt-32 text-[#fff8c9] md:px-12">
        <h1 className="text-5xl uppercase">Личный кабинет</h1>
        <p className="mt-6 text-xl text-[#fff8c9]/70">
          Войдите или зарегистрируйтесь, чтобы просматривать профиль и заказы.
        </p>
        <div className="mt-8 flex gap-4">
          <Link
            to="/login"
            className="border border-[#fff8c9] px-6 py-3 uppercase hover:bg-[#fff8c9] hover:text-[#1f0d07]"
          >
            Войти
          </Link>
          <Link
            to="/register"
            className="border border-[#fff8c9] px-6 py-3 uppercase hover:bg-[#fff8c9] hover:text-[#1f0d07]"
          >
            Регистрация
          </Link>
        </div>
      </main>
    )
  }

  const activeOrders = orders.filter((o) => o.status === "Активный")
  const completedOrders = orders.filter((o) => o.status === "Завершённый")
  // История = все заказы (активные + завершённые)
  const historyOrders = [...activeOrders, ...completedOrders]

  const displayedOrders = tab === "active" ? activeOrders : historyOrders

  function handleRepeat(order) {
    const cart = [...cartItems]
    order.items.forEach((item) => {
      const exist = cart.find((c) => c.id === item.id)
      if (exist) exist.quantity += item.quantity
      else cart.push({ ...item })
    })
    localStorage.setItem("cart", JSON.stringify(cart))
    toast.success("Товары добавлены в корзину")
    window.location.reload()
  }

  return (
    <main className="min-h-screen bg-[#1f0d07] px-6 pt-32 text-[#fff8c9] md:px-12">
      <h1 className="mb-10 text-5xl uppercase md:text-7xl">Профиль</h1>

      <section className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        {/* Данные аккаунта */}
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

        {/* Действия и заказы */}
        <aside className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 border border-[#fff8c9] p-6">
            <Link
              to="/profile/edit"
              className="border border-[#fff8c9] px-6 py-3 text-center uppercase hover:bg-[#fff8c9] hover:text-[#1f0d07]"
            >
              Редактировать
            </Link>

            <button
              onClick={logout}
              className="border border-[#fff8c9] px-6 py-3 uppercase hover:bg-[#fff8c9] hover:text-[#1f0d07]"
            >
              Выйти
            </button>
          </div>

          <div className="border border-[#fff8c9] p-6">
            <h2 className="mb-6 text-3xl uppercase">Мои заказы</h2>

            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setTab("active")}
                className={`px-4 py-2 border border-[#fff8c9] uppercase ${
                  tab === "active" ? "bg-[#fff8c9] text-[#1f0d07]" : ""
                }`}
              >
                Активные
              </button>
              <button
                onClick={() => setTab("history")}
                className={`px-4 py-2 border border-[#fff8c9] uppercase ${
                  tab === "history" ? "bg-[#fff8c9] text-[#1f0d07]" : ""
                }`}
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
                    className="border border-[#fff8c9]/30 p-4 flex flex-col gap-2"
                  >
                    <div className="flex justify-between">
                      <span>Заказ №{order.id}</span>
                      <span className="uppercase">{order.status}</span>
                    </div>

                    <div className="grid gap-1 border-t border-[#fff8c9]/20 pt-2 text-[#fff8c9]/70">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex justify-between">
                          <span>
                            {item.name} × {item.quantity}
                          </span>
                          <span>{item.price * item.quantity} ₽</span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => handleRepeat(order)}
                      className="mt-2 border border-[#fff8c9] px-3 py-1 uppercase hover:bg-[#fff8c9] hover:text-[#1f0d07]"
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