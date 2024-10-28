import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import MainMenu from './components/MainMenu';
import EnquiryForm from './components/EnquiryForm';
import Registration from './components/Registration'; 
import KeyboardShortcuts from './components/KeyboardShortcuts';
import GlobalSearch from './components/GlobalSearch';
import Courses from './components/Courses';
import EnrolledStudents from './components/EnrolledStudents'; // Import EnrolledStudents
import Syllabus from './components/Syllabus';
import Notes from './components/Notes'; // Import the Notes component




function App() {
  const location = useLocation();
  const isEnquiryPage = location.pathname === '/enquiry'; 
  const isRegistrationPage = location.pathname === '/register'; 

  return (
    <div className="App">
      {/* MainMenu should only be displayed once */}
      <MainMenu />

      {/* Conditional Header */}
      {!isEnquiryPage && !isRegistrationPage && (
        <header className="App-header">
          <h1 className="colorful-heading">Upskill Global Technologies</h1>
          <GlobalSearch />
          <KeyboardShortcuts />
        </header>
      )}

      {/* Main Content */}
      <div className="main-content">
        <Routes>
          <Route path="/enquiry" element={<EnquiryForm />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/enrolled-students" element={<EnrolledStudents />} /> {/* Add this route */}
          <Route path="/syllabus/:courseName" element={<Syllabus />} />
          <Route path="/notes/basic-computers" element={<Notes />} /> {/* Add the route for Basic Computers Notes */}



        
          {/* Add other routes */}
        </Routes>
      </div>
    </div>
  );
}

export default () => (
  <Router>
    <App />
  </Router>
);
