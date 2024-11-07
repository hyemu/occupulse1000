import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Box, 
  Button, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  useTheme, 
  useMediaQuery,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Avatar,
} from '@mui/material';
import { styled } from '@mui/system';
import BarChartIcon from '@mui/icons-material/BarChart';
import TimelineIcon from '@mui/icons-material/Timeline';
import SchoolIcon from '@mui/icons-material/School';
import InsightsIcon from '@mui/icons-material/Insights';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { motion } from 'framer-motion';

const GlassPaper = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.shape.borderRadius,
  border: '1px solid rgba(255, 255, 255, 0.18)',
  padding: theme.spacing(3),
  textAlign: 'center',
  color: '#FFFFFF',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
    background: 'rgba(255, 255, 255, 0.35)',
  },
}));

const GlassAppBar = styled(AppBar)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.18)',
  boxShadow: 'none',
}));

const AnimatedBox = styled(motion.div)({
  width: '100%',
});

const Header = () => (
  <GlassAppBar position="static">
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1, color: '#FFFFFF' }}>
        OccuPulse™
      </Typography>
      <Button color="inherit" sx={{ color: '#FFFF' }} onClick={() => window.location.href = 'http://localhost:3000/occupulse/application/login'}>Login</Button>
      <Button color="inherit" sx={{ color: '#FFFF' }} onClick={() => window.location.href = 'http://localhost:3000/occupulse/application/register'}>Register</Button>
    </Toolbar>
  </GlassAppBar>
);

const Footer = () => (
  <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', background: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(10px)',color: '#FFFFFF', textAlign: 'center' }}>
    <Typography variant="body1">© 2024 Occupulse™. All rights reserved.</Typography>
  </Box>
);

const LandingPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handlePredictClick = () => {
    window.location.href = 'http://localhost:3000/occupulse/application/login';
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      background: 'radial-gradient(circle, #8A2BE2 0%, #4B0082 50%, #000000 100%)',
    }}>
      <Header />
      <Container maxWidth="lg" sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', py: 6 }}>
        <AnimatedBox
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box textAlign="center" mb={6}>
            <Typography variant="h2" component="h1" gutterBottom sx={{ color: '#E6E6FA', fontWeight: 'bold' }}>
              Welcome to OccuPulse™
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#E6E6FA' }}>
              Empowering Education through Predictive Analytics
            </Typography>
          </Box>
        </AnimatedBox>

        <Grid container spacing={4} mb={6}>
          {[
            { icon: BarChartIcon, title: 'Data-Driven Insights' },
            { icon: TimelineIcon, title: 'Predictive Analytics' },
            { icon: SchoolIcon, title: 'Student Success' },
            { icon: InsightsIcon, title: 'Performance Tracking' },
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <AnimatedBox
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <GlassPaper elevation={3}>
                <item.icon sx={{ fontSize: 48, mb: 2, color: '#FFFFFF' }} />
                <Typography variant="h6" sx={{ color: '#FFFFFF' }}>
                {item.title}
                </Typography>
                </GlassPaper>
              </AnimatedBox>
            </Grid>
          ))}
        </Grid>

        <AnimatedBox
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Box textAlign="center" mb={6}>
            <Button 
              variant="contained" 
              color="primary" 
              size="large" 
              onClick={handlePredictClick}
              sx={{ 
                fontSize: isSmallScreen ? '1rem' : '1.2rem', 
                py: isSmallScreen ? 1 : 2, 
                px: isSmallScreen ? 3 : 4,
                background: 'linear-gradient(45deg, #9400D3 30%, #8A2BE2 90%)',
                color: 'white',
                border: 0,
                boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                color: 'white',
                transition: 'all 0.3s',
                '&:hover': {
                  background: 'linear-gradient(45deg, #8A2BE2 30%, #9400D3 90%)',
                  transform: 'scale(1.05)',
                }
              }}
            >
              Start Predicting
            </Button>
          </Box>
        </AnimatedBox>
        
        <AnimatedBox
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Box textAlign="center" mb={6}>
            <Typography variant="h4" component="h3" gutterBottom sx={{ color: '#FFFF' }}>
              Our Services
            </Typography>
            <Typography variant="body1" component="p" sx={{ maxWidth: 600, mx: 'auto', mb: 4, color: '#FFFF' }}>
              At Occupulse, we offer a wide range of services to help students achieve their academic and career goals. Our advanced predictive analytics tools and data-driven insights empower students to make informed decisions and track their performance effectively.
            </Typography>
          </Box>
        </AnimatedBox>

        <Grid container spacing={4} mb={6}>
          {[
            { 
              title: 'Career Path Prediction', 
              description: 'Analyze your skills and interests to predict potential career paths. Time flies by, now is not the time to get lost.',
              image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2FyZWVyfGVufDB8fDB8fHww',
            },
            { 
              title: 'Academic Performance Tracking', 
              description: 'Monitor your academic progress and receive personalized improvement suggestions.',
              image: 'https://images.unsplash.com/photo-1528980917907-8df7f48f6f2a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YWNhZGVtaWN8ZW58MHx8MHx8fDA%3D',
            },
            { 
              title: 'Realtime Industry Trend Analysis', 
              description: 'Stay updated with the latest trends in your field of interest. Discover where the opportunities lie.',
              image: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aW5kdXN0cnklMjB0cmVuZHN8ZW58MHx8MHx8fDA%3D',
            },
            { 
              title: 'Student Support Services', 
              description: 'Get access to a wide range of support services tailored to your needs.',
              image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3VwcG9ydHxlbnwwfHwwfHx8MA%3D%3D',
            },
          ].map((service, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'rgba(255, 255, 255, 0.25)',
                  color: '#FFFF',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
                    background: 'rgba(255, 255, 255, 0.35)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={service.image}
                  alt={service.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div" sx={{ color: '#1a237e' }}>
                    {service.title}
                  </Typography>
                  <Typography variant="body2" color="#FFFF">
                    {service.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <AnimatedBox
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Box textAlign="center" mb={6}>
            <Typography variant="h4" component="h3" gutterBottom sx={{ color: '#FFFF' }}>
              What Our Users Say
            </Typography>
          </Box>
          <Grid container spacing={4} justifyContent="center">
            {[
              { 
                name: 'Pham Hanni', 
                testimonial: 'Occupulse has significantly improved my academic performance and helped me choose the right career path.',
                avatar: 'https://blogger.googleusercontent.com/img/a/AVvXsEihr7dHIXBq3ZJ6ubkPLw0VXEUYauMbp_xQrjsQ77VW1h2gOmW1ryfVwKs3ZDcJI-8DmrV5ht1gLQHzISeeDr8h7Cd_z1EzhG3El1AD1l9dsNFpD3gKOFway6Ke7L_EmCBYtpX2vXdczFHDi3MUXJk-5VhRYz88MFguPpDh1x_RYHL4BTeY_UNWPLXiQXU',
              },
              { 
                name: 'Kang Haerin', 
                testimonial: 'Thanks to Occupulse, I am now more confident about my career choices and academic progress.',
                avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIkQyHqZRUzWgNv1O3_dNZ3-fVmAJCfvI7DQ&s',
              },
            ].map((user, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: '#FFFFFF',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    p: 2,
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
                      background: 'rgba(255, 255, 255, 0.2)',
                    },
                  }}
                >
                  <Avatar
                    alt={user.name}
                    src={user.avatar}
                    sx={{ width: 56, height: 56, mr: 2 }}
                  />
                  <Box>
                    <Typography variant="h6" sx={{ color: '#1a237e' }}>{user.name}</Typography>
                    <Typography variant="body2" color="#FFFF">{user.testimonial}</Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </AnimatedBox>

        <AnimatedBox
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Box textAlign="center" mt={8}>
            <Typography variant="h4" component="h3" gutterBottom sx={{ color: '#FFFF' }}>
              Contact Us
            </Typography>
            <Typography variant="body1" component="p" sx={{ maxWidth: 600, mx: 'auto', mb: 4, color: '#FFFF' }}>
              Have questions? Get in touch with us! We're here to help you every step of the way.
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              onClick={() => window.location.href = 'mailto:support@occupulse.com'}
              sx={{ 
                fontSize: isSmallScreen ? '1rem' : '1.2rem', 
                py: isSmallScreen ? 1 : 2, 
                px: isSmallScreen ? 3 : 4,
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                border: 0,
                boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                color: 'white',
                transition: 'all 0.3s',
                '&:hover': {
                  background: 'linear-gradient(45deg, #FE8B8B 30%, #FF9E53 90%)',
                  transform: 'scale(1.05)',
                }
              }}
            >
              Email Us
            </Button>
          </Box>
        </AnimatedBox>
      </Container>
      <Footer />
    </Box>
  );
};

export default LandingPage;
