import React, { useState, useEffect } from 'react'
import ProductCard from '../../components/productCard.tsx'

interface BraceletItem {
  _id: string
  name: string
  price: number
  image: string
}

interface BraceletsPageProps {
  username: string | null
}

const BraceletsPage: React.FC<BraceletsPageProps> = ({ username }) => {
  const [bracelets, setBracelets] = useState<BraceletItem[]>([])
  const [order, setOrder] = useState<
    { name: string; price: number; weight: number }[]
  >([])

  useEffect(() => {
    fetch('/api/bracelets')
      .then((res) => res.json())
      .then((data) => setBracelets(data))
      .catch((err) => console.error(err))
  }, [])

  const handleRemoveItem = (id: string) => {
    fetch(`/api/items/${id}`, { method: 'DELETE' })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to delete')
        setBracelets((prev) => prev.filter((item) => item._id !== id))
      })
      .catch((err) => console.error(err))
  }

  const handleAddToOrder = (name: string, price: number, weight: number) => {
    if (weight <= 0) {
      alert('Please enter a valid weight greater than 0.')
      return
    }
    setOrder((prev) => [...prev, { name, price, weight }])
    alert(`Added ${weight} pounds of ${name} to your order.`)
  }

  return (
    <main>
      <section id="others-container" className="card-container">
        {bracelets.map((item) => (
          <ProductCard
            key={item._id}
            item={item}
            username={username}
            onRemove={handleRemoveItem}
            onAddToOrder={handleAddToOrder}
          />
        ))}
      </section>

      <section>
        <h2>Your Order</h2>
        {order.length === 0 && <p>No items in your order.</p>}
        <ul>
          {order.map((orderItem, idx) => (
            <li key={idx}>
              {orderItem.weight} pounds of {orderItem.name} at $
              {orderItem.price} per pound
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default BraceletsPage
