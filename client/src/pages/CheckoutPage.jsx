import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../state/CartContext.jsx'
import Container from '../components/Container.jsx'
import Spinner from '../components/Spinner.jsx'
import { formatCurrency, API_BASE } from '../utils/constants.js'

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handlePay = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API_BASE}/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItems: items, customer: {} })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.message || 'Payment failed')
      clearCart()
      navigate('/thank-you', { state: { orderId: data.orderId } })
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ padding: '16px 0' }}>
      <Container>
        <h2>Checkout</h2>
        {items.length === 0 ? (
          <div>Your cart is empty.</div>
        ) : (
          <>
            <div style={{ marginBottom: 12 }}>Items: {items.length}</div>
            <div style={{ marginBottom: 12, fontWeight: 600 }}>Total: {formatCurrency(totalPrice)}</div>
            <button onClick={handlePay} disabled={loading}>
              {loading ? <Spinner label="Processing payment..." /> : 'Pay Now'}
            </button>
            {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
          </>
        )}
      </Container>
    </main>
  )
}


