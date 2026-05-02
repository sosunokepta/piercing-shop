import { useState } from "react"
import { Link } from "react-router-dom"
import toast from "react-hot-toast"

import { useAuth } from "../context/AuthContext.jsx"

function Admin() {
  const { user } = useAuth()

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "piercing",
    image: "",
    description: "",
    material: "",
    style: "",
  })

  if (!user || user.role !== "admin") {
    return (
      <main className="min-h-screen bg-[#1f0d07] px-6 pb-20 pt-28 text-[#fff8c9] md:px-12 md:pt-32">
        <section className="mx-auto max-w-[760px] border border-[#fff8c9] p-8 text-center">
          <h1 className="text-5xl uppercase md:text-7xl">Нет доступа</h1>

          <p className="mt-6 text-xl uppercase text-[#fff8c9]/70">
            Эта страница доступна только администратору.
          </p>

          <Link
            to="/login"
            className="mt-8 inline-block border border-[#fff8c9] px-8 py-4 text-xl uppercase transition hover:bg-[#fff8c9] hover:text-[#1f0d07]"
          >
            Войти
          </Link>
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

  function handleImageUpload(event) {
    const file = event.target.files[0]

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

  function handleSubmit(event) {
    event.preventDefault()

    if (
      !formData.name ||
      !formData.price ||
      !formData.category ||
      !formData.image ||
      !formData.description ||
      !formData.material ||
      !formData.style
    ) {
      toast.error("Заполни все поля")
      return
    }

    const savedProducts = JSON.parse(localStorage.getItem("adminProducts")) || []

    const newProduct = {
      id: Date.now(),
      name: formData.name,
      price: Number(formData.price),
      category: formData.category,
      image: formData.image,
      description: formData.description,
      material: formData.material,
      style: formData.style,
      isAdminProduct: true,
    }

    localStorage.setItem(
      "adminProducts",
      JSON.stringify([newProduct, ...savedProducts]),
    )

    toast.success("Товар добавлен в каталог")

    setFormData({
      name: "",
      price: "",
      category: "piercing",
      image: "",
      description: "",
      material: "",
      style: "",
    })
  }

  return (
    <main className="min-h-screen bg-[#1f0d07] px-6 pb-20 pt-28 text-[#fff8c9] md:px-12 md:pt-32">
      <div className="mb-10">
        <p className="mb-4 text-lg uppercase tracking-[0.25em] text-[#fff8c9]/60">
          Admin panel
        </p>

        <h1 className="text-5xl uppercase md:text-7xl">Добавить товар</h1>
      </div>

      <section className="grid gap-10 lg:grid-cols-[1fr_420px]">
        <form
          onSubmit={handleSubmit}
          className="border border-[#fff8c9] p-5 md:p-8"
        >
          <div className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Название товара"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-[#fff8c9] bg-transparent px-4 py-4 text-lg text-[#fff8c9] outline-none placeholder:text-[#fff8c9]/35"
            />

            <input
              type="number"
              name="price"
              placeholder="Цена"
              value={formData.price}
              onChange={handleChange}
              className="w-full border border-[#fff8c9] bg-transparent px-4 py-4 text-lg text-[#fff8c9] outline-none placeholder:text-[#fff8c9]/35"
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-[#fff8c9] bg-[#1f0d07] px-4 py-4 text-lg text-[#fff8c9] outline-none"
            >
              <option value="piercing">Пирсинг</option>
              <option value="tunnels">Тоннели</option>
              <option value="earrings">Серьги</option>
            </select>

            <input
              type="text"
              name="material"
              placeholder="Материал, например: сталь / титан"
              value={formData.material}
              onChange={handleChange}
              className="w-full border border-[#fff8c9] bg-transparent px-4 py-4 text-lg text-[#fff8c9] outline-none placeholder:text-[#fff8c9]/35"
            />

            <input
              type="text"
              name="style"
              placeholder="Стиль, например: old school"
              value={formData.style}
              onChange={handleChange}
              className="w-full border border-[#fff8c9] bg-transparent px-4 py-4 text-lg text-[#fff8c9] outline-none placeholder:text-[#fff8c9]/35"
            />

            <textarea
              name="description"
              placeholder="Описание товара"
              value={formData.description}
              onChange={handleChange}
              className="h-[160px] w-full resize-none border border-[#fff8c9] bg-transparent px-4 py-4 text-lg text-[#fff8c9] outline-none placeholder:text-[#fff8c9]/35"
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full border border-[#fff8c9] px-4 py-4 text-lg text-[#fff8c9]"
            />

            <button
              type="submit"
              className="w-full border border-[#fff8c9] bg-[#fff8c9] py-5 text-lg uppercase text-[#1f0d07] transition hover:bg-transparent hover:text-[#fff8c9]"
            >
              Добавить товар
            </button>
          </div>
        </form>

        <aside className="h-fit border border-[#fff8c9] p-5 md:p-8">
          <h2 className="mb-6 text-3xl uppercase">Предпросмотр</h2>

          <div className="border border-[#fff8c9] bg-[#fff8c9] text-[#1f0d07]">
            {formData.image ? (
              <img
                src={formData.image}
                alt="preview"
                className="h-[320px] w-full object-cover"
              />
            ) : (
              <div className="flex h-[320px] items-center justify-center bg-[#1f0d07] text-[#fff8c9]">
                Фото товара
              </div>
            )}

            <div className="p-4">
              <h3 className="text-2xl uppercase">
                {formData.name || "Название товара"}
              </h3>

              <p className="mt-2 text-xl">
                {formData.price ? `${formData.price} ₽` : "Цена"}
              </p>

              <p className="mt-2 text-sm uppercase text-[#1f0d07]/60">
                {formData.category}
              </p>

              <p className="mt-4 text-sm text-[#1f0d07]/70">
                {formData.description || "Описание товара"}
              </p>
            </div>
          </div>
        </aside>
      </section>
    </main>
  )
}

export default Admin