const express = require('express');

const app = express();

app.get('/api/customers', (req, res) => {
  const customers = [
    {id: 1, firstName: 'Francisca', lastName: 'Paupério'},
    {id: 2, firstName: 'Mariana', lastName: 'Silva'},
    {id: 3, firstName: 'Eduarda', lastName: 'Cunha'},
    {id: 4, firstName: 'Francisca', lastName: 'Cerquinho'},
    {id: 5, firstName: 'Luís', lastName: 'Saraiva'}
  ];
  res.json(customers);
});

const port = 3001;

app.listen(port, () => console.log(`Server started on port ${port}`));
