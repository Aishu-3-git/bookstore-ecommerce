import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Cart from "./components/Cart";  // Import the Cart component
import Navbar from "./components/navbar";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Navbarc from "./components/navbarc";
import Logout from "./components/logout";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navbar />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<><Navbarc /><Login /></>} />
        <Route path="/register" element={<><Navbarc /><Register /></>} />
        <Route path="/cart" element={<><Navbarc /><Cart /></>} />  {/* Add Cart route */}
        <Route path='logout' element={<Logout />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
