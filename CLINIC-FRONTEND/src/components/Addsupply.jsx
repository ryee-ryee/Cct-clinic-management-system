import React, { useState } from 'react';

const AddSupplyForm = () => {
  const [formData, setFormData] = useState({
    itemName: '',
    bName: '',
    supplyCode: '',
    address: '',
    expiration: '',
    purchaseDate: '',
    quantity: '',
    type: ''
  });

  const type = [
    'Medical Equipment',
    'Pharmaceuticals',
    'Consumables'
  ];
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      if (name === 'type') {
        return {
          ...prev,
          type: value,
        };
      }
      return {
        ...prev,
        [name]: value
      };
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:3001/api/supplies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      alert('Supply added successfully!');
      console.log(data.message);
    } else {
      alert('Error saving supply.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to connect to backend.');
  }
};


  return (
    <div className="form-container2">
      <h1>ADD SUPPLY</h1>
      <p>Welcome, User!</p>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div>
            <label>Item Name</label>
            <input name="itemName" value={formData.itemName} onChange={handleChange} />
          </div>
          <div>
            <label>Brand Name</label>
            <input name="bName" value={formData.bName} onChange={handleChange} />
          </div>
          <div>
            <label>Supply Code</label>
            <input name="supplyCode" value={formData.supplyCode} onChange={handleChange} />
          </div>

          <div>
            <label>Type</label>
            <select name="type" value={formData.type} onChange={handleChange}>
              <option value="">Select Type</option>
              {type.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Purchase Date</label>
            <input name="purchaseDate" type="date" value={formData.purchaseDate} onChange={handleChange} />
          </div>

          <div>
            <label>Expiry Date</label>
            <input name="expiration" type="date" value={formData.expiration} onChange={handleChange} />
          </div>
        </div>
        <br />
        <br />
        <br />
        <div className="form-buttons">
          <button type="button" className="outline">Back</button>
          <button type="submit" className="outline">Save</button>
        </div>
      </form>
    </div>
  );
};

export default AddSupplyForm;
