const express = require('express');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.static('public'));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('csvFile'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const csvData = req.file.buffer.toString('utf8');
  const parsedData = parseCSV(csvData);

  // Here, you can process the parsed data and integrate it with your infographic generation logic.

  res.send('File uploaded successfully!');
});

function parseCSV(csvData) {
  const data = [];

  // Parse CSV data using the 'csv-parser' library or your preferred method.
  // Here, we are using the 'csv-parser' library.
  csv.parse({ delimiter: ',' })
    .on('data', (row) => {
      data.push(row);
    })
    .on('end', () => {
      console.log('CSV file successfully processed.');
    });

  return data;
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
