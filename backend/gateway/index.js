const express = require('express');
const cors = require('cors'); 
const proxy = require('express-http-proxy');
const dotenv = require('dotenv');
const expressStatusMonitor = require('express-status-monitor');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());

app.use('/task', proxy('http://localhost:5000')); 
app.use('/project', proxy('http://localhost:3001')); 
app.use(expressStatusMonitor());



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
