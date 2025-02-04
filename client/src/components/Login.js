import React, { useState } from 'react';
import { Grid, Paper, TextField, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa"; 
import axios from 'axios';

export default function Login() {
  const heading = { fontSize: "2.5em", fontWeight: "800" };
  const paperStyle = { padding: "2rem", margin: "100px auto", borderRadius: "1rem", boxShadow: "10px 10px 10px" };
  const row = { display: "flex", marginTop: "2rem" };
  const btnStyle = { marginTop: "4rem", fontSize: "1.4rem", fontWeight: "700", backgroundColor: "blue", borderRadius: "0.5rem" };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State to display errors
  const [showPassword, setShowPassword] = useState(false); // Password visibility toggle state
  const navigate = useNavigate(); // Ensure this is properly defined

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with:", email, password);

    axios.post("http://localhost:3001/login", { email, password })
      .then((result) => {
        if (result.data.message === "Success") {
          console.log("Redirecting to /home..."); // Check for the correct response message
          navigate("/home");
        
          console.log("Navigate executed");
        } else {
          setErrorMessage("Login failed: User does not exist or incorrect password.");
        }
      })
      .catch((error) => {
        // Check if there's a response from the error
        if (error.response) {
          setErrorMessage(error.response.data.error || "An error occurred. Please try again.");
        } else {
          setErrorMessage("An error occurred. Please try again.");
        }
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <Grid align="center">
        <Paper style={paperStyle} sx={{ 
          width: { xs: "80vw", sm: "50vw", md: "40vw", lg: "30vw", xl: "20vw" },
          height: '59vh'
        }}>
          <Typography style={heading}>Login</Typography>
          {errorMessage && (
            <Typography color="error" sx={{ marginTop: "1rem" }}>
              {errorMessage}
            </Typography>
          )}
          <form onSubmit={handleLogin}>
            <TextField 
              onChange={(e) => setEmail(e.target.value)} 
              name="email" 
              sx={{ label: { fontWeight: '500', fontSize: '1rem' } }}  
              id="standard-basic" 
              variant="standard"
              style={row} 
              label="Enter Email" 
              type='email' 
              required
            />
            <div style={{ position: 'relative' }}>
              <TextField 
                onChange={(e) => setPassword(e.target.value)} 
                name="password" 
                sx={{ label: { fontWeight: '500', fontSize: '1rem' } }}  
                id="standard-basic"  
                variant="standard"
                style={row} 
                label="Enter Password" 
                type={showPassword ? "text" : "password"} 
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
              </button>
            </div>
            <Button type="submit" variant="contained" style={btnStyle}>Login</Button>
          </form>
        </Paper>
      </Grid>
    </div>
  );
}
