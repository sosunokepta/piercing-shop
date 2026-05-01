import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { Toaster } from "react-hot-toast"

import { CartProvider } from "./context/CartContext"
import { AuthProvider } from "./context/AuthContext"

import "./index.css"
import App from "./App.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <App />

          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#fff8c9",
                color: "#1f0d07",
                borderRadius: "0",
                border: "1px solid #1f0d07",
                fontSize: "18px",
                textTransform: "uppercase",
              },
            }}
          />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)