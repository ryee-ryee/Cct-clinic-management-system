import React, { useState } from 'react';

const AddPatientForm = () => {
  const [formData, setFormData] = useState({
    studentId: '',
    firstName: '',
    middleName: '',
    lastName: '',
    address: '',
    birthday: '',
    age: '',
    department: '',
    course: '',
    section: '',
    diagnosis: '',
    visits: '1',
    contact: ''
  });

  const departments = [
    'School of Computer Studies',
    'School of Hospitality and Tourism',
    'School of Education',
    'School of Business Management'
  ];

  const coursesByDepartment = {
    'School of Computer Studies': ['BS Information Technology', 'BS Computer Science'],
    'School of Hospitality and Tourism': ['BS Hospitality Management', 'BS Tourism'],
    'School of Education': [
      'BS Education - Mathematics',
      'BS Education - Social Studies',
      'BS Education - Filipino',
      'BS Education - English'
    ],
    'School of Business Management': [
      'BS Business Management - Marketing',
      'BS Business Management - Human Resources',
      'BS Business Management - Office Administration'
    ]
  };

  const sections = ['A', 'B', 'C', 'D', 'E'];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      if (name === 'department') {
        return {
          ...prev,
          department: value,
          course: ''
        };
      }
      return {
        ...prev,
        [name]: value
      };
    });
  };

 /* const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', formData);
  };*/
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:3001/api/patients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (response.ok) {
      alert('Patient added successfully!');
      console.log(data.message);
    } else {
      alert('Error saving patient.');
      console.error(data.message);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to connect to backend.');
  }
};


  const availableCourses = coursesByDepartment[formData.department] || [];

  return (
    <div className="form-container">
      <h1>ADD PATIENT</h1>
      <p>Welcome, User!</p>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="full">
            <label>Student ID</label>
             <input
              type="number"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              min="0"
              step="1"
              onKeyDown={(e) => {
                if (['e', 'E', '+', '-'].includes(e.key)) e.preventDefault();
            }}
            className="no-spinner"/>

          </div>

          <div>
            <label>First Name</label>
            <input name="firstName" value={formData.firstName} onChange={handleChange} />
          </div>
          <div>
            <label>Middle Name</label>
            <input name="middleName" value={formData.middleName} onChange={handleChange} />
          </div>
          <div>
            <label>Last Name</label>
            <input name="lastName" value={formData.lastName} onChange={handleChange} />
          </div>

          <div className="full">
            <label>Address</label>
            <input name="address" value={formData.address} onChange={handleChange} />
          </div>

          <div>
            <label>Department</label>
            <select name="department" value={formData.department} onChange={handleChange}>
              <option value="">Select Department</option>
              {departments.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Course</label>
            <select name="course" value={formData.course} onChange={handleChange} disabled={!formData.department}>
              <option value="">Select Course</option>
              {availableCourses.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Section</label>
            <select name="section" value={formData.section} onChange={handleChange}>
              <option value="">Select Section</option>
              {sections.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="textarea">
            <label>Condition / Diagnosis</label>
            <textarea name="diagnosis" value={formData.diagnosis} onChange={handleChange}></textarea>
          </div>

          <div>
            <label>No. of Clinic Visit</label>
            <input name="visits" type="number" value={formData.visits} onChange={handleChange} />
          </div>

          <div>
            <label>Birthday</label>
            <input name="birthday" type="date" value={formData.birthday} onChange={handleChange} />
          </div>

          <div>
            <label>Age</label>
            <input name="age" type="number" className="no-spinner" value={formData.age} onChange={handleChange} />
          </div>

          <div>
            <label>Parent / Guardian Contact No.</label>
            <input name="contact" value={formData.contact} onChange={handleChange} />
          </div>
        </div>

        <div className="form-buttons">
          <button type="button" className="outline">Back</button>
          <button type="submit" className="outline">Save</button>
        </div>
      </form>
    </div>
  );
};

export default AddPatientForm;
