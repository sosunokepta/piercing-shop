import { useState } from "react"
import toast from "react-hot-toast"

const initialForm = {
  name: "",
  contact: "",
  message: "",
}

function sanitize(value) {
  return String(value)
    .replace(/[<>]/g, "")
    .trim()
}

function Contacts() {
  const [formData, setFormData] = useState(initialForm)

  function handleChange(e) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()

    const request = {
      id: Date.now(),
      name: sanitize(formData.name),
      contact: sanitize(formData.contact),
      message: sanitize(formData.message),
      status: "new",
      createdAt: new Date().toLocaleString("ru-RU"),
    }

    if (request.name.length < 2) {
      toast.error("Укажите имя")
      return
    }

    if (request.contact.length < 5) {
      toast.error("Укажите телефон или e-mail")
      return
    }

    if (request.message.length < 10) {
      toast.error("Сообщение должно быть не короче 10 символов")
      return
    }

    const savedRequests = JSON.parse(localStorage.getItem("contactRequests")) || []
    const updatedRequests = [request, ...savedRequests]

    localStorage.setItem("contactRequests", JSON.stringify(updatedRequests))
    setFormData(initialForm)
    toast.success("Обращение отправлено")
  }

  return (
    <main className="min-h-screen bg-[#1f0d07] px-6 pb-20 pt-28 text-[#fff8c9] md:px-12 md:pt-32">
      <section className="mx-auto max-w-[1600px]">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1fr]">
          <div className="border border-[#fff8c9]/30 p-6 md:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#d58b2a]">
              Связь с магазином
            </p>

            <h1 className="mt-6 text-5xl font-black uppercase leading-none md:text-7xl">
              Контакты
            </h1>

            <p className="mt-8 max-w-[620px] text-xl leading-relaxed text-[#fff8c9]/80">
              Через форму обратной связи можно задать вопрос по наличию украшений, материалу изделия, оформлению заказа или доставке. Обращение сохраняется в системе и отображается в административной панели.
            </p>

            <div className="mt-10 space-y-5 text-lg uppercase text-[#fff8c9]/90">
              <p>
                <span className="text-[#d58b2a]">Адрес:</span> г. Владивосток, ул. Шепеткова, д. 60, к. 411
              </p>
              <p>
                <span className="text-[#d58b2a]">Телефон:</span> +7 (800) 504-50-50
              </p>
              <p>
                <span className="text-[#d58b2a]">E-mail:</span> inkspired-shop@mail.ru
              </p>
              <p>
                <span className="text-[#d58b2a]">Режим работы:</span> ежедневно, 10:00–20:00
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 border border-[#fff8c9]/30 p-6 md:p-10">
            <h2 className="text-3xl font-black uppercase md:text-4xl">
              Форма обратной связи
            </h2>

            <label className="block">
              <span className="mb-2 block text-sm font-bold uppercase tracking-[0.18em] text-[#fff8c9]/60">
                Имя
              </span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Введите имя"
                className="w-full border border-[#fff8c9]/50 bg-transparent p-4 text-lg outline-none transition focus:border-[#d58b2a]"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-bold uppercase tracking-[0.18em] text-[#fff8c9]/60">
                Телефон или e-mail
              </span>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Введите контакт для ответа"
                className="w-full border border-[#fff8c9]/50 bg-transparent p-4 text-lg outline-none transition focus:border-[#d58b2a]"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-bold uppercase tracking-[0.18em] text-[#fff8c9]/60">
                Сообщение
              </span>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Напишите вопрос по товару, заказу или доставке"
                className="h-44 w-full resize-none border border-[#fff8c9]/50 bg-transparent p-4 text-lg outline-none transition focus:border-[#d58b2a]"
              />
            </label>

            <button
              type="submit"
              className="w-full border border-[#fff8c9] bg-[#fff8c9] px-8 py-5 text-lg font-black uppercase text-[#1f0d07] transition hover:bg-transparent hover:text-[#fff8c9]"
            >
              Отправить обращение
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}

export default Contacts