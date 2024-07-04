// App2.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Slidebar from './dashboard/Slidebar';
import Dashboard from './dashboard/Dashboard';
import ProfessorList from './dropdownItems/ProfessorList';
import AddProfessor from './dropdownItems/AddProfessor';
import ProfessorReports from './dropdownItems/ProfessorReports';
import StudentList from './dropdownItems/StudentList';
import StudentPerformance from './dropdownItems/StudentPerformance';
import AddStudent from './dropdownItems/AddStudent';
// Import other components or pages here

const App2 = () => {
  return (
    <Router>
      <div className="flex">
        <Slidebar />
        <div className="flex-1">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Define other routes here */}
            <Route path="/professors/list" element={<ProfessorList />} />
            <Route path="/professors/add" element={<AddProfessor />} />
            <Route path="/professors/reports" element={<ProfessorReports />} />
            <Route path="/students/list" element={<StudentList />} />
            <Route path="/students/add" element={<AddStudent />} />
            <Route path="/students/performance" element={<StudentPerformance />} />
            {/* Continue with other routes */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App2;
