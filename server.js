const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from 'public' directory

app.post('/submit', (req, res) => {
    const { name, message } = req.body;
    if (name && message) {
        res.json({ message: `Thank you, ${name}. Your message has been received.` });
    } else {
        res.status(400).json({ message: 'Both name and message are required.' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
