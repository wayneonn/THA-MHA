// Import required packages
const express = require('express');
const fs = require('fs');

// Initialize Express app
const app = express();
const PORT = 3000;

const bodyParser = require('body-parser');

// Middleware for JSON parsing and request logging
app.use(bodyParser.json());
app.use((req, res, next) => {
    console.log(`${req.method} request to ${req.url}`);
    next();
});

let data = [];
let currentId = 1;

try {
    if (fs.existsSync('data.json')) {
        const rawData = fs.readFileSync('data.json');
        data = JSON.parse(rawData);
        if (data.length > 0) {
            currentId = Math.max(...data.map(obj => obj.id)) + 1;
        }
    } else {
        fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
    }
} catch (error) {
    console.error('Error reading or creating JSON file:', error);
}

app.post('/object', (req, res) => {
    const { name, email } = req.body;

    // Simple validation
    if (!name || !email) {
        return res.status(400).json({ message: 'Name and email are required' });
    }

    // Create new object
    const newObject = {
        id: currentId++,
        name,
        email,
    };

    data.push(newObject);
    res.status(201).json(newObject);
});

app.get('/object/:id', (req, res) => {
    const { id } = req.params;
    const foundObject = data.find((obj) => obj.id === parseInt(id));

    if (foundObject) {
        res.status(200).json(foundObject);
    } else {
        res.status(404).json({ message: 'Object not found' });
    }
});

// Save updated JSON data before server exits
const saveData = () => {
    try {
        fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
        console.log('Data saved to file at data.json');
    } catch (error) {
        console.error('Error saving JSON file:', error);
    }
};

process.on('exit', saveData);
process.on('SIGINT', () => {
    saveData();
    process.exit();
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
