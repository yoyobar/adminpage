require('dotenv').config();
const db = require('./database/db');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

//? CONST
const port = 3001;
const app = express();

//? Parser MiddleWare
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        credentials: true,
    })
);

//! 토큰 생성
const createToken = (user, exp) => {
    const payload = {
        user,
        exp,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, { algorithm: 'HS256' });
    return token;
};

//! 토큰 검증
const verifyToken = (token) => {
    const data = jwt.decode(token, process.env.SECRET_KEY, { algorithm: 'HS256' });
    const expires = data?.exp;

    if (Date.now() <= expires) return false;

    return token;
};

//! 로그인 처리
app.post('/login', (req, res) => {
    const request = req.body;
    const email = request?.email;
    const name = request?.name;
    const expire = request?.exp;
    if (Object.values(request).length === 0) {
        return res.status(400).send('BAD REQUEST');
    }

    //? 아이디가 있을 경우
    db.query(`SELECT email, username FROM people WHERE email = '${email}'`, (err, data) => {
        if (err) return;
        if (data.length === 0) return;
        console.log('DB ID UPDATE');

        const token = createToken(email, expire);
        res.json({
            token,
            token_type: 'Bearer',
        });
    });

    //? 아이디가 없을 경우
    db.query(`INSERT INTO people (email, username, exp) VALUES ('${email}', '${name}', '${expire}') `, (err, data) => {
        if (err) return;
        if (data.length === 0) return;
        console.log('DB ID CREATE');

        const token = createToken(email, expire);
        res.json({
            token,
            token_type: 'Bearer',
        });
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
