import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../state/CartContext.jsx'
import Container from './Container.jsx'

export default function Navbar() {
  const { totalQuantity } = useCart()
  return (
    <header style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 64, background: 'var(--surface)', zIndex: 1000, borderBottom: '1px solid var(--border)' }}>
      <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 700, letterSpacing: 0.3 }}>
          HanumanTekari
        </Link>
        <nav style={{ display: 'flex', gap: 16 }}>
          <NavLink to="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</NavLink>
          <NavLink to="/cart" style={{ color: '#fff', textDecoration: 'none' }}>
            Cart ({totalQuantity})
          </NavLink>
        </nav>
      </Container>
    </header>
  )
}


