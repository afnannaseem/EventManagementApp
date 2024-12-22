import React, { useState } from 'react';
import axios from 'axios';

const UpdateProfilePage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    organizationName: '',
    contactInformation: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a PUT request to update the user profile
      const response = await axios.put('http://localhost:8080/org/profile', formData, {
        // Add any necessary headers, such as authentication token
        headers: {
          // Your authentication token goes here
          token: localStorage.getItem('token'),
        },
      });

      console.log(response.data); // Log the response or handle it as needed
    } catch (error) {
      console.error('Error updating profile:', error.message);
    }
  };

  return (
    <div>
      <nav className='navbar'>Update Profile Page</nav>
      <div style={{ marginTop:'20px',display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', marginBottom:'30px' }}>

      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <label>
          Organization Name:
          <input
            type="text"
            name="organizationName"
            value={formData.organizationName}
            onChange={handleChange}
          />
        </label>
        <label>
          Contact Information:
          <input
            type="text"
            name="contactInformation"
            value={formData.contactInformation}
            onChange={handleChange}
          />
        </label>
        <button2 type="submit">Update Profile</button2>
      </form>
    </div>
    </div>
  );
};

export default UpdateProfilePage;
