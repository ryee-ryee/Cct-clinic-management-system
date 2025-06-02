import React, { useEffect, useState } from 'react';
import './Main.css';
import searchIcon from "../assets/magnifying-glass.png";

const PatientsPage = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchPatients = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/patients');
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error('Failed to fetch patients:', error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      try {
        await fetch(`http://localhost:3001/api/patients/${id}`, { method: 'DELETE' });
        fetchPatients();
      } catch (error) {
        console.error('Delete failed:', error);
      }
    }
  };

  const handleView = (patient) => {
    setSelectedPatient(patient);
    setIsEditing(false);
  };

  const handleEdit = (patient) => {
    setSelectedPatient(patient);
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedPatient((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/patients/${selectedPatient.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedPatient),
      });
      if (response.ok) {
        alert('Patient updated');
        setSelectedPatient(null);
        fetchPatients();
      } else {
        alert('Update failed');
      }
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  return (
    <div className="patients-page">
      <div className="header-row">
        <div className="title-group">
          <h2 className="page-title">TOTAL PATIENTS</h2>
          <p className="welcome-text">Welcome, User!</p>
        </div>

        <div className="controls">
          <button className="back-button">Back</button>
          <div className="search-container">
            <input type="text" placeholder="Search" />
            <span className="search-icon">
              <img src={searchIcon} className="search-button" alt="search" />
            </span>
          </div>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="patients-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Patient Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient, index) => (
              <tr key={patient.id}>
                <td>{index + 1}</td>
                <td>{`${patient.firstName} ${patient.middleName} ${patient.lastName}`}</td>
                <td>
                  <button onClick={() => handleView(patient)} className='table-buttons'>View</button>
                  <button onClick={() => handleEdit(patient)} className='table-buttons'>Edit</button>
                  <button onClick={() => handleDelete(patient.id)} className='table-buttons'>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedPatient && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{isEditing ? 'Edit Patient' : 'Patient Info'}</h3>
            <div className="modal-content">
              {Object.entries(selectedPatient).map(([key, value]) => (
                <div key={key} className="modal-field">
                  <label>{key}</label>
                  {isEditing ? (
                    <input name={key} value={value} onChange={handleChange} />
                  ) : (
                    <p>{value}</p>
                  )}
                </div>
              ))}
              <div className="modal-buttons">
                {isEditing && <button onClick={handleUpdate}>Save Changes</button>}
                <button onClick={() => setSelectedPatient(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientsPage;
