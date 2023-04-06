const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// This is a mock database of table statuses
let tableStatuses = {
  1: 'available',
  2: 'reserved',
  3: 'occupied'
};

app.use(bodyParser.json());

app.put('/api/table/:number', (req, res) => {
  const tableNumber = req.params.number;
  const newStatus = req.body.status;

  if (tableStatuses[tableNumber]) {
    tableStatuses[tableNumber] = newStatus;
    res.send({ status: newStatus });
  } else {
    res.status(404).send({ error: `Table with Number ${tableNumber} not found` });
  }
});

app.get('/api/table/:number', (req, res) => {
    const tableNumber = req.params.number;
    const status = tableStatuses[tableNumber];
  
    if (status) {
      res.send({ status });
    } else {
      res.status(404).send({ error: `Table with Number ${tableNumber} not found` });
    }
});
  
  