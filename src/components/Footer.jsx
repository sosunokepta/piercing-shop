import { Link } from "react-router-dom"

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-[#fff8c9]/20 bg-[#1f0d07] py-16 text-[#fff8c9] md:py-24">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="grid gap-16 lg:grid-cols-[1fr_0.6fr]">
          <div className="max-w-[500px]">
            <Link to="/" className="text-4xl font-black uppercase tracking-tighter transition-colors hover:text-[#d58b2a]">
              INKSPIRED
            </Link>

            <p className="mt-8 text-xl leading-relaxed text-[#fff8c9]/90">
              Магазин пирсинг-украшений во Владивостоке. Мы предлагаем украшения разных категорий, удобный каталог и оформление заказа через сайт.
            </p>

            <div className="mt-10 flex gap-6">
              {[
                { name: "ВКонтакте", url: "https://vk.com", short: "VK" },
                { name: "Telegram", url: "https://t.me", short: "TG" },
                { name: "Instagram", url: "https://instagram.com", short: "IG" },
              ].map((social) => (
                <a
                  key={social.short}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Мы в ${social.name}`}
                  className="flex h-14 w-14 items-center justify-center border-2 border-[#fff8c9]/40 text-sm font-bold uppercase transition-all hover:border-[#d58b2a] hover:bg-[#d58b2a] hover:text-[#1f0d07] focus:outline focus:outline-2 focus:outline-[#d58b2a]"
                >
                  {social.short}
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 md:grid-cols-3">
            <nav className="flex flex-col gap-5" aria-label="Навигация в футере">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#fff8c9]/50">Магазин</p>
              <Link to="/catalog" className="text-lg uppercase hover:text-[#d58b2a] hover:underline underline-offset-4">
                Каталог
              </Link>
              <Link to="/cart" className="text-lg uppercase hover:text-[#d58b2a] hover:underline underline-offset-4">
                Корзина
              </Link>
              <Link to="/contacts" className="text-lg uppercase hover:text-[#d58b2a] hover:underline underline-offset-4">
                Контакты
              </Link>
              <Link to="/personal-data-policy" className="text-lg uppercase hover:text-[#d58b2a] hover:underline underline-offset-4">
                Персональные данные
              </Link>
            </nav>

            <nav className="flex flex-col gap-5" aria-label="Аккаунт в футере">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#fff8c9]/50">Аккаунт</p>
              <Link to="/profile" className="text-lg uppercase hover:text-[#d58b2a] hover:underline underline-offset-4">
                Профиль
              </Link>
              <Link to="/login" className="text-lg uppercase hover:text-[#d58b2a] hover:underline underline-offset-4">
                Войти
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-20 flex flex-col justify-between gap-6 border-t border-[#fff8c9]/20 pt-10 text-sm uppercase tracking-[0.2em] text-[#fff8c9]/50 md:flex-row">
          <p>© {currentYear} INKSPIRED PIERCING STUDIO</p>
          <p>Разработка информационной системы: Рыжов И. Д.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer