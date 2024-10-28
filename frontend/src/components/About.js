import React from 'react';
import { Container, Typography, Box, Button, Grid, Paper, Link } from '@mui/material';
import { Info as InfoIcon, AutoFixHigh as AutomationIcon, People as PeopleIcon } from '@mui/icons-material';

const About = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" gutterBottom align="center">
          About Us
        </Typography>
        <Typography variant="h5" paragraph align="center">
          Welcome to Generate Newsletter Using AI, your ultimate AI-driven newsletter solution!
        </Typography>
        <Typography variant="body1" paragraph>
          At Generate Newsletter Using AI, we revolutionize how businesses and individuals create and distribute newsletters. Our app harnesses the power of artificial intelligence to generate personalized, high-quality newsletters effortlessly. Whether you're a small business owner or a marketing expert, our platform will make the newsletter creation process fast and efficient.
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
              <InfoIcon color="primary" sx={{ fontSize: 60 }} />
              <Typography variant="h6" gutterBottom>
                AI-Driven Content
              </Typography>
              <Typography variant="body2">
                Use cutting-edge AI to generate tailored content based on your audience, ensuring that every newsletter is relevant and engaging.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
              <AutomationIcon color="secondary" sx={{ fontSize: 60 }} />
              <Typography variant="h6" gutterBottom>
                Automated Workflows
              </Typography>
              <Typography variant="body2">
                Automate the process of creating and sending newsletters, saving you time and ensuring consistency in communication.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
              <PeopleIcon color="action" sx={{ fontSize: 60 }} />
              <Typography variant="h6" gutterBottom>
                Community Support
              </Typography>
              <Typography variant="body2">
                Join a community of users who share tips, strategies, and inspiration for newsletter success.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button variant="contained" color="primary" href="/">
            Get Started
          </Button>
        </Box>

        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" gutterBottom align="center">
            Our Mission
          </Typography>
          <Typography variant="body1" paragraph>
            Our mission is to empower businesses and individuals by making newsletter creation simple and accessible through the power of AI. We believe that technology should enhance your ability to connect with your audience, not make it more complicated.
          </Typography>
          <Typography variant="h6" gutterBottom>
            Meet the Team
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={4}>
              <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
                <img src="../../static/images/Emily.jpeg" alt="Emily Johnson" style={{ width: 100, height: 100, borderRadius: '50%' }} />
                <Typography variant="h6" gutterBottom>
                  Emily Johnson
                </Typography>
                <Typography variant="body2">
                  Founder & CEO
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
                <img src="../../static/images/Jane.jpeg" alt="Jane Smith" style={{ width: 100, height: 100, borderRadius: '50%' }} />
                <Typography variant="h6" gutterBottom>
                  Jane Smith
                </Typography>
                <Typography variant="body2">
                  Chief AI Engineer
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
                <img src="../../static/images/John.jpeg" alt="John Doe" style={{ width: 100, height: 100, borderRadius: '50%' }} />
                <Typography variant="h6" gutterBottom>
                  John Doe
                </Typography>
                <Typography variant="body2">
                  Head of Customer Success
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Footer Component */}
      <Box
        sx={{
          p: 2,
          mt: 4,
          bgcolor: 'background.paper',
          boxShadow: 1,
          textAlign: 'center',
          position: 'relative',
          bottom: 0,
          width: '100%',
        }}
      >
        <Typography variant="body2" color="text.secondary">
          &copy; {new Date().getFullYear()} Generate Newsletter Using AI. All rights reserved.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Contact us: <Link href="mailto:info@generateai.com">info@generateai.com</Link> | 
          <Link href="tel:+1234567890" sx={{ ml: 1 }}>+1 (234) 567-890</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default About;
