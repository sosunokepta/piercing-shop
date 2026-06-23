import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getCookie, setCookie } from "../utils/cookies"

const COOKIE_NAME = "inkspired_cookie_consent"

function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const savedConsent = getCookie(COOKIE_NAME)

    if (!savedConsent) {
      setIsVisible(true)
    }
  }, [])

  function saveConsent(value) {
    setCookie(COOKIE_NAME, value)
    setIsVisible(false)
  }

  if (!isVisible) {
    return null
  }

  return (
    <section
      className="fixed bottom-0 left-0 z-[70] w-full border-t-2 border-[#fff8c9] bg-[#1f0d07] px-6 py-5 text-[#fff8c9] shadow-[0_-12px_30px_rgba(0,0,0,0.35)] md:px-12"
      aria-label="Уведомление об использовании cookie"
    >
      <div className="mx-auto flex max-w-[1600px] flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-[900px]">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#d58b2a]">
            Cookie
          </p>

          <p className="mt-2 text-base leading-relaxed text-[#fff8c9]/85 md:text-lg">
            Мы используем cookie, чтобы сайт запоминал ваш выбор и работал стабильнее. Нажимая «Принять», вы соглашаетесь с использованием cookie. Подробнее можно прочитать в{" "}
            <Link to="/personal-data-policy" className="font-bold text-[#d58b2a] underline underline-offset-4">
              политике обработки персональных данных
            </Link>.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
          <button
            type="button"
            onClick={() => saveConsent("accepted")}
            className="border-2 border-[#d58b2a] bg-[#d58b2a] px-7 py-4 text-sm font-black uppercase tracking-[0.18em] text-[#1f0d07] hover:bg-[#fff8c9] hover:border-[#fff8c9] focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-[#d58b2a]"
          >
            Принять
          </button>

          <button
            type="button"
            onClick={() => saveConsent("declined")}
            className="border-2 border-[#fff8c9]/45 px-7 py-4 text-sm font-black uppercase tracking-[0.18em] text-[#fff8c9] hover:border-[#fff8c9] hover:bg-[#fff8c9] hover:text-[#1f0d07] focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-[#d58b2a]"
          >
            Отклонить
          </button>
        </div>
      </div>
    </section>
  )
}

export default CookieBanner