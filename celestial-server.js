// Import the express module
const express = require('express');
const path = require('path');

// Create an express application
const app = express();

// Serve static files from the current directory
app.use(express.static(__dirname));

// Define a route to serve the celestial.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'celestial.html'));
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});