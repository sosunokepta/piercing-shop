import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user")

    if (savedUser) {
      return JSON.parse(savedUser)
    }

    return null
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user))
    } else {
      localStorage.removeItem("user")
    }
  }, [user])

  function register(userData) {
    setUser(userData)
  }

  function login(email, password) {
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
    }

    localStorage.setItem("account", JSON.stringify(updatedUser))
    setUser(updatedUser)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}