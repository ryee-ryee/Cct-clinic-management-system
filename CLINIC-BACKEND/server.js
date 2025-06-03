const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'clinic_db'
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Save patient to database
app.post('/api/patients', (req, res) => {
  const {
    studentId, firstName, middleName, lastName,
    address, birthday, age, department,
    course, section, diagnosis, visits, contact
  } = req.body;

  const sql = `INSERT INTO patients 
    (studentId, firstName, middleName, lastName, address, birthday, age, department, course, section, diagnosis, visits, contact)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [studentId, firstName, middleName, lastName, address, birthday, age, department, course, section, diagnosis, visits, contact];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Insert error:', err);
      return res.status(500).json({ message: 'Error inserting patient' });
    }
    res.status(201).json({ message: 'Patient added successfully' });
  });
});


// Get all patients
app.get('/api/patients', (req, res) => {
  const sql = 'SELECT * FROM patients ORDER BY id DESC';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Fetch error:', err);
      return res.status(500).json({ message: 'Error fetching patients' });
    }
    res.json(results);
  });
});

app.delete('/api/patients/:id', (req, res) => {
  const patientId = req.params.id;
  db.query('DELETE FROM patients WHERE id = ?', [patientId], (err, result) => {
    if (err) return res.status(500).json({ error: 'Delete failed' });
    res.json({ message: 'Patient deleted' });
  });
});

app.put('/api/patients/:id', (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  db.query('UPDATE patients SET ? WHERE id = ?', [updatedData, id], (err) => {
    if (err) return res.status(500).json({ error: 'Update failed' });
    res.json({ message: 'Patient updated' });
  });
});


app.post('/api/supplies', (req, res) => {
  const { itemName, bName, supplyCode, type, purchaseDate, expiration } = req.body;

  const sql = `INSERT INTO supplies 
    (itemName, bName, supplyCode, type, purchaseDate, expiration) 
    VALUES (?, ?, ?, ?, ?, ?)`;

  const values = [itemName, bName, supplyCode, type, purchaseDate, expiration];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Insert error:', err);
      return res.status(500).json({ message: 'Error inserting supply' });
    }
    res.status(201).json({ message: 'Supply added successfully' });
  });
});


app.get('/api/supplies', (req, res) => {
  const sql = 'SELECT * FROM supplies';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching supplies:', err);
      return res.status(500).json({ message: 'Failed to fetch supplies' });
    }
    res.json(results);
  });
});

app.delete('/api/supplies/:id', (req, res) => {
  const supplyId = req.params.id;
  const sql = 'DELETE FROM supplies WHERE id = ?';

  db.query(sql, [supplyId], (err, result) => {
    if (err) {
      console.error('Delete error:', err);
      return res.status(500).json({ message: 'Error deleting supply' });
    }
    res.json({ message: 'Supply deleted successfully' });
  });
});

app.put('/api/supplies/:id', (req, res) => {
  const supplyId = req.params.id;
  const { itemName, bName, supplyCode, type, purchaseDate, expiration } = req.body;

  const sql = `UPDATE supplies SET 
    itemName = ?, bName = ?, supplyCode = ?, type = ?, purchaseDate = ?, expiration = ?
    WHERE id = ?`;

  db.query(sql, [itemName, bName, supplyCode, type, purchaseDate, expiration, supplyId], (err, result) => {
    if (err) {
      console.error('Update error:', err);
      return res.status(500).json({ message: 'Error updating supply' });
    }
    res.json({ message: 'Supply updated successfully' });
  });
});



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
