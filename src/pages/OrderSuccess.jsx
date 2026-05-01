import { Link, useParams } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function OrderSuccess() {
  const { id } = useParams()
  const { user } = useAuth()

  // сохраняем заказ в профиле
  if (user) {
    const orders = JSON.parse(localStorage.getItem("orders")) || []
    if (!orders.find((o) => o.id === id)) {
      orders.push({
        id,
        date: new Date().toLocaleString(),
        items: JSON.parse(localStorage.getItem("cartBackup")) || [],
        status: "Активный",
      })
      localStorage.setItem("orders", JSON.stringify(orders))
    }
  }

  return (
    <main className="min-h-screen bg-[#1f0d07] flex items-center justify-center text-[#fff8c9] px-6 pb-20 pt-32 md:px-12">
      <div className="border border-[#fff8c9] p-10 text-center max-w-[700px] w-full">
        <h1 className="text-5xl uppercase">Заказ оформлен</h1>

        <p className="mt-6 text-2xl">
          Номер заказа: <span className="font-bold">{id}</span>
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            to="/catalog"
            className="border border-[#fff8c9] px-6 py-3 text-xl uppercase transition hover:bg-[#fff8c9] hover:text-[#1f0d07]"
          >
            В каталог
          </Link>

          {user && (
            <Link
              to="/profile/orders"
              className="border border-[#fff8c9] px-6 py-3 text-xl uppercase transition hover:bg-[#fff8c9] hover:text-[#1f0d07]"
            >
              Мои заказы
            </Link>
          )}
        </div>
      </div>
    </main>
  )
}

export default OrderSuccess