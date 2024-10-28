import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './EnquiryForm.css'; // Custom CSS file

function EnquiryForm() {
  const [formData, setFormData] = useState({
    enquiry_date: '',  // Change this key to match the Django model
    name: '',
    address: '',
    mobile: '',
    email: '',
    qualification: '',
    gender: '',
    course: '', // New course field
  });

  const [validated, setValidated] = useState(false); // State for validation
  const navigate = useNavigate();

  // Set default date to today
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setFormData((prevState) => ({ ...prevState, enquiry_date: today }));  // Change this key to match the Django model
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      // Ensure to convert enquiryDate to enquiry_date to match your Django model
      const { enquiryDate, ...rest } = formData;
      const dataToSubmit = { enquiry_date: enquiryDate, ...rest }; // Adjust the property name here

      console.log('Submitting form data:', dataToSubmit);

      axios.post('http://127.0.0.1:8000/api/enquiry/', dataToSubmit)
        .then((response) => {
          alert('Enquiry submitted successfully');
          navigate('/dashboard'); // Redirect after successful submission
        })
        .catch((error) => {
          console.error('There was an error submitting the enquiry!', error.response);
          alert('Failed to submit enquiry. Please try again.');
        });
    }
    setValidated(true); // Show validation feedback
  };

  return (
    <div className="container enquiry-form-container">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg">
            <div className="card-body">
              <h2 className="text-center mb-4">Enquiry Form</h2>
              <form onSubmit={handleSubmit} noValidate className={validated ? 'was-validated' : ''}>
                {/* Enquiry Date Field */}
                <div className="form-group mb-3">
                  <label htmlFor="enquiry_date">Enquiry Date</label>  {/* Match the name with the Django field */}
                  <input 
                    type="date" 
                    id="enquiry_date"
                    name="enquiry_date"  // Match this name with Django
                    className="form-control" 
                    value={formData.enquiry_date} 
                    onChange={handleChange} 
                    required 
                  />
                  <div className="invalid-feedback">Please enter a valid date.</div>
                </div>
                {/* Name Field */}
                <div className="form-group mb-3">
                  <label htmlFor="name">Name</label>
                  <input 
                    type="text" 
                    id="name"
                    name="name" 
                    className="form-control" 
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder="Enter your name" 
                    required 
                  />
                  <div className="invalid-feedback">Please enter your name.</div>
                </div>
                {/* Mobile Field */}
                <div className="form-group mb-3">
                  <label htmlFor="mobile">Mobile</label>
                  <input 
                    type="text" 
                    id="mobile"
                    name="mobile" 
                    className="form-control" 
                    value={formData.mobile} 
                    onChange={handleChange} 
                    placeholder="Enter your mobile number" 
                    required 
                  />
                  <div className="invalid-feedback">Please enter a valid mobile number.</div>
                </div>
                {/* Email Field */}
                <div className="form-group mb-3">
                  <label htmlFor="email">Email</label>
                  <input 
                    type="email" 
                    id="email"
                    name="email" 
                    className="form-control" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="Enter your email" 
                    required 
                  />
                  <div className="invalid-feedback">Please enter a valid email address.</div>
                </div>
                {/* Course Field */}
                <div className="form-group mb-3">
                  <label htmlFor="course">Course</label>
                  <select 
                    id="course"
                    name="course" 
                    className="form-control" 
                    value={formData.course} 
                    onChange={handleChange} 
                    required
                  >
                    <option value="">Select your course</option>
                    <option value="Basic Computers">Basic Computers</option>
                    <option value="Excel">Excel</option>
                    <option value="Tally">Tally</option>
                    <option value="Spoken English">Spoken English</option>
                    <option value="Python">Python</option>
                    <option value="Full Stack Development">Full Stack Development</option>
                  </select>
                  <div className="invalid-feedback">Please select a course.</div>
                </div>
                {/* Qualification Field */}
                <div className="form-group mb-3">
                  <label htmlFor="qualification">Qualification</label>
                  <select 
                    id="qualification"
                    name="qualification" 
                    className="form-control" 
                    value={formData.qualification} 
                    onChange={handleChange} 
                    required
                  >
                    <option value="">Select your qualification</option>
                    <option value="SSLC">SSLC</option>
                    <option value="PUC">PUC</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Postgraduate">Postgraduate</option>
                    <option value="Others">Others</option>
                  </select>
                  <div className="invalid-feedback">Please select your qualification.</div>
                </div>
                {/* Gender Field */}
                <div className="form-group mb-4">
                  <label htmlFor="gender">Gender</label>
                  <select 
                    id="gender"
                    name="gender" 
                    className="form-control" 
                    value={formData.gender} 
                    onChange={handleChange} 
                    required
                  >
                    <option value="">Select your gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  <div className="invalid-feedback">Please select your gender.</div>
                </div>
                {/* Address Field */}
                <div className="form-group mb-3">
                  <label htmlFor="address">Address</label>
                  <input 
                    type="text" 
                    id="address"
                    name="address" 
                    className="form-control" 
                    value={formData.address} 
                    onChange={handleChange} 
                    placeholder="Enter your address" 
                    required 
                  />
                  <div className="invalid-feedback">Please enter your address.</div>
                </div>
                <button type="submit" className="btn btn-custom btn-block mt-4">Submit Enquiry</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnquiryForm;
