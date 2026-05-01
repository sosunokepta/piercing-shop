import { Link } from "react-router-dom"

import products from "../data/products"

import heroImage from "../assets/hero-shop.jpg"
import piercingImage from "../assets/category-piercing.jpg"
import tunnelsImage from "../assets/category-tunnels.jpg"
import earringsImage from "../assets/category-earrings.jpg"

function Home() {
  const popularProducts = products.slice(0, 4)

  return (
    <main className="min-h-screen bg-[#1f0d07] text-[#fff8c9]">
      
      {/* HERO */}
      <section className="relative h-[85vh] w-full overflow-hidden md:h-screen">
        <img
          src={heroImage}
          alt="Винтажный тату и пирсинг салон"
          className="absolute inset-0 h-full w-full object-cover brightness-[0.42]"
        />

        <div className="absolute inset-0 bg-[#1f0d07]/45" />

        <div className="relative z-10 flex h-full flex-col justify-center px-6 md:px-12">
          
          <p className="mb-4 text-lg uppercase tracking-[0.2em] md:text-2xl">
            Old school piercing jewelry
          </p>

          <h1 className="max-w-[1100px] text-[56px] uppercase leading-[0.9] md:text-[120px] xl:text-[170px]">
            Jewelry
            <br />
            with soul
          </h1>

          <p className="mt-8 max-w-[620px] text-lg uppercase leading-relaxed text-[#fff8c9]/80 md:text-2xl">
            Пирсинг, тоннели и серьги с душой
          </p>

          {/* КНОПКИ (ПОФИКШЕНЫ) */}
          <div className="mt-10 flex flex-wrap gap-4">

            <Link
              to="/catalog"
              className="inline-block border border-[#fff8c9] px-6 py-3 text-sm uppercase text-[#fff8c9] transition duration-300 hover:bg-[#fff8c9] hover:text-[#1f0d07] md:px-10 md:py-5 md:text-xl"
            >
              Перейти в каталог
            </Link>

            <a
              href="#popular"
              className="inline-block border border-[#fff8c9] px-6 py-3 text-sm uppercase text-[#fff8c9] transition duration-300 hover:bg-[#fff8c9] hover:text-[#1f0d07] md:px-10 md:py-5 md:text-xl"
            >
              Популярное
            </a>

          </div>
        </div>
      </section>

      {/* ПРЕИМУЩЕСТВА */}
      <section className="grid gap-10 border-y border-[#fff8c9]/30 px-6 py-16 md:grid-cols-3 md:px-12">
        <div>
          <h3 className="mt-4 text-2xl uppercase">Металл</h3>
          <p className="mt-3 text-[#fff8c9]/70">
            Украшения из стали, титана и качественных сплавов.
          </p>
        </div>

        <div>
          <h3 className="mt-4 text-2xl uppercase">Доступность</h3>
          <p className="mt-3 text-[#fff8c9]/70">
            Доставка по всей России.
          </p>
        </div>

        <div>
          <h3 className="mt-4 text-2xl uppercase">Выбор</h3>
          <p className="mt-3 text-[#fff8c9]/70">
            Пирсинг, тоннели и серьги под любой образ.
          </p>
        </div>
      </section>

      {/* О НАС */}
      <section className="grid gap-12 px-6 py-20 md:grid-cols-[0.9fr_1.1fr] md:px-12 md:py-28">
        <div>
          <p className="mb-4 text-xl uppercase tracking-[0.2em] text-[#fff8c9]/60">
            About us
          </p>

          <h2 className="text-5xl uppercase md:text-7xl">
            Украшения с характером 
            <br />
            и 
            <br />
            душой
          </h2>
        </div>

        <div className="text-xl leading-relaxed text-[#fff8c9]/75 md:text-2xl">
          <p>
            INKSPIRED — магазин украшений для пирсинга, тоннелей и серёг,
            c огромным выбором под любой вкус
          </p>

          <p className="mt-6">
            Мы создаём атмосферу, где украшения становятся частью образа,
            а не просто аксессуаром.
          </p>
        </div>
      </section>

      {/* КАТЕГОРИИ */}
      <section className="px-6 py-16 md:px-12 md:py-24">
        <h2 className="mb-10 text-3xl uppercase md:mb-16 md:text-5xl">
          Категории
        </h2>

        <div className="flex flex-col gap-8 md:flex-row md:flex-nowrap md:items-start md:justify-center md:gap-8 xl:gap-12">
          
          <Link
            to="/catalog?category=piercing"
            className="group block w-full border border-[#fff8c9] bg-[#fff8c9] text-[#1f0d07] transition duration-300 hover:-translate-y-3 md:w-[30%] xl:w-[360px]"
          >
            <img
              src={piercingImage}
              alt="Пирсинг"
              className="h-[300px] w-full object-cover brightness-75 md:h-[520px]"
            />
            <div className="px-4 py-3 md:px-5 md:py-4">
              <h3 className="text-2xl uppercase md:text-4xl">Пирсинг</h3>
            </div>
          </Link>

          <Link
            to="/catalog?category=tunnels"
            className="group block w-full border border-[#fff8c9] bg-[#fff8c9] text-[#1f0d07] transition duration-300 hover:-translate-y-3 md:mt-32 md:w-[30%] xl:w-[360px]"
          >
            <img
              src={tunnelsImage}
              alt="Тоннели"
              className="h-[300px] w-full object-cover brightness-75 md:h-[520px]"
            />
            <div className="px-4 py-3 md:px-5 md:py-4">
              <h3 className="text-2xl uppercase md:text-4xl">Тоннели</h3>
            </div>
          </Link>

          <Link
            to="/catalog?category=earrings"
            className="group block w-full border border-[#fff8c9] bg-[#fff8c9] text-[#1f0d07] transition duration-300 hover:-translate-y-3 md:w-[30%] xl:w-[360px]"
          >
            <img
              src={earringsImage}
              alt="Серьги"
              className="h-[300px] w-full object-cover brightness-75 md:h-[520px]"
            />
            <div className="px-4 py-3 md:px-5 md:py-4">
              <h3 className="text-2xl uppercase md:text-4xl">Серьги</h3>
            </div>
          </Link>

        </div>
      </section>

      {/* ПОПУЛЯРНЫЕ */}
      <section id="popular" className="px-6 py-20 md:px-12 md:py-28">
        <h2 className="mb-12 text-5xl uppercase md:text-7xl">
          Популярные товары
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
          {popularProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="group border border-[#fff8c9] bg-[#fff8c9] text-[#1f0d07] transition duration-300 hover:-translate-y-2"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-[320px] w-full object-cover brightness-75"
              />

              <div className="p-4">
                <h3 className="text-2xl uppercase">{product.name}</h3>
                <p className="mt-2 text-xl">{product.price} ₽</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* РАЗДЕЛИТЕЛЬ С ФУТЕРОМ */}
      <div className="mx-auto w-[90%] border-t border-[#fff8c9]/40"></div>

    </main>
  )
}

export default Home