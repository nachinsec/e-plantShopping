import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeItem, updateQuantity } from './CartSlice'
import './CartItem.css'

const CartItem = ({ onContinueShopping }) => {
  const cartItems = useSelector(state => state.cart.items)
  const dispatch = useDispatch()

  const calculateTotalCost = () => {
    return cartItems.reduce((total, item) => total + item.quantity * parseFloat(item.cost.replace('$', '')), 0)
  }

  const handleIncrement = (plant) => {
    dispatch(updateQuantity({ ...plant, quantity: plant.quantity + 1 }))
  }

  const handleDecrement = (plant) => {
    if (plant.quantity === 1) {
      dispatch(removeItem(plant))
    } else {
      dispatch(updateQuantity({ ...plant, quantity: plant.quantity - 1 }))
    }
  }

  const handleRemove = (plant) => {
    dispatch(removeItem(plant))
  }

  return (
    <div className="cart-item">
      <button onClick={onContinueShopping}>Continue Shopping</button>
      <div className="cart-items-list">
        {cartItems.map((item, index) => (
          <div key={index} className="cart-item-card">
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>{item.cost}</p>
            <div className="quantity-controls">
              <button onClick={() => handleDecrement(item)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleIncrement(item)}>+</button>
            </div>
            <button onClick={() => handleRemove(item)}>Remove</button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h2>Total Cost: ${calculateTotalCost().toFixed(2)}</h2>
      </div>
    </div>
  )
}

export default CartItem