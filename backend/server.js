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
app.post('/register', (req, res) => {
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
//? 토큰 생성
const tokenCreate = (email, callback) => {
    db.query('SELECT `key`, refreshKey FROM secretKey', (err, result) => {
        const key = crypto.createHash('sha512').update(result[0].key).digest('base64');
        const refreshKey = crypto.createHash('sha512').update(result[0].refreshKey).digest('base64');

        const token = jwt.sign({ email: email }, key, { expiresIn: '1m' });
        const refreshToken = jwt.sign({ email: email }, refreshKey, { expiresIn: '1d' });

        tokenSave(email, token, refreshToken, callback);
    });
};

//? 토큰 DB 등록
const tokenSave = (email, token, refreshToken, callback) => {
    db.query(`UPDATE people SET token = '${token}', refreshtoken = '${refreshToken}' WHERE id = '${email}'`, (err, result) => {
        console.log(result);
        callback(token);
    });
};

//? 로그인 검증
app.post('/login', (req, res) => {
    const email = req.body.email;
    const pw = crypto.createHash('sha512').update(req.body.password).digest('base64');

    db.query('SELECT id, pw FROM people', (err, result) => {
        const emailData = result.map((item) => item.id);
        const pwData = result.map((item) => item.pw);

        for (let i = 0; i < emailData.length; i++) {
            if (emailData[i].includes(email) && pwData[i].includes(pw)) {
                tokenCreate(email, (result) => {
                    res.send(result);
                });
                return;
            }
        }
        res.send(false);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
