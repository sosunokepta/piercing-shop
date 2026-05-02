import { useState } from "react"
import { Link } from "react-router-dom"
import toast from "react-hot-toast"

import { useAuth } from "../context/AuthContext"

function Admin() {
  const { user } = useAuth()

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "piercing",
    image: "",
  })

  // ❌ если не админ
  if (!user || user.role !== "admin") {
    return (
      <main className="min-h-screen bg-[#1f0d07] px-6 pt-28 text-[#fff8c9]">
        <div className="mx-auto max-w-[600px] border border-[#fff8c9] p-8 text-center">
          <h1 className="text-4xl uppercase">Нет доступа</h1>

          <p className="mt-4 text-[#fff8c9]/70">
            Эта страница только для администратора
          </p>

          <Link
            to="/login"
            className="mt-6 inline-block border border-[#fff8c9] px-6 py-3 uppercase"
          >
            Войти
          </Link>
        </div>
      </main>
    )
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  function handleImage(e) {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()

    reader.onloadend = () => {
      setFormData({
        ...formData,
        image: reader.result,
      })
    }

    reader.readAsDataURL(file)
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (!formData.name || !formData.price || !formData.image) {
      toast.error("Заполни все поля")
      return
    }

    const saved = JSON.parse(localStorage.getItem("adminProducts")) || []

    const newProduct = {
      id: Date.now(),
      name: formData.name,
      price: Number(formData.price),
      category: formData.category,
      image: formData.image,
    }

    localStorage.setItem(
      "adminProducts",
      JSON.stringify([newProduct, ...saved])
    )

    toast.success("Товар добавлен")

    setFormData({
      name: "",
      price: "",
      category: "piercing",
      image: "",
    })
  }

  return (
    <main className="min-h-screen bg-[#1f0d07] px-6 pt-28 text-[#fff8c9]">
      <h1 className="mb-8 text-5xl uppercase">Админка</h1>

      <form onSubmit={handleSubmit} className="max-w-[500px] space-y-5">
        <input
          type="text"
          name="name"
          placeholder="Название"
          value={formData.name}
          onChange={handleChange}
          className="w-full border border-[#fff8c9] bg-transparent p-3"
        />

        <input
          type="number"
          name="price"
          placeholder="Цена"
          value={formData.price}
          onChange={handleChange}
          className="w-full border border-[#fff8c9] bg-transparent p-3"
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border border-[#fff8c9] bg-[#1f0d07] p-3"
        >
          <option value="piercing">Пирсинг</option>
          <option value="tunnels">Тоннели</option>
          <option value="earrings">Серьги</option>
        </select>

        <input type="file" accept="image/*" onChange={handleImage} />

        <button className="w-full bg-[#fff8c9] py-3 text-black">
          Добавить товар
        </button>
      </form>
    </main>
  )
}

export default Admin