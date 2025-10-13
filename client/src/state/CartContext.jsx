import { createContext, useContext, useMemo, useState, useEffect } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const raw = localStorage.getItem('cart_items')
    return raw ? JSON.parse(raw) : []
  })

  useEffect(() => {
    localStorage.setItem('cart_items', JSON.stringify(items))
  }, [items])

  const addItem = (product, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i)
      }
      return [...prev, { ...product, quantity }]
    })
  }

  const removeItem = (productId) => {
    setItems(prev => prev.filter(i => i.id !== productId))
  }

  const updateQuantity = (productId, quantity) => {
    setItems(prev => prev.map(i => i.id === productId ? { ...i, quantity } : i))
  }

  const clearCart = () => setItems([])

  const { totalQuantity, totalPrice } = useMemo(() => {
    const totalQuantity = items.reduce((sum, i) => sum + i.quantity, 0)
    const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
    return { totalQuantity, totalPrice }
  }, [items])

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalQuantity,
    totalPrice
  }

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}


