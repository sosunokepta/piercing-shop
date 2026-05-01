function Footer() {
  return (
    <footer className="border-t border-[#fff8c9]/30 bg-[#1f0d07] px-6 py-16 text-[#fff8c9] md:px-12">
      <div className="mx-auto grid max-w-[1200px] gap-12 md:grid-cols-2">
        <div>
          <h3 className="mb-6 text-4xl uppercase">INKSPIRED</h3>

          <p className="max-w-[520px] text-lg text-[#fff8c9]/70">
            Украшения для пирсинга станущие не просто дополнением, а изюменкой твоего образа
          </p>

          <div className="mt-6 space-y-2 text-lg">
            <p>Тел: 8964494564</p>
            <p>г. Владивосток, ул. Шепеткова д. 60 к. 411</p>
          </div>

          <div className="mt-6 flex gap-6 text-lg uppercase">
            <a
              href="https://www.instagram.com/pososi_ska?igsh=eTA4NWR6YXJkYXd2&utm_source=qr"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-[#d58b2a]"
            >
              Instagram
            </a>

            <a
              href="https://t.me/TattooMashinkin"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-[#d58b2a]"
            >
              Telegram
            </a>

            <a
              href="https://vk.ru/pososi_ska"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-[#d58b2a]"
            >
              VK
            </a>
          </div>
        </div>

        <div className="overflow-hidden border border-[#fff8c9]/40">
          <iframe
            title="INKSPIRED location map"
            src="https://yandex.ru/map-widget/v1/?ll=131.941279%2C43.118346&mode=whatshere&whatshere%5Bpoint%5D=131.941279%2C43.118346&whatshere%5Bzoom%5D=17&z=17"
            width="100%"
            height="320"
            frameBorder="0"
            allowFullScreen
          />
        </div>
      </div>

      <div className="mt-12 border-t border-[#fff8c9]/20 pt-8 text-center text-[#fff8c9]/60">
        <p>Made by Ryzhov Ilya Dmitrievich</p>
        <p className="mt-2">All rights reserved</p>
      </div>
    </footer>
  )
}

export default Footer