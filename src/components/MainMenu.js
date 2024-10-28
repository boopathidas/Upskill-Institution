import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EnquiryForm from './EnquiryForm';
import RegistrationForm from './Registration';
import Courses from './Courses';
import EnrolledStudents from './EnrolledStudents';
import './MainMenu.css';

const MainMenu = () => {
  const [activeMenu, setActiveMenu] = useState('');
  const [selectedSubMenu, setSelectedSubMenu] = useState(null);
  const [enquiryCount, setEnquiryCount] = useState(0);
  const [registrationCount, setRegistrationCount] = useState(0);
  const [courseCount, setCourseCount] = useState(0);
  const navigate = useNavigate();

  // Fetch counts from the database
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Fetch enquiry count
        const enquiryResponse = await fetch('/api/enquiry/count'); // Adjust API endpoint accordingly
        const enquiryData = await enquiryResponse.json();
        setEnquiryCount(enquiryData.count);

        // Fetch registration count
        const registrationResponse = await fetch('/api/registration/count'); // Adjust API endpoint accordingly
        const registrationData = await registrationResponse.json();
        setRegistrationCount(registrationData.count);

        // Fetch course count
        const courseResponse = await fetch('/api/courses/count'); // Adjust API endpoint accordingly
        const courseData = await courseResponse.json();
        setCourseCount(courseData.count);
      } catch (error) {
        console.error("Error fetching counts: ", error);
      }
    };
    
    fetchCounts();
  }, []);

  const handleMenuClick = (menu) => {
    setActiveMenu(menu === activeMenu ? '' : menu);
  };

  const handleSubMenuClick = (submenu) => {
    setSelectedSubMenu(submenu);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const renderContent = () => {
    switch (selectedSubMenu) {
      case 'enquiry':
        return <EnquiryForm />;
      case 'registration':
        return <RegistrationForm />;
      case 'courses':
        return <Courses />;
      case 'enrolled-students':
        return <EnrolledStudents />;
      default:
        return null;
    }
  };

  return (
    <div className="container-fluid dashboard">
      <header className="global-header">
        <h1 className="global-title">Upskill <span className="highlight">Global</span> Technologies</h1>
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button>Search</button>
        </div>
        <p>Press "Ctrl+F" to trigger search.</p>
      </header>

      <nav className="navbar navbar-expand-lg navbar-light bg-light top-navbar">
        <a className="navbar-brand" href="#">
          <img src="/Upskill.jpg" alt="Your Logo" style={{ height: '80px', width: '150px' }} />
        </a>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" onClick={() => navigate('/')}>Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" onClick={() => setSelectedSubMenu('enquiry')}>New Enquiry</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" onClick={() => setSelectedSubMenu('registration')}>New Registration</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" onClick={() => setSelectedSubMenu('courses')}>Courses</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Users</a>
          </li>
        </ul>
      </nav>

      <div className="row">
        <div className="col-md-2 sidebar">
          <ul className="list-group">
            <li className="list-group-item">
              <button className="btn btn-link" onClick={() => handleMenuClick('admission')}>Admission</button>
              {activeMenu === 'admission' && (
                <ul className="submenu list-group">
                  <li className="list-group-item" onClick={() => handleSubMenuClick('enquiry')}>Enquiry</li>
                  <li className="list-group-item" onClick={() => handleSubMenuClick('registration')}>Registration</li>
                  <li className="list-group-item" onClick={() => handleSubMenuClick('courses')}>Courses</li>
                  <li className="list-group-item" onClick={() => handleSubMenuClick('enrolled-students')}>Enrolled Students</li>
                </ul>
              )}
            </li>
            <li className="list-group-item">Accounts</li>
            <li className="list-group-item">Settings</li>
            <li className="list-group-item">Reports</li>
          </ul>
        </div>

        <div className="col-md-10 main-content">
          <div className="content-grid">
            <div className="content-item">
              <h5>Enquiry Count</h5>
              <p>{enquiryCount}</p>
            </div>
            <div className="content-item">
              <h5>Registration Count</h5>
              <p>{registrationCount}</p>
            </div>
            <div className="content-item">
              <h5>Total Enquiries & Registrations</h5>
              <p>{enquiryCount + registrationCount}</p>
            </div>
            <div className="content-item">
              <h5>Course Count</h5>
              <p>{courseCount}</p>
            </div>
          </div>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
