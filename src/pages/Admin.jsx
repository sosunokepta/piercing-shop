import { useState, useEffect } from "react"
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
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("adminProducts")) || []
    setAdminProducts(saved)
  }, [])

  if (!user || user.role !== "admin") {
    return (
      <main className="min-h-screen bg-[#1f0d07] px-6 pb-20 pt-28 text-[#fff8c9] md:px-12 md:pt-32">
        <section className="mx-auto max-w-[760px] border border-[#fff8c9] p-8 text-center">
          <h1 className="text-5xl uppercase md:text-7xl">Нет доступа</h1>
          <p className="mt-6 text-xl uppercase text-[#fff8c9]/70">
            Эта страница доступна только администратору.
          </p>
        </section>
      </main>
    )
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  function handleImageUpload(e) {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result })
    }
    reader.readAsDataURL(file)
  }

  function resetForm() {
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
  }

  function handleSubmit(e) {
    e.preventDefault()
    const { name, price, category, image, description, material, style } = formData

    if (!name || !price || !category || !image || !description || !material || !style) {
      toast.error("Заполни все поля")
      return
    }

    let updatedProducts = [...adminProducts]

    if (editingId) {
      // редактирование
      updatedProducts = updatedProducts.map((p) =>
        p.id === editingId ? { ...p, ...formData } : p
      )
      toast.success("Товар обновлён")
    } else {
      // добавление
      const newProduct = { ...formData, id: Date.now(), isAdminProduct: true }
      updatedProducts = [newProduct, ...updatedProducts]
      toast.success("Товар добавлен")
    }

    localStorage.setItem("adminProducts", JSON.stringify(updatedProducts))
    setAdminProducts(updatedProducts)
    resetForm()
  }

  function handleEdit(product) {
    setFormData(product)
    setEditingId(product.id)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function handleDelete(id) {
    if (!confirm("Вы уверены, что хотите удалить товар?")) return
    const updatedProducts = adminProducts.filter((p) => p.id !== id)
    localStorage.setItem("adminProducts", JSON.stringify(updatedProducts))
    setAdminProducts(updatedProducts)
    toast.success("Товар удалён")
  }

  return (
    <main className="min-h-screen bg-[#1f0d07] px-6 pb-20 pt-28 text-[#fff8c9] md:px-12 md:pt-32">
      <div className="mb-10">
        <h1 className="text-5xl uppercase md:text-7xl">{editingId ? "Редактировать товар" : "Добавить товар"}</h1>
      </div>

      <section className="grid gap-10 lg:grid-cols-[1fr_420px]">
        {/* Форма добавления/редактирования */}
        <form onSubmit={handleSubmit} className="border border-[#fff8c9] p-5 md:p-8 space-y-5">
          <input type="text" name="name" placeholder="Название" value={formData.name} onChange={handleChange} className="w-full border border-[#fff8c9] bg-transparent px-4 py-3 text-lg text-[#fff8c9] outline-none" />
          <input type="number" name="price" placeholder="Цена" value={formData.price} onChange={handleChange} className="w-full border border-[#fff8c9] bg-transparent px-4 py-3 text-lg text-[#fff8c9] outline-none" />
          <select name="category" value={formData.category} onChange={handleChange} className="w-full border border-[#fff8c9] bg-[#1f0d07] px-4 py-3 text-lg text-[#fff8c9] outline-none">
            <option value="piercing">Пирсинг</option>
            <option value="tunnels">Тоннели</option>
            <option value="earrings">Серьги</option>
          </select>
          <input type="text" name="material" placeholder="Материал" value={formData.material} onChange={handleChange} className="w-full border border-[#fff8c9] bg-transparent px-4 py-3 text-lg text-[#fff8c9] outline-none" />
          <input type="text" name="style" placeholder="Стиль" value={formData.style} onChange={handleChange} className="w-full border border-[#fff8c9] bg-transparent px-4 py-3 text-lg text-[#fff8c9] outline-none" />
          <textarea name="description" placeholder="Описание" value={formData.description} onChange={handleChange} className="w-full h-[120px] border border-[#fff8c9] bg-transparent px-4 py-3 text-lg text-[#fff8c9] outline-none resize-none" />
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          <button type="submit" className="w-full border border-[#fff8c9] bg-[#fff8c9] py-3 text-lg uppercase text-[#1f0d07]">{editingId ? "Обновить" : "Добавить"}</button>
        </form>

        {/* Список товаров */}
        <aside className="h-fit border border-[#fff8c9] p-5 md:p-8">
          <h2 className="mb-6 text-3xl uppercase">Список товаров</h2>
          <div className="space-y-4 max-h-[500px] overflow-y-auto">
            {adminProducts.length === 0 ? (
              <p className="text-[#fff8c9]/70">Товары отсутствуют</p>
            ) : (
              adminProducts.map((p) => (
                <div key={p.id} className="flex items-center justify-between border border-[#fff8c9]/30 p-3">
                  <div className="flex items-center gap-3">
                    <img src={p.image} alt={p.name} className="w-16 h-16 object-cover border border-[#fff8c9]" />
                    <div>
                      <p className="text-lg uppercase">{p.name}</p>
                      <p className="text-sm text-[#fff8c9]/70">{p.price} ₽</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(p)} className="border border-[#fff8c9] px-3 py-1 uppercase text-sm hover:bg-[#fff8c9] hover:text-[#1f0d07]">Редактировать</button>
                    <button onClick={() => handleDelete(p.id)} className="border border-[#fff8c9] px-3 py-1 uppercase text-sm hover:bg-[#fff8c9] hover:text-[#1f0d07]">Удалить</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </aside>
      </section>
    </main>
  )
}

export default Admin