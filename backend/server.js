const express = require('express');
const cors = require('cors');
const db = require('./database/db');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

//? CONST
const port = 3001; // React의 포트 번호와 다르게 하기 위해
const app = express();

//? Parser MiddleWare
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.post('/api', (req, res) => {
    console.log(req.body);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
