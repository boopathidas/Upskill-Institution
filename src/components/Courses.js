import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Courses.css';

const Courses = () => {
  const courses = [
    { name: 'Basic Computers', description: 'Learn the basics of computers, including hardware, software, and operating systems.' },
    { name: 'Excel', description: 'Master Microsoft Excel for data analysis and business reporting.' },
    { name: 'Tally', description: 'Understand the fundamentals of accounting using Tally software.' },
    { name: 'Spoken English', description: 'Improve your English speaking and communication skills.' },
    { name: 'Python', description: 'Get started with Python programming for web and software development.' },
    { name: 'Full Stack Development', description: 'Learn front-end and back-end technologies to build complete web applications.' },
    {
      "name": "MERN Stack",
      "description": "Build full-stack applications using MongoDB, Express.js, React.js, and Node.js."
    },
    {
      "name": "MEAN Stack",
      "description": "Build full-stack applications using MongoDB, Express.js, Angular, and Node.js."
    },
  ];

  const [selectedCourse, setSelectedCourse] = useState(null);
  const navigate = useNavigate();

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
  };

  const handleViewSyllabus = (courseName) => {
    if (courseName === 'Basic Computers') {
      window.open('/syllabus/BASICS COMPUTER COURSE.pdf', '_blank');  // Opens the PDF in a new tab
    } else {
      navigate(`/syllabus/${courseName}`);
    }
  };
  const handleViewNotes = (courseName) => {
    if (courseName === 'Basic Computers') {
      navigate(`/notes/basic-computers`);
    }
  };

  return (
    <div className="courses-container">
      <h2>Available Courses</h2>
      <div className="course-cards">
        {courses.map((course, index) => (
          <div key={index} className="course-card">
            <h3>{course.name}</h3>
            <p>{course.description}</p>
            <button 
              className="btn btn-primary" 
              onClick={() => handleCourseClick(course)}
            >
              Click Here
            </button>

            {selectedCourse && selectedCourse.name === course.name && (
              <div className="course-details">
                <h4>{selectedCourse.name} - Details</h4>
                <p>{selectedCourse.description}</p>
                <div className="course-buttons">
                  <button 
                    className="btn btn-secondary"
                    onClick={() => handleViewSyllabus(course.name)}
                  >
                    View Syllabus
                  </button>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => handleViewNotes(course.name)}
                  >
                    View Notes
                  </button>
                  <button className="btn btn-secondary">View Tests</button>
                  <button className="btn btn-secondary">View Assessments</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
