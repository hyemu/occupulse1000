import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid,
  Typography,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Fade,
  Grow,
} from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';
import LightModeIcon from '@mui/icons-material/LightMode';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import DiscreteSlider from './DiscreteSlider';
import axios from 'axios';

// Styled components for Windows 11 Aero-inspired design
const AeroCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.7)',
  backdropFilter: 'blur(10px)',
  borderRadius: '12px',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 40px rgba(0, 0, 0, 0.15)',
  },
}));

const AeroButton = styled(Button)(({ theme }) => ({
  borderRadius: '20px',
  padding: '10px 20px',
  transition: 'all 0.3s ease',
  background: 'linear-gradient(45deg, #0078D4, #00B7C3)',
  color: 'white',
  '&:hover': {
    background: 'linear-gradient(45deg, #005A9E, #008C9E)',
    transform: 'scale(1.05)',
  },
}));

const AeroTableContainer = styled(TableContainer)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.5)',
  backdropFilter: 'blur(5px)',
  borderRadius: '12px',
  overflow: 'hidden',
}));

// Titles for the sliders
const sliderTitles = [
  'GENERAL APPEARANCE',
  'MANNER OF SPEAKING',
  'PHYSICAL CONDITION',
  'MENTAL ALERTNESS',
  'SELF-CONFIDENCE',
  'ABILITY TO PRESENT IDEAS',
  'COMMUNICATION SKILLS',
  'Student Performance Rating'
];

// PredictionMeter component with enhanced animations
const PredictionMeter = ({ prediction }) => {
  const [meterValue, setMeterValue] = useState(0);
  const isEmployable = prediction === 'Employable';
  const targetValue = isEmployable ? 100 : 30;

  useEffect(() => {
    const timer = setInterval(() => {
      setMeterValue(prevValue => {
        if (prevValue < targetValue) {
          return prevValue + 1;
        }
        clearInterval(timer);
        return prevValue;
      });
    }, 20);

    return () => clearInterval(timer);
  }, [targetValue]);

  return (
    <Fade in={true} timeout={1000}>
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ position: 'relative', height: 20, bgcolor: 'rgba(0, 0, 0, 0.1)', borderRadius: 10, overflow: 'hidden' }}>
            <Box
              sx={{
                width: `${meterValue}%`,
                height: '100%',
                background: isEmployable 
                  ? 'linear-gradient(90deg, #00C853, #64DD17)' 
                  : 'linear-gradient(90deg, #FF3D00, #FF9100)',
                transition: 'width 0.5s ease-out',
              }}
            />
          </Box>
        </motion.div>
        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {isEmployable ? (
              <SentimentSatisfiedAltIcon sx={{ fontSize: 40, color: '#00C853', mr: 1 }} />
            ) : (
              <SentimentVeryDissatisfiedIcon sx={{ fontSize: 40, color: '#FF3D00', mr: 1 }} />
            )}
          </motion.div>
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: isEmployable ? '#00C853' : '#FF3D00' }}>
              {prediction}
            </Typography>
          </motion.div>
        </Box>
      </Box>
    </Fade>
  );
};

