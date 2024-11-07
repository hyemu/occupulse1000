import React from 'react';
import { Slider, Typography, Box } from '@mui/material';

const DiscreteSlider = ({ title, value, onChange }) => {
  const handleChange = (event, newValue) => {
    onChange(newValue);
  };

  return (
    <Box>
      <Typography gutterBottom>{title}</Typography>
      <Slider
        value={value}
        onChange={handleChange}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={1}
        marks
        min={1}
        max={5}
      />
    </Box>
  );
};

export default DiscreteSlider;
