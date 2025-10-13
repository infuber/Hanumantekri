import { Link } from 'react-router-dom'
import { formatCurrency } from '../utils/constants.js'

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`} style={{
      border: '1px solid var(--border)', borderRadius: 12, textDecoration: 'none', color: 'inherit', overflow: 'hidden', background: 'var(--surface)',
      boxShadow: '0 1px 2px rgba(0,0,0,0.06)'
    }}>
      <img src={product.image} alt={product.name} style={{ width: '100%', height: 200, objectFit: 'cover' }} />
      <div style={{ padding: 12 }}>
        <div style={{ fontWeight: 600 }}>{product.name}</div>
        <div style={{ color: 'var(--primary)', marginTop: 6 }}>{formatCurrency(product.price)}</div>
      </div>
    </Link>
  )
}


