import React, { useState } from "react";
import { Box, Typography, Container, Button } from "@mui/material";

const Newsletter = () => {
  const [newsletterBody, setNewsletterBody] = useState(""); // Hold only the body text
  const [isLoading, setIsLoading] = useState(false); // For loading state

  const fetchResponse = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/chatbot/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "VinFast's Growth" }), // Static message
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('hello world', data.outputs[0].outputs[0].results.message.data.text)
        // Assuming the response in this format `data.outputs[0].outputs[0].results.message.data.text`
        setNewsletterBody(data.outputs[0].outputs[0].results.message.data.text || "No Content Available");
      } else {
        console.error("Error fetching response:", response.status);
        setNewsletterBody("Failed to fetch content");
      }
    } catch (error) {
      console.error("Error fetching response:", error);
      setNewsletterBody("An error occurred while fetching the content.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container sx={{ marginTop: 4 }}>
      {/* Button at the top */}
      <Box sx={{ textAlign: "center", marginBottom: 3 }}>
        <Button
          onClick={fetchResponse}
          variant="contained"
          sx={{
            backgroundColor: "#007BFF",
            "&:hover": {
              backgroundColor: "#0056b3",
            },
            paddingY: 1.5,
            fontWeight: "bold",
          }}
        >
          {isLoading ? "Loading..." : "Generate Newsletter"}
        </Button>
      </Box>

      {/* Newsletter content */}
      {newsletterBody && (
        <Box
          sx={{
            backgroundColor: "#f9f9f9",
            padding: 4,
            borderRadius: 3,
            boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.2)",
            marginTop: 3,
          }}
        >
          {/* Header with salutation */}
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", marginBottom: 2 }}
          >
            Dear Readers,
          </Typography>

          {/* Static subject */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              marginBottom: 2,
              textAlign: "center",
            }}
          >
            VinFast's Growth Insights
          </Typography>

          {/* Dynamic body content */}
          <Typography
            variant="body1"
            sx={{ marginBottom: 3, lineHeight: 1.6 }}
          >
            {newsletterBody}
          </Typography>

          {/* Static footer */}
          <Typography variant="body1" sx={{ marginTop: 4 }}>
            <strong>Best regards,</strong> <br />
            Quang Lam Huynh <br />
            Newsletter Author and Technology Enthusiast
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Newsletter;
