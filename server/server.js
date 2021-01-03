const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'));

const employees = [];

app.post('/data', (req, res) => {
  let newEmployee = req.body;
  console.log(newEmployee);
  res.sendStatus(201);
  employees.push(newEmployee);
});

app.get('/data', (req, res) => {
  console.log('getting employees');
  res.send(employees);
});

app.delete('/data', (req, res) => {
  res.sendStatus(201);
  let deleteId = req.body.number;
  for (let i = 0; i < employees.length; i++) {
    if (employees[i].idNumber == deleteId) {
      console.log('deleting', employees[i]);
      employees.splice(i, 1);
    }
  }
});

// app listen
app.listen(port, () => {
  console.log('server is running on port', port);
});
