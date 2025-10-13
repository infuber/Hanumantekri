export const API_BASE = 'https://hanumantekri-y6lf.onrender.com/api' || 'http://localhost:9000/api'

export function formatCurrency(value) {
  try {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value)
  } catch {
    return `₹${value}`
  }
}
