import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useCart } from "../context/CartContext"
import toast from "react-hot-toast"

function MyOrders() {
  const { user } = useAuth()
  const { cartItems, addToCart } = useCart()

  const [orders, setOrders] = useState([])
  const [tab, setTab] = useState("active") // active / history

  useEffect(() => {
    if (user) {
      const storedOrders = JSON.parse(localStorage.getItem("orders")) || []
      setOrders(storedOrders)
    }
  }, [user])

  if (!user) {
    return (
      <main className="min-h-screen bg-[#1f0d07] px-6 pt-32 text-[#fff8c9] md:px-12">
        <h1 className="text-5xl uppercase">Мои заказы</h1>
        <p className="mt-6 text-xl text-[#fff8c9]/70">
          Чтобы просматривать заказы, войдите в аккаунт.
        </p>
        <Link
          to="/login"
          className="mt-8 inline-block border border-[#fff8c9] px-6 py-3 uppercase transition hover:bg-[#fff8c9] hover:text-[#1f0d07]"
        >
          Войти
        </Link>
      </main>
    )
  }

  const activeOrders = orders.filter((o) => o.status === "Активный")
  const historyOrders = orders.filter((o) => o.status === "Завершённый")

  const displayedOrders = tab === "active" ? activeOrders : historyOrders

  function handleRepeat(order) {
    const newCart = [...cartItems, ...order.items]
    newCart.forEach((item, index) => {
      // проверка на дублирование
      const exist = cartItems.find((c) => c.id === item.id)
      if (exist) {
        exist.quantity += item.quantity
      } else {
        cartItems.push(item)
      }
    })
    localStorage.setItem("cart", JSON.stringify(cartItems))
    toast.success("Товары добавлены в корзину")
  }

  return (
    <main className="min-h-screen bg-[#1f0d07] px-6 pt-32 text-[#fff8c9] md:px-12">
      <h1 className="mb-12 text-5xl uppercase md:text-7xl">Мои заказы</h1>

      <div className="mb-8 flex gap-4">
        <button
          onClick={() => setTab("active")}
          className={`px-6 py-3 uppercase border border-[#fff8c9] ${
            tab === "active" ? "bg-[#fff8c9] text-[#1f0d07]" : ""
          }`}
        >
          Активные
        </button>

        <button
          onClick={() => setTab("history")}
          className={`px-6 py-3 uppercase border border-[#fff8c9] ${
            tab === "history" ? "bg-[#fff8c9] text-[#1f0d07]" : ""
          }`}
        >
          История
        </button>
      </div>

      {displayedOrders.length === 0 ? (
        <p className="text-xl text-[#fff8c9]/70">Заказы отсутствуют</p>
      ) : (
        <div className="grid gap-8">
          {displayedOrders.map((order) => (
            <div
              key={order.id}
              className="border border-[#fff8c9]/40 p-6 flex flex-col gap-4"
            >
              <div className="flex justify-between">
                <span className="text-xl uppercase">Заказ №{order.id}</span>
                <span className="text-xl uppercase">{order.status}</span>
              </div>

              <div className="grid gap-4 border-t border-[#fff8c9]/30 pt-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span className="uppercase">{item.name} × {item.quantity}</span>
                    <span>{item.price * item.quantity} ₽</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex gap-4">
                <button
                  onClick={() => handleRepeat(order)}
                  className="border border-[#fff8c9] px-4 py-2 uppercase transition hover:bg-[#fff8c9] hover:text-[#1f0d07]"
                >
                  Повторить заказ
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}

export default MyOrders