const express = require('express');
const cors = require('cors'); // Import the cors middleware
const app = express();
const port = 3000;

const items = [
  { id: 1, name: 'img.jpg' },
  { id: 2, name: 'cover.jpg' },
  // Add more items as needed
];

// Enable CORS for all routes
app.use(cors());

// API endpoint to get all items
app.get('/items', (req, res) => {
  res.json(items);
});

// API endpoint to get a specific item by ID
app.get('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = items.find(item => item.id === itemId);
  if (item) {
    res.json(item);
  } else {
    res.status(404).send('Item not found');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
