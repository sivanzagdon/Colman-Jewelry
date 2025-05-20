import React, { useEffect, useState } from 'react'
import ProductCard from './../../components/productCard.tsx'

interface Product {
  _id: string
  name: string
  price: number
  image: string
}

interface EarringsPageProps {
  username: string | null
}

const EarringsPage: React.FC<EarringsPageProps> = ({ username }) => {
  const [earrings, setEarrings] = useState<Product[]>([])
  const [order, setOrder] = useState<
    { name: string; price: number; weight: number }[]
  >([])

  useEffect(() => {
    fetch('/api/earrings')
      .then((res) => res.json())
      .then((data) => setEarrings(data))
      .catch(console.error)
  }, [])

  const handleRemove = (id: string) => {
    fetch(`/api/items/${id}`, { method: 'DELETE' })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to delete item')
        setEarrings((prev) => prev.filter((item) => item._id !== id))
      })
      .catch(console.error)
  }

  const handleAddToOrder = (name: string, price: number, weight: number) => {
    if (weight <= 0) {
      alert('Please enter a weight greater than zero')
      return
    }
    setOrder((prev) => [...prev, { name, price, weight }])
    alert(`Added ${weight} pounds of ${name} to your order.`)
  }

  return (
    <main>
      {username === 'chipopo' && (
        <button
          className="add-item-button"
          onClick={() => alert('Add item form logic here')}
        >
          <span className="button__text">Add Item</span>
          <span className="button__icon">{/* אייקון + */}</span>
        </button>
      )}

      {username && (
        <div className="welcome-message">
          <span className="welcomeMessageText">Hi, {username}</span>
        </div>
      )}

      <div className="cart-container">
        <a href="/orders" className="cart-btn">
          <img src="/assets/cart.png" alt="Cart" className="cart-img" />
        </a>
        <span className="cart-text">Cart</span>
      </div>

      <section id="fruits-container" className="card-container">
        {earrings.map((item) => (
          <ProductCard
            item={item}
            username={username}
            onRemove={handleRemove}
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

export default EarringsPage
