import { Link } from "react-router-dom"
import { motion } from "framer-motion"

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-[#fff8c9]/10 bg-[#1f0d07] py-16 text-[#fff8c9] md:py-24">
      {/* Декоративный градиент сверху */}
      <div className="absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[#fff8c9]/30 to-transparent" />

      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="grid gap-16 lg:grid-cols-[1fr_0.6fr]">
          {/* Левая часть: Инфо и Соцсети */}
          <div className="max-w-[500px]">
            <Link
              to="/"
              className="text-4xl font-black uppercase tracking-tighter transition hover:text-[#d58b2a]"
            >
              INKSPIRED
            </Link>
            <p className="mt-8 text-xl leading-relaxed text-[#fff8c9]/60">
              Студия профессионального пирсинга и магазин эксклюзивных украшений. 
              Мы объединяем эстетику Old School Tattoo с высочайшими стандартами стерильности.
            </p>

            <div className="mt-10 flex gap-6">
              {[
                { name: "VK", url: "https://vk.com" },
                { name: "TG", url: "https://t.me" },
                { name: "IG", url: "https://instagram.com" },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Перейти в ${social.name}`}
                  className="flex h-12 w-12 items-center justify-center border border-[#fff8c9]/20 text-sm font-bold uppercase transition hover:border-[#d58b2a] hover:bg-[#d58b2a] hover:text-[#1f0d07]"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>

          {/* Правая часть: Навигация */}
          <div className="grid grid-cols-2 gap-10 md:grid-cols-3">
            <div className="flex flex-col gap-5">
              <p className="text-xs uppercase tracking-[0.3em] text-[#fff8c9]/30">
                Магазин
              </p>
              <Link to="/catalog" className="text-lg uppercase transition hover:text-[#d58b2a]">
                Каталог
              </Link>
              <Link to="/cart" className="text-lg uppercase transition hover:text-[#d58b2a]">
                Корзина
              </Link>
            </div>

            <div className="flex flex-col gap-5">
              <p className="text-xs uppercase tracking-[0.3em] text-[#fff8c9]/30">
                Аккаунт
              </p>
              <Link to="/profile" className="text-lg uppercase transition hover:text-[#d58b2a]">
                Профиль
              </Link>
              <Link to="/login" className="text-lg uppercase transition hover:text-[#d58b2a]">
                Войти
              </Link>
            </div>

            <div className="hidden flex-col gap-5 md:flex">
              <p className="text-xs uppercase tracking-[0.3em] text-[#fff8c9]/30">
                Локация
              </p>
              <span className="text-lg uppercase opacity-60">Владивосток</span>
              <span className="text-lg uppercase opacity-60">24/7</span>
            </div>
          </div>
        </div>

        {/* Нижняя часть */}
        <div className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-[#fff8c9]/10 pt-10 text-xs uppercase tracking-[0.2em] text-[#fff8c9]/30 md:flex-row">
          <p>© {currentYear} INKSPIRED PIERCING STUDIO</p>
          <p>Разработка: Рыжов И. Д.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
