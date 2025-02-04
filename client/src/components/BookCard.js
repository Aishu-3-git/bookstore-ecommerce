import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";

// Make sure to link the app element for accessibility
Modal.setAppElement("#root");

const BookCard = ({ book }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(1); // Default quantity is 1

  // Open and close modal functions
  const openModal = () => setModalIsOpen(true);
  const closeModal = (e) => {
    if (e) {
      e.stopPropagation();  // Prevent event bubbling only if event exists
    }
    setModalIsOpen(false);
  };
  
  

  // Increase or decrease the quantity
  const changeQuantity = (amount) => {
    if (quantity + amount > 0) {
      setQuantity(quantity + amount);
    }
  };

  // Handle Add to Cart
  const handleAddToCart = async () => {
    const cartItem = { ...book, quantity };
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    savedCart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(savedCart));

    console.log(`Added ${quantity} of "${book.title}" to the cart.`);

    try {
      await axios.post("http://localhost:3001/update-book-quantity", {
        bookId: book._id,
        quantity,
      });
    } catch (error) {
      console.error("Error updating book quantity:", error);
    }

    closeModal(); // Close modal after adding to cart
  };

  return (
    <div className="book-card" onClick={openModal}>
      <img src={book.image} alt={book.title} className="book-image" />
      <h3 className="book-title">{book.title}</h3>
      <p className="book-author">Author: {book.author}</p>
      <p className="book-price">Price: ₹{book.price * quantity}</p>

      {/* Modal for Book Details */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="custom-modal"
        overlayClassName="custom-overlay"
      >
        {/* Close button on top of the modal */}
        <button className="close-button" onClick={closeModal}>
          X
        </button>
        
        <div className="modal-content">
          <img src={book.image} alt={book.title} className="modal-image" />
          <div className="modal-info">
            <h2>{book.title}</h2>
            <p>{book.description}</p>
            <p className="modal-price">Price: ₹{book.price * quantity}</p>

            <div className="quantity-selector">
              <button onClick={() => changeQuantity(-1)} disabled={quantity <= 1}>-</button>
              <span>{quantity}</span>
              <button onClick={() => changeQuantity(1)}>+</button>
            </div>

            <button className="add-to-cart" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BookCard;
