import { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { useCart } from '../state/CartContext.jsx'
import Container from '../components/Container.jsx'
import Spinner from '../components/Spinner.jsx'
import { formatCurrency, API_BASE } from '../utils/constants.js'

const ProductDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { addItem } = useCart()

  // --- Track Click Data ---
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const clickId = params.get('lastClickId');
    const shortCode = params.get('shortCode');
    const clickTimestamp = params.get('clickTimestamp');
    const deviceFingerprint = params.get('deviceFingerprint');

    if (clickId && shortCode && clickTimestamp && deviceFingerprint) {
      // Save in localStorage for all future pages
      localStorage.setItem('lastClickId', clickId);
      localStorage.setItem('shortCode', shortCode);
      localStorage.setItem('clickTimestamp', clickTimestamp);
      localStorage.setItem('deviceFingerprint', deviceFingerprint);
    }
  }, [location.search]);

  useEffect(() => {
    fetch(`${API_BASE}/products/${id}`)
      .then(r => r.json())
      .then(setProduct)
      .catch(() => setError('Failed to load product'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <Container style={{ padding: 16 }}><Spinner label="Loading..." /></Container>
  if (error) return <div style={{ padding: 16 }}>{error}</div>
  if (!product) return null

  return (
    <main style={{ padding: '16px 0' }}>
      <Container>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <img src={product.image} alt={product.name} style={{ width: '100%', borderRadius: 12 }} />
          <div>
            <h2>{product.name}</h2>
            <div style={{ color: 'var(--primary)', fontSize: 20, margin: '8px 0' }}>{formatCurrency(product.price)}</div>
            <p style={{ lineHeight: 1.6 }}>{product.description}</p>
            <button onClick={() => addItem(product, 1)} style={{ marginTop: 16, padding: '10px 16px' }}>Add to Cart</button>
          </div>
        </div>
      </Container>
    </main>
  )
}

export default ProductDetail;
