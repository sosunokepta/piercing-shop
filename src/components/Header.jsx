import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { useCart } from "../context/CartContext"

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { cartItems } = useCart()

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const linkClass = "relative transition-colors duration-300 hover:text-[#d58b2a] focus:outline focus:outline-2 focus:outline-[#d58b2a] focus:outline-offset-4"
  const activeClass = "text-[#d58b2a] font-bold underline underline-offset-8"

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-[#fff8c9]/20 bg-[#1f0d07]">
      <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-6 md:px-8">
        <Link 
          to="/" 
          onClick={() => setIsMenuOpen(false)} 
          className="text-3xl font-black uppercase tracking-tight text-[#fff8c9] md:text-4xl"
          aria-label="Inkspired — На главную"
        >
          INKSPIRED
        </Link>

        <nav className="hidden items-center gap-10 text-xl uppercase tracking-wide text-[#fff8c9] md:flex" aria-label="Основное меню">
          <NavLink to="/" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ""}`}>Главная</NavLink>
          <NavLink to="/catalog" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ""}`}>Каталог</NavLink>
          <NavLink to="/cart" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ""}`} aria-label={`Корзина, товаров: ${totalCount}`}>
            Корзина
            {totalCount > 0 && (
              <span className="ml-2 inline-flex h-6 min-w-[24px] items-center justify-center rounded-full bg-[#fff8c9] px-2 text-sm font-bold text-[#1f0d07]">
                {totalCount}
              </span>
            )}
          </NavLink>
          <NavLink to="/profile" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ""}`}>Профиль</NavLink>
        </nav>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="relative z-50 flex h-12 w-12 flex-col items-center justify-center gap-1.5 border border-[#fff8c9] bg-transparent md:hidden"
          aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={isMenuOpen}
        >
          <span className={`h-[2px] w-6 bg-[#fff8c9] transition-transform duration-300 ${isMenuOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-[2px] w-6 bg-[#fff8c9] transition-opacity duration-300 ${isMenuOpen ? "opacity-0" : ""}`} />
          <span className={`h-[2px] w-6 bg-[#fff8c9] transition-transform duration-300 ${isMenuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute left-0 top-20 z-40 w-full border-b border-[#fff8c9]/30 bg-[#1f0d07] px-6 py-12 md:hidden">
          <nav className="flex flex-col gap-8 text-4xl uppercase text-[#fff8c9]" aria-label="Мобильное меню">
            <NavLink to="/" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? "text-[#d58b2a]" : ""}>Главная</NavLink>
            <NavLink to="/catalog" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? "text-[#d58b2a]" : ""}>Каталог</NavLink>
            <NavLink to="/cart" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? "text-[#d58b2a]" : ""}>Корзина ({totalCount})</NavLink>
            <NavLink to="/profile" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? "text-[#d58b2a]" : ""}>Профиль</NavLink>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
