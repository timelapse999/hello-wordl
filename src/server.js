const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.post('/submit', (req, res) => {
  const answer = req.body.answer + "\n";

  fs.appendFile('answer.txt', answer, err => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
      return;
    }
    res.send('Answer saved');
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
