import React, { useState, useEffect } from 'react';

const CombinedEnquiryAndRegistration = () => {
  const [enquiryData, setEnquiryData] = useState([]);
  const [registrationData, setRegistrationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true at the start
      try {
        const [enquiryResponse, registrationResponse] = await Promise.all([
          fetch('http://localhost:8000/api/enquiries/'),
          fetch('http://localhost:8000/api/registration/')
        ]);
  
        if (enquiryResponse.ok && registrationResponse.ok) {
          const [enquiries, registrations] = await Promise.all([
            enquiryResponse.json(),
            registrationResponse.json()
          ]);
  
          console.log('Fetched Enquiries:', enquiries); // Log fetched enquiries
          console.log('Fetched Registrations:', registrations); // Log fetched registrations
  
          setEnquiryData(enquiries); // Update state with enquiry data
          setRegistrationData(registrations); // Update state with registration data
        } else {
          console.error('Error fetching data:', enquiryResponse.statusText, registrationResponse.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false once done
      }
    };
  
    fetchData(); // Call fetchData function
  }, []); // Empty dependency array to run once on mount

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredEnquiries = enquiryData.filter(enquiry =>
    enquiry.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredRegistrations = registrationData.filter(registration =>
    registration.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="combined-container">
      <h2>Enquiries and Registrations</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {/* Enquiries Section */}
          <div className="enrolled-students-container">
            <h3>Enquiries</h3>
            <div className="search-bar">
              <input 
                type="text" 
                placeholder="Search by name..." 
                value={searchTerm} 
                onChange={handleSearchChange} 
                className="form-control"
              />
            </div>

            <table className="table table-bordered mt-3">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Course</th>
                  <th>Contact</th>
                  <th>Email</th>
                  <th>Qualification</th>
                  <th>Gender</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredEnquiries.length > 0 ? (
                  filteredEnquiries.map((enquiry) => (
                    <tr key={enquiry.enquiry_number}>
                      <td>{enquiry.enquiry_number}</td>
                      <td>{enquiry.name}</td>
                      <td>{enquiry.course}</td>
                      <td>{enquiry.mobile}</td>
                      <td>{enquiry.email}</td>
                      <td>{enquiry.qualification}</td>
                      <td>{enquiry.gender}</td>
                      <td>{enquiry.enquiry_date}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" style={{ textAlign: 'center' }}>No enquiries found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Registrations Section */}
          <div className="registered-students-container">
            <h3>Registrations</h3>
            <div className="search-bar">
              <input 
                type="text" 
                placeholder="Search by name..." 
                value={searchTerm} 
                onChange={handleSearchChange} 
                className="form-control"
              />
            </div>

            <table className="table table-bordered mt-3">
              <thead>
                <tr>
                  <th>Registration No.</th>
                  <th>Name</th>
                  <th>Course</th>
                  <th>Contact</th>
                  <th>Email</th>
                  <th>Qualification</th>
                  <th>Gender</th>
                  <th>Date of Registration</th>
                </tr>
              </thead>
              <tbody>
                {filteredRegistrations.length > 0 ? (
                  filteredRegistrations.map((registration) => (
                    <tr key={registration.registration_number}>
                      <td>{registration.registration_number}</td>
                      <td>{registration.name}</td>
                      <td>{registration.course_name}</td>
                      <td>{registration.mobile}</td>
                      <td>{registration.email}</td>
                      <td>{registration.qualification}</td>
                      <td>{registration.gender}</td>
                      <td>{registration.date_of_registration}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" style={{ textAlign: 'center' }}>No registrations found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CombinedEnquiryAndRegistration;
