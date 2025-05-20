import React, { useEffect, useState } from 'react'
import ProductCard from '../../components/productCard.tsx'
import { getNecklaces, Item } from '../../services/necklacesService.ts'

interface NecklacesPageProps {
  username: string | null
}

const NecklacesPage: React.FC<NecklacesPageProps> = ({ username }) => {
  const [necklaces, setNecklaces] = useState<Item[]>([])
  const [order, setOrder] = useState<
    {
      name: string
      price: number
      weight: number
    }[]
  >([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    async function fetchNecklaces() {
      setIsLoading(true)
      try {
        const data = await getNecklaces()
        setNecklaces(data)
      } catch (error) {
        console.error('Failed to fetch necklaces:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchNecklaces()
  }, [])

  const handleRemove = (id: string) => {
    fetch(`/api/items/${id}`, { method: 'DELETE' })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to delete item')
        setNecklaces((prev) => prev.filter((item) => item._id !== id))
      })
      .catch((error) => {
        console.error('Failed to remove item:', error)
        alert('Failed to remove item. Please try again.')
      })
  }

  const handleAddToOrder = (name: string, price: number, weight: number) => {
    if (weight <= 0) {
      alert('Please enter a weight greater than zero')
      return
    }

    setOrder((prev) => [...prev, { name, price, weight }])

    // Store order in localStorage for persistence
    const currentOrder = JSON.parse(
      localStorage.getItem('jewelryOrder') || '[]'
    )
    const updatedOrder = [...currentOrder, { name, price, weight }]
    localStorage.setItem('jewelryOrder', JSON.stringify(updatedOrder))

    alert(`Added ${weight} pounds of ${name} to your order.`)
  }

  const handleAddItemClick = () => {
    // This could open a modal or navigate to an add item form
    alert('Add item form logic here')
  }

  return (
    <main
      style={{
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
      }}
    >
      <div className="page-header">
        {username === 'chipopo' && (
          <button
            className="add-item-button"
            style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '10px 15px',
              marginBottom: '20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'background-color 0.2s',
            }}
            onClick={handleAddItemClick}
          >
            <span className="button__text" style={{ fontWeight: 500 }}>
              Add Item
            </span>
            <span className="button__icon">+</span>
          </button>
        )}

        {username && (
          <div
            className="welcome-message"
            style={{ marginBottom: '20px', fontSize: '1.2rem', color: '#333' }}
          >
            <span className="welcomeMessageText" style={{ fontWeight: 500 }}>
              Hi, {username}
            </span>
          </div>
        )}

        <div
          className="cart-container"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <a
            href="/orders"
            className="cart-btn"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f8f9fa',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              textDecoration: 'none',
              transition: 'background-color 0.2s',
            }}
          >
            <img
              src="/assets/cart.png"
              alt="Cart"
              className="cart-img"
              style={{ width: '24px', height: '24px' }}
            />
          </a>
          <span
            className="cart-text"
            style={{ fontSize: '1rem', color: '#333' }}
          >
            Cart
          </span>
        </div>
      </div>

      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading necklaces...</p>
        </div>
      ) : necklaces.length === 0 ? (
        <div className="no-items-message">
          <p>No necklaces available at this time.</p>
        </div>
      ) : (
        <section
          className="card-container"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px',
            marginTop: '30px',
          }}
        >
          {necklaces.map((item) => (
            <ProductCard
              key={item._id}
              item={item}
              username={username}
              onRemove={handleRemove}
              onAddToOrder={handleAddToOrder}
            />
          ))}
        </section>
      )}
    </main>
  )
}

export default NecklacesPage
