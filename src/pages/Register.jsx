import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

import { useAuth } from "../context/AuthContext"

function Register() {
  const navigate = useNavigate()
  const { register } = useAuth()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    personalDataConsent: false,
  })

  function handleChange(event) {
    const { name, value, type, checked } = event.target

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      toast.error("Заполни все поля")
      return
    }

    if (!formData.email.includes("@")) {
      toast.error("Введите корректную почту")
      return
    }

    if (formData.password.length < 6) {
      toast.error("Пароль минимум 6 символов")
      return
    }

    if (!formData.personalDataConsent) {
      toast.error("Нужно дать согласие на обработку персональных данных")
      return
    }

    const accountData = {
      ...formData,
      personalDataConsentDate: new Date().toLocaleString("ru-RU"),
    }

    localStorage.setItem("account", JSON.stringify(accountData))
    register(accountData)

    toast.success("Регистрация успешна")
    navigate("/profile")
  }

  return (
    <main className="min-h-screen bg-[#1f0d07] px-6 pb-20 pt-32 text-[#fff8c9] md:px-12">
      <section className="mx-auto grid max-w-[1100px] overflow-hidden border border-[#fff8c9] lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex min-h-[620px] flex-col justify-between border-b border-[#fff8c9] bg-[#fff8c9] p-8 text-[#1f0d07] lg:border-b-0 lg:border-r">
          <div>
            <p className="text-xl uppercase tracking-[0.25em]">
              Join the club
            </p>

            <h1 className="mt-8 text-6xl uppercase leading-[0.9] md:text-8xl">
              Создать
              <br />
              аккаунт
            </h1>
          </div>

          <p className="max-w-[420px] text-xl uppercase leading-tight">
            Зарегистрируйся, чтобы сохранять данные профиля и быстрее оформлять заказы.
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
                placeholder="Илья"
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
                placeholder="example@mail.com"
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
                placeholder="+7 999 999 99 99"
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
                placeholder="Минимум 6 символов"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-[#fff8c9] bg-transparent px-5 py-4 text-xl text-[#fff8c9] outline-none transition placeholder:text-[#fff8c9]/30 focus:bg-[#fff8c9] focus:text-[#1f0d07]"
              />
            </label>

            <label className="flex cursor-pointer gap-4 border border-[#fff8c9]/40 p-4 text-base leading-relaxed text-[#fff8c9]/80">
              <input
                type="checkbox"
                name="personalDataConsent"
                checked={formData.personalDataConsent}
                onChange={handleChange}
                className="mt-1 h-5 w-5 shrink-0 accent-[#d58b2a]"
              />
              <span>
                Я даю согласие на обработку персональных данных и подтверждаю, что ознакомлен с{" "}
                <Link
                  to="/personal-data-policy"
                  className="font-bold text-[#fff8c9] underline underline-offset-4 transition hover:text-[#d58b2a]"
                >
                  правилами обработки персональных данных
                </Link>
                .
              </span>
            </label>

            <button
              type="submit"
              className="w-full border border-[#fff8c9] bg-[#fff8c9] py-5 text-xl uppercase text-[#1f0d07] transition hover:bg-transparent hover:text-[#fff8c9]"
            >
              Зарегистрироваться
            </button>
          </form>

          <div className="mt-8 border-t border-[#fff8c9]/30 pt-6">
            <p className="text-lg text-[#fff8c9]/70">
              Уже есть аккаунт?{" "}
              <Link to="/login" className="text-[#fff8c9] underline">
                Войти
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Register