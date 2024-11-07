import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Tabs,
  Tab,
  Fade,
  Slide,
  styled,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import axios from 'axios';
import { motion } from 'framer-motion';

// Styled components for glass effect
const GlassCard = styled(Card)(({ theme }) => ({
  background: alpha(theme.palette.background.paper, 0.7),
  backdropFilter: 'blur(10px)',
  borderRadius: 16,
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 40px rgba(0, 0, 0, 0.2)',
  },
}));

const GlassTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    background: alpha(theme.palette.background.paper, 0.5),
    backdropFilter: 'blur(10px)',
    borderRadius: 8,
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      background: alpha(theme.palette.background.paper, 0.7),
    },
  },
}));

const GlassSelect = styled(Select)(({ theme }) => ({
  background: alpha(theme.palette.background.paper, 0.5),
  backdropFilter: 'blur(10px)',
  borderRadius: 8,
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    background: alpha(theme.palette.background.paper, 0.7),
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

const TabPanel = ({ children, value, index }) => (
  <div role="tabpanel" hidden={value !== index}>
    {value === index && <Box p={3}>{children}</Box>}
  </div>
);

const StudentProfile = () => {
  const [profile, setProfile] = useState({
    userAvatar: null,
    fullName: '',
    sex: '',
    year: '',
    course: '',
    resume: null,
    status: '',
    statusUpdatedAt: null,
    skills: [],
    achievements: [],
  });
  const [isEditing, setIsEditing] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const fetchStudentProfile = async () => {
      try {
        const studentId = localStorage.getItem('studentId');
        
        if (studentId) {
          const response = await axios.get(`http://localhost:3001/api/student/${studentId}`);
          const studentData = response.data;
  
          setProfile({
            userAvatar: studentData.userAvatar || null,
            fullName: studentData.fullName || '',
            sex: studentData.sex ? capitalizeFirstLetter(studentData.sex) : '',
            year: formatYear(studentData.year),
            course: studentData.course || '',
            resume: studentData.resume || null,
            status: studentData.status || '',
            statusUpdatedAt: studentData.statusUpdatedAt ? new Date(studentData.statusUpdatedAt) : null,
            skills: studentData.skills || [],
            achievements: studentData.achievements || [],
          });
        }
      } catch (error) {
        console.error('Error fetching student profile:', error);
      }
    };
  
    fetchStudentProfile();
  }, []);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const formatYear = (year) => {
    const yearMap = {
      '1st year': '1st year',
      '2nd year': '2nd year',
      '3rd year': '3rd year',
      '4th year': '4th year'
    };
    return yearMap[year] || 'Unknown year';
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const imageUrl = reader.result;
          setProfile((prevProfile) => ({
            ...prevProfile,
            userAvatar: imageUrl,
          }));
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSaveProfile = async () => {
    try {
      const studentId = localStorage.getItem('studentId');
      if (studentId) {
        await axios.put(`http://localhost:3001/api/student/${studentId}`, profile);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating student profile:', error);
    }
  };

  const handleViewResume = () => {
    if (profile.resume) {
      window.open(profile.resume, '_blank');
    }
  };

  const formatStatusUpdateTime = (date) => {
    if (!date) return '';
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <GlassCard>
      <CardContent>
      <Typography variant="h4" gutterBottom sx={{ color: '#1a237e', fontWeight: 'bold' }}>
      Student Profile
        </Typography>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="Personal Info" />
          <Tab label="Skills" />
          <Tab label="Achievements" />
        </Tabs>
        
        <TabPanel value={tabValue} index={0}>
          <Fade in={tabValue === 0}>
            <Grid container spacing={4} alignItems="center" marginTop={2}>
              <Grid item xs={12} sm={3}>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Avatar
                      alt={profile.fullName}
                      src={profile.userAvatar || ''}
                      sx={{ width: 150, height: 150, boxShadow: 3 }}
                    />
                  </motion.div>
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="avatar-uploader"
                    type="file"
                    onChange={handleFileChange}
                  />
                  {isEditing && (
                    <label htmlFor="avatar-uploader">
                      <AnimatedButton component="span" sx={{ marginTop: 2 }}>
                        Choose Avatar
                      </AnimatedButton>
                    </label>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Slide direction="left" in={true} mountOnEnter unmountOnExit>
                  <Box>
                    {isEditing ? (
                      <>
                        <GlassTextField
                          fullWidth
                          label="Full Name"
                          name="fullName"
                          value={profile.fullName}
                          onChange={handleInputChange}
                          sx={{ marginBottom: 2 }}
                        />
                        <FormControl fullWidth sx={{ marginBottom: 2 }}>
                          <InputLabel>Sex</InputLabel>
                          <GlassSelect
                            name="sex"
                            value={profile.sex}
                            onChange={handleInputChange}
                            label="Sex"
                          >
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                          </GlassSelect>
                        </FormControl>
                        <FormControl fullWidth sx={{ marginBottom: 2 }}>
                          <InputLabel>Year</InputLabel>
                          <GlassSelect
                            name="year"
                            value={profile.year}
                            onChange={handleInputChange}
                            label="Year"
                          >
                            <MenuItem value="1st year">1st year</MenuItem>
                            <MenuItem value="2nd year">2nd year</MenuItem>
                            <MenuItem value="3rd year">3rd year</MenuItem>
                            <MenuItem value="4th year">4th year</MenuItem>
                          </GlassSelect>
                        </FormControl>
                        <GlassTextField
                          fullWidth
                          label="College Department"
                          name="course"
                          value={profile.course}
                          onChange={handleInputChange}
                          disabled
                          sx={{ marginBottom: 2 }}
                        />
                        <Box marginTop={2}>
                          <input
                            accept="application/pdf"
                            style={{ display: 'none' }}
                            id="resume-uploader"
                            type="file"
                            onChange={handleFileChange}
                          />
                          <label htmlFor="resume-uploader">
                            <AnimatedButton component="span" sx={{ marginRight: 2 }}>
                              Add Resume (PDF)
                            </AnimatedButton>
                          </label>
                          {profile.resume && (
                            <AnimatedButton
                              onClick={handleViewResume}
                              sx={{ marginLeft: 2 }}
                            >
                              View Resume
                            </AnimatedButton>
                          )}
                        </Box>
                      </>
                    ) : (
                      <>
                        <GlassTextField
                          fullWidth
                          label="Full Name"
                          value={profile.fullName}
                          disabled
                          sx={{ marginBottom: 2 }}
                        />
                        <GlassTextField
                          fullWidth
                          label="Sex"
                          value={profile.sex}
                          disabled
                          sx={{ marginBottom: 2 }}
                        />
                        <GlassTextField
                          fullWidth
                          label="Year"
                          value={profile.year}
                          disabled
                          sx={{ marginBottom: 2 }}
                        />
                        <GlassTextField
                          fullWidth
                          label="College Department"
                          value={profile.course}
                          disabled
                          sx={{ marginBottom: 2 }}
                        />
                        <GlassTextField
                          fullWidth
                          label="Employability Status"
                          value={profile.status}
                          disabled
                          sx={{ marginBottom: 2 }}
                        />
                        <Box marginTop={2}>
                          {profile.resume && (
                            <AnimatedButton
                              onClick={handleViewResume}
                            >
                              View Resume
                            </AnimatedButton>
                          )}
                        </Box>
                      </>
                    )}
                    {isEditing ? (
                      <AnimatedButton
                        onClick={handleSaveProfile}
                        sx={{ marginTop: 2 }}
                      >
                        Save Profile
                      </AnimatedButton>
                    ) : (
                      <AnimatedButton
                        onClick={() => setIsEditing(true)}
                        sx={{ marginTop: 2 }}
                      >
                        Edit Profile
                      </AnimatedButton>
                    )}
                  </Box>
                </Slide>
              </Grid>
            </Grid>
          </Fade>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Fade in={tabValue === 1}>
            <Box>
              <Typography variant="h6" gutterBottom>Skills</Typography>
              {profile.skills.map((skill, index) => (
                <Chip key={index} label={skill} sx={{ margin: 0.5 }} />
              ))}
              {isEditing && (
                <GlassTextField
                  fullWidth
                  label="Add Skill"
                  placeholder="Enter a skill and press Enter"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      setProfile(prev => ({
                        ...prev,
                        skills: [...prev.skills, e.target.value]
                      }));
                      e.target.value = '';
                    }
                  }}
                  sx={{ marginTop: 2 }}
                />
              )}
            </Box>
          </Fade>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Fade in={tabValue === 2}>
            <Box>
              <Typography variant="h6" gutterBottom>Achievements</Typography>
              {profile.achievements.map((achievement, index) => (
                <Typography key={index} variant="body1" gutterBottom>
                  • {achievement}
                </Typography>
              ))}
              {isEditing && (
                <GlassTextField
                  fullWidth
                  label="Add Achievement"
                  placeholder="Enter an achievement and press Enter"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      setProfile(prev => ({
                        ...prev,
                        achievements: [...prev.achievements, e.target.value]
                      }));
                      e.target.value = '';
                    }
                  }}
                  sx={{ marginTop: 2 }}
                />
              )}
            </Box>
          </Fade>
        </TabPanel>

        <Box mt={3}>
          <Typography variant="h6">Employability Status:</Typography>
          <Box display="flex" alignItems="center">
            <Typography 
              variant="body1" 
              fontWeight="bold"
              color={profile.status === 'Employable' ? 'success.main' : 'error.main'}
            >
              {profile.status || 'Not available'}
            </Typography>
            {profile.statusUpdatedAt && (
              <Typography variant="body2" color="text.secondary" ml={2}>
                (as of {formatStatusUpdateTime(profile.statusUpdatedAt)})
              </Typography>
            )}
          </Box>
        </Box>
      </CardContent>
    </GlassCard>
  );
};

export default StudentProfile;