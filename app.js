const express = require('express');
const pool = require('./db_config');

const app = express();
app.use(express.json());

// Create a new transaction
app.post('/transactions', async (req, res) => {
  console.log(req.body);
  const { amount, userto, userfrom } = req.body;
  try {
    // Insert the new transaction into the database
    const result = await pool.query(
      'INSERT INTO transactions (amount, userto, userfrom) VALUES ($1, $2, $3) RETURNING *',
      [amount, userto, userfrom]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while creating the transaction' });
  }
});

// Get all transactions
app.get('/transactions', async (req, res) => {
  try {
    // Retrieve all transactions from the database
    const result = await pool.query('SELECT * FROM transactions');
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while retrieving transactions' });
  }
});

module.exports = app;
