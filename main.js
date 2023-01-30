import './styling.css';

const express = require('express');
const app = express();

const server = app.listen(8000, () => {
    console.log(`Express running → PORT ${server.address().port}`);
});

