import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Grid, IconButton } from '@mui/material';

// project import
import SearchSection from './SearchSection';
import ProfileSection from './ProfileSection';
import NotificationSection from './NotificationSection';
import { drawerWidth } from 'config.js';

// assets
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import logo from 'assets/images/banner.png';

// Custom styles
const HeaderBox = styled(Box)(({ theme }) => ({
  background: 'rgba(38, 43, 64, 0.0)', // Semi-transparent background for glass effect
  color: theme.palette.primary.contrastText, // Text color
  backdropFilter: 'blur(1px)', // Blur effect for glassy look
  zIndex: 1201,
  padding: theme.spacing(1),
  borderBottom: `1px solid ${theme.palette.divider}`, // Optional: border for separation
}));

const HeaderIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.contrastText, // Icon color
  '&:hover': {
    backgroundColor: theme.palette.action.hover, // Optional: hover effect
  },
}));

// ==============================|| HEADER ||============================== //

const Header = ({ drawerToggle }) => {
  const theme = useTheme();

  return (
    <>
      <HeaderBox width={drawerWidth}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Grid item>
              <Box mt={0.5}>
                <img src={logo} alt="Logo" />
              </Box>
            </Grid>
          </Box>
          <Grid item>
            <HeaderIconButton
              edge="start"
              sx={{ mr: theme.spacing(1.25) }}
              aria-label="open drawer"
              onClick={drawerToggle}
              size="large"
            >
              <MenuTwoToneIcon sx={{ fontSize: '1.5rem' }} />
            </HeaderIconButton>
          </Grid>
        </Grid>
      </HeaderBox>
      <Box sx={{ flexGrow: 1 }} />
      <SearchSection theme="light" />
      <NotificationSection />
      <ProfileSection />
    </>
  );
};

Header.propTypes = {
  drawerToggle: PropTypes.func,
};

export default Header;


/* OLD LAYOUT
import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Grid, IconButton } from '@mui/material';

// project import
import SearchSection from './SearchSection';
import ProfileSection from './ProfileSection';
import NotificationSection from './NotificationSection';
import { drawerWidth } from 'config.js';

// assets
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import logo from 'assets/images/banner.png';

// Custom styles
const HeaderBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark, // Header background color
  color: theme.palette.primary.contrastText, // Text color
  zIndex: 1201,
  padding: theme.spacing(1),
  borderBottom: `1px solid ${theme.palette.divider}`, // Optional: border for separation
}));

const HeaderIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.contrastText, // Icon color
  '&:hover': {
    backgroundColor: theme.palette.action.hover, // Optional: hover effect
  },
}));

// ==============================|| HEADER ||============================== //

const Header = ({ drawerToggle }) => {
  const theme = useTheme();

  return (
    <>
      <HeaderBox width={drawerWidth}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Grid item>
              <Box mt={0.5}>
                <img src={logo} alt="Logo" />
              </Box>
            </Grid>
          </Box>
          <Grid item>
            <HeaderIconButton
              edge="start"
              sx={{ mr: theme.spacing(1.25) }}
              aria-label="open drawer"
              onClick={drawerToggle}
              size="large"
            >
              <MenuTwoToneIcon sx={{ fontSize: '1.5rem' }} />
            </HeaderIconButton>
          </Grid>
        </Grid>
      </HeaderBox>
      <Box sx={{ flexGrow: 1 }} />
      <SearchSection theme="light" />
      <NotificationSection />
      <ProfileSection />
    </>
  );
};

Header.propTypes = {
  drawerToggle: PropTypes.func,
};

export default Header;
*/