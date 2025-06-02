import React, { useEffect, useState } from 'react';
import './Main.css';
import searchIcon from "../assets/magnifying-glass.png";
const SupplyPage = () => {
  const [supplies, setSupplies] = useState([]);

  useEffect(() => {
    const fetchSupplies = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/supplies');
        const data = await response.json();
        setSupplies(data);
      } catch (error) {
        console.error('Error fetching supplies:', error);
      }
    };

    fetchSupplies();
  }, []);

  return (
    <div className="patients-page">
      <div className="header-row">
        <div className="title-group">
          <h2 className="page-title">TOTAL SUPPLIES</h2>
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
              <th>Item Name</th>
              <th>Type</th>
              <th>Brand</th>
              <th>Supply Code</th>
              <th>Expiry</th>
              <th>Purchase Date</th>
              <th>Info</th>
            </tr>
          </thead>
          <tbody>
            {supplies.map((supply, index) => (
              <tr key={supply.id}>
                <td>{index + 1}</td>
                <td>{supply.itemName}</td>
                <td>{supply.type}</td>
                <td>{supply.bName}</td>
                <td>{supply.supplyCode}</td>
                <td>{supply.expiration}</td>
                <td>{supply.purchaseDate}</td>
                <td><button className="info-button">Info</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupplyPage;
