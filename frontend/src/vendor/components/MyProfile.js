import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {
  const [vendorData, setVendorData] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const apiUrl = "http://localhost:3002/";

    fetch(`${apiUrl}vendor/profile`, {
      method: 'GET',
      headers: {
        'token': token,
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error fetching profile: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        setVendorData(data);
        setName(data.name);
        setEmail(data.email);
        setPhone(data.phone);
        setAddress(data.address);
        setDescription(data.description);
      })
      .catch(error => console.error(error.message));
  }, []);

  const handleUpdate = () => {
    setShowUpdateForm(true);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    const apiUrl = "http://localhost:3002/";

    try {
      const response = await fetch(`${apiUrl}vendor/update`, {
        method: 'PUT',
        headers: {
          'token': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone, address, description }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Error updating profile');
      }
      setError('Profile Updated Successfully');
      setShowUpdateForm(false);
      setVendorData({ ...vendorData, name, email, phone, address, description });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container my-profile-page">
      <div style={{width: "700px"}} className="card">
        <div className="card-header text-center">
          <h1 style={{fontSize: "xx-large", color: "black"}}>My Vendor Profile</h1>
        </div>
        <div className="card-body">
          {vendorData ? (
            <>
              <div className="text-center mb-3">
                <p>Email: {vendorData.email}</p>
                <p>Name: {vendorData.name}</p>
                <p>Phone: {vendorData.phone}</p>
                <p>Address: {vendorData.address}</p>
                <p>Description: {vendorData.description}</p>
              </div>
              <button className="btn btn-primary d-block mx-auto" onClick={handleUpdate}>Update Your Profile</button>
              
              {showUpdateForm && (
                <div className="mt-4">
                  <div className="form-group text-left">
                    <label htmlFor="name">Name:</label>
                    <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                  </div>

                  <div className="form-group text-left">
                    <label htmlFor="email">Email:</label>
                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                  </div>

                  <div className="form-group text-left">
                    <label htmlFor="phone">Phone:</label>
                    <input type="text" className="form-control" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
                  </div>

                  <div className="form-group text-left">
                    <label htmlFor="address">Address:</label>
                    <input type="text" className="form-control" id="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
                  </div>

                  <div className="form-group text-left">
                    <label htmlFor="description">Description:</label>
                    <textarea className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"></textarea>
                  </div>
                  
                  <button className="btn btn-success" onClick={handleSubmit}>Submit</button>
                </div>
              )}
              {error && <p className="text-danger">{error}</p>}
            </>
          ) : (
            <p>Loading profile...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
