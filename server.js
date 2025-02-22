const express = require('express');
const cors = require('cors');
const app = express();

// Use CORS middleware
app.use(cors());

// ...existing code...

app.get('/auth/details', (req, res) => {
    // ...existing code...
    res.json({ message: 'Data fetched successfully' });
});

// ...existing code...

app.listen(8082, () => {
    console.log('Server is running on port 8082');
});
