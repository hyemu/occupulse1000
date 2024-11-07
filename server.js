const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser'); // Add this line for cookie management

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Ensure this is your frontend's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Database connection
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'occupulse_db',
  port: 3306
};

// Create a pool instead of a single connection
const pool = mysql.createPool(dbConfig);

// Test database connection
pool.getConnection()
  .then(connection => {
    console.log('MySQL connected...');
    connection.release();
  })
  .catch(err => {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  });

// Register route
app.post('/register', async (req, res) => {
  console.log('Register route hit');
  console.log('Request body:', req.body);

  const { fullName, studentId, sex, year, course, password } = req.body;
  if (!fullName || !studentId || !sex || !year || !course || !password) {
    return res.status(400).send('All fields are required');
  }
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const sql = 'INSERT INTO students (fullName, studentId, sex, year, course, password) VALUES (?, ?, ?, ?, ?, ?)';
    const [result] = await pool.execute(sql, [fullName, studentId, sex, year, course, hashedPassword]);
    res.status(201).send('Student registered successfully');
  } catch (error) {
    console.error('Error in registration:', error);
    res.status(500).send('An error occurred during registration');
  }
});

// Login route
app.post('/login', async (req, res) => {
  console.log('Login route hit');
  console.log('Request body:', req.body);

  const { studentId, password } = req.body;
  if (!studentId || !password) {
    return res.status(400).json({ message: 'Student ID and password are required' });
  }
  try {
    const [rows] = await pool.execute('SELECT * FROM students WHERE studentId = ?', [studentId]);
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const match = await bcrypt.compare(password, rows[0].password);
    if (match) {
      res.status(200).json({ message: 'Login successful', studentName: rows[0].fullName });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ message: 'An error occurred during login' });
  }
});



// Endpoint to get student profile by ID
app.get('/api/student/:studentId', async (req, res) => {
  const { studentId } = req.params;
  console.log(`Received request for student ID: ${studentId}`);

  if (!studentId) {
    return res.status(400).json({ message: 'Student ID is required' });
  }

  try {
    // Query to fetch complete student profile including employability status
    const [rows] = await pool.execute('SELECT fullName, studentId, sex, year, course, status, statusUpdatedAt FROM students WHERE studentId = ?', [studentId]);
    console.log('Database query result:', rows);

    if (rows.length > 0) {
      const student = rows[0];
      res.json({
        fullName: student.fullName,
        studentId: student.studentId,
        sex: student.sex,
        year: student.year,
        course: student.course,
        status: student.status || '', // Include employabilityStatus
        statusUpdatedAt: student.statusUpdatedAt || null // Include the status updated timestamp
      });
    } else {
      console.log('No student found with this ID');
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    console.error('Error in database query:', error);
    res.status(500).json({ message: 'An error occurred while fetching student data' });
  }
});

// Endpoint to update student profile
app.put('/api/student/:studentId', async (req, res) => {
  const { studentId } = req.params;
  const { fullName, sex, year, course } = req.body;

  if (!studentId) {
    return res.status(400).json({ message: 'Student ID is required' });
  }

  try {
    // SQL query to update student profile
    const sql = `
      UPDATE students
      SET fullName = ?, sex = ?, year = ?, course = ?
      WHERE studentId = ?
    `;
    const [result] = await pool.execute(sql, [fullName, sex, year, course, studentId]);

    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Profile updated successfully' });
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    console.error('Error updating student profile:', error);
    res.status(500).json({ message: 'An error occurred while updating student profile' });
  }
});

// Endpoint to update student employability status
app.put('/api/student/:studentId/status', async (req, res) => {
  const { studentId } = req.params;
  const { status } = req.body;

  try {
    const [result] = await pool.execute(
      'UPDATE students SET status = ? WHERE studentId = ?',
      [status, studentId]
    );

    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Status updated successfully' });
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ message: 'An error occurred while updating status' });
  }
});

// ADMIN

// Get all students
app.get('/api/admin/students', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT studentId, fullName, sex, year, course, status, statusUpdatedAt FROM students');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'An error occurred while fetching students' });
  }
});

// Add a student
app.post('/api/admin/students', async (req, res) => {
  const { fullName, studentId, sex, year, course, status, password } = req.body;
  if (!fullName || !studentId || !sex || !year || !course || !status || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const sql = 'INSERT INTO students (fullName, studentId, sex, year, course, status, password) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const [result] = await pool.execute(sql, [fullName, studentId, sex, year, course, status, hashedPassword]);
    res.status(201).json({ message: 'Student added successfully' });
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ message: 'An error occurred while adding student' });
  }
});

// Update a student
app.put('/api/admin/students/:studentId', async (req, res) => {
  const { studentId } = req.params;
  const { fullName, sex, year, course, status, statusUpdatedAt } = req.body;
  try {
    const sql = 'UPDATE students SET fullName = ?, sex = ?, year = ?, course = ?, status = ?, statusUpdatedAt = ? WHERE studentId = ?';
    const [result] = await pool.execute(sql, [fullName, sex, year, course, status, statusUpdatedAt, studentId]);
    res.status(200).json({ message: 'Student updated successfully' });
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ message: 'An error occurred while updating student' });
  }
});

// Delete a student
app.delete('/api/admin/students/:studentId', async (req, res) => {
  const { studentId } = req.params;
  try {
    const sql = 'DELETE FROM students WHERE studentId = ?';
    const [result] = await pool.execute(sql, [studentId]);
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ message: 'An error occurred while deleting student' });
  }
});


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!' });
});

// Catch-all route for undefined routes
app.use((req, res) => {
  res.status(404).json({ message: '404 - Not Found' });
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
