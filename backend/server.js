const express = require('express');
const cors = require('cors');
const db = require('./database/db');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

//? CONST
const port = 3001; // React의 포트 번호와 다르게 하기 위해
const app = express();

//? Parser MiddleWare
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//? 계정 검증
app.post('/verify', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const pw = crypto.createHash('sha512').update(req.body.pw).digest('base64');

    db.query('SELECT id, name FROM people', (err, result) => {
        const idData = result.map((item) => item.id);
        const nameData = result.map((item) => item.name);
        if (idData.includes(email)) {
            return res.send('email');
        }
        if (nameData.includes(name)) {
            return res.send('name');
        } else {
            db.query('INSERT INTO people (id, pw, name) VALUES (?, ?, ?)', [email, pw, name], (err, result) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(result);
                    return res.send(false);
                }
            });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
