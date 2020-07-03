const express = require('express');
const path = require('path');

const app = express();

const messages = [];

app.use(express.static(path.join(__dirname, '/src')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/src/index.html'));
});

app.listen(8000, () => {
    console.log('Server runing on port 8000');
});