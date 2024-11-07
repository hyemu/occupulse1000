import React, { useState, useEffect,useMemo } from 'react';


import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Typography,
  IconButton,
  MenuItem,
  Select,
  InputAdornment,
  IconButton as MuiIconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import bcrypt from 'bcryptjs'; // Import bcrypt for hashing passwords

const studentList = {
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

const AdminPage = () => {
  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null);
  const [newStudent, setNewStudent] = useState({
    studentId: '',
    fullName: '',
    sex: '',
    year: '',
    course: '',
    status: '',
    password: '',
    statusUpdatedAt: new Date().toISOString(), // Initialize with current date and time
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/admin/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleAddStudent = async () => {
    const studentData = {
      studentId: newStudent.studentId,
      fullName: newStudent.fullName,
      sex: newStudent.sex,
      year: newStudent.year,
      course: newStudent.course,
      status: newStudent.status,
      password: newStudent.password
    };
  
    try {
      const response = await axios.post('http://localhost:3001/api/admin/students', studentData);
      alert(response.data.message);
      fetchStudents();
      setNewStudent({
        studentId: '',
        fullName: '',
        sex: '',
        year: '',
        course: '',
        status: '',
        password: '',
      });
    } catch (error) {
      console.error('Error adding student:', error.response ? error.response.data : error.message);
      alert(error.response ? error.response.data.message : 'Error adding student');
    }
  };
  const handleUpdateStudent = async () => {
    try {
      const updatedStudent = { ...editStudent };
      if (updatedStudent.password) {
        updatedStudent.password = await bcrypt.hash(updatedStudent.password, 10); // Hash the new password
      }
      await axios.put(`http://localhost:3001/api/admin/students/${editStudent.studentId}`, updatedStudent);
      setEditStudent(null);
      fetchStudents();
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      await axios.delete(`http://localhost:3001/api/admin/students/${studentId}`);
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const handleEdit = (student) => {
    setEditStudent(student);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (editStudent) {
      setEditStudent((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewStudent((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCheckStudentId = () => {
    if (studentList[newStudent.studentId]) {
      setNewStudent((prev) => ({
        ...prev,
        fullName: studentList[newStudent.studentId]
      }));
    } else {
      alert('Invalid Student ID');
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom sx={{ color: '#1a237e', fontWeight: 'bold' }}>Admin - Manage Students</Typography>

      <Box mb={4}>
        <Typography variant="h6" mb={1}>Add New Student</Typography>
        <TextField
          label="Student ID"
          name="studentId"
          value={newStudent.studentId}
          onChange={handleChange}
          fullWidth
          margin="normal"
          inputProps={{ pattern: "[0-9]{7}" }} // Only accept 7 numeric digits
          placeholder="Enter 7-digit student ID"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button variant="contained" color="primary" onClick={handleCheckStudentId}>
                  Check
                </Button>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Full Name"
          name="fullName"
          value={newStudent.fullName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          placeholder="Enter full name"
          disabled
        />
        <Select
          label="Sex"
          name="sex"
          value={newStudent.sex}
          onChange={handleChange}
          fullWidth
          margin="normal"
          displayEmpty
          renderValue={(selected) => (selected ? selected : <em>Select Sex</em>)}
          sx={{ mb: 2 }} // Add bottom margin
        >
          <MenuItem value="" disabled>Select Sex</MenuItem>
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
        <Select
          label="Year"
          name="year"
          value={newStudent.year}
          onChange={handleChange}
          fullWidth
          margin="normal"
          displayEmpty
          renderValue={(selected) => (selected ? selected : <em>Select Year</em>)}
          sx={{ mb: 2 }} // Add bottom margin
        >
          <MenuItem value="" disabled>Select Year</MenuItem>
          <MenuItem value="1st Year">1st Year</MenuItem>
          <MenuItem value="2nd Year">2nd Year</MenuItem>
          <MenuItem value="3rd Year">3rd Year</MenuItem>
          <MenuItem value="4th Year">4th Year</MenuItem>
        </Select>
        <Select
          label="Course"
          name="course"
          value={newStudent.course}
          onChange={handleChange}
          fullWidth
          margin="normal"
          displayEmpty
          renderValue={(selected) => (selected ? selected : <em>Select College Department</em>)}
          sx={{ mb: 2 }} // Add bottom margin
        >
          <MenuItem value="" disabled>Select College Department</MenuItem>
            <MenuItem value="College of Computer Studies">College of Computer Studies</MenuItem>
            < MenuItem value="College of Nursing">College of Nursing</MenuItem>
            <MenuItem value="College of Business and Accountancy">College of Business and Accountancy</MenuItem>
            <MenuItem value="College of Education">College of Education</MenuItem>
            <MenuItem value="College of Engineering">College of Engineering</MenuItem>
            <MenuItem value="College of Hotel and Management">College of Hotel and Management</MenuItem>
        </Select>
        <Select
          label="Status"
          name="status"
          value={newStudent.status}
          onChange={handleChange}
          fullWidth
          margin="normal"
          displayEmpty
          renderValue={(selected) => (selected ? selected : <em>Select Status</em>)}
          sx={{ mb: 2 }} // Add bottom margin
        >
          <MenuItem value="" disabled>Select Status</MenuItem>
          <MenuItem value="Employable">Employable</MenuItem>
          <MenuItem value="Less Employable">Less Employable</MenuItem>
        </Select>
        <TextField
          label="Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={newStudent.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained" color="primary" onClick={handleAddStudent}>Add Student</Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Sex</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Password</TableCell>
              <TableCell>Status Updated At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.studentId}>
                <TableCell>{student.studentId}</TableCell>
                <TableCell>{student.fullName}</TableCell>
                <TableCell>{student.sex}</TableCell>
                <TableCell>{student.year}</TableCell>
                <TableCell>{student.course}</TableCell>
                <TableCell>{student.status}</TableCell>
                <TableCell>{student.password}</TableCell>
                <TableCell>{student.statusUpdatedAt}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(student)}><EditIcon /></IconButton>
                  <IconButton onClick={() => handleDeleteStudent(student.studentId)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {editStudent && (
        <Box mt={4}>
          <Typography variant="h6" mb={1}>Edit Student</Typography>
          <TextField
            label="Student ID"
            name="studentId"
            value={editStudent.studentId}
            onChange={handleChange}
            fullWidth
            margin="normal"
            disabled
          />
          <TextField
            label="Full Name"
            name="fullName"
            value={editStudent.fullName}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Select
            label="Sex"
            name="sex"
            value={editStudent.sex}
            onChange={handleChange}
            fullWidth
            margin="normal"
            displayEmpty
            renderValue={(selected) => (selected ? selected : <em>Select Sex</em>)}
            sx={{ mb: 2 }} // Add bottom margin
          >
            <MenuItem value="" disabled>Select Sex</MenuItem>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
          <Select
            label="Year"
            name="year"
            value={editStudent.year}
            onChange={handleChange}
            fullWidth
            margin="normal"
            displayEmpty
            renderValue={(selected) => (selected ? selected : <em>Select Year</em>)}
            sx={{ mb: 2 }} // Add bottom margin
          >
            <MenuItem value="" disabled>Select Year</MenuItem>
            <MenuItem value="1st Year">1st Year</MenuItem>
            <MenuItem value="2nd Year">2nd Year</MenuItem>
            <MenuItem value="3rd Year">3rd Year</MenuItem>
            <MenuItem value="4th Year">4th Year</MenuItem>
          </Select>
          <Select
            label="College Department"
            name="course"
            value={editStudent.course}
            onChange={handleChange}
            fullWidth
            margin="normal"
            displayEmpty
            renderValue={(selected) => (selected ? selected : <em>Select Course</em>)}
            sx={{ mb: 2 }} // Add bottom margin
          >
           <MenuItem value="College of Computer Studies">College of Computer Studies</MenuItem>
            < MenuItem value="College of Nursing">College of Nursing</MenuItem>
            <MenuItem value="College of Business and Accountancy">College of Business and Accountancy</MenuItem>
            <MenuItem value="College of Education">College of Education</MenuItem>
            <MenuItem value="College of Engineering">College of Engineering</MenuItem>
            <MenuItem value="College of Hotel and Management">College of Hotel and Management</MenuItem>
          </Select>
          <Select
            label="Status"
            name="status"
            value={editStudent.status}
            onChange={handleChange}
            fullWidth
            margin="normal"
            displayEmpty
            renderValue={(selected) => (selected ? selected : <em>Select Status</em>)}
            sx={{ mb: 2 }} // Add bottom margin
          >
            <MenuItem value="" disabled>Select Status</MenuItem>
            <MenuItem value="Enrolled">Enrolled</MenuItem>
            <MenuItem value="Not Enrolled">Not Enrolled</MenuItem>
          </Select>
          <TextField
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={editStudent.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button variant="contained" color="primary" onClick={handleUpdateStudent}>Update Student</Button>
        </Box>
      )}
    </Box>
  );

};



export default AdminPage;
