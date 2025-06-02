import React from 'react';
import ogIcon from "../assets/on-going.svg";
import schoolIcon from "../assets/school.svg";
import totalIcon from "../assets/totalp.svg";
import sIcon from "../assets/stock.svg";
import rIcon from "../assets/report.svg";
const Dashboard = ({ onNavigate }) => {
  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="dashboard-cards">
        <div className="card">
          <div className='carddiv'> <img src={schoolIcon} className="cardIcon" alt="sIcon" /> </div>
          <h3>1st semester</h3>
          <h3>AY 2025-2026</h3>
        </div>

        <div className="card">
          <div className='carddiv'> <img src={totalIcon} className="cardIcon" alt="CIcon" /> </div>
          <h3>Total Patients</h3>
          <p></p>
          <button className="contentButton" onClick={() => onNavigate('patients')}>
            View
          </button>
        </div>

        <div className="card">
          <div className='carddiv'> <img src={ogIcon} className="cardIcon" alt="oggIcon" /> </div>
          <h3>On-Going Patients</h3>
          <p></p>
          <button className="contentButton" onClick={() => onNavigate('ongoing')}>
            View
          </button>
        </div>

        <div className="card">
          <div className='carddiv'> <img src={sIcon} className="cardIcon" alt="ssIcon" /> </div>
          <h3>Supply Inventory</h3>
          <p></p>
          <button className="contentButton" onClick={() => onNavigate('supply')}>
            View
          </button>
        </div>

        <div className="card">
          <div className='carddiv'> <img src={rIcon} className="cardIcon" alt="rrIcon" /> </div>
          <h3>Reports</h3>
          <p>N/A</p>
          <button className="contentButton" onClick={() => onNavigate('reports')}>
            View
          </button>
        </div>
      </div>

      <div className="dashboard-section">
        <h3>Recent Activities</h3>
        <ul>
          <li>jaybee sucal added as a new patient</li>
          <li>10 syringes and bp monitor added to inventory</li>
          <li>Report generated for June 2025</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
