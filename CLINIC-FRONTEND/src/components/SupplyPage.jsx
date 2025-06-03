import React, { useEffect, useState } from 'react';
import './Main.css';
import searchIcon from "../assets/magnifying-glass.png";

const SupplyPage = () => {
  const [supplies, setSupplies] = useState([]);
  const [selectedSupply, setSelectedSupply] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchSupplies = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/supplies');
      const data = await response.json();
      setSupplies(data);
    } catch (error) {
      console.error('Error fetching supplies:', error);
    }
  };

  useEffect(() => {
    fetchSupplies();
  }, []);

  const handleView = (supply) => {
    setSelectedSupply(supply);
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedSupply(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/supplies/${selectedSupply.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedSupply),
      });
      if (response.ok) {
        alert('Supply updated');
        setIsModalOpen(false);
        setSelectedSupply(null);
        fetchSupplies();
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Update failed');
      }
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this supply?')) {
      try {
        const response = await fetch(`http://localhost:3001/api/supplies/${selectedSupply.id}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          alert('Supply deleted');
          setIsModalOpen(false);
          setSelectedSupply(null);
          fetchSupplies();
        } else {
          const errorData = await response.json();
          alert(errorData.message || 'Delete failed');
        }
      } catch (error) {
        console.error('Delete error:', error);
      }
    }
  };

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
                <td>{supply.expiration?.substring(0, 10)}</td>
                <td>{supply.purchaseDate?.substring(0, 10)}</td>
                <td>
                  <button className="info-button" onClick={() => handleView(supply)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedSupply && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Supply Details</h2>
            <label>Item Name</label>
            <input name="itemName" value={selectedSupply.itemName} onChange={handleChange} />

            <label>Brand Name</label>
            <input name="bName" value={selectedSupply.bName} onChange={handleChange} />

            <label>Type</label>
            <input name="type" value={selectedSupply.type} onChange={handleChange} />

            <label>Supply Code</label>
            <input name="supplyCode" value={selectedSupply.supplyCode} onChange={handleChange} />

            <label>Purchase Date</label>
            <input
              type="date"
              name="purchaseDate"
              value={selectedSupply.purchaseDate?.substring(0, 10)}
              onChange={handleChange}
            />

            <label>Expiration Date</label>
            <input
              type="date"
              name="expiration"
              value={selectedSupply.expiration?.substring(0, 10)}
              onChange={handleChange}
            />

            <div className="modal-buttons">
              <button onClick={() => {
                setIsModalOpen(false);
                setSelectedSupply(null);
              }}>Close</button>
              <button className="delete-button" onClick={handleDelete}>Delete</button>
              <button onClick={handleUpdate}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplyPage;
