import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from './BookCard';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);  // Track loading state
  const [error, setError] = useState(null);  // Track error state

  useEffect(() => {
    // Fetch books from the backend API
    axios.get('http://localhost:3001/api/books')  // Replace with your server's URL if different
      .then(response => {
        setBooks(response.data);  // Set books to state
        setLoading(false);  // Set loading to false when data is fetched
      })
      .catch(error => {
        console.error("There was an error fetching the books:", error);
        setError('Failed to load books. Please try again later.');  // Set error message
        setLoading(false);  // Set loading to false if error occurs
      });
  }, []);  // Empty array means this effect will run once when the component mounts

  if (loading) {
    return <div>Loading books...</div>;  // Show loading text or a spinner
  }

  if (error) {
    return <div>{error}</div>;  // Show error message if there was an issue
  }

  return (
    <div className="book-list">
      {books.length > 0 ? (
        books.map(book => (
          <BookCard key={book._id} book={book} />  
        ))
      ) : (
        <div>No books available.</div>  // Show a message if there are no books
      )}
    </div>
  );
};

export default BookList;
