import { useEffect, useState } from 'react'
import Container from '../components/Container.jsx'
import Spinner from '../components/Spinner.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { API_BASE } from '../utils/constants.js'

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`${API_BASE}/products`)
      .then(r => r.json())
      .then(setProducts)
      .catch(() => setError('Failed to load products'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Container style={{ padding: 16 }}><Spinner label="Loading products..." /></Container>
  if (error) return <div style={{ padding: 16 }}>{error}</div>

  return (
    <main style={{ padding: '16px 0' }}>
      <Container>
        <h2 style={{ margin: '8px 0 16px' }}>Products</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
          {products.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </Container>
    </main>
  )
}


