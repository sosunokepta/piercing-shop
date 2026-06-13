import { Link } from "react-router-dom"

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-[#fff8c9]/10 bg-[#1f0d07] py-16 text-[#fff8c9] md:py-24">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="grid gap-16 lg:grid-cols-[1fr_0.6fr]">
          <div className="max-w-[500px]">
            <Link to="/" className="text-4xl font-black uppercase tracking-tighter transition hover:text-[#d58b2a]">
              INKSPIRED
            </Link>
            <p className="mt-8 text-xl leading-relaxed text-[#fff8c9]/80">
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
                  aria-label={`Перейти в социальную сеть ${social.name}`}
                  className="flex h-12 w-12 items-center justify-center border border-[#fff8c9]/40 text-sm font-bold uppercase transition hover:border-[#d58b2a] hover:bg-[#d58b2a] hover:text-[#1f0d07]"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 md:grid-cols-3">
            <div className="flex flex-col gap-5">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#fff8c9]/40">Магазин</p>
              <Link to="/catalog" className="text-lg uppercase hover:text-[#d58b2a]">Каталог</Link>
              <Link to="/cart" className="text-lg uppercase hover:text-[#d58b2a]">Корзина</Link>
            </div>
            <div className="flex flex-col gap-5">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#fff8c9]/40">Аккаунт</p>
              <Link to="/profile" className="text-lg uppercase hover:text-[#d58b2a]">Профиль</Link>
              <Link to="/login" className="text-lg uppercase hover:text-[#d58b2a]">Войти</Link>
            </div>
          </div>
        </div>

        <div className="mt-20 border-t border-[#fff8c9]/10 pt-10 text-xs uppercase tracking-[0.2em] text-[#fff8c9]/40 flex flex-col md:flex-row justify-between gap-4">
          <p>© {currentYear} INKSPIRED PIERCING STUDIO</p>
          <p>Разработка: Рыжов И. Д.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
