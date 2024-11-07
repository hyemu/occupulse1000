import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import axios from 'axios';
import { motion } from 'framer-motion';

// Global styles
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    background-color: #f8f8f8;
  }
`;

// Styled components with Windows 11 Aero-inspired theme
const DashboardContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
`;

const GlassEffect = `
  background: rgba(255, 255, 255, 0.);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const Header = styled(motion.header)`
  ${GlassEffect}
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Greeting = styled.div`
  font-size: 28px;
  font-weight: 600;
  color: #1a237e;

`;

const StudentId = styled.p`
  font-size: 14px;
  color: #1a237e;
  font-weight: bold;
  margin: 5px 0 0;
`;

const WeatherWidget = styled(motion.div)`
  ${GlassEffect}
  display: flex;
  align-items: center;
  padding: 10px 20px;
  color: #1a237e;
  font-size: 16px;
  margin-top: 10px;
`;

const CurrentTime = styled(motion.div)`
  ${GlassEffect}
  padding: 10px 20px;
  color: #1a237e;
  font-size: 16px;
  margin-top: 10px;
`;

const BentoBox = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const Card = styled(motion.div)`
  ${GlassEffect}
  padding: 20px;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  }
`;

const CardTitle = styled.h2`
  font-size: 22px;
  margin-bottom: 15px;
  font-weight: 600;
  color: #1a237e;
`;

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
`;

const Video = styled.iframe`
  width: 100%;
  height: 150px;
  border-radius: 8px;
  border: none;
`;

const ListItem = styled(motion.div)`
  ${GlassEffect}
  padding: 15px;
  margin-bottom: 10px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.9);
  }
