import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

import { useAuth } from "../context/AuthContext"

function EditProfile() {
  const navigate = useNavigate()
  const { user, updateUser } = useAuth()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  })

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        password: user.password || "",
      })
    }
  }, [user])

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      toast.error("Заполни все поля")
      return
    }

    updateUser(formData)
    toast.success("Профиль обновлён")
    navigate("/profile")
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-[#1f0d07] px-6 pb-20 pt-32 text-[#fff8c9] md:px-12">
        <div className="mx-auto max-w-[760px] border border-[#fff8c9] p-8">
          <h1 className="text-5xl uppercase md:text-7xl">Нет доступа</h1>

          <p className="mt-6 text-xl uppercase text-[#fff8c9]/70">
            Сначала войдите в аккаунт, чтобы редактировать профиль.
          </p>

          <Link
            to="/login"
            className="mt-8 inline-block border border-[#fff8c9] px-8 py-4 text-xl uppercase transition hover:bg-[#fff8c9] hover:text-[#1f0d07]"
          >
            Войти
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#1f0d07] px-6 pb-20 pt-32 text-[#fff8c9] md:px-12">
      <section className="mx-auto grid max-w-[1100px] overflow-hidden border border-[#fff8c9] lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex min-h-[620px] flex-col justify-between border-b border-[#fff8c9] bg-[#fff8c9] p-8 text-[#1f0d07] lg:border-b-0 lg:border-r">
          <div>
            <p className="text-xl uppercase tracking-[0.25em]">
              Account settings
            </p>

            <h1 className="mt-8 text-6xl uppercase leading-[0.9] md:text-8xl">
              Изменить
              <br />
              профиль
            </h1>
          </div>

          <p className="max-w-[420px] text-xl uppercase leading-tight">
            Обновите имя, почту, телефон или пароль аккаунта.
          </p>
        </div>

        <div className="bg-[#1f0d07] p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block">
              <span className="mb-3 block text-lg uppercase text-[#fff8c9]/70">
                Имя
              </span>
              <input
                type="text"
                name="name"
                placeholder="Имя"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-[#fff8c9] bg-transparent px-5 py-4 text-xl text-[#fff8c9] outline-none transition placeholder:text-[#fff8c9]/30 focus:bg-[#fff8c9] focus:text-[#1f0d07]"
              />
            </label>

            <label className="block">
              <span className="mb-3 block text-lg uppercase text-[#fff8c9]/70">
                Почта
              </span>
              <input
                type="email"
                name="email"
                placeholder="Почта"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-[#fff8c9] bg-transparent px-5 py-4 text-xl text-[#fff8c9] outline-none transition placeholder:text-[#fff8c9]/30 focus:bg-[#fff8c9] focus:text-[#1f0d07]"
              />
            </label>

            <label className="block">
              <span className="mb-3 block text-lg uppercase text-[#fff8c9]/70">
                Телефон
              </span>
              <input
                type="text"
                name="phone"
                placeholder="Телефон"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-[#fff8c9] bg-transparent px-5 py-4 text-xl text-[#fff8c9] outline-none transition placeholder:text-[#fff8c9]/30 focus:bg-[#fff8c9] focus:text-[#1f0d07]"
              />
            </label>

            <label className="block">
              <span className="mb-3 block text-lg uppercase text-[#fff8c9]/70">
                Пароль
              </span>
              <input
                type="password"
                name="password"
                placeholder="Пароль"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-[#fff8c9] bg-transparent px-5 py-4 text-xl text-[#fff8c9] outline-none transition placeholder:text-[#fff8c9]/30 focus:bg-[#fff8c9] focus:text-[#1f0d07]"
              />
            </label>

            <button
              type="submit"
              className="w-full border border-[#fff8c9] bg-[#fff8c9] py-5 text-xl uppercase text-[#1f0d07] transition hover:bg-transparent hover:text-[#fff8c9]"
            >
              Сохранить
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}

export default EditProfile