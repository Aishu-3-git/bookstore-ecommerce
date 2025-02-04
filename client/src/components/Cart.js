import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  // Handle quantity change
  const changeQuantity = (id, amount) => {
    setCart(prevCart => {
      const updatedCart = prevCart.map(item =>
        item._id === id
          ? { ...item, quantity: Math.max(item.quantity + amount, 1) }
          : item
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  // Handle item removal
  const removeItem = (id) => {
    const updatedCart = cart.filter(item => item._id !== id);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  // Calculate the total price
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Handle Back Button click
  const handleBack = () => {
    navigate("/home"); // Navigate back to the main page
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {/* Back Button */}
      <button onClick={handleBack} className="back-button">Back to Shop</button>

      {cart.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <div className="cart-list">
          {cart.map(item => (
            <div key={item._id} className="cart-item">
              <img src={item.image} alt={item.title} />
              <div className="cart-item-details">
                <h3>{item.title}</h3>
                <p>Price: ₹{item.price}</p>
                <div className="quantity-selector">
                  <button onClick={() => changeQuantity(item._id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => changeQuantity(item._id, 1)}>+</button>
                </div>
                <button className="remove-button" onClick={() => removeItem(item._id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {cart.length > 0 && (
        <>
          <h3 className="cart-total">Total: ₹{calculateTotal()}</h3>
          <Link to="/checkout">
            <button className="checkout-button">Proceed to Checkout</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Cart;
