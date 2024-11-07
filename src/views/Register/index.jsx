import React, { useState } from 'react';
import axios from 'axios';
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  Container, 
  MenuItem, 
  Select, 
  InputLabel, 
  FormControl, 
  Link,
  Snackbar,
  Alert,
  InputAdornment
} from '@mui/material';
import { styled } from '@mui/system';
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
  borderRadius: theme.shape.borderRadius,
  border: '1px solid rgba(255, 255, 255, 0.18)',
  padding: theme.spacing(4),
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  width: '100%',
  maxWidth: 500,
}));
const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.3)',
      borderWidth: '2px',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  '& .MuiInputBase-input': {
    color: '#FFFFFF',  // White text
  },
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'rgba(0, 0, 0, 0.3)',
      borderWidth: '2px',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(0, 0, 0, 0.5)',
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(0, 0, 0, 0.7)',
  },
  '& .MuiSelect-select': {
    color: '#FFFFFF',  // White text
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

const studentData = {
  '2100062': 'France Angelo S. Alcantara',
  '2100555': 'Vincent C. Antanoy',
  '2100447': 'Ma. Khlarence R. Arnau',
  '2100131': 'Lovely Ann L. Baylon',
  '2100355': 'Kian I. Candelario',
  '2100133': 'Edelyn D. Carable',
  '2100444': 'Gian Carlo E. Catalan',
  '2100125': 'Raven Drake C. Cruz',
  '2101026': 'Russel D. Custodio',
  '2100567': 'Aaron L. De Leon',
  '2101021': 'Jheizon Brhylle P. Dela Cruz',
  '2100612': 'Emmanuel M. Ejudo',
  '2101022': 'Ayemarson Miguel D. Enriquez',
  '2100356': 'Mel Zedric A. Faustino',
  '2100155': 'Raven F. Fortin',
  '2101038': 'Harlene P. Fraga',
  '2101018': 'Paul Adrian L. Godes',
  '2100260': 'Ryan Celestino B. Intalan',
  '2100174': 'Paul Vincent C. Javier',
  '2101054': 'Shaila C. Latupan',
  '2100378': 'Ace Crizller T. Magnaye',
  '2100409': 'Mark Leonard M. Magsaulog',
  '2100864': 'Vincent B. Maiwat',
  '2100784': 'John Rafael T. Mendoza',
  '2100620': 'Robert Leoni F. Mirabel',
  '2100831': 'Micah Ann F. Monloy',
  '2101020': 'Angelo James R. Panoy',
  '2100406': 'Jhermaine Y. Parrucho',
  '2100591': 'Joshua Ezekiel E. Perez',
  '2100858': 'Alejandro A. Prado',
  '2101019': 'Shane Christopher Santana',
  '2100879': 'Ritchmond James S. Tajarros',
  '2100094': 'Leomar A. Tuazon',
  '2100861': 'Gabriel D. Ventura',
};

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    studentId: '',
    sex: '',
    year: '',
    course: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    fullName: false,
    studentId: false,
    sex: false,
    year: false,
    password: false
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
    setErrors(prevState => ({ ...prevState, [name]: !value }));
  };

  const handleStudentIdChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setFormData(prevState => ({
      ...prevState,
      studentId: value,
    }));
    setErrors(prevState => ({
      ...prevState,
      studentId: !value,
    }));
  };

  const handleCheckStudentId = () => {
    const fullName = studentData[formData.studentId] || '';
    setFormData(prevState => ({
      ...prevState,
      fullName: fullName
    }));
    setErrors(prevState => ({
      ...prevState,
      fullName: !fullName,
      studentId: !fullName
    }));
  };

  const validateForm = () => {
    return Object.values(formData).every(value => value) && !Object.values(errors).includes(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:3001/register', formData);
        setSnackbarMessage(response.data);
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
      } catch (error) {
        console.error('There was an error registering the student!', error);
        setSnackbarMessage(error.response?.data || 'An error occurred during registration');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
    } else {
      setErrors({
        fullName: !formData.fullName,
        studentId: !formData.studentId,
        sex: !formData.sex,
        year: !formData.year,
        password: !formData.password
      });
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
          Student Registration
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <StyledTextField
            margin="normal"
            required
            fullWidth
            id="studentId"
            label="Student ID"
            name="studentId"
            value={formData.studentId}
            onChange={handleStudentIdChange}
            placeholder="2100000"
            inputProps={{ maxLength: 7, pattern: "[0-9]{7}" }}
            error={errors.studentId}
            helperText={errors.studentId ? 'Student ID is required and must be valid' : ''}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button onClick={handleCheckStudentId} variant="contained" size="small">
                    Check
                  </Button>
                </InputAdornment>
              ),
            }}
          />
          <StyledTextField
            margin="normal"
            required
            fullWidth
            id="fullName"
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            InputProps={{
              readOnly: true,
            }}
            error={errors.fullName}
            helperText={errors.fullName ? 'Valid Student ID is required for Full Name' : ''}
          />
          <StyledFormControl fullWidth margin="normal" error={errors.sex}>
            <InputLabel id="sex-label">Sex</InputLabel>
            <Select
              labelId="sex-label"
              id="sex"
              name="sex"
              value={formData.sex}
              onChange={handleChange}
              label="Sex"
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
            {errors.sex && <Typography color="error">Sex is required</Typography>}
          </StyledFormControl>
          <StyledFormControl fullWidth margin="normal" error={errors.year}>
            <InputLabel id="year-label">Year</InputLabel>
            <Select
              labelId="year-label"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              label="Year"
            >
              <MenuItem value="1st year">1st Year</MenuItem>
              <MenuItem value="2nd year">2nd Year</MenuItem>
              <MenuItem value="3rd year">3rd Year</MenuItem>
              <MenuItem value="4th year">4th Year</MenuItem>
            </Select>
            {errors.year && <Typography color="error">Year is required</Typography>}
          </StyledFormControl>
          <StyledFormControl fullWidth margin="normal" error={errors.course}>
            <InputLabel id="course-label">Course</InputLabel>
            <Select labelId="course-label" id="course" name="course" value={formData.course} onChange={handleChange}>
            <MenuItem value="College of Computer Studies">College of Computer Studies</MenuItem>
            < MenuItem value="College of Nursing">College of Nursing</MenuItem>
            <MenuItem value="College of Business and Accountancy">College of Business and Accountancy</MenuItem>
            <MenuItem value="College of Education">College of Education</MenuItem>
            <MenuItem value="College of Engineering">College of Engineering</MenuItem>
            <MenuItem value="College of Hotel and Management">College of Hotel and Management</MenuItem>
            </Select>
            {errors.course && <Typography color="error">Course is required</Typography>}
          </StyledFormControl>
          <StyledTextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            helperText={errors.password ? 'Password is required' : ''}
          />
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!validateForm()}
          >
            Register
          </StyledButton>
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: '#1a237e' }}>
              Already have an account?{' '}
              <Link href="http://localhost:3000/occupulse/application/login" underline="hover" sx={{ color: '#4cc2b1' }}>
                Login
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

