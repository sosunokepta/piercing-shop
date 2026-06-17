import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import toast from "react-hot-toast"

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

  const [adminProducts, setAdminProducts] = useState([])
  const [contactRequests, setContactRequests] = useState([])
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("adminProducts")) || []
    const savedRequests = JSON.parse(localStorage.getItem("contactRequests")) || []

    setAdminProducts(savedProducts)
    setContactRequests(savedRequests)
  }, [])

  if (!user || user.role !== "admin") {
    return (
      <main className="min-h-screen bg-[#1f0d07] px-6 pb-20 pt-28 text-[#fff8c9] md:px-12 md:pt-32">
        <section className="mx-auto max-w-[760px] border border-[#fff8c9] p-8 text-center">
          <h1 className="text-5xl uppercase md:text-7xl">Нет доступа</h1>
          <p className="mt-6 text-xl uppercase text-[#fff8c9]/70">
            Доступ только для администрации.
          </p>
        </section>
      </main>
    )
  }

  function handleImageUpload(e) {
    const file = e.target.files[0]
    if (!file) return

    if (file.size > 2000000) {
      toast.error("Файл слишком большой. Максимум 2МБ")
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result })
    }
    reader.readAsDataURL(file)
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (!formData.name || !formData.price || !formData.image) {
      toast.error("Название, цена и фото обязательны")
      return
    }

    try {
      let updatedProducts = [...adminProducts]

      if (editingId) {
        updatedProducts = updatedProducts.map((product) =>
          product.id === editingId ? { ...product, ...formData } : product
        )
        toast.success("Товар обновлён")
      } else {
        const newProduct = {
          ...formData,
          id: Date.now(),
          isAdminProduct: true,
        }

        updatedProducts = [newProduct, ...updatedProducts]
        toast.success("Товар добавлен")
      }

      localStorage.setItem("adminProducts", JSON.stringify(updatedProducts))
      setAdminProducts(updatedProducts)
      setFormData({
        name: "",
        price: "",
        category: "piercing",
        image: "",
        description: "",
        material: "",
        style: "",
      })
      setEditingId(null)
    } catch (err) {
      toast.error("Ошибка сохранения. Возможно, память браузера переполнена.")
    }
  }

  function updateContactRequests(updatedRequests) {
    localStorage.setItem("contactRequests", JSON.stringify(updatedRequests))
    setContactRequests(updatedRequests)
  }

  function markRequestAsProcessed(id) {
    const updatedRequests = contactRequests.map((request) =>
      request.id === id ? { ...request, status: "processed" } : request
    )

    updateContactRequests(updatedRequests)
    toast.success("Обращение обработано")
  }

  function deleteContactRequest(id) {
    const updatedRequests = contactRequests.filter((request) => request.id !== id)

    updateContactRequests(updatedRequests)
    toast.success("Обращение удалено")
  }

  function handleDeleteProduct(id) {
    const updatedProducts = adminProducts.filter((product) => product.id !== id)

    localStorage.setItem("adminProducts", JSON.stringify(updatedProducts))
    setAdminProducts(updatedProducts)
    toast.success("Товар удалён")
  }

  function handleEditProduct(product) {
    setFormData(product)
    setEditingId(product.id)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <main className="min-h-screen bg-[#1f0d07] px-6 pb-20 pt-28 text-[#fff8c9] md:px-12">
      <h1 className="mb-10 text-4xl font-black uppercase md:text-6xl">
        {editingId ? "Редактирование товара" : "Административная панель"}
      </h1>

      <div className="grid gap-10 lg:grid-cols-[1fr_400px]">
        <form onSubmit={handleSubmit} className="space-y-4 border border-[#fff8c9]/30 p-6">
          <h2 className="text-2xl font-black uppercase">
            {editingId ? "Изменение товара" : "Добавить товар"}
          </h2>

          <input
            type="text"
            placeholder="Название"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border border-[#fff8c9] bg-transparent p-3 outline-none"
          />

          <input
            type="number"
            placeholder="Цена"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="w-full border border-[#fff8c9] bg-transparent p-3 outline-none"
          />

          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full border border-[#fff8c9] bg-[#1f0d07] p-3 outline-none"
          >
            <option value="piercing">Пирсинг</option>
            <option value="tunnels">Тоннели</option>
            <option value="earrings">Серьги</option>
          </select>

          <input
            type="text"
            placeholder="Материал"
            value={formData.material}
            onChange={(e) => setFormData({ ...formData, material: e.target.value })}
            className="w-full border border-[#fff8c9] bg-transparent p-3 outline-none"
          />

          <input
            type="text"
            placeholder="Стиль"
            value={formData.style}
            onChange={(e) => setFormData({ ...formData, style: e.target.value })}
            className="w-full border border-[#fff8c9] bg-transparent p-3 outline-none"
          />

          <textarea
            placeholder="Описание"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="h-32 w-full resize-none border border-[#fff8c9] bg-transparent p-3 outline-none"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="text-sm"
          />

          {formData.image && (
            <img
              src={formData.image}
              alt="Предпросмотр товара"
              className="h-40 w-40 border border-[#fff8c9]/30 object-cover"
            />
          )}

          <button
            type="submit"
            className="w-full border border-[#fff8c9] bg-[#fff8c9] py-4 font-bold uppercase text-[#1f0d07] transition hover:bg-transparent hover:text-[#fff8c9]"
          >
            {editingId ? "Сохранить изменения" : "Опубликовать товар"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null)
                setFormData({
                  name: "",
                  price: "",
                  category: "piercing",
                  image: "",
                  description: "",
                  material: "",
                  style: "",
                })
              }}
              className="w-full border border-[#fff8c9]/40 py-3 font-bold uppercase transition hover:border-[#d58b2a] hover:text-[#d58b2a]"
            >
              Отменить редактирование
            </button>
          )}
        </form>

        <aside className="h-fit border border-[#fff8c9]/30 p-6">
          <h2 className="mb-4 text-2xl font-black uppercase">
            Товары администратора
          </h2>

          <div className="max-h-[600px] space-y-4 overflow-y-auto pr-2">
            {adminProducts.length === 0 ? (
              <p className="text-[#fff8c9]/60">Добавленных товаров пока нет</p>
            ) : (
              adminProducts.map((product) => (
                <div key={product.id} className="flex gap-4 border-b border-[#fff8c9]/10 pb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-20 w-20 border border-[#fff8c9]/20 object-cover"
                  />

                  <div className="flex-1">
                    <p className="font-bold uppercase">{product.name}</p>
                    <p className="text-[#d58b2a]">{product.price} ₽</p>

                    <div className="mt-2 flex gap-2">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="border border-[#fff8c9] px-2 py-1 text-xs uppercase"
                      >
                        Ред.
                      </button>

                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="border border-red-500 px-2 py-1 text-xs uppercase text-red-300"
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </aside>
      </div>

      <section className="mt-12 border border-[#fff8c9]/30 p-6">
        <div className="flex flex-col gap-4 border-b border-[#fff8c9]/20 pb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-black uppercase">
              Обращения пользователей
            </h2>
            <p className="mt-2 text-[#fff8c9]/60">
              Заявки, отправленные через форму обратной связи на странице «Контакты».
            </p>
          </div>

          <span className="w-fit border border-[#d58b2a] px-4 py-2 text-sm font-bold uppercase text-[#d58b2a]">
            Всего: {contactRequests.length}
          </span>
        </div>

        {contactRequests.length === 0 ? (
          <p className="py-8 text-xl uppercase text-[#fff8c9]/60">
            Обращений пока нет
          </p>
        ) : (
          <div className="mt-6 grid gap-4">
            {contactRequests.map((request) => (
              <article key={request.id} className="border border-[#fff8c9]/20 p-5">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-2xl font-bold uppercase">{request.name}</p>
                    <p className="mt-1 text-[#d58b2a]">{request.contact}</p>
                    <p className="mt-1 text-sm uppercase text-[#fff8c9]/50">
                      {request.createdAt}
                    </p>
                  </div>

                  <span className={`w-fit px-3 py-1 text-xs font-bold uppercase ${request.status === "processed" ? "bg-green-700 text-white" : "bg-[#d58b2a] text-[#1f0d07]"}`}>
                    {request.status === "processed" ? "Обработано" : "Новое"}
                  </span>
                </div>

                <p className="mt-4 whitespace-pre-line text-lg leading-relaxed text-[#fff8c9]/85">
                  {request.message}
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  {request.status !== "processed" && (
                    <button
                      onClick={() => markRequestAsProcessed(request.id)}
                      className="border border-[#fff8c9] px-4 py-2 text-sm font-bold uppercase transition hover:bg-[#fff8c9] hover:text-[#1f0d07]"
                    >
                      Отметить обработанным
                    </button>
                  )}

                  <button
                    onClick={() => deleteContactRequest(request.id)}
                    className="border border-red-500 px-4 py-2 text-sm font-bold uppercase text-red-300 transition hover:bg-red-500 hover:text-white"
                  >
                    Удалить
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default Admin