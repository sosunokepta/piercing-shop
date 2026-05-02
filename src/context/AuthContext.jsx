import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext()

const ADMIN_EMAIL = "iliaryzhov666@gmail.com"
const ADMIN_PASSWORD = "ilia29291002"

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user")
    return savedUser ? JSON.parse(savedUser) : null
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user))
    } else {
      localStorage.removeItem("user")
    }
  }, [user])

  function register(userData) {
    const newUser = {
      ...userData,
      role: "user",
    }

    localStorage.setItem("account", JSON.stringify(newUser))
    setUser(newUser)
  }

  function login(email, password) {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const adminUser = {
        name: "Администратор",
        email: ADMIN_EMAIL,
        phone: "8964494564",
        password: ADMIN_PASSWORD,
        role: "admin",
      }

      setUser(adminUser)

      return {
        success: true,
        message: "Вход выполнен как администратор",
      }
    }

    const savedAccount = JSON.parse(localStorage.getItem("account"))

    if (!savedAccount) {
      return {
        success: false,
        message: "Аккаунт не найден",
      }
    }

    if (savedAccount.email !== email || savedAccount.password !== password) {
      return {
        success: false,
        message: "Неверная почта или пароль",
      }
    }

    setUser(savedAccount)

    return {
      success: true,
      message: "Вход выполнен",
    }
  }

  function logout() {
    setUser(null)
  }

  function updateUser(updatedData) {
    const currentAccount = JSON.parse(localStorage.getItem("account"))

    const updatedUser = {
      ...currentAccount,
      ...updatedData,
      role: currentAccount?.role || "user",
    }

    localStorage.setItem("account", JSON.stringify(updatedUser))
    setUser(updatedUser)
  }

  return (
    <AuthContext.Provider value={{ user, register, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}