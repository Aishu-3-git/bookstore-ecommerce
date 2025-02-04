import React from "react";
import { useNavigate } from "react-router-dom";
import BookList from "./BookList"; // Import BookList

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/"); // Redirect to the login or home page
  };

  const handleCart = () => {
    navigate("/cart"); // Navigate to the Cart page
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="navbar-left">
          <button onClick={handleCart} className="navbar-button">
            Cart
          </button>
          <button onClick={handleLogout} className="navbar-button">
            Logout
          </button>
        </div>
        <div className="navbar-right">
          <span className="navbar-brand">Litverse</span>
        </div>
      </nav>

      <div className="book-list-container">
        <BookList />
      </div>
    </div>
  );
};

export default Home;
