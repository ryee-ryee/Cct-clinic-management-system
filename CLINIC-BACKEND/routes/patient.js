const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', async (req, res) => {
  const data = req.body;

  const sql = `
    INSERT INTO patients (
      studentId, firstName, middleName, lastName,
      address, birthday, age, department, course,
      section, \`condition\`, visits, contact
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    data.studentId,
    data.firstName,
    data.middleName,
    data.lastName,
    data.address,
    data.birthday,
    data.age,
    data.department,
    data.course,
    data.section,
    data.condition,
    data.visits,
    data.contact
  ];

  try {
    const [result] = await db.query(sql, values);
    res.status(201).json({ message: 'Patient added successfully', id: result.insertId });
  } catch (err) {
    console.error('Insert error:', err);
    res.status(500).send('Failed to add patient');
  }
});

module.exports = router;