`;

// Helper function to get weather description
const getWeatherDescription = (weatherCode) => {
  const weatherMap = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    51: 'Light drizzle',
    61: 'Light rain',
    // Add more mappings as needed
  };
  return weatherMap[weatherCode] || 'Unknown';
};

// Helper function to get weather icon
const getWeatherIcon = (weatherCode) => {
  const iconMap = {
    0: '01d', // Clear sky
    1: '02d', // Mainly clear
    2: '03d', // Partly cloudy
    3: '04d', // Overcast
    45: '50d', // Fog
    51: '09d', // Light drizzle
    61: '10d', // Light rain
    // Add more mappings as needed
  };
  return iconMap[weatherCode] || '03d'; // Default to partly cloudy if unknown
};

// Main Dashboard Component
const Dashboard = () => {
  const [greeting, setGreeting] = useState('');
  const [weather, setWeather] = useState({});
  const [jobListings, setJobListings] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);
  const [currentTime, setCurrentTime] = useState('');

  const [userFullName, setUserFullName] = useState('Student');
  const [studentId, setStudentId] = useState('');

  useEffect(() => {
    const updateGreetingAndTime = () => {
      const now = new Date();
      const hour = now.getHours();
      if (hour < 12) setGreeting('Good Morning');
      else if (hour < 18) setGreeting('Good Afternoon');
      else setGreeting('Good Evening');

      setCurrentTime(now.toLocaleTimeString());
      // Fetch student ID and name from localStorage
      const storedStudentId = localStorage.getItem('studentId');
      const storedStudentName = localStorage.getItem('studentName');
      
      console.log('Stored Student ID:', storedStudentId);
      console.log('Stored Student Name:', storedStudentName);
    
      if (storedStudentId) {
        setStudentId(storedStudentId);
      }
      
      if (storedStudentName) {
        setUserFullName(storedStudentName);
      } else if (storedStudentId) {
        // If name is not in localStorage, fetch it from the server
        axios.get(`http://localhost:3001/api/student/${storedStudentId}`)
          .then(response => {
            console.log('API Response:', response.data);
            if (response.data.fullName) {
              setUserFullName(response.data.fullName);
            } else {
              setUserFullName('Guest'); // Set a default value if name is not available
            }
          })
          .catch(error => {
            console.error('Error fetching student data:', error);
            setUserFullName('Guest'); // Set a default value in case of error
          });
      } else {
        setUserFullName('Guest'); // Set a default value if no student ID is found
      }
    };

    updateGreetingAndTime();
    const intervalId = setInterval(updateGreetingAndTime, 1000);

    // Fetch user's full name from session storage
    const studentName = sessionStorage.getItem('studentName');
    if (studentName) {
      setUserFullName(studentName);
    }

    // Fetch weather data
    axios.get('https://api.open-meteo.com/v1/forecast?latitude=14.5764&longitude=121.0851&current=temperature_2m,weather_code&timezone=Asia%2FManila')
      .then(response => {
        const currentWeather = response.data.current;
        setWeather({
          main: {
            temp: currentWeather.temperature_2m
          },
          weather: [
            {
              description: getWeatherDescription(currentWeather.weather_code),
              icon: getWeatherIcon(currentWeather.weather_code)
            }
          ]
        });
      })
      .catch(error => console.error('Error fetching weather:', error));

    // Fetch job listings (replace with your API)
    setJobListings([
      { id: 1, title: 'Software Developer', company: 'Tech Co' },
      { id: 2, title: 'Data Analyst', company: 'Data Inc' },
      { id: 3, title: 'UX Designer', company: 'Design Studio' },
    ]);

    // Fetch announcements (replace with your API)
    setAnnouncements([
      { id: 1, text: 'New course registrations open next week!' },
      { id: 2, text: 'Career fair on campus this Friday' },
    ]);

    // Fetch news (replace with actual news API)
    setNews([
      { id: 1, title: 'New breakthrough in AI research' },
      { id: 2, title: 'Global tech conference announces dates' },
    ]);

    // Fetch calendar events (replace with your calendar API)
    setEvents([
      { id: 1, title: 'Project deadline', date: '2024-07-25' },
      { id: 2, title: 'Team meeting', date: '2024-07-20' },
    ]);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <GlobalStyle />
      <DashboardContainer>
        <Header
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          <div>
            <Greeting>{greeting}, {userFullName}</Greeting>
            {studentId && <StudentId>Student ID: {studentId}</StudentId>}
          </div>
          <div>
            <WeatherWidget whileHover={{ scale: 1.05 }}>
              {weather.weather && (
                <>
                  <img 
                    src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} 
                    alt={weather.weather[0].description}
                  />
                  {`${Math.round(weather.main.temp)}°C, ${weather.weather[0].description}`}
                </>
              )}
            </WeatherWidget>
            <CurrentTime whileHover={{ scale: 1.05 }}>{currentTime}</CurrentTime>
          </div>
        </Header>

        <BentoBox>
          <Card
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <CardTitle>Employment & Career Related Videos</CardTitle>
            <VideoGrid>
              <Video src="https://www.youtube.com/embed/w-HYZv6HzAs" allowFullScreen></Video>
              <Video src="https://www.youtube.com/embed/wfNX1cHk-fE" allowFullScreen></Video>
              <Video src="https://www.youtube.com/embed/frmwfMTRg-Q" allowFullScreen></Video>
            </VideoGrid>
          </Card>

          <Card
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <CardTitle>📃 Job Listings</CardTitle>
            {jobListings.map((job, index) => (
              <ListItem
                key={job.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <strong>{job.title}</strong> at {job.company}
              </ListItem>
            ))}
          </Card>

          <Card
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <CardTitle>🎉 Announcements</CardTitle>
            {announcements.map((announcement, index) => (
              <ListItem
                key={announcement.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {announcement.text}
              </ListItem>
            ))}
          </Card>

          <Card
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <CardTitle>🔥 Breaking News</CardTitle>
            {news.map((item, index) => (
              <ListItem
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.title}
              </ListItem>
            ))}
          </Card>

          <Card
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <CardTitle>🔜 Upcoming Events</CardTitle>
            {events.map((event, index) => (
              <ListItem
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {event.date}: {event.title}
              </ListItem>
            ))}
          </Card>
        </BentoBox>
      </DashboardContainer>
    </>
  );
};

export default Dashboard;