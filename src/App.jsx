import { useEffect, useState } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"

import Header from "./components/Header"
import Footer from "./components/Footer"
import Loader from "./components/Loader"

import Home from "./pages/Home"
import Catalog from "./pages/Catalog"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import Profile from "./pages/Profile"
import Login from "./pages/Login"
import Register from "./pages/Register"
import EditProfile from "./pages/EditProfile"
import Product from "./pages/Product"
import OrderSuccess from "./pages/OrderSuccess"
import MyOrders from "./pages/MyOrders"
import Admin from "./pages/Admin"

function App() {
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <Header />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/catalog" element={<PageWrapper><Catalog /></PageWrapper>} />
          <Route path="/product/:id" element={<PageWrapper><Product /></PageWrapper>} />
          <Route path="/cart" element={<PageWrapper><Cart /></PageWrapper>} />
          <Route path="/checkout" element={<PageWrapper><Checkout /></PageWrapper>} />
          <Route path="/profile" element={<PageWrapper><Profile /></PageWrapper>} />
          <Route path="/profile/edit" element={<PageWrapper><EditProfile /></PageWrapper>} />
          <Route path="/profile/orders" element={<PageWrapper><MyOrders /></PageWrapper>} />
          <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
          <Route path="/register" element={<PageWrapper><Register /></PageWrapper>} />
          <Route path="/order-success/:id" element={<PageWrapper><OrderSuccess /></PageWrapper>} />
          <Route path="/admin" element={<PageWrapper><Admin /></PageWrapper>} />
        </Routes>
      </AnimatePresence>

      <Footer />
    </>
  )
}

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}

export default App