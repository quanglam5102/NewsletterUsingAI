import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box, CircularProgress } from '@mui/material';

const Profile = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    // Add more fields as needed
  });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  // Simulate API call to fetch user data
  useEffect(() => {
    setTimeout(() => {
      // Fetch user data here from backend API
      setUserData({
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '123-456-7890',
        address: '123 Main St, Springfield',
      });
      setLoading(false);
    }, 1000); // Simulated loading time
  }, []);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    // API call to save updated user info
    console.log('User data saved:', userData);
    setIsEditing(false);
  };

  if (loading) {
    return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          User Profile
        </Typography>

        <form noValidate autoComplete="off">
          <TextField
            label="Name"
            name="name"
            value={userData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            disabled={!isEditing}
          />
          <TextField
            label="Email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            disabled={!isEditing}
          />
          <TextField
            label="Phone"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
            fullWidth
            margin="normal"
            disabled={!isEditing}
          />
          <TextField
            label="Address"
            name="address"
            value={userData.address}
            onChange={handleChange}
            fullWidth
            margin="normal"
            disabled={!isEditing}
          />
          {/* Add more fields as needed */}

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            {isEditing ? (
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save Changes
              </Button>
            ) : (
              <Button variant="outlined" onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            )}
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Profile;
