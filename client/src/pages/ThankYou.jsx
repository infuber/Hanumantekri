import { useLocation, Link } from 'react-router-dom';
import { useEffect } from 'react';
import Container from '../components/Container.jsx';

const ThankYou = () => {
  const location = useLocation();
  const orderId = location.state?.orderId;

//tracker script 
// useEffect(() => {
//   if (orderId) {
//     window.orderId = orderId; // 🔥 important
//   }

//   const script = document.createElement('script');
//   script.src = 'https://www.infuber.com/tracker.js';
//   script.async = true;
//   document.body.appendChild(script);

//   return () => {
//     document.body.removeChild(script);
//   };
// }, [orderId]);

// Thank you page (Company Side)
useEffect(() => {
  if (orderId) {
    window.orderId = orderId; // 🔥 important – tracker.js reads this
  }
  if (orderValue != null) {
    window.orderValue = orderValue; // optional – tracker can send to API
  }

  const script = document.createElement('script');
  script.src = 'https://www.infuber.com/tracker.js';
  script.async = true;
  document.body.appendChild(script);

  return () => {
    document.body.removeChild(script);
  };
}, [orderId, orderValue]);


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