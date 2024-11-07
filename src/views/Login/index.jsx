import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  Container, 
  Snackbar, 
  Alert, 
  CircularProgress, 
  Link,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { styled } from '@mui/system';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const GlassContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '100vh',
  padding: theme.spacing(2),
  background: 'radial-gradient(circle, #8A2BE2 0%, #4B0082 50%, #000000 100%)',
  backdropFilter: 'blur(10px)',
}));

const GlassBox = styled(motion.div)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.25)',
  backdropFilter: 'blur(10px)',
  color: '#000',
  borderRadius: theme.shape.borderRadius,
  border: '1px solid rgba(255, 255, 255, 0.18)',
  padding: theme.spacing(4),
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  width: '100%',
  maxWidth: 400,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '& .MuiInputBase-input': {
      color: '#FFFFFF',  // White text color
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.7)',  // White label color
  },
  '& .MuiInputBase-input::placeholder': {
    color: 'rgba(255, 255, 255, 0.5)',  // White placeholder color
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #9400D3 30%, #8A2BE2 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
  transition: 'all 0.3s',
  '&:hover': {
    background: 'linear-gradient(45deg, #8A2BE2 30%, #9400D3 90%)',
    transform: 'scale(1.05)',
  },
}));

const Login = () => {
  const [formData, setFormData] = useState({
    studentId: '',
    password: ''
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [studentName, setStudentName] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [isIdVerified, setIsIdVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleStudentIdChange = (e) => {
    const value = e.target.value;
    const formattedValue = value.replace(/[^0-9-]/g, '').slice(0, 8);
    setFormData(prevState => ({ ...prevState, studentId: formattedValue }));
    setIsIdVerified(false);
    setStudentName('');
  };

  const handleCheckStudentId = async () => {
    setIsChecking(true);
    try {
      const response = await axios.get(`http://localhost:3001/api/student/${formData.studentId}`);
      setStudentName(response.data.fullName);
      setIsIdVerified(true);
      setSnackbarMessage('Student ID verified');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error checking student ID:', error);
      setSnackbarMessage(error.response?.data.message || 'Failed to verify Student ID');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      setIsIdVerified(false);
    } finally {
      setIsChecking(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isIdVerified) {
      setSnackbarMessage('Please verify your Student ID first');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }
    try {
      const response = await axios.post('http://localhost:3001/login', formData);
      setSnackbarMessage(response.data.message);
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      
      localStorage.setItem('studentName', response.data.studentName);
      localStorage.setItem('studentId', formData.studentId);
  
      setTimeout(() => {
        navigate('/homepage');
      }, 1500);
    } catch (error) {
      setSnackbarMessage(error.response?.data.message || 'An error occurred');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <GlassContainer maxWidth={false}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography variant="h3" component="h1" sx={{ color: '#FFFF', fontWeight: 'bold', my: 4, textAlign: 'center' }}>
          OccuPulse™
        </Typography>
      </motion.div>

      <GlassBox
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Typography component="h2" variant="h5" align="center" sx={{ color: '#FFFF', mb: 3 }}>
          Student Login
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <StyledTextField
              margin="normal"
              required
              fullWidth
              id="studentId"
              label="Student ID"
              name="studentId"
              value={formData.studentId}
              onChange={handleStudentIdChange}
              placeholder="XX-XXXXX"
              inputProps={{ maxLength: 8, pattern: "[0-9]{2}-[0-9]{5}" }}
              autoFocus
              sx={{ mr: 1 }}
            />
            <StyledButton
              variant="contained"
              onClick={handleCheckStudentId}
              disabled={isChecking || (formData.studentId.length !== 7 && formData.studentId.length !== 8) || isIdVerified}
              sx={{ mt: 2, minWidth: '80px', height: '56px' }}
            >
              {isChecking ? <CircularProgress size={24} /> : 'Check'}
            </StyledButton>
          </Box>
          {studentName && (
            <Typography variant="body2" sx={{ color: '#FFFF', mt: 1 }}>
              {studentName}
            </Typography>
          )}
          <StyledTextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            disabled={!isIdVerified}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!isIdVerified}
          >
            Sign In
          </StyledButton>
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: '#1a237e' }}>
              Don't have an account?{' '}
              <Link href="http://localhost:3000/occupulse/application/register" underline="hover" sx={{ color: '#4cc2b1' }}>
                Create an Account
              </Link>
            </Typography>
          </Box>
        </Box>
      </GlassBox>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </GlassContainer>
  );
};

export default Login;

/* OLD CODE
import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  Container, 
  Snackbar, 
  Alert, 
  CircularProgress, 
  Link 
} from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';


const GlassContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '100vh',
  padding: theme.spacing(2),
  background: 'radial-gradient(circle, #8A2BE2 0%, #4B0082 50%, #000000 100%)',
  backdropFilter: 'blur(10px)',
}));

const GlassBox = styled(motion.div)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.25)',
  backdropFilter: 'blur(10px)',
  color: '#000',
  borderRadius: theme.shape.borderRadius,
  border: '1px solid rgba(255, 255, 255, 0.18)',
  padding: theme.spacing(4),
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  width: '100%',
  maxWidth: 400,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '& .MuiInputBase-input': {
      color: '#FFFFFF',  // White text color
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.7)',  // White label color
  },
  '& .MuiInputBase-input::placeholder': {
    color: 'rgba(255, 255, 255, 0.5)',  // White placeholder color
  },
}));


const StyledButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #9400D3 30%, #8A2BE2 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
  transition: 'all 0.3s',
  '&:hover': {
    background: 'linear-gradient(45deg, #8A2BE2 30%, #9400D3 90%)',
    transform: 'scale(1.05)',
  },
}));

const Login = () => {
  const [formData, setFormData] = useState({
    studentId: '',
    password: ''
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [studentName, setStudentName] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [isIdVerified, setIsIdVerified] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleStudentIdChange = (e) => {
    const value = e.target.value;
    const formattedValue = value.replace(/[^0-9-]/g, '').slice(0, 8);
    setFormData(prevState => ({ ...prevState, studentId: formattedValue }));
    setIsIdVerified(false);
    setStudentName('');
  };

  const handleCheckStudentId = async () => {
    setIsChecking(true);
    try {
      const response = await axios.get(`http://localhost:3001/api/student/${formData.studentId}`);
      setStudentName(response.data.fullName);
      setIsIdVerified(true);
      setSnackbarMessage('Student ID verified');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error checking student ID:', error);
      setSnackbarMessage(error.response?.data.message || 'Failed to verify Student ID');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      setIsIdVerified(false);
    } finally {
      setIsChecking(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isIdVerified) {
      setSnackbarMessage('Please verify your Student ID first');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }
    try {
      const response = await axios.post('http://localhost:3001/login', formData);
      setSnackbarMessage(response.data.message);
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      
      localStorage.setItem('studentName', response.data.studentName);
      localStorage.setItem('studentId', formData.studentId);
  
      setTimeout(() => {
        navigate('/homepage');
      }, 1500);
    } catch (error) {
      setSnackbarMessage(error.response?.data.message || 'An error occurred');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <GlassContainer maxWidth={false}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography variant="h3" component="h1" sx={{ color: '#FFFF', fontWeight: 'bold', my: 4, textAlign: 'center' }}>
          OccuPulse™
        </Typography>
      </motion.div>

      <GlassBox
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Typography component="h2" variant="h5" align="center" sx={{ color: '#FFFF', mb: 3 }}>
          Student Login
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <StyledTextField
              margin="normal"
              required
              fullWidth
              id="studentId"
              label="Student ID"
              name="studentId"
              value={formData.studentId}
              onChange={handleStudentIdChange}
              placeholder="XX-XXXXX"
              inputProps={{ maxLength: 8, pattern: "[0-9]{2}-[0-9]{5}" }}
              autoFocus
              sx={{ mr: 1 }}
            />
            <StyledButton
              variant="contained"
              onClick={handleCheckStudentId}
              disabled={isChecking || (formData.studentId.length !== 7 && formData.studentId.length !== 8) || isIdVerified}
              sx={{ mt: 2, minWidth: '80px', height: '56px' }}
            >
              {isChecking ? <CircularProgress size={24} /> : 'Check'}
            </StyledButton>
          </Box>
          {studentName && (
            <Typography variant="body2" sx={{ color: '#FFFF', mt: 1 }}>
              {studentName}
            </Typography>
          )}
          <StyledTextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            disabled={!isIdVerified}
          />
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!isIdVerified}
          >
            Sign In
          </StyledButton>
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: '#1a237e' }}>
              Don't have an account?{' '}
              <Link href="http://localhost:3000/occupulse/application/register" underline="hover" sx={{ color: '#4cc2b1' }}>
                Create an Account
              </Link>
            </Typography>
          </Box>
        </Box>
      </GlassBox>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </GlassContainer>
  );
};

export default Login;

*/