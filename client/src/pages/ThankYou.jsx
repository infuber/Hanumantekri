import { useLocation, Link } from 'react-router-dom'
import Container from '../components/Container.jsx'

export default function ThankYou() {
  const location = useLocation()
  const orderId = location.state?.orderId
  return (
    <main style={{ padding: '16px 0' }}>
      <Container>
        <div style={{ textAlign: 'center' }}>
          <h2>Payment Successful</h2>
          {orderId && <div style={{ marginTop: 8 }}>Order ID: {orderId}</div>}
          <p style={{ marginTop: 12 }}>Thank you for your purchase.</p>
          <Link to="/"><button style={{ marginTop: 12 }}>Back to Home</button></Link>
        </div>
      </Container>
    </main>
  )
}


