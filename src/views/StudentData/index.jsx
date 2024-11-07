import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Scatter } from 'react-chartjs-2';
import HeatMap from '@uiw/react-heat-map';
import styled from 'styled-components';
import { Container, Row, Col, Button, Table, Input } from 'reactstrap';
import { TextField } from '@mui/material';  // Import TextField from MUI

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

// Styled components
const StyledTable = styled(Table)`
  margin-bottom: 20px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const TableHead = styled.thead`
  background-color: #f8f9fa;
`;

const TableHeader = styled.th`
  padding: 12px;
  text-align: left;
`;

const TableBody = styled.tbody`
  background-color: #fff;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableData = styled.td`
  padding: 12px;
`;

const StyledInput = styled(TextField)`
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease, border-color 0.3s ease;

  & .MuiOutlinedInput-root {
    border-radius: 8px;
    background-color: #f5f5f5;
    
    &:hover {
      background-color: #e0e0e0;
    }
    
    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: #4caf50;  // Custom focus border color
    }
  }

  & .MuiInputLabel-root {
    color: #555;  // Label color
  }

  & .MuiInputLabel-root.Mui-focused {
    color: #4caf50;  // Focused label color
  }
`;


const StyledButton = styled(Button)`
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  margin: 4px;
  cursor: pointer;
  border-radius: 4px;
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const SectionTitle = styled.h2`
  margin-top: 40px;
  font-size: 24px;
  color: #333;
`;

const Statistics = styled.div`
  margin-bottom: 20px;
  font-size: 16px;
  color: #555;
`;

