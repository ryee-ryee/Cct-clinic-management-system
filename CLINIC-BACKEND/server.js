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


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
