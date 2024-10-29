import React, { useState } from "react";
import { Box, Typography, Container, Button } from "@mui/material";

const Newsletter = () => {
  const [newsletterBody, setNewsletterBody] = useState(""); // Hold only the body text
  const [isLoading, setIsLoading] = useState(false); // For loading state

  // const fetchResponse = async () => {
  //   setIsLoading(true);

  //   try {
  //     const response = await fetch("/api/chatbot/", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ message: "VinFast's Growth" }), // Static message
  //     });
      
  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log('hello world', data.outputs[0].outputs[0].results.message.data.text)
  //       // Assuming the response in this format `data.outputs[0].outputs[0].results.message.data.text`
  //       setNewsletterBody(data.outputs[0].outputs[0].results.message.data.text || "No Content Available");
  //     } else {
  //       console.error("Error fetching response:", response.status);
  //       setNewsletterBody("Failed to fetch content");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching response:", error);
  //     setNewsletterBody("An error occurred while fetching the content.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

    const fetchResponse = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/newsletter/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "VinFast's Growth" }),
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('hello world', data)
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

  // const fetchResponse = () => {
  //   const fullText =
  //     "Subject: sdlkfjsdlfjsdlfk. We are thrilled to announce. Best regards, [YOUR NAME] [YOUR POSITION] Vinfast.";

  //   // Find the index of "Subject:" and the first period after it
  //   const subjectIndex = fullText.indexOf("Subject:");
  //   const firstPeriodIndex = fullText.indexOf(".", subjectIndex);
  //   const bestRegardsIndex = fullText.indexOf("Best regards");

  //   let cleanedBody = "";

  //   if (firstPeriodIndex !== -1 && bestRegardsIndex !== -1) {
  //     // Extract content between the first period and "Best regards"
  //     cleanedBody = fullText
  //       .slice(firstPeriodIndex + 1, bestRegardsIndex) // +1 to exclude the period itself
  //       .trim();
  //   } else {
  //     cleanedBody = "No Content Available"; // In case there is no period or "Best regards" found
  //   }

  //   setNewsletterBody(cleanedBody);
  // };

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
          {/* Static subject */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              marginBottom: 2,
              textAlign: "center",
            }}
          >
            VinFast's Latest News
          </Typography>

          {/* Header with salutation */}
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", marginBottom: 2 }}
          >
            Dear Readers,
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
