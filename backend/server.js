const express = require('express');
const cors = require('cors');
const db = require('./database/db');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');

//? CONST
const port = 3001; // React의 포트 번호와 다르게 하기 위해
const app = express();

//? Parser MiddleWare
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.post('/verify', (req, res) => {
    //? 데이터 가공, 비밀번호 암호화
    const name = req.body.name;
    const email = req.body.email;
    const pw = crypto.createHash('sha512').update(req.body.pw).digest('base64');

    //? 기존 데이터 조회, 같은 이름의 회원이 존재하는지
    db.query('SELECT id FROM people', (err, result) => {
        const idData = result.map((item) => item.id);
        if (idData.includes(email)) {
            return res.send(true);
        } else {
            db.query('INSERT INTO people (id, pw, name) VALUES (?, ?, ?)', [email, pw, name], (err, result) => {
                if (err) {
                    console.error('데이터 삽입에러', err);
                } else {
                    console.log('데이터 삽입 성공', result);
                    return res.send(false);
                }
            });
        }
    });
});

app.post('/userName', (req, res) => {
    const name = req.body.name;

    db.query('SELECT name FROM people', (err, result) => {
        const nameData = result.map((item) => item.name);

        if (nameData.includes(name)) {
            return res.send(true);
        } else {
            return res.send(false);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
