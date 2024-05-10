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
    db.query(`INSERT INTO people (email, username, exp) VALUES ('${email}', '${name}', '${expire}')`, (err, data) => {
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

//! 데이터 요청
app.post('/task', ({ body }, res) => {
    const token = body.token;
    const data = jwt.decode(token, process.env.SECRET_KEY, { algorithm: 'HS256' });
    if (!data) return;

    setTimeout(() => {
        db.query(`SELECT descID, title, description, type, isDone FROM CONTENT WHERE name='${data.user}'`, (err, data) => {
            if (err) return res.sendStatus(400);
            if (data.length === 0) return res.sendStatus(204);
            console.log('데이터 불러오기 성공');
            res.send(data);
        });
    }, 1000);
});

const createTask = (user, email) => {
    db.query(
        `INSERT INTO CONTENT 
        (descID, title, description, type, isDone, name) 
        VALUES
         ('${user.descID}', '${user.title}', '${user.description}',
          '${user.type}', '${Number(user.isDone)}', '${email}')`,
        (err, data) => {
            if (err) return console.log(err);
            if (data.length === 0) return;
            console.log(`CREATE : ${email} Account`);
        }
    );
};
const deleteTask = (user, email) => {
    db.query(
        `DELETE FROM CONTENT 
        WHERE descID = '${user.descID}' AND name = '${email}'`,
        (err, data) => {
            if (err) return console.log(err);
            if (data.length === 0) return;
            console.log(`DELETE : ${email} Account`);
        }
    );
};
const editTask = (user, email) => {
    db.query(
        `UPDATE CONTENT 
        SET title = '${user.title}', description = '${user.description}', type = '${user.type}' 
        WHERE descID = '${user.descID}' AND name = '${email}'`,
        (err, data) => {
            if (err) return console.log(err);
            if (data.length === 0) return;
            console.log(`EDIT : ${email} Account`);
        }
    );
};
const checkTask = (user, email) => {
    db.query(
        `UPDATE CONTENT 
        SET isDone = '${Number(user.isDone)}' 
        WHERE descID = '${user.descID}' AND name = '${email}'`,
        (err, data) => {
            if (err) return console.log(err);
            if (data.length === 0) return;
            console.log(`CHECK : ${email} Account`);
        }
    );
};

//! 데이터 전송
app.post('/update', ({ body }, res) => {
    const TOKEN = jwt.decode(body.token.token, process.env.SECRET_KEY, { algorithm: 'HS256' });
    const USER = body.task;
    const TYPE = body.task.POST;
    if (!TOKEN) res.send(400);

    switch (TYPE) {
        case 'CREATE':
            createTask(USER, TOKEN.user);
            return res.sendStatus(200);
        case 'UPDATE':
            editTask(USER, TOKEN.user);
            return res.sendStatus(200);
        case 'CHECK':
            checkTask(USER, TOKEN.user);
            return res.sendStatus(200);
        case 'DELETE':
            deleteTask(USER, TOKEN.user);
            return res.sendStatus(200);
        default:
            return res.sendStatus(500);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