export default RegisterForm;














/*
import React, { useState } from 'react';
import axios from 'axios';
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  Container, 
  MenuItem, 
  Select, 
  InputLabel, 
  FormControl, 
  Link,
  Snackbar,
  Alert
} from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';

const GlassContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '100vh',
  padding: theme.spacing(2),
  background: 'linear-gradient(135deg, rgba(132, 250, 176, 0.7) 0%, rgba(143, 211, 244, 0.7) 100%)',
  backdropFilter: 'blur(10px)',
}));

const GlassBox = styled(motion.div)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.25)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.shape.borderRadius,
  border: '1px solid rgba(255, 255, 255, 0.18)',
  padding: theme.spacing(4),
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  width: '100%',
  maxWidth: 500,
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
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(0, 0, 0, 0.7)',
  },
  '& .MuiInputBase-input': {
    color: '#000',
  },
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
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
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(0, 0, 0, 0.7)',
  },
  '& .MuiSelect-select': {
    color: '#000',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
  transition: 'all 0.3s',
  '&:hover': {
    background: 'linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)',
    transform: 'scale(1.05)',
  },
}));

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    studentId: '',
    sex: '',
    year: '',
    course: 'Bachelor of Science in Computer Science',
    password: ''
  });

  const [errors, setErrors] = useState({
    fullName: false,
    studentId: false,
    sex: false,
    year: false,
    password: false
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
    setErrors(prevState => ({ ...prevState, [name]: !value }));
  };

  const handleStudentIdChange = (e) => {
    const value = e.target.value;
    const formattedValue = value.replace(/[^0-9-]/g, '').slice(0, 8);
    setFormData(prevState => ({ ...prevState, studentId: formattedValue }));
    setErrors(prevState => ({ ...prevState, studentId: !formattedValue }));
  };

  const validateForm = () => {
    return Object.values(formData).every(value => value) && !Object.values(errors).includes(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:3001/register', formData);
        setSnackbarMessage(response.data);
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
      } catch (error) {
        console.error('There was an error registering the student!', error);
        setSnackbarMessage(error.response?.data || 'An error occurred during registration');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
    } else {
      setErrors({
        fullName: !formData.fullName,
        studentId: !formData.studentId,
        sex: !formData.sex,
        year: !formData.year,
        password: !formData.password
      });
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
        <Typography variant="h3" component="h1" sx={{ color: '#1a237e', fontWeight: 'bold', my: 4, textAlign: 'center' }}>
          OccuPulse™
        </Typography>
      </motion.div>

      <GlassBox
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Typography component="h2" variant="h5" align="center" sx={{ color: '#1a237e', mb: 3 }}>
          Student Registration
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <StyledTextField
            margin="normal"
            required
            fullWidth
            id="fullName"
            label="Full Name"
            name="fullName"
            autoComplete="name"
            autoFocus
            value={formData.fullName}
            onChange={handleChange}
            error={errors.fullName}
            helperText={errors.fullName ? 'Full Name is required' : ''}
          />
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
            error={errors.studentId}
            helperText={errors.studentId ? 'Student ID is required' : ''}
          />
          <StyledFormControl fullWidth margin="normal" error={errors.sex}>
            <InputLabel id="sex-label">Sex</InputLabel>
            <Select
              labelId="sex-label"
              id="sex"
              name="sex"
              value={formData.sex}
              onChange={handleChange}
              label="Sex"
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
            {errors.sex && <Typography color="error">Sex is required</Typography>}
          </StyledFormControl>
          <StyledFormControl fullWidth margin="normal" error={errors.year}>
            <InputLabel id="year-label">Year</InputLabel>
            <Select
              labelId="year-label"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              label="Year"
            >
              <MenuItem value="1st year">1st Year</MenuItem>
              <MenuItem value="2nd year">2nd Year</MenuItem>
              <MenuItem value="3rd year">3rd Year</MenuItem>
              <MenuItem value="4th year">4th Year</MenuItem>
            </Select>
            {errors.year && <Typography color="error">Year is required</Typography>}
          </StyledFormControl>
          <StyledTextField
            margin="normal"
            fullWidth
            id="course"
            label="Course"
            name="course"
            value={formData.course}
            InputProps={{
              readOnly: true,
            }}
            onChange={handleChange}
          />
          <StyledTextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            helperText={errors.password ? 'Password is required' : ''}
          />
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!validateForm()}
          >
            Register
          </StyledButton>
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: '#1a237e' }}>
              Already have an account?{' '}
              <Link href="http://localhost:3000/occupulse/application/login" underline="hover" sx={{ color: '#4cc2b1' }}>
                Login
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

export default RegisterForm;
*/