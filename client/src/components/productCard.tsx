import React, { useState } from 'react'
import { Item } from '../services/necklacesService'

interface ProductCardProps {
  item: Item
  username: string | null
  onRemove?: (id: string) => void
  onAddToOrder?: (name: string, price: number, weight: number) => void
}

const ProductCard: React.FC<ProductCardProps> = ({
  item,
  username,
  onRemove,
  onAddToOrder,
}) => {
  const [weight, setWeight] = useState(0)

  const handleRemove = () => {
    if (onRemove) {
      onRemove(item._id)
    }
  }

  const handleAddToOrder = () => {
    if (onAddToOrder) {
      onAddToOrder(item.name, item.price, weight)
    }
  }

  return (
    <div
      className="card"
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '300px',
        height: '380px',
        background: 'white',
        borderRadius: '8px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        overflow: 'hidden',
      }}
    >
      {username === 'chipopo' && (
        <button
          className="button"
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            border: 'none',
            backgroundColor: '#ff6b6b',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '4px',
            fontSize: '0.8rem',
            cursor: 'pointer',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
          }}
          onClick={handleRemove}
        >
          Remove item
          {/* כאן אפשר להכניס את ה-SVG */}
        </button>
      )}

      <div
        className="scale-background"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.02)',
          zIndex: 0,
        }}
      ></div>

      <div
        className="card-img"
        style={{
          height: '200px',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          zIndex: 1,
        }}
      >
        <img
          src={item.image}
          alt={item.name}
          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
        />
      </div>

      <div
        className="card-info"
        style={{
          padding: '15px',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1,
          flexGrow: 1,
        }}
      >
        <p
          className="text-title"
          style={{
            fontSize: '1.2rem',
            fontWeight: '600',
            margin: 0,
            textAlign: 'center',
          }}
        >
          {item.name}
        </p>
        <p
          className="text-body"
          style={{
            fontSize: '1rem',
            color: '#666',
            margin: '10px 0',
            textAlign: 'center',
          }}
        >
          ${item.price} per pound
        </p>
      </div>

      <div
        className="card-footer"
        style={{
          marginTop: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
        }}
      >
        <div
          className="card-input"
          style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}
        >
          <label style={{ fontSize: '0.9rem', color: '#666' }}>
            Weight (in pounds):
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
            className="item-amount"
            style={{
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              width: '100%',
            }}
          />
        </div>

        <div
          className="card-button"
          style={{
            backgroundColor: '#ffcdb2',
            color: '#333',
            borderRadius: '4px',
            padding: '10px',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onClick={handleAddToOrder}
        >
          <span className="add-to-order-btn" style={{ fontWeight: '500' }}>
            Add to your Order
          </span>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
