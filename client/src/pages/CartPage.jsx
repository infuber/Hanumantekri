import { Link } from 'react-router-dom'
import { useCart } from '../state/CartContext.jsx'
import Container from '../components/Container.jsx'
import { formatCurrency } from '../utils/constants.js'

export default function CartPage() {
  const { items, totalPrice, updateQuantity, removeItem } = useCart()

  return (
    <main style={{ padding: '16px 0' }}>
      <Container>
        <h2>Cart</h2>
        {items.length === 0 ? (
          <div>
            Your cart is empty. <Link to="/">Go shopping</Link>
          </div>
        ) : (
          <div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {items.map(item => (
                <li key={item.id} style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                  <img src={item.image} alt={item.name} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600 }}>{item.name}</div>
                    <div>{formatCurrency(item.price)}</div>
                    <div style={{ marginTop: 8 }}>
                      <label>
                        Qty: 
                        <input type="number" min="1" value={item.quantity} onChange={(e) => updateQuantity(item.id, Number(e.target.value))} style={{ width: 64, marginLeft: 8 }} />
                      </label>
                    </div>
                  </div>
                  <button onClick={() => removeItem(item.id)}>Remove</button>
                </li>
              ))}
            </ul>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
              <div style={{ fontSize: 18, fontWeight: 600 }}>Total: {formatCurrency(totalPrice)}</div>
              <Link to="/checkout"><button>Proceed to Checkout</button></Link>
            </div>
          </div>
        )}
      </Container>
    </main>
  )
}