// Main PredictionPage component
const PredictionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [sliderValues, setSliderValues] = useState({});
  const [prediction, setPrediction] = useState(null);
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    if (location.state && location.state.scores) {
      const newSliderValues = {};
      location.state.scores.forEach(({ title, score }) => {
        if (sliderTitles.includes(title)) {
          newSliderValues[title] = Math.round(score);
        }
      });
      setSliderValues(newSliderValues);
      handlePrediction(newSliderValues);
    } else {
      const defaultValues = Object.fromEntries(sliderTitles.map(title => [title, 3]));
      setSliderValues(defaultValues);
    }
  }, [location.state]);

  const handleSliderChange = (title, value) => {
    setSliderValues(prev => ({ ...prev, [title]: value }));
  };

  const handlePrediction = async (values = sliderValues) => {
    try {
      const response = await axios.post('http://localhost:5000/predict', values);
      const predictedStatus = response.data.prediction;
      setPrediction(predictedStatus);
      generateFeedback(values);
  
      const studentId = localStorage.getItem('studentId');
      if (studentId) {
        await axios.put(`http://localhost:3001/api/student/${studentId}/status`, { status: predictedStatus });
      }
    } catch (error) {
      console.error('Error making prediction:', error.response?.data || error.message);
    }
  };
  
  const generateFeedback = (values) => {
    const feedbackItems = Object.entries(values).map(([title, score]) => ({
      attribute: title,
      score: score,
      comment: getFeedbackComment(title, score)
    }));
  
    setFeedback(feedbackItems);
  };
  const getFeedbackComment = (title, score) => {
    const comments = {
      'GENERAL APPEARANCE': {
        low: "Your presentation was not aligned with professional standards. Consider investing in business attire and maintaining a well-groomed appearance.",
        medium: "You presented yourself professionally, though there's room for improvement in personal grooming and attire to match industry standards.",
        high: "Your appearance was impeccable and well-suited to a professional setting. Continue maintaining this high standard."
      },
      'MANNER OF SPEAKING': {
        low: "Your manner of speaking was unclear and lacked confidence. Focus on improving clarity and practicing your speaking skills.",
        medium: "You spoke clearly with a confident tone, though enhancing your engagement and articulation could further improve your delivery.",
        high: "Your speaking manner was articulate and engaging, showcasing excellent communication skills."
      },
      'PHYSICAL CONDITION': {
        low: "Your physical appearance suggested a lack of attention to health. Consider regular exercise and a healthy diet to improve your energy levels.",
        medium: "You appeared generally healthy and energetic, but maintaining consistent wellness practices could enhance your performance.",
        high: "You exhibited outstanding physical vitality and health, reflecting well on your overall fitness and energy levels."
      },
      'MENTAL ALERTNESS': {
        low: "Improve your mental alertness through activities that stimulate cognitive functions, such as puzzles or brain exercises.",
        medium: "You demonstrated good mental alertness with occasional lapses. Engaging in more mindfulness practices could help improve focus.",
        high: "Your mental alertness was exceptional, showcasing quick thinking and strong problem-solving abilities."
      },
      'SELF-CONFIDENCE': {
        low: "Work on building your self-confidence through positive self-talk and preparation. Consider practice sessions to improve your presentation.",
        medium: "You displayed a solid level of self-confidence. Continue developing your self-assurance through more experience and feedback.",
        high: "Your self-confidence was outstanding, with a strong presence and poise that positively impacted your performance."
      },
      'ABILITY TO PRESENT IDEAS': {
        low: "Your presentation of ideas was unclear and disorganized. Practice structuring your thoughts and using visual aids to improve clarity.",
        medium: "You presented your ideas effectively but could benefit from refining your organization and clarity for even greater impact.",
        high: "You demonstrated an excellent ability to present ideas, with clear and compelling communication that effectively conveyed your message."
      },
      'COMMUNICATION SKILLS': {
        low: "Your communication skills need improvement. Work on active listening and clear, concise messaging to enhance your interactions.",
        medium: "Your communication was generally effective, though focusing on enhancing clarity and engagement can make your interactions even better.",
        high: "Your communication skills were exceptional, with clear, effective, and engaging interactions that greatly contributed to the discussion."
      },
      'Student Performance Rating': {
        low: "Your performance needs improvement. Consider focusing on key areas of study and seeking additional help to boost your grades.",
        medium: "You have performed well academically, but there is room to enhance your performance by focusing on areas where you can further excel.",
        high: "Your academic performance is exemplary, reflecting a high level of understanding and achievement in your studies."
      }
    };
  
    const getFeedbackLevel = (score) => {
      if (score <= 2) return 'low';
      if (score <= 4) return 'medium';
      return 'high';
    };
  
    const feedbackLevel = getFeedbackLevel(score);
    return comments[title] ? comments[title][feedbackLevel] : 'No specific feedback available for this category.';
  };

  const handleBackToEvaluation = () => {
    navigate('/evaluation');
  };

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12}>
        <AeroCard>
          <CardHeader
            title={
              <Typography variant="h4" gutterBottom sx={{ color: '#1a237e', fontWeight: 'bold' }}>
                KNN OcuPulse Prediction
              </Typography>
            }
            action={
              <LightModeIcon sx={{ color: '#FFC107', fontSize: 32 }} />
            }
          />
          <Divider sx={{ background: 'rgba(0, 0, 0, 0.1)' }} />
          <CardContent>
            <Grid container spacing={3}>
              {sliderTitles.map((title, index) => (
                <Grow in={true} timeout={(index + 1) * 200} key={index}>
                  <Grid item xs={12} sm={6}>
                    <DiscreteSlider
                      title={title}
                      value={sliderValues[title] || 3}
                      onChange={(value) => handleSliderChange(title, value)}
                    />
                  </Grid>
                </Grow>
              ))}
            </Grid>
            
            <Box sx={{ mt: 3, display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
              <AeroButton onClick={() => handlePrediction()}>
                Predict Employability
              </AeroButton>
              <AeroButton onClick={handleBackToEvaluation} sx={{ background: 'linear-gradient(45deg, #FF4081, #FF79B0)' }}>
                Back to Evaluation
              </AeroButton>
            </Box>
            
            {prediction && <PredictionMeter prediction={prediction} />}
            
            {feedback.length > 0 ? (
  <Fade in={true} timeout={1000}>
    <Box mt={3}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#0078D4', mb: 2 }}>HR Feedback:</Typography>
      <AeroTableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: '#0078D4' }}>Attribute</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#0078D4' }}>Score</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#0078D4' }}>Comment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {feedback.map((item, index) => (
              <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: 'rgba(0, 120, 212, 0.05)' } }}>
                <TableCell>{item.attribute}</TableCell>
                <TableCell>{item.score}</TableCell>
                <TableCell>{item.comment}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </AeroTableContainer>
    </Box>
  </Fade>
) : (
  <Fade in={true} timeout={1000}>
    <Box mt={3}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#00C853', textAlign: 'center' }}>
        
      </Typography>
    </Box>
  </Fade>
)}
          </CardContent>
        </AeroCard>
      </Grid>
    </Grid>
  );
};

export default PredictionPage;