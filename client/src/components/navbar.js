import React from 'react';
import { Link } from "react-router-dom";
import { AppBar, Typography, Toolbar, Button, Box } from '@mui/material';
import Logout from './logout';

export default function Navbar() {
  const buttonStyle = {
    marginRight: "20px",
    fontSize: "1.2rem",
    fontWeight: "700",
    borderRadius: "0.5rem"
  };

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant='h4' sx={{ flexGrow: 1 }}>
            LitVerse
          </Typography>
          <Button style={buttonStyle} color='info' variant='contained' to="/login" component={Link}>
            Login
          </Button>
          <Button style={buttonStyle} color="info" variant='contained' to='/register' component={Link}>
            Register
          </Button>
          <Logout />
        </Toolbar>
      </AppBar>
      
      {/* This Box acts as a container to center the content */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          pt: '80px' // Add padding-top to offset the fixed AppBar height (80px)
        }}
      >
        <Typography variant='h1' color='primary'>
          Welcome to LitVerse
        </Typography>
      </Box>
    </div>
  );
}