import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const Logout = () => {
  const navigate = useNavigate();
  const button={marginRight:"20px",fontSize:"1.2rem",fontWeight:"700",borderRadius:"0.5rem"};
  const handleLogout = () => {
    navigate("/"); // Redirect to the first page
  };

  return (
    <Button style={button}color="info" variant="contained" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default Logout;
