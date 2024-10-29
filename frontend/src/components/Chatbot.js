import React, { useState } from 'react';
import { Box, Typography, Container, Button, TextField } from '@mui/material';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // For loading state

  const handleSendMessage = async () => {
    if (userMessage.trim()) {
      // Add user's message to conversation
      const newMessage = { sender: 'user', text: userMessage };
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      // Send the message to the chatbot API
      try {
        setIsLoading(true);
        const response = await fetch('/api/chatbot/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: userMessage }),
        });
        const data = await response.json();
        console.log(data)
        const botMessage = data.outputs[0].outputs[0].results.message.data.text || "Sorry, I didn't get that.";

        // Add the bot's response to the conversation
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'bot', text: botMessage },
        ]);
      } catch (error) {
        console.error('Error fetching response:', error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'bot', text: 'Error: Could not get a response from the server.' },
        ]);
      } finally {
        setIsLoading(false);
      }

      setUserMessage(''); // Clear the input field
    }
  };

  return (
    <Container sx={{ marginTop: 4, height: '85vh', display: 'flex', flexDirection: 'column' }}>
      {/* Title */}
      <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 2 }}>
        Vinfast Chatbot
      </Typography>

      {/* Chat History */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          border: '1px solid #ddd',
          borderRadius: 2,
          padding: 2,
          backgroundColor: '#fff',
          boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
          marginBottom: 2,
        }}
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              padding: 1,
              borderRadius: 1,
              marginBottom: 1,
              ...(msg.sender === 'user'
                ? { backgroundColor: '#DCF8C6', alignSelf: 'flex-end' }
                : { backgroundColor: '#F1F0F0', alignSelf: 'flex-start' }),
              fontSize: '1.2rem'
            }}
          >
            {msg.text}
          </Box>
        ))}
      </Box>

      {/* Input Field */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          variant="outlined"
          placeholder="Type your message..."
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          sx={{ flex: 1, marginRight: 1 }}
        />
        <Button
          onClick={handleSendMessage}
          variant="contained"
          sx={{
            backgroundColor: '#007BFF',
            '&:hover': { backgroundColor: '#0056b3' },
          }}
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </Button>
      </Box>
    </Container>
  );
};

export default Chatbot;
