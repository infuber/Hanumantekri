import express from 'express';
import cors from 'cors';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());

// Load products from JSON file
const productsPath = join(__dirname, '../client/src/utils/products.json');
const products = JSON.parse(readFileSync(productsPath, 'utf8'));

// Products list
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Single product detail
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
});

// Checkout - simulate payment
app.post('/api/checkout', async (req, res) => {
  const { cartItems, customer } = req.body || {};
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return res.status(400).json({ message: 'Cart is empty' });
  }
  // simulate processing delay
  await new Promise(r => setTimeout(r, 1200));
  res.json({ status: 'success', orderId: `ORD-${Date.now()}` });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


