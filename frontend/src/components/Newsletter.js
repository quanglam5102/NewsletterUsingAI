import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Chatbot from "./Chatbot";

const Newsletter = () => {
  const [newsletterBody, setNewsletterBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const savedNewsletter = sessionStorage.getItem("newsletterContent");
    if (savedNewsletter) {
      setNewsletterBody(savedNewsletter);
    }
  }, []);

  const formatResponse = (text) => {
    // Array to hold dynamic headers
    const detectedHeaders = [];

    // Regex to detect potential headers (inside **)
    const headerRegex = /\*\*([^*]+)\*\*/g;

    // Detect headers and store them
    let match;
    while ((match = headerRegex.exec(text)) !== null) {
      detectedHeaders.push(match[1]); // Store header text without asterisks
    }

    // Now replace **text** with <strong>text</strong> for bold
    let formattedText = text.replace(headerRegex, "<strong>$1</strong>");

    // Optional: Apply additional formatting like removing all remaining ** or markdown asterisks
    formattedText = formattedText.replace(/\*\*/g, "");

    // Additional formatting like line breaks before dates (optional)
    formattedText = formattedText.replace(
      /(\b(?:October|November)\s\d{1,2},?\s?\d{4}\b)/g,
      "\n\n$1"
    );
    console.log("hello world", detectedHeaders);
    // Loop through the detected headers and apply bold formatting (if needed)
    detectedHeaders.forEach((header) => {
      const headerRegex = new RegExp(`(^|\\n)(${header})(?=\\n)`, "g");
      formattedText = formattedText.replace(
        headerRegex,
        `$1<strong>$2</strong>`
      );
    });

    // Adding line breaks for better spacing (optional)
    formattedText = formattedText.replace(
      /([a-zA-Z0-9])\n([a-zA-Z0-9])/g,
      "$1\n\n$2"
    );

    return formattedText;
  };

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
        const formattedText = formatResponse(
          data.outputs[0].outputs[0].results.message.data.text ||
            "No Content Available"
        );

        setNewsletterBody(formattedText);
        sessionStorage.setItem("newsletterContent", formattedText);
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

          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", marginBottom: 2 }}
          >
            Dear Readers,
          </Typography>

          <Typography
            variant="body1"
            sx={{ marginBottom: 3, lineHeight: 1.6, whiteSpace: "pre-line" }}
            dangerouslySetInnerHTML={{ __html: newsletterBody }}
          ></Typography>

          <Typography variant="body1" sx={{ marginTop: 4 }}>
            <strong>Best regards,</strong> <br />
            Quang Lam Huynh <br />
            Newsletter Author and Technology Enthusiast
          </Typography>
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#007BFF",
            "&:hover": {
              backgroundColor: "#0056b3",
            },
          }}
          color="primary"
          onClick={handleClickOpen}
        >
          Open Chatbot
        </Button>

        <Dialog open={open} onClose={handleClose} keepMounted>
          <DialogTitle>Vinfast Assistant</DialogTitle>
          <DialogContent>
            <Chatbot />
          </DialogContent>
          <DialogActions
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Button
              onClick={handleClose}
              color="primary"
              sx={{
                alignSelf: "center",
                fontSize: "1.15rem",
              }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default Newsletter;
