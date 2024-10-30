// src/Chatbot.js

import React, { useState } from 'react';
import { Box, Typography, Paper, Button, TextField, List, ListItem, ListItemText } from '@mui/material';

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
        console.log(data);
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
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '95vh', // Full viewport height for vertical centering
        backgroundColor: '#f0f0f0' // Optional: add background color
      }}
    >
      <Paper elevation={3} sx={{ width: 400, height: 600, display: 'flex', flexDirection: 'column', borderRadius: 2 }}>
        <Box sx={{ backgroundColor: '#1976d2', color: 'white', padding: 2, textAlign: 'center' }}>
          <Typography variant="h6">Vinfast Chatbot</Typography>
        </Box>
        <List sx={{ flex: 1, overflowY: 'auto', padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {messages.map((msg, index) => (
            <ListItem key={index} sx={{ justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start', width: '100%' }}>
              <Box
                sx={{
                  backgroundColor: msg.sender === 'user' ? '#b5ebbb' : '#D1E7FF',
                  color: '#333',
                  padding: 1.5,
                  borderRadius: 2,
                  maxWidth: '70%',
                  textAlign: msg.sender === 'user' ? 'right' : 'left', // Align text based on the sender
                }}
              >
                <ListItemText primary={msg.text} />
              </Box>
            </ListItem>
          ))}
        </List>
        <Box sx={{ display: 'flex', padding: 2, borderTop: '1px solid #ddd', justifyContent: 'center' }}>
          <TextField
            variant="outlined"
            placeholder="Type your message..."
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} // Allow sending message with Enter key
            sx={{ flex: 1, marginRight: 1 }}
          />
          <Button
            onClick={handleSendMessage}
            variant="contained"
            color="primary"
            sx={{ backgroundColor: '#007BFF', '&:hover': { backgroundColor: '#0056b3' } }}
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Chatbot;
