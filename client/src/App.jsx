import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import CartPage from './pages/CartPage.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'
import ThankYou from './pages/ThankYou.jsx'
import { CartProvider } from './state/CartContext.jsx'

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Navbar />
        <div style={{ paddingTop: 64 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/thank-you" element={<ThankYou />} />
          </Routes>
        </div>
        <Footer />
      </CartProvider>
    </BrowserRouter>
  )
}

export default App
