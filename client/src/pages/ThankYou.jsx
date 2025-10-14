import { useLocation, Link } from 'react-router-dom';
import { useEffect } from 'react';
import Container from '../components/Container.jsx';

const ThankYou = () => {
  const location = useLocation();
  const orderId = location.state?.orderId;

  useEffect(() => {
    // --- Dynamically load Infuber Tracker ---
    const script = document.createElement('script');
    script.src = 'https://www.infuber.com/tracker.js';
    script.async = true;
    script.defer = true;
    script.crossOrigin = 'anonymous'; // important for CORS
    script.onload = () => console.log('✅ Infuber tracker loaded successfully');
    script.onerror = (err) => console.error('❌ Failed to load tracker script:', err);
    document.body.appendChild(script);

    // Cleanup on component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <main style={{ padding: '16px 0' }}>
      <Container>
        <div style={{ textAlign: 'center' }}>
          <h2>Payment Successful 🎉</h2>
          {orderId && <div style={{ marginTop: 8 }}>Order ID: {orderId}</div>}
          <p style={{ marginTop: 12 }}>Thank you for your purchase.</p>
          <Link to="/">
            <button style={{ marginTop: 12 }}>Back to Home</button>
          </Link>
        </div>
      </Container>
    </main>
  );
};

export default ThankYou;