import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Search, FileText } from 'lucide-react';
import { jsPDF } from 'jspdf';
import rawData from '../PLPData/rawdata'; // Adjust path if in a different folder


  
  const PLPData = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [employabilityView, setEmployabilityView] = useState("all");
    const [showDepartmentStats, setShowDepartmentStats] = useState(true);
  
    // Filtered data logic
    const filteredData = useMemo(() => {
      return rawData.filter(student =>
        student.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (student.name && student.name.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }, [searchQuery]);
  
    const departmentStats = useMemo(() => {
      const stats = {};
      filteredData.forEach(student => {
        if (!stats[student.department]) {
          stats[student.department] = { total: 0, employable: 0, lessEmployable: 0, averagePerformance: 0 };
        }
        stats[student.department].total++;
        if (student.employability === "Employable") {
          stats[student.department].employable++;
        } else {
          stats[student.department].lessEmployable++;
        }
        stats[student.department].averagePerformance += student.performanceRating;
      });
  
      return Object.entries(stats).map(([dept, data]) => ({
        name: dept.replace("College of ", ""),
        employableRate: ((data.employable / data.total) * 100).toFixed(1),
        lessEmployableRate: ((data.lessEmployable / data.total) * 100).toFixed(1),
        averagePerformance: (data.averagePerformance / data.total).toFixed(1),
        total: data.total
      }));
    }, [filteredData]);

      // Additional charts data for each attribute
  const attributeChartsData = useMemo(() => {
    const attributes = [
      "generalAppearance",
      "mannerOfSpeaking",
      "physicalCondition",
      "mentalAlertness",
      "selfConfidence",
      "abilityToPresent",
      "communicationSkills",
      "performanceRating"
    ];

    return attributes.map(attribute => ({
      attribute,
      data: filteredData.map(student => ({
        name: student.name,
        value: student[attribute] || 0
      }))
    }));
  }, [filteredData]);

  // Heatmap data
  const heatmapData = useMemo(() => {
    const data = {};
    filteredData.forEach(student => {
      data[student.department] = data[student.department] || { employable: 0, lessEmployable: 0 };
      if (student.employability === "Employable") {
        data[student.department].employable++;
      } else {
        data[student.department].lessEmployable++;
      }
    });
    return Object.entries(data).map(([name, values]) => ({
      name,
      employable: values.employable,
      lessEmployable: values.lessEmployable,
    }));
  }, [filteredData]);

  
    const employabilityChartData = useMemo(() => {
      const employable = filteredData.filter(student => student.employability === "Employable").length;
      const lessEmployable = filteredData.length - employable;
      return [
        { name: "Employable", value: employable },
        { name: "Less Employable", value: lessEmployable },
      ];
    }, [filteredData]);
  
    const departmentEmployabilityChart = useMemo(() => {
      if (employabilityView === "employable") {
        return departmentStats.map((dept) => ({
          name: dept.name,
          value: dept.employableRate,
        }));
      } else if (employabilityView === "lessEmployable") {
        return departmentStats.map((dept) => ({
          name: dept.name,
          value: dept.lessEmployableRate,
        }));
      } else {
        return departmentStats.map((dept) => ({
          name: dept.name,
          employable: dept.employableRate,
          lessEmployable: dept.lessEmployableRate,
        }));
      }
    }, [departmentStats, employabilityView]);
  
    const departmentPerformanceChart = useMemo(() => {
      return departmentStats.map((dept) => ({
        name: dept.name,
        averagePerformance: dept.averagePerformance,
      }));
    }, [departmentStats]);
  
    const COLORS = ['#9333EA', '#A855F7', '#C084FC', '#E9D5FF'];
  
    // Export PDF function
    const exportPDF = () => {
      const pdf = new jsPDF();
      pdf.setFontSize(18);
      pdf.text("Student Performance Report", 10, 10);
  
      pdf.setFontSize(14);
      pdf.text("Overall Employability", 10, 30);
      employabilityChartData.forEach((item, index) => {
        pdf.text(`${item.name}: ${item.value}`, 10, 40 + index * 10);
      });
  
      pdf.setFontSize(14);
      pdf.text("Employability per Department", 10, 70);
      departmentStats.forEach((dept, index) => {
        pdf.text(
          `${dept.name}: Employable Rate ${dept.employableRate}%, Less Employable Rate ${dept.lessEmployableRate}%`,
          10,
          80 + index * 10
        );
      });
  
      pdf.setFontSize(14);
      pdf.text("Performance per Department", 10, 120);
      departmentStats.forEach((dept, index) => {
        pdf.text(
          `${dept.name}: Average Performance ${dept.averagePerformance}`,
          10,
          130 + index * 10
        );
      });
  
      pdf.save("report.pdf");
    };
  
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#F3E8FF', padding: '0.25rem' }}>
        <div style={{ maxWidth: '1500px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Search Section */}
          <div style={{ backgroundColor: '#FFFFFF', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', padding: '1rem', borderRadius: '8px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#5B21B6' }}>Student Employability Dashboard</h2>
            <div style={{ position: 'relative' }}>
              <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#A855F7' }} />
              <input
                style={{ paddingLeft: '2.5rem', borderColor: '#D1D5DB', borderWidth: '1px', borderRadius: '0.375rem', padding: '0.5rem', width: '100%' }}
                placeholder="Search by Student ID or Name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
  
          {/* Student Table Section */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '1rem', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
            <h3 style={{ color: '#5B21B6' }}>Search Results</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#9333EA', color: 'white' }}>
                  <th style={{ padding: '0.5rem', textAlign: 'left' }}>Student ID</th>
                  <th style={{ padding: '0.5rem', textAlign: 'left' }}>Name</th>
                  <th style={{ padding: '0.5rem', textAlign: 'left' }}>Gender</th>
                  <th style={{ padding: '0.5rem', textAlign: 'left' }}>Year</th>
                  <th style={{ padding: '0.5rem', textAlign: 'left' }}>Department</th>
                  <th style={{ padding: '0.5rem', textAlign: 'left' }}>Employability</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((student) => (
                  <tr key={student.studentId} style={{ backgroundColor: student.employability === "Employable" ? '#D1FAE5' : '#FEE2E2' }}>
                    <td style={{ padding: '0.5rem' }}>{student.studentId}</td>
                    <td style={{ padding: '0.5rem' }}>{student.name}</td>
                    <td style={{ padding: '0.5rem' }}>{student.gender}</td>
                    <td style={{ padding: '0.5rem' }}>{student.year}</td>
                    <td style={{ padding: '0.5rem' }}>{student.department}</td>
                    <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>{student.employability}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
          </div>
  
          {/* Employability Overview */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
            <div style={{ backgroundColor: '#FFFFFF', padding: '1rem', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
              <h3>Overall Employability</h3>
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie data={employabilityChartData} innerRadius={60} outerRadius={80} dataKey="value">
                    {employabilityChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
  
            <div style={{ backgroundColor: '#FFFFFF', padding: '1rem', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
              <h3>Employability per Department</h3>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>View:</span>
                <div>
                  <button
                    style={{ backgroundColor: employabilityView === 'all' ? '#9333EA' : '#D1D5DB', color: employabilityView === 'all' ? 'white' : 'black', padding: '0.5rem 1rem', borderRadius: '0.375rem', marginRight: '0.5rem' }}
                    onClick={() => setEmployabilityView('all')}
                  >
                    All
                  </button>
                  <button
                    style={{ backgroundColor: employabilityView === 'employable' ? '#9333EA' : '#D1D5DB', color: employabilityView === 'employable' ? 'white' : 'black', padding: '0.5rem 1rem', borderRadius: '0.375rem' }}
                    onClick={() => setEmployabilityView('employable')}
                  >
                    Employable
                  </button>
                  <button
                    style={{ backgroundColor: employabilityView === 'lessEmployable' ? '#9333EA' : '#D1D5DB', color: employabilityView === 'lessEmployable' ? 'white' : 'black', padding: '0.5rem 1rem', borderRadius: '0.375rem', marginLeft: '0.5rem' }}
                    onClick={() => setEmployabilityView('lessEmployable')}
                  >
                    Less Employable
                  </button>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={departmentEmployabilityChart}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {employabilityView === "all" && (
                    <>
                      <Bar dataKey="employable" name="Employable %" fill="#9333EA" />
                      <Bar dataKey="lessEmployable" name="Less Employable %" fill="#C084FC" />
                    </>
                  )}
                  {employabilityView === "employable" && (
                    <Bar dataKey="value" name="Employable %" fill="#9333EA" />
                  )}
                  {employabilityView === "lessEmployable" && (
                    <Bar dataKey="value" name="Less Employable %" fill="#C084FC" />
                  )}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
  
          {/* Department Performance */}
          {showDepartmentStats && (
            <div style={{ backgroundColor: '#FFFFFF', padding: '1rem', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
              <h3 style={{ color: '#5B21B6' }}>Department Performance</h3>
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={departmentPerformanceChart}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="averagePerformance" name="Average Performance" stroke="#9333EA" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
          )}
        </div>
        

        
        <button
  style={{
    backgroundImage: "linear-gradient(135deg, #9333EA, #A855F7)",
    color: "white",
    padding: "0.75rem 1.5rem", // Adjusted padding for a slimmer look
    borderRadius: "10px", // Slightly more rounded corners for a modern touch
    fontWeight: "bold",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)", // Soft shadow for depth
    marginTop: "1rem", // Add margin-top here
    transition: "transform 0.2s ease, box-shadow 0.2s ease", // Smooth transition effects
  }}
  onClick={exportPDF}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "translateY(-2px)";
    e.currentTarget.style.boxShadow = "0 6px 16px rgba(0, 0, 0, 0.25)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.2)";
  }}
>
  <FileText /> Export Report
</button>
      </div>


    );
  };
  
  export default PLPData;