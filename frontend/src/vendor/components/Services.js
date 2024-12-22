import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newService, setNewService] = useState({ 
    serviceName: '', 
    description: '', 
    price: '', 
    availabilityStart: '', 
    availabilityEnd: '', 
    category: '' 
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const token = localStorage.getItem('token');
      const apiUrl = "http://localhost:3002/";
      const response = await fetch(`${apiUrl}service/`, {
        method: 'GET',
        headers: {
          'token': token,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching services: ${response.statusText}`);
      }

      const data = await response.json();
      setServices(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const deleteService = async (serviceId) => {
    const token = localStorage.getItem('token');
    const apiUrl = "http://localhost:3002/";

    try {
      const response = await fetch(`${apiUrl}service/delete/${serviceId}`, {
        method: 'DELETE',
        headers: {
          'token': token,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json(); // Get the detailed error message from the response
        throw new Error(errorData.message || `Error deleting service: ${response.statusText}`);
      }

      // Refresh the list of services after deletion
      await fetchServices();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService({ ...newService, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const apiUrl = "http://localhost:3002/";

    try {
      const serviceData = {
        ...newService,
        availability: {
          start: new Date(newService.availabilityStart),
          end: new Date(newService.availabilityEnd)
        }
      };

      const response = await fetch(`${apiUrl}service/add`, {
        method: 'POST',
        headers: {
          'token': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(serviceData),
      });

      if (!response.ok) {
        throw new Error(`Error adding service: ${response.statusText}`);
      }

      await fetchServices();
      setShowAddForm(false);
      setNewService({ serviceName: '', description: '', price: '', availabilityStart: '', availabilityEnd: '', category: '' });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div style={{height: '1000px'}} className="container service-list-page">
      <div style={{width: "700px"}} className="card">
        <div className="card-header text-center">
          <h1 style={{fontSize: "xx-large", color: "black"}}>Service List</h1>
        </div>
        <div className="card-body">
          {loading ? (
            <p>Loading services...</p>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : (
            <ul className="list-group">
              {services.map(service => (
                <li key={service._id} className="list-group-item d-flex justify-content-between align-items-center">
                  <Link to={`/vendor/service/${service._id}`}>
                    <h6>{service.serviceName}</h6>
                  </Link>
                  <button className="btn btn-danger" onClick={() => deleteService(service._id)}>Delete</button>
                </li>
              ))}
            </ul>
          )}

          <button className="btn btn-primary d-block mx-auto mt-3" onClick={() => setShowAddForm(true)}>Add a Service</button>

          {showAddForm && (
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="form-group text-left">
                <label htmlFor="serviceName">Service Name:</label>
                <input type="text" className="form-control" id="serviceName" name="serviceName" value={newService.serviceName} onChange={handleInputChange} placeholder="Service Name" required />
              </div>

              <div className="form-group text-left">
                <label htmlFor="description">Description:</label>
                <textarea className="form-control" id="description" name="description" value={newService.description} onChange={handleInputChange} placeholder="Description"></textarea>
              </div>

              <div className="form-group text-left">
                <label htmlFor="price">Price:</label>
                <input type="number" className="form-control" id="price" name="price" value={newService.price} onChange={handleInputChange} placeholder="Price" required />
              </div>

              <div className="form-group text-left">
                <label htmlFor="availabilityStart">Availability Start Date:</label>
                <input type="date" className="form-control" id="availabilityStart" name="availabilityStart" value={newService.availabilityStart} onChange={handleInputChange} required />
              </div>

              <div className="form-group text-left">
                <label htmlFor="availabilityEnd">Availability End Date:</label>
                <input type="date" className="form-control" id="availabilityEnd" name="availabilityEnd" value={newService.availabilityEnd} onChange={handleInputChange} required />
              </div>

              <div className="form-group text-left">
                <label htmlFor="category">Category:</label>
                <input type="text" className="form-control" id="category" name="category" value={newService.category} onChange={handleInputChange} placeholder="Category" required />
              </div>
              
              <button type="submit" className="btn btn-success d-block mx-auto">Submit</button>
              <button type="button" className="btn btn-secondary d-block mx-auto mt-2" onClick={() => setShowAddForm(false)}>Cancel</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceList;