const StudentDataPage = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statistics, setStatistics] = useState({ totalStudents: 0, employableStudents: 0, lessEmployableStudents: 0 });
  const [columnMeans, setColumnMeans] = useState({});
  const [correlationData, setCorrelationData] = useState([]);
  const [averageScores, setAverageScores] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    const loadExcelFile = async () => {
      const response = await fetch('Student-Employability-Datasets.xlsx');
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
  
      const mappedData = jsonData.map(row => ({
        ...row,
        'Employability Status': row['CLASS'] === 'Employable' ? 'Employable' : 'Less Employable',
        'CLASS': row['CLASS'] === 'Employable' ? 1 : 0
      }));
  
      setData(mappedData);
      setFilteredData(mappedData);
      calculateStatistics(mappedData);
      calculateColumnMeans(mappedData);
      calculateCorrelation(mappedData);
      calculateAverageScores(mappedData);
    };
  
    loadExcelFile();
  }, []);

  useEffect(() => {
    const filtered = data.filter(student =>
      student['Name of Student'].toLowerCase().includes(searchTerm.toLowerCase()) ||
      student['Employability Status'].toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchTerm, data]);

  const calculateStatistics = (data) => {
    const totalStudents = data.length;
    const employableStudents = data.filter(student => student['CLASS'] === 1).length;
    const lessEmployableStudents = totalStudents - employableStudents;
    setStatistics({ totalStudents, employableStudents, lessEmployableStudents });
  };

  const calculateColumnMeans = (data) => {
    const columns = ['GENERAL APPEARANCE', 'MANNER OF SPEAKING', 'PHYSICAL CONDITION', 'MENTAL ALERTNESS', 'SELF-CONFIDENCE', 'ABILITY TO PRESENT IDEAS', 'COMMUNICATION SKILLS', 'Student Performance Rating'];
    const means = {};
    columns.forEach(column => {
      means[column] = data.reduce((acc, student) => acc + student[column], 0) / data.length;
    });
    setColumnMeans(means);
  };

  const calculateCorrelation = (data) => {
    const columns = ['GENERAL APPEARANCE', 'MANNER OF SPEAKING', 'PHYSICAL CONDITION', 'MENTAL ALERTNESS', 'SELF-CONFIDENCE', 'ABILITY TO PRESENT IDEAS', 'COMMUNICATION SKILLS', 'Student Performance Rating', 'CLASS'];
    const correlationMatrix = [];
    columns.forEach((col1, i) => {
      columns.forEach((col2, j) => {
        const correlation = calculatePearsonCorrelation(data, col1, col2);
        correlationMatrix.push({ i, j, correlation });
      });
    });
    setCorrelationData(correlationMatrix);
  };

  const calculatePearsonCorrelation = (data, col1, col2) => {
    const n = data.length;
    let sum1 = 0, sum2 = 0, sum1Sq = 0, sum2Sq = 0, pSum = 0;
    for (let i = 0; i < n; i++) {
      const x = data[i][col1];
      const y = data[i][col2];
      sum1 += x;
      sum2 += y;
      sum1Sq += x * x;
      sum2Sq += y * y;
      pSum += x * y;
    }
    const num = pSum - (sum1 * sum2 / n);
    const den = Math.sqrt((sum1Sq - sum1 * sum1 / n) * (sum2Sq - sum2 * sum2 / n));
    return num / den;
  };

  const calculateAverageScores = (data) => {
    const columns = ['GENERAL APPEARANCE', 'MANNER OF SPEAKING', 'PHYSICAL CONDITION', 'MENTAL ALERTNESS', 'SELF-CONFIDENCE', 'ABILITY TO PRESENT IDEAS', 'COMMUNICATION SKILLS', 'Student Performance Rating'];
    const averages = data.map(student => ({
      average: columns.reduce((acc, col) => acc + (student[col] || 0), 0) / columns.length,
      employable: student['Employability Status'] === 'Employable'
    }));
    setAverageScores(averages);
  };

  const columnMeansChartData = {
    labels: Object.keys(columnMeans),
    datasets: [{
      label: 'Average Score',
      data: Object.values(columnMeans),
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    }],
  };

  const columnMeansChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Average per Column' },
    },
  };

  const averageScoresChartData = {
    datasets: [
      {
        label: 'Employable',
        data: averageScores.filter(score => score.employable).map(score => ({ x: score.average, y: 1 })),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Less Employable',
        data: averageScores.filter(score => !score.employable).map(score => ({ x: score.average, y: 0 })),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      }
    ],
  };
  
  const averageScoresChartOptions = {
    responsive: true,
    scales: {
      x: { 
        title: { display: true, text: 'Average Score' },
        min: 0,
        max: 5
      },
      y: {
        title: { display: true, text: 'Employability' },
        ticks: { callback: value => value === 1 ? 'Employable' : 'Less Employable' }
      }
    },
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Average Scores vs Employability' },
    },
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container fluid>
              <h1
          className="my-4"
          style={{
            fontSize: '2.25rem', /* h4 equivalent size */
            color: '#1a237e',
            fontWeight: 'bold',
            marginBottom: '1rem' /* equivalent to `gutterBottom` */
          }}
        >
          Student Employability Data
        </h1>
            <StyledInput
        type="text"
        placeholder="Search for a student or employability status"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <StyledTable>
        <TableHead>
          <tr>
            <TableHeader>Name of Student</TableHeader>
            <TableHeader>Employability Status</TableHeader>
            <TableHeader>GENERAL APPEARANCE</TableHeader>
            <TableHeader>MANNER OF SPEAKING</TableHeader>
            <TableHeader>PHYSICAL CONDITION</TableHeader>
            <TableHeader>MENTAL ALERTNESS</TableHeader>
            <TableHeader>SELF-CONFIDENCE</TableHeader>
            <TableHeader>ABILITY TO PRESENT IDEAS</TableHeader>
            <TableHeader>COMMUNICATION SKILLS</TableHeader>
            <TableHeader>Student Performance Rating</TableHeader>
          </tr>
        </TableHead>
        <TableBody>
          {currentRows.map((student, index) => (
            <TableRow key={index}>
              <TableData>{student['Name of Student']}</TableData>
              <TableData>{student['Employability Status']}</TableData>
              <TableData>{student['GENERAL APPEARANCE']}</TableData>
              <TableData>{student['MANNER OF SPEAKING']}</TableData>
              <TableData>{student['PHYSICAL CONDITION']}</TableData>
              <TableData>{student['MENTAL ALERTNESS']}</TableData>
              <TableData>{student['SELF-CONFIDENCE']}</TableData>
              <TableData>{student['ABILITY TO PRESENT IDEAS']}</TableData>
              <TableData>{student['COMMUNICATION SKILLS']}</TableData>
              <TableData>{student['Student Performance Rating']}</TableData>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>

      <div className="d-flex justify-content-between mb-4">
        <StyledButton onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </StyledButton>
        <StyledButton onClick={() => paginate(currentPage + 1)} disabled={indexOfLastRow >= filteredData.length}>
          Next
        </StyledButton>
      </div>

      <SectionTitle>Statistics</SectionTitle>
      <Statistics>
        <div>Total Students: {statistics.totalStudents}</div>
        <div>Employable Students: {statistics.employableStudents}</div>
        <div>Less Employable Students: {statistics.lessEmployableStudents}</div>
      </Statistics>

      <SectionTitle>Average per Column</SectionTitle>
      <Bar data={columnMeansChartData} options={columnMeansChartOptions} />

      <SectionTitle>Average Scores vs Employability</SectionTitle>
      <Scatter data={averageScoresChartData} options={averageScoresChartOptions} />

      <SectionTitle>Correlation Heatmap</SectionTitle>
      <HeatMap
        value={correlationData}
        width={800}
        height={400}
        startColor="#FFFF00"  // Yellow
        endColor="#FF0000"    // Red
        legendCellSize={30}
        xLabels={['GA', 'MS', 'PC', 'MA', 'SC', 'API', 'CS', 'SPR', 'CLASS']}
        yLabels={['GA', 'MS', 'PC', 'MA', 'SC', 'API', 'CS', 'SPR', 'CLASS']}
      />
    </Container>
  );
};

export default StudentDataPage;
