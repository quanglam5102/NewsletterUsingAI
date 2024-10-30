// src/Chatbot.js

import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, List, ListItem, ListItemText } from '@mui/material';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, isUser: true }]);

      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'Thank you for your question! Here’s information about the newsletter.', isUser: false },
        ]);
      }, 500);

      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '85vh', // Full viewport height for vertical centering
        backgroundColor: '#f0f0f0' // Optional: add background color
      }}
    >
      <Paper elevation={3} sx={{ width: 400, height: 600, display: 'flex', flexDirection: 'column', borderRadius: 2 }}>
      <Box sx={{ backgroundColor: '#1976d2', color: 'white', padding: 2, textAlign: 'center' }}>
        <Typography variant="h6">Vinfast Assistant</Typography>
      </Box>
      <List sx={{ flex: 1, overflowY: 'auto', padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {messages.length === 0 ? (
          <Typography variant="body2" color="textSecondary">No messages yet.</Typography>
        ) : (
          messages.map((msg, index) => (
            <ListItem key={index} sx={{ justifyContent: msg.isUser ? 'flex-end' : 'flex-start', width: '100%' }}>
              <Box
                sx={{
                  backgroundColor: msg.isUser ? '#d1e7dd' : '#f8d7da',
                  color: '#333',
                  padding: 1.5,
                  borderRadius: 2,
                  maxWidth: '70%',
                  textAlign: msg.isUser ? 'right' : 'left', // Align text based on the sender
                }}
              >
                <ListItemText primary={msg.text} />
              </Box>
            </ListItem>
          ))
        )}
      </List>
      <Box sx={{ display: 'flex', padding: 2, borderTop: '1px solid #ddd', justifyContent: 'center' }}>
        <TextField
          variant="outlined"
          placeholder="Type your question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          sx={{ flex: 1, marginRight: 1 }}
        />
        <Button variant="contained" color="primary" onClick={sendMessage}>
          Send
        </Button>
      </Box>
    </Paper>
    </Box>
    
  );
};

export default Chatbot;
