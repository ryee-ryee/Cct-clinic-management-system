import React, { useEffect, useState } from 'react';
import './Main.css';
import searchIcon from "../assets/magnifying-glass.png";

const PatientsPage = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/patients');
        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error('Failed to fetch patients:', error);
      }
    };

    fetchPatients();
  }, []);

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
            <span className="search-icon"> <img src={searchIcon} className="search-button" alt="search" /> </span>
          </div>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="patients-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Patient Name</th>
              <th>More Info</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient, index) => (
              <tr key={patient.id}>
                <td>{index + 1}</td>
                <td>{`${patient.firstName} ${patient.middleName} ${patient.lastName}`}</td>
                <td><button className="info-button">Info</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientsPage;
