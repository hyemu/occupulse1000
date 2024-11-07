import React, { useState } from 'react';
import {
  Box,
  Typography,
  Switch,
  FormControlLabel,
  Button,
  Grid,
  styled,
  Slider,
  IconButton,
  Tooltip,
} from '@mui/material';
import { motion } from 'framer-motion';
import { alpha } from '@mui/material/styles';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import LanguageIcon from '@mui/icons-material/Language';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import DeleteIcon from '@mui/icons-material/Delete';

// Styled components for glass effect
const GlassBox = styled(Box)(({ theme }) => ({
  background: alpha(theme.palette.background.paper, 0.7),
  backdropFilter: 'blur(10px)',
  borderRadius: 16,
  padding: theme.spacing(3),
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 40px rgba(0, 0, 0, 0.2)',
  },
}));

const AnimatedButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  borderRadius: 25,
  color: theme.palette.common.white,
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
  },
}));

const GlassIconButton = styled(IconButton)(({ theme }) => ({
  background: alpha(theme.palette.background.paper, 0.5),
  backdropFilter: 'blur(10px)',
  borderRadius: '50%',
  padding: theme.spacing(1.5),
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    background: alpha(theme.palette.background.paper, 0.7),
    transform: 'scale(1.1)',
  },
}));

const SettingsPage = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [volume, setVolume] = useState(50);
  const [language, setLanguage] = useState('English');
  const [fontSize, setFontSize] = useState(16);

  const handleEmailNotificationsChange = (event) => {
    setEmailNotifications(event.target.checked);
  };

  const handleDarkModeChange = (event) => {
    setDarkMode(event.target.checked);
  };

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleFontSizeChange = (event, newValue) => {
    setFontSize(newValue);
  };

  const handleDeleteAccount = () => {
    // Handle account deletion here
    alert('Are you sure you want to delete your account? This action cannot be undone.');
  };

  return (
    <Box sx={{ p: 3}}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" gutterBottom sx={{ color: '#1a237e', fontWeight: 'bold' }}>
          Settings
        </Typography>
      </motion.div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <GlassBox>
              <Box display="flex" alignItems="center" mb={2}>
                <GlassIconButton>
                  <NotificationsIcon color="primary" />
                </GlassIconButton>
                <Typography variant="h6" sx={{ ml: 2 }}>Notifications</Typography>
              </Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={emailNotifications}
                    onChange={handleEmailNotificationsChange}
                    color="primary"
                  />
                }
                label="Email Notifications"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={darkMode}
                    onChange={handleDarkModeChange}
                    color="primary"
                  />
                }
                label="Dark Mode"
              />
              <Box mt={2}>
                <Typography gutterBottom>System Volume</Typography>
                <Slider
                  value={volume}
                  onChange={handleVolumeChange}
                  aria-labelledby="continuous-slider"
                  valueLabelDisplay="auto"
                  min={0}
                  max={100}
                />
              </Box>
            </GlassBox>
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <GlassBox>
              <Box display="flex" alignItems="center" mb={2}>
                <GlassIconButton>
                  <PrivacyTipIcon color="primary" />
                </GlassIconButton>
                <Typography variant="h6" sx={{ ml: 2 }}>Privacy</Typography>
              </Box>
              <FormControlLabel
                control={<Switch color="primary" />}
                label="Make profile public"
              />
              <FormControlLabel
                control={<Switch color="primary" />}
                label="Share activity with others"
              />
              <FormControlLabel
                control={<Switch color="primary" />}
                label="Allow friend requests"
              />
            </GlassBox>
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <GlassBox>
              <Box display="flex" alignItems="center" mb={2}>
                <GlassIconButton>
                  <LanguageIcon color="primary" />
                </GlassIconButton>
                <Typography variant="h6" sx={{ ml: 2 }}>Language & Region</Typography>
              </Box>
              <FormControlLabel
                control={
                  <select
                    value={language}
                    onChange={handleLanguageChange}
                    style={{ marginLeft: 8 }}
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                  </select>
                }
                label="Language"
              />
              <FormControlLabel
                control={<Switch color="primary" />}
                label="Use 24-hour time"
              />
            </GlassBox>
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <GlassBox>
              <Box display="flex" alignItems="center" mb={2}>
                <GlassIconButton>
                  <AccessibilityNewIcon color="primary" />
                </GlassIconButton>
                <Typography variant="h6" sx={{ ml: 2 }}>Accessibility</Typography>
              </Box>
              <Box mb={2}>
                <Typography gutterBottom>Font Size</Typography>
                <Slider
                  value={fontSize}
                  onChange={handleFontSizeChange}
                  aria-labelledby="font-size-slider"
                  valueLabelDisplay="auto"
                  min={12}
                  max={24}
                  step={1}
                />
              </Box>
              <FormControlLabel
                control={<Switch color="primary" />}
                label="High contrast mode"
              />
              <FormControlLabel
                control={<Switch color="primary" />}
                label="Screen reader"
              />
            </GlassBox>
          </motion.div>
        </Grid>
      </Grid>
      <Box mt={4} display="flex" justifyContent="center">
        <Tooltip title="Delete your account permanently" arrow>
          <AnimatedButton
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDeleteAccount}
          >
            Delete Account
          </AnimatedButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default SettingsPage;