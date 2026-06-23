const CONSENT_COOKIE_NAME = "inkspired_cookie_consent"
const CONSENT_MAX_AGE = 60 * 60 * 24 * 365

export function getCookie(name) {
  const cookies = document.cookie ? document.cookie.split("; ") : []
  const cookie = cookies.find((item) => item.startsWith(`${name}=`))

  if (!cookie) {
    return null
  }

  return decodeURIComponent(cookie.split("=").slice(1).join("="))
}

export function setCookie(name, value, maxAge = CONSENT_MAX_AGE) {
  document.cookie = `${name}=${encodeURIComponent(value)}; max-age=${maxAge}; path=/; SameSite=Lax`
}

export function getCookieConsent() {
  return getCookie(CONSENT_COOKIE_NAME)
}

export function saveCookieConsent(value) {
  setCookie(CONSENT_COOKIE_NAME, value)
}

export { CONSENT_COOKIE_NAME }