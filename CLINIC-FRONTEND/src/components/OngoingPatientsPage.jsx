import React from 'react';
import './Main.css';
import searchIcon from "../assets/magnifying-glass.png";
const placeholderPatients = Array.from({ length: 30 }, (_, index) => ({
  id: index + 1,
  name: "Markluigi Rodelas"
}));

const OngoingPatientsPage = () => {
  return (
    <div className="patients-page">
      <div className="header-row">
        <div className="title-group">
          <h2 className="page-title">On-Going Patients</h2>
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
            {placeholderPatients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.id}</td>
                <td>{patient.name}</td>
                <td>
                  <button className="info-button">Info</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OngoingPatientsPage;
