import React, { useState } from 'react';
import { Grid, Paper, TextField, Typography, Button } from '@mui/material';
import axios from 'axios';
import { FaEye, FaEyeSlash } from "react-icons/fa"; 
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const heading = { fontSize: "2.5em", fontWeight: "600"};
  const paperStyle = { padding: "2rem", margin: "100px auto", borderRadius: "1rem", boxShadow: "10px 10px 10px" };
  const row = { display: "flex", marginTop: "2rem" };
  const btnStyle = { marginTop: "2rem", fontSize: "1.2rem", fontWeight: "700", backgroundColor: "blue", borderRadius: "0.5rem" };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Error message state
  const [successMessage, setSuccessMessage] = useState(""); // Success message state
  const [showPassword, setShowPassword] = useState(false); // Password visibility toggle state
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset previous error message
    setSuccessMessage(""); // Reset previous success message

    axios.post("http://localhost:3001/register", { name, email, password })
      .then((result) => {
        if (result.status === 201) {
          setSuccessMessage("User created successfully! Redirecting to login...");
          setTimeout(() => {
            navigate("/login");
          }, 2000); // Redirect after delay
        }
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 400) {
            setErrorMessage("Email already exists. Please use a different email.");
          } else if (err.response.data.error) {
            setErrorMessage(err.response.data.error); // Handle other server-side error messages
          } else {
            setErrorMessage("An error occurred. Please try again.");
          }
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
          height: '60vh'
        }}>
          <Typography style={heading}>Register</Typography>

          {errorMessage && (
            <Typography color="error" sx={{ marginTop: "1rem" }}>
              {errorMessage}
            </Typography>
          )}
          {successMessage && (
            <Typography color="success.main" sx={{ marginTop: "1rem" }}>
              {successMessage}
            </Typography>
          )}

          <form onSubmit={handleRegister}>
            <TextField 
              onChange={(e) => setName(e.target.value)} 
              name="name" 
              required 
              sx={{ label: { fontWeight: '500', fontSize: '1rem' } }}  
              id="standard-basic"  
              variant="standard" 
              style={row} 
              label="Enter Name" 
              type="text"
            />
            <TextField 
              onChange={(e) => setEmail(e.target.value)} 
              name="email" 
              required  
              sx={{ label: { fontWeight: '500', fontSize: '1rem' } }}  
              id="standard-basic"  
              variant="standard"
              style={row} 
              label="Enter Email" 
              type="email"
            />
            <div style={{ position: 'relative' }}>
              <TextField 
                onChange={(e) => setPassword(e.target.value)} 
                name="password" 
                required  
                sx={{ label: { fontWeight: '500', fontSize: '1rem' } }}  
                id="standard-basic"  
                variant="standard"
                style={row} 
                label="Enter Password" 
                type={showPassword ? "text" : "password"}
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
            <Button type="submit" variant="contained" style={btnStyle}>Register</Button>
          </form>
        </Paper>
      </Grid>
    </div>
  );
};

export default Register;
