require('dotenv').config();
const db = require('./database/db');
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

//? CONST
const port = 3001;
const app = express();

//? Parser MiddleWare
app.use(express.json());
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
const verifyToken = ({ token }) => {
    const data = jwt.decode(token, process.env.SECRET_KEY, { algorithm: 'HS256' });

    if (!data) {
        console.log('No Verify!' + new Date().toLocaleTimeString());
        return false;
    } else {
        console.log('Verify!' + new Date().toLocaleTimeString());
        return token;
    }
};

app.post('/verify', (req, res) => {
    if (verifyToken(req.body.token)) {
        return res.json({
            error: 0,
        });
    } else {
        return res.json({
            error: 1,
        });
    }
});

//! 로그인 처리
app.post('/login', (req, res) => {
    //? 일반 유저 정보
    const request = req.body;
    const email = request?.email;
    const name = request?.name;
    const expire = request?.exp;

    //? 어드민 유저 정보
    const key = request?.key;
    if (Object.values(request).length === 0) {
        return res.status(400).send('BAD REQUEST');
    }
    //? KEY값이 존재하는 어드민의 경우
    if (key) {
        const password = request?.password;
        const info = {
            adminId: email,
            adminPw: crypto.createHash('sha256').update(password).digest('base64'),
            adminKey: key,
        };
        db.query(`SELECT adminId, adminPw, adminKey FROM admin`, (err, data) => {
            if (err) return;
            if (data.length === 0) return;

            if (JSON.stringify(info) !== JSON.stringify(data[0])) {
                return null;
            }

            const exp = Date.now() + 60 * 1000;

            const token = createToken(email, exp);
            res.json({
                token,
                token_type: 'Bearer',
            });
        });
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
