import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'start',
        marginTop: '150px',
        height: '100vh',
        textAlign: 'center',
        bgcolor: 'background.default',
        color: 'text.primary',
        p: 3,
      }}
    >
      <Typography
        variant="h1"
        component="div"
        gutterBottom
        sx={{ fontSize: '6rem', fontWeight: 'bold' }}
      >
        404
      </Typography>
      <Typography
        variant="h5"
        component="div"
        gutterBottom
        sx={{ fontSize: '2rem', fontWeight: 'bold' }}
      >
        Page Not Found
      </Typography>
      <Typography
        variant="body1"
        component="p"
        gutterBottom
        sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}
      >
        Sorry, the page you are looking for does not exist.
      </Typography>
      <Button variant='contained' color="primary" onClick={handleGoHome} sx={{ fontSize: '1.3rem', fontWeight: 'bold', width: 'auto' }}>
        Go to Home
      </Button>
    </Box>
  );
  
};

export default NotFound;
