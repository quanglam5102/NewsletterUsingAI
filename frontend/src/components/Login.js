import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Container } from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Perform login logic (e.g., call an API)
    console.log("Email:", email);
    console.log("Password:", password);
    // Navigate to home page after successful login
    navigate("/");
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <Box sx={{ textAlign: "center", marginBottom: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          Login
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 4 }}>
          Welcome back! Please enter your login details.
        </Typography>

        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            sx={{ marginBottom: 4 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ paddingY: 1.5, fontWeight: "bold" }}
          >
            Login
          </Button>
        </form>

        {/* Link to Registration page */}
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="body2">
            Don't have an account?{" "}
            <Button
              onClick={() => navigate("/register")}
              sx={{ fontWeight: "bold", textTransform: "none" }}
            >
              Register Here
            </Button>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
