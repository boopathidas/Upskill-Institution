import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './RegistrationForm.css'; // Custom CSS file

function RegistrationForm() {
  const [step, setStep] = useState(1); // Step state to manage which form section to show
  const [formData, setFormData] = useState({
    name: '',
    registration_number: '',
    date_of_registration: '',
    date_of_birth: '',
    gender: '',
    address: '',
    mobile: '',
    email: '',
    qualification: '',
    course_name: '',
    course_duration: '',
    total_fees: '',
  });
  
  // Set the default date for registration to today
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setFormData((prevData) => ({ ...prevData, dateOfRegistration: today }));
  }, []);

  // Predefined courses with duration and fees
  const courses = {
    'Basic Computers': { duration: '1 month', fees: 5000 },
    Excel: { duration: '2 months', fees: 6000 },
    Tally: { duration: '3 months', fees: 7000 },
    'Spoken English': { duration: '1.5 months', fees: 5500 },
    Python: { duration: '4 months', fees: 8000 },
    'Full Stack Development': { duration: '6 months', fees: 15000 },
  };

  // Define qualification options
  const qualifications = [
    'High School',
    'Diploma',
    'Undergraduate',
    'Postgraduate',
    'PhD',
    'Other'
  ];

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({ ...prevData, [name]: value }));

  //   // If courseName is changed, automatically populate duration and fees
  //   if (name === 'courseName' && courses[value]) {
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       courseDuration: courses[value].duration,
  //       totalFees: courses[value].fees,
  //     }));
  //   }
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setFormData({
      ...formData,
      [name]: value,
      ...(name === 'course_name' && courses[value] ? {
        course_duration: courses[value].duration || '', // Ensure valid value
        total_fees: courses[value].fees || '' // Ensure valid value
      } : {})
    });
  };
  
  const handleNext = () => {
    setStep(2); // Move to Course Details step
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log(formData); // Log to check if form data is valid

    // Optional: Validate form data before submission
    if (!formData.name || !formData.course_name) {
        alert('Please fill out all required fields.');
        return;
    }

    axios.post('http://localhost:8000/api/registration/', formData)
        .then((response) => {
            alert('Registration submitted successfully');
        })
        .catch((error) => {
            console.error('Error submitting registration:', error.response ? error.response.data : error.message);
            alert(`Error submitting registration: ${error.response ? error.response.data.detail : error.message}`);
        });
};

  
  

  return (
    <div className="container registration-form-container">
      <h2 className="text-center mb-4">Registration Form</h2>
      <form onSubmit={handleSubmit} className="needs-validation" noValidate>
        {step === 1 && (
          <div>
            {/* Personal Details */}
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
              <div className="invalid-feedback">Please enter your name.</div>
            </div>
            <div className="form-group">
              <label>Registration Number</label>
              <input
                type="text"
                name="registration_number"
                className="form-control"
                value={formData.registration_number}
                onChange={handleChange}
                placeholder="Enter registration number"
                required
              />
              <div className="invalid-feedback">Please enter a registration number.</div>
            </div>
            <div className="form-group">
              <label>Date of Registration</label>
              <input
                type="date"
                name="dateOfRegistration"
                className="form-control"
                value={formData.dateOfRegistration}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">Please select the date of registration.</div>
            </div>
            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                name="date_of_birth"
                className="form-control"
                value={formData.date_of_birth}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">Please select your date of birth.</div>
            </div>
            <div className="form-group">
              <label>Gender</label>
              <select
                name="gender"
                className="form-control"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                className="form-control"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
                required
              />
              <div className="invalid-feedback">Please enter your address.</div>
            </div>
            <div className="form-group">
              <label>Mobile</label>
              <input
                type="text"
                name="mobile"
                className="form-control"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter your mobile number"
                required
              />
              <div className="invalid-feedback">Please enter a valid mobile number.</div>
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
              <div className="invalid-feedback">Please enter a valid email address.</div>
            </div>
            <div className="form-group">
              <label>Qualification</label>
              <select
                name="qualification"
                className="form-control"
                value={formData.qualification}
                onChange={handleChange}
                required
              >
                <option value="">Select qualification</option>
                {qualifications.map((qualification) => (
                  <option key={qualification} value={qualification}>
                    {qualification}
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">Please select your qualification.</div>
            </div>
            <button type="button" className="btn btn-primary btn-block mt-4" onClick={handleNext}>
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            {/* Course Details */}
            <div className="form-group">
              <label>Course Name</label>
              <select
                name="course_name"
                className="form-control"
                value={formData.course_name}
                onChange={handleChange}
                required
              >
                <option value="">Select course</option>
                {Object.keys(courses).map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">Please select a course name.</div>
            </div>
            <div className="form-group">
              <label>Course Duration</label>
              <input
                type="text"
                name="course_duration"
                className="form-control"
                value={formData.course_duration}
                readOnly
              />
            </div>
            <div className="form-group">
              <label>Total Fees</label>
              <input
                type="text"
                name="total_fees"
                className="form-control"
                value={formData.total_fees}
                readOnly
              />
            </div>
            <button type="submit" className="btn btn-success btn-block mt-4">
              Submit Registration
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default RegistrationForm;
