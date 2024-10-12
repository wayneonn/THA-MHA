// Import required packages
const express = require('express');

// Initialize Express app
const app = express();
const PORT = 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
