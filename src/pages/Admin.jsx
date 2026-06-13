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
          <p className="mt-6 text-xl uppercase text-[#fff8c9]/70">Доступ только для администрации.</p>
        </section>
      </main>
    )
  }

  function handleImageUpload(e) {
    const file = e.target.files[0]
    if (!file) return

    // Оптимизация: проверяем размер файла (не более 2МБ для LocalStorage)
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
        updatedProducts = updatedProducts.map((p) => p.id === editingId ? { ...p, ...formData } : p)
        toast.success("Обновлено")
      } else {
        const newProduct = { ...formData, id: Date.now(), isAdminProduct: true }
        updatedProducts = [newProduct, ...updatedProducts]
        toast.success("Добавлено")
      }
      localStorage.setItem("adminProducts", JSON.stringify(updatedProducts))
      setAdminProducts(updatedProducts)
      setFormData({ name: "", price: "", category: "piercing", image: "", description: "", material: "", style: "" })
      setEditingId(null)
    } catch (err) {
      toast.error("Ошибка сохранения. Возможно, память переполнена.")
    }
  }

  return (
    <main className="min-h-screen bg-[#1f0d07] px-6 pb-20 pt-28 text-[#fff8c9] md:px-12">
      <h1 className="mb-10 text-4xl uppercase">{editingId ? "Редактирование" : "Добавить товар"}</h1>
      <div className="grid gap-10 lg:grid-cols-[1fr_400px]">
        <form onSubmit={handleSubmit} className="space-y-4 border border-[#fff8c9]/30 p-6">
          <input type="text" placeholder="Название" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full border border-[#fff8c9] bg-transparent p-3 outline-none" />
          <input type="number" placeholder="Цена" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full border border-[#fff8c9] bg-transparent p-3 outline-none" />
          <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full border border-[#fff8c9] bg-[#1f0d07] p-3 outline-none">
            <option value="piercing">Пирсинг</option>
            <option value="tunnels">Тоннели</option>
            <option value="earrings">Серьги</option>
          </select>
          <textarea placeholder="Описание" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full h-32 border border-[#fff8c9] bg-transparent p-3 outline-none resize-none" />
          <input type="file" accept="image/*" onChange={handleImageUpload} className="text-sm" />
          <button type="submit" className="w-full bg-[#fff8c9] py-4 text-[#1f0d07] uppercase font-bold transition hover:bg-transparent hover:text-[#fff8c9] border border-[#fff8c9]">
            {editingId ? "Сохранить изменения" : "Опубликовать товар"}
          </button>
        </form>

        <aside className="border border-[#fff8c9]/30 p-6 h-fit">
          <h2 className="text-2xl mb-4 uppercase">Список (Admin)</h2>
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            {adminProducts.map(p => (
              <div key={p.id} className="flex gap-4 border-b border-[#fff8c9]/10 pb-4">
                <img src={p.image} className="w-20 h-20 object-cover border border-[#fff8c9]/20" />
                <div className="flex-1">
                  <p className="uppercase font-bold">{p.name}</p>
                  <p className="text-[#d58b2a]">{p.price} ₽</p>
                  <div className="mt-2 flex gap-2">
                    <button onClick={() => {setFormData(p); setEditingId(p.id)}} className="text-xs border border-[#fff8c9] px-2 py-1">Ред.</button>
                    <button onClick={() => {
                      const upd = adminProducts.filter(i => i.id !== p.id);
                      localStorage.setItem("adminProducts", JSON.stringify(upd));
                      setAdminProducts(upd);
                    }} className="text-xs border border-red-500 px-2 py-1">Удалить</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </main>
  )
}

export default Admin
