import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { useCart } from "../context/CartContext"

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { cartItems } = useCart()

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const linkClass = "relative transition hover:text-[#d58b2a]"
  const activeClass = "text-[#d58b2a]"

  function closeMenu() {
    setIsMenuOpen(false)
  }

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-[#fff8c9]/30 bg-[#1f0d07]">
      <div className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[#fff8c9]/60 to-transparent" />

      <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-6 md:px-8">
        <Link
          to="/"
          onClick={closeMenu}
          className="text-3xl font-black tracking-tight text-[#fff8c9] md:text-4xl"
        >
          INKSPIRED
        </Link>

        <nav className="hidden items-center gap-10 text-xl uppercase tracking-wide text-[#fff8c9] md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ""}`
            }
          >
            Главная
          </NavLink>

          <NavLink
            to="/catalog"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ""}`
            }
          >
            Каталог
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ""}`
            }
          >
            Корзина
            {totalCount > 0 && (
              <span className="absolute -right-4 -top-3 flex h-6 min-w-[24px] items-center justify-center rounded-full bg-[#fff8c9] px-1 text-sm text-[#1f0d07]">
                {totalCount}
              </span>
            )}
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ""}`
            }
          >
            Профиль
          </NavLink>
        </nav>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 border border-[#fff8c9] md:hidden"
          aria-label="Открыть меню"
        >
          <span
            className={
              isMenuOpen
                ? "h-[2px] w-5 translate-y-2 rotate-45 bg-[#fff8c9] transition"
                : "h-[2px] w-5 bg-[#fff8c9] transition"
            }
          />
          <span
            className={
              isMenuOpen
                ? "h-[2px] w-5 opacity-0 bg-[#fff8c9] transition"
                : "h-[2px] w-5 bg-[#fff8c9] transition"
            }
          />
          <span
            className={
              isMenuOpen
                ? "h-[2px] w-5 -translate-y-2 -rotate-45 bg-[#fff8c9] transition"
                : "h-[2px] w-5 bg-[#fff8c9] transition"
            }
          />
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute left-0 top-20 z-40 w-full border-b border-[#fff8c9]/30 bg-[#1f0d07] px-6 py-8 md:hidden">
          <nav className="flex flex-col gap-6 text-3xl uppercase text-[#fff8c9]">
            <NavLink
              to="/"
              onClick={closeMenu}
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeClass : ""}`
              }
            >
              Главная
            </NavLink>

            <NavLink
              to="/catalog"
              onClick={closeMenu}
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeClass : ""}`
              }
            >
              Каталог
            </NavLink>

            <NavLink
              to="/cart"
              onClick={closeMenu}
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeClass : ""}`
              }
            >
              Корзина {totalCount > 0 && `(${totalCount})`}
            </NavLink>

            <NavLink
              to="/profile"
              onClick={closeMenu}
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeClass : ""}`
              }
            >
              Профиль
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header