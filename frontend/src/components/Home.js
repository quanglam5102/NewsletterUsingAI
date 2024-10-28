import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Container } from "@mui/material";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container sx={{ marginTop: 4 }}>
      <Box sx={{ textAlign: "center", marginBottom: 4 }}>
        {/* Welcome Message */}
        <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          Welcome to VinFast’s AI-Powered Newsletter!
        </Typography>
        
        <Typography variant="body1" sx={{ marginBottom: 4 }}>
          Stay informed with the latest news, updates, and exciting announcements from VinFast, all generated automatically by our AI-powered system.
        </Typography>
        
        {/* Section: How It Works */}
        <Box sx={{ marginY: 4, textAlign: "left" }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
            How It Works
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            Our AI technology pulls information from VinFast’s official sources to create personalized newsletters just for you. It’s quick, reliable, and ensures you stay updated without needing to search for information yourself.
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            With a simple click, you can access the latest content tailored to your interests, providing a seamless and informative experience.
          </Typography>
        </Box>
        
        {/* Section: Features */}
        <Box sx={{ marginY: 4, textAlign: "left" }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
            Features
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 1 }}>
            • AI-Powered Content: Get newsletters generated using the latest AI technology, ensuring accuracy and relevance.
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 1 }}>
            • Personalized Experience: Create a profile to receive content tailored to your preferences.
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 1 }}>
            • Effortless Navigation: View your profile, explore content, and manage your preferences all in one place.
          </Typography>
        </Box>

        {/* Button to navigate to the Newsletter page */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/newsletter")}
          sx={{ paddingY: 1.5, fontWeight: "bold", marginTop: 4 }}
        >
          Go to Newsletter
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
