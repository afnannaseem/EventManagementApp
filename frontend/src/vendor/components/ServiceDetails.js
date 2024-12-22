import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ServiceDetails = () => {
  const { serviceId } = useParams();
  const [serviceData, setServiceData] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [serviceName, setServiceName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [availabilityStart, setAvailabilityStart] = useState('');
  const [availabilityEnd, setAvailabilityEnd] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchServiceDetails();
  }, [serviceId]);

  const fetchServiceDetails = async () => {
    const token = localStorage.getItem('token');
    const apiUrl = "http://localhost:3002/";

    try {
      const response = await fetch(`${apiUrl}service/${serviceId}`, {
        method: 'GET',
        headers: {
          'token': token,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching service: ${response.statusText}`);
      }

      const data = await response.json();
      setServiceData(data);
      setServiceName(data.serviceName);
      setDescription(data.description);
      setPrice(data.price);
      setAvailabilityStart(data.availability.start);
      setAvailabilityEnd(data.availability.end);
      setCategory(data.category);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdate = () => {
    setShowUpdateForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const apiUrl = "http://localhost:3002/";
  
    try {
      const updatedService = {
        serviceName,
        description,
        price: parseFloat(price), // Ensure price is a number
        availability: {
          start: new Date(availabilityStart).toISOString(), // Format the dates to ISO string
          end: new Date(availabilityEnd).toISOString(),
        },
        category,
      };
  
      const response = await fetch(`${apiUrl}service/update/${serviceId}`, {
        method: 'PUT',
        headers: {
          'token': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedService),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error updating service: ${response.statusText}`);
      }
  
      setError('Service Updated Successfully');
      setShowUpdateForm(false);
      fetchServiceDetails();
    } catch (error) {
      setError(error.message);
    }
  };
  

  return (
    <div className="container service-details-page">
      <div className="card">
        <div className="card-header text-center">
          <h1>Service Details</h1>
        </div>
        <div className="card-body">
          {serviceData ? (
            <div>
              <div className="text-center mb-3">
              <p>Service Name: {serviceData.serviceName}</p>
              <p>Description: {serviceData.description}</p>
              <p>Price: {serviceData.price}</p>
              <p>Availability Start: {serviceData.availability.start}</p>
              <p>Availability End: {serviceData.availability.end}</p>
              <p>Category: {serviceData.category}</p>
              <button className="btn btn-primary d-block mx-auto" onClick={handleUpdate}>Update Service</button>
              </div>
              {showUpdateForm && (
                <form onSubmit={handleSubmit} className="mt-4">
                  <div className="form-group text-left">
                    <label htmlFor="serviceName">Service Name:</label>
                    <input type="text" className="form-control" id="serviceName" value={serviceName} onChange={e => setServiceName(e.target.value)} placeholder="Service Name" />
                  </div>

                  <div className="form-group text-left">
                    <label htmlFor="description">Description:</label>
                    <textarea className="form-control" id="description" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description"></textarea>
                  </div>

                  <div className="form-group text-left">
                    <label htmlFor="price">Price:</label>
                    <input type="number" className="form-control" id="price" value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" />
                  </div>

                  <div className="form-group text-left">
                    <label htmlFor="availabilityStart">Availability Start:</label>
                    <input type="date" className="form-control" id="availabilityStart" value={availabilityStart} onChange={e => setAvailabilityStart(e.target.value)} />
                  </div>

                  <div className="form-group text-left">
                    <label htmlFor="availabilityEnd">Availability End:</label>
                    <input type="date" className="form-control" id="availabilityEnd" value={availabilityEnd} onChange={e => setAvailabilityEnd(e.target.value)} />
                  </div>

                  <div className="form-group text-left">
                    <label htmlFor="category">Category:</label>
                    <input type="text" className="form-control" id="category" value={category} onChange={e => setCategory(e.target.value)} placeholder="Category" />
                  </div>
                  
                  <button type="submit" className="btn btn-success d-block mx-auto">Submit</button>
                </form>
              )}
              {error && <p className="text-danger">{error}</p>}
            </div>
          ) : (
            <p>Loading service details...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
