const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const UserModel = require("./models/User");
const booksRouter = require("./routes/bookss");
const Books = require("./models/Books");
const Cart = require('./models/Cart');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/books", booksRouter);
const PORT = process.env.PORT || 3000; // Fallback if PORT is not defined in .env

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1); // Exit the app if database connection fails
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Register Route
app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists. Please use a different email." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password:", hashedPassword);

    // Save the new user
    const newUser = new UserModel({ name, email, password:hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User created successfully! Redirecting to login..." });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt with:", { email, password });

    // Find user by email and explicitly select the password field
    const user = await UserModel.findOne({ email }).select('+password');
    if (!user) {
      console.log("No user found with this email.");
      return res.status(401).json({ error: "No records found for this email." });
    }

    console.log("Stored Hashed Password:", user.password);

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      console.log("Incorrect password.");
      return res.status(401).json({ error: "Incorrect password. Please try again." });
    }

    console.log("Password matched. Login successful!");
    // Optionally, return a success message or a JWT token here
    res.json({ message: "Success" });

  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});
app.post('/add-to-cart', async (req, res) => {
  try {
    const { userId, bookId, quantity } = req.body;

    // Validate request body
    if (!userId || !bookId || !quantity) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Ensure quantity is a number
    const parsedQuantity = Number(quantity);
    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      return res.status(400).json({ error: 'Invalid quantity' });
    }

    // Check if the user already has a cart
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // If no cart exists, create a new one
      cart = new Cart({
        userId,
        items: [{ bookId, quantity: parsedQuantity }]
      });
    } else {
      // If cart exists, check if the book is already in the cart
      const existingItem = cart.items.find(item => item.bookId.toString() === bookId.toString());

      if (existingItem) {
        // If item exists, update the quantity
        existingItem.quantity += parsedQuantity;
      } else {
        // If item doesn't exist, add a new item
        cart.items.push({ bookId, quantity: parsedQuantity });
      }
    }

    // Save the updated cart
    await cart.save();

    res.status(200).json({ message: 'Item added to cart successfully!' });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'Error adding to cart' });
  }
});

// Add this to your server.js (API route to update book quantity)
app.post('/update-book-quantity', async (req, res) => {
  try {
    const { bookId, quantity } = req.body;

    // Find the book and update the quantity
    const book = await Books.findById(bookId);
    if (!book) {
      return res.status(404).json({ error: "Book not found." });
    }

    // Check if sufficient stock is available
    if (book.quantity < quantity) {
      return res.status(400).json({ error: "Not enough stock available." });
    }

    // Update the book quantity
    book.quantity -= quantity;
    await book.save();

    res.status(200).json({ message: "Book quantity updated successfully!" });
  } catch (error) {
    console.error("Error updating book quantity:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});
