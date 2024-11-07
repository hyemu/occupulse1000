import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';

const AuthRegister = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    studentId: '',
    sex: '',
    year: '',
    course: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'studentId') {
      const formattedValue = value.replace(/[^0-9-]/g, '').slice(0, 8);
      setFormData({ ...formData, [name]: formattedValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/register', formData); // Use relative path
      alert(response.data.message);
      setFormData({
        fullName: '',
        studentId: '',
        sex: '',
        year: '',
        course: '',
        password: ''
      });
    } catch (error) {
      alert('Error registering student: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Student Registration
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
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
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="studentId"
            label="Student ID"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            placeholder="XX-XXXXX"
            inputProps={{ maxLength: 8, pattern: "[0-9]{2}-[0-9]{5}" }}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="sex-label">Sex</InputLabel>
            <Select
              labelId="sex-label"
              id="sex"
              name="sex"
              label="Sex"
              value={formData.sex}
              onChange={handleChange}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="year-label">Year</InputLabel>
            <Select
              labelId="year-label"
              id="year"
              name="year"
              label="Year"
              value={formData.year}
              onChange={handleChange}
            >
              <MenuItem value="1">1st Year</MenuItem>
              <MenuItem value="2">2nd Year</MenuItem>
              <MenuItem value="3">3rd Year</MenuItem>
              <MenuItem value="4">4th Year</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="course-label">Course</InputLabel>
            <Select
              labelId="course-label"
              id="course"
              name="course"
              label="Course"
              value={formData.course}
              onChange={handleChange}
            >
              <MenuItem value="College of Computer Studies">College of Computer Studies</MenuItem>
              <MenuItem value="College of Nursing">College of Nursing</MenuItem>
              <MenuItem value="College of Business and Accountancy">College of Business and Accountancy</MenuItem>
              <MenuItem value="College of Education">College of Education</MenuItem>
              <MenuItem value="College of Engineering">College of Engineering</MenuItem>
              <MenuItem value="College of Hotel and Management">College of Hotel and Management</MenuItem>
            </Select>
          </FormControl>
          <TextField
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
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AuthRegister;
