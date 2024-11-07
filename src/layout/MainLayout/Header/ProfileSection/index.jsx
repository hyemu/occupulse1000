import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Fade, Button, ClickAwayListener, Paper, Popper, List, ListItemText, ListItemIcon, ListItemButton } from '@mui/material';
import PersonTwoToneIcon from '@mui/icons-material/PersonTwoTone';
import DraftsTwoToneIcon from '@mui/icons-material/DraftsTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import MeetingRoomTwoToneIcon from '@mui/icons-material/MeetingRoomTwoTone';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const ProfileSection = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [open, setOpen] = React.useState(false);
  const [locked, setLocked] = React.useState(false); // Lock screen state
  const anchorRef = React.useRef(null);

  // Handle item clicks in the menu
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    switch (index) {
      case 0:
        navigate('/settings');
        break;
      case 1:
        navigate('/student');
        break;
      case 2:
        navigate('/message');
        break;
      case 3:
        handleLockScreen();
        break;
      case 4:
        handleLogout();
        break;
      default:
        break;
    }
  };

  // Toggle menu visibility
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  // Close menu when clicking outside
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  // Handle logout
  const handleLogout = () => {
    Cookies.remove('session'); // Replace 'session' with the actual cookie name
    navigate('/application/land'); // Redirect to the specified URL
  };

  // Show lock screen overlay
  const handleLockScreen = () => {
    setLocked(true);
  };

  // Remove lock screen overlay
  const handleUnlockScreen = () => {
    setLocked(false);
  };

  // Manage focus when menu opens and closes
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Button
        sx={{ minWidth: { sm: 50, xs: 35 } }}
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        aria-label="Profile"
        onClick={handleToggle}
        color="inherit"
      >
        <AccountCircleTwoToneIcon sx={{ fontSize: '1.5rem' }} />
      </Button>
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [0, 10],
            },
          },
          {
            name: 'preventOverflow',
            options: {
              altAxis: true,
            },
          },
        ]}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <List
                  sx={{
                    width: '100%',
                    maxWidth: 350,
                    minWidth: 250,
                    backgroundColor: theme.palette.background.paper,
                    pb: 0,
                    borderRadius: '10px',
                  }}
                >
                  <ListItemButton selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
                    <ListItemIcon>
                      <SettingsTwoToneIcon />
                    </ListItemIcon>
                    <ListItemText primary="Settings" />
                  </ListItemButton>
                  <ListItemButton selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
                    <ListItemIcon>
                      <PersonTwoToneIcon />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                  </ListItemButton>
                  <ListItemButton selected={selectedIndex === 2} onClick={(event) => handleListItemClick(event, 2)}>
                    <ListItemIcon>
                      <DraftsTwoToneIcon />
                    </ListItemIcon>
                    <ListItemText primary="My Messages" />
                  </ListItemButton>
                  <ListItemButton selected={selectedIndex === 3} onClick={handleLockScreen}>
                    <ListItemIcon>
                      <LockOpenTwoToneIcon />
                    </ListItemIcon>
                    <ListItemText primary="Lock Screen" />
                  </ListItemButton>
                  <ListItemButton selected={selectedIndex === 4} onClick={handleLogout}>
                    <ListItemIcon>
                      <MeetingRoomTwoToneIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </ListItemButton>
                </List>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>

      {/* Lock Screen Overlay */}
      {locked && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999, // High z-index to cover everything
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleUnlockScreen}
            sx={{ padding: '20px', fontSize: '1.2rem' }}
          >
            Unlock
          </Button>
        </div>
      )}
    </>
  );
};

export default ProfileSection;
