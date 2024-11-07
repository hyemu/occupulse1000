import React, { useState } from 'react';
import { Box, Grid, Typography, Slider, Paper, IconButton, Popover } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import styled from 'styled-components';

const DisclaimerBox = styled(Paper)`
  background-color: #ffff99;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const SliderWithNumbers = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const SliderContainer = styled(Box)`
  width: 100%;
`;

const NumbersContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 4px;
`;

const SliderNumber = styled(Typography)`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.6);
`;

const HelpIconWrapper = styled(Box)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
`;

const CriteriaBox = styled(Box)`
  padding: 16px;
  max-width: 300px;
`;

const scoringCriteria = {
  1: 'Needs Improvement',
  2: 'Below Average',
  3: 'Average',
  4: 'Above Average',
  5: 'Excellent',
};

const EvaluationSection = ({ title, questions, onChange, values }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleSliderChange = (questionIdx, criterionIdx) => (event, newValue) => {
    onChange(questionIdx, criterionIdx, newValue);
  };

  const handleHelpClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleHelpClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box>
      <DisclaimerBox elevation={0}>
        <Typography variant="body1" color="textPrimary">
          <strong>Dear PLP CCS Students,</strong>
          <br /><br />
          Your <strong>honest</strong> and <strong>thoughtful</strong> responses in this evaluation are crucial for assessing your readiness for future employment opportunities. Please answer each question sincerely, as this assessment aims to identify your strengths and areas for improvement in relation to industry standards. Your participation is valuable, and all responses will be handled confidentially to provide you with personalized guidance.
          <br /><br />
          Thank you for your integrity and commitment to enhancing your employability.
        </Typography>
      </DisclaimerBox>

      <Typography variant="h6" gutterBottom>{title}</Typography>
      {questions.map((question, questionIdx) => (
        <Box key={questionIdx} mb={3}>
          <Typography variant="subtitle1">{question.question}</Typography>
          {question.criteria.map((criterion, criterionIdx) => (
            <Grid container spacing={2} alignItems="center" key={criterionIdx}>
              <Grid item xs={6}>
                <Typography>{criterion.label}</Typography>
              </Grid>
              <Grid item xs={6}>
                <SliderWithNumbers>
                  <SliderContainer>
                    <Slider
                      value={values[questionIdx][criterionIdx]}
                      onChange={handleSliderChange(questionIdx, criterionIdx)}
                      step={1}
                      min={1}
                      max={5}
                      marks
                      valueLabelDisplay="auto"
                      valueLabelFormat={(value) => `${value} - ${scoringCriteria[value]}`}
                    />
                  </SliderContainer>
                  <NumbersContainer>
                    {[1, 2, 3, 4, 5].map((number) => (
                      <SliderNumber key={number}>{number}</SliderNumber>
                    ))}
                  </NumbersContainer>
                </SliderWithNumbers>
              </Grid>
            </Grid>
          ))}
        </Box>
      ))}

      <HelpIconWrapper>
        <IconButton onClick={handleHelpClick} color="primary">
          <HelpOutlineIcon />
        </IconButton>
      </HelpIconWrapper>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleHelpClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <CriteriaBox>
          <Typography variant="h6" gutterBottom>Scoring Criteria</Typography>
          <Typography variant="body2">
            <strong>1:</strong> Needs Improvement<br />
            <strong>2:</strong> Below Average<br />
            <strong>3:</strong> Average<br />
            <strong>4:</strong> Above Average<br />
            <strong>5:</strong> Excellent
          </Typography>
        </CriteriaBox>
      </Popover>
    </Box>
  );
};

export default EvaluationSection;




























/*
import React, { useState } from 'react';
import { Box, Grid, Typography, Slider, Paper, IconButton, Popover } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import styled from 'styled-components';

const DisclaimerBox = styled(Paper)`
  background-color: #ffff99;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const SliderWithNumbers = styled(Box)`
  display: flex;
  align-items: center;
`;

const SliderNumber = styled(Typography)`
  min-width: 30px;
  text-align: center;
`;

const HelpIconWrapper = styled(Box)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
`;

const CriteriaBox = styled(Box)`
  padding: 16px;
  max-width: 300px;
`;

const scoringCriteria = {
  1: 'Needs Improvement',
  2: 'Below Average',
  3: 'Average',
  4: 'Above Average',
  5: 'Excellent',
};

const EvaluationSection = ({ title, questions, onChange, values }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleSliderChange = (questionIdx, criterionIdx) => (event, newValue) => {
    onChange(questionIdx, criterionIdx, newValue);
  };

  const handleHelpClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleHelpClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box>
      <DisclaimerBox elevation={0}>
        <Typography variant="body1" color="textPrimary">
          <strong>Dear PLP CCS Students,</strong>
          <br /><br />
          Your <strong>honest</strong> and <strong>thoughtful</strong> responses in this evaluation are crucial for assessing your readiness for future employment opportunities. Please answer each question sincerely, as this assessment aims to identify your strengths and areas for improvement in relation to industry standards. Your participation is valuable, and all responses will be handled confidentially to provide you with personalized guidance.
          <br /><br />
          Thank you for your integrity and commitment to enhancing your employability.
        </Typography>
      </DisclaimerBox>

      <Typography variant="h6" gutterBottom>{title}</Typography>
      {questions.map((question, questionIdx) => (
        <Box key={questionIdx} mb={3}>
          <Typography variant="subtitle1">{question.question}</Typography>
          {question.criteria.map((criterion, criterionIdx) => (
            <Grid container spacing={2} alignItems="center" key={criterionIdx}>
              <Grid item xs={6}>
                <Typography>{criterion.label}</Typography>
              </Grid>
              <Grid item xs={6}>
                <SliderWithNumbers>
                  <SliderNumber>1</SliderNumber>
                  <Slider
                    value={values[questionIdx][criterionIdx]}
                    onChange={handleSliderChange(questionIdx, criterionIdx)}
                    step={1}
                    min={1}
                    max={5}
                    marks
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `${value} - ${scoringCriteria[value]}`}
                  />
                  <SliderNumber>5</SliderNumber>
                </SliderWithNumbers>
              </Grid>
            </Grid>
          ))}
        </Box>
      ))}

      <HelpIconWrapper>
        <IconButton onClick={handleHelpClick} color="primary">
          <HelpOutlineIcon />
        </IconButton>
      </HelpIconWrapper>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleHelpClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <CriteriaBox>
          <Typography variant="h6" gutterBottom>Scoring Criteria</Typography>
          <Typography variant="body2">
            <strong>1:</strong> Needs Improvement<br />
            <strong>2:</strong> Below Average<br />
            <strong>3:</strong> Average<br />
            <strong>4:</strong> Above Average<br />
            <strong>5:</strong> Excellent
          </Typography>
        </CriteriaBox>
      </Popover>
    </Box>
  );
};

export default EvaluationSection;
*/