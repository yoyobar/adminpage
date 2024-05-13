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
const createToken = (user, exp, ROLE) => {
    const payload = {
        user,
        exp,
        ROLE,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, { algorithm: 'HS256' });
    return token;
};

//! 토큰 검증
const verifyToken = ({ token }) => {
    const data = jwt.decode(token, process.env.SECRET_KEY, { algorithm: 'HS256' });
    if (!data) {
        console.log('No Verify!' + new Date().toLocaleTimeString());
        return 'FALSE';
    }
    if (data.ROLE === 2) {
        console.log('Verify-AdminAccount! ' + new Date().toLocaleTimeString());
        return 'ADMIN';
    }
    console.log('Verify!' + new Date().toLocaleTimeString());
    return 'USER';
};

app.post('/verify', (req, res) => {
    const token = verifyToken(req.body.token);
    switch (token) {
        case 'FALSE':
            return res.json({
                verify: 'FALSE',
            });
        case 'USER':
            return res.json({
                verify: 'USER',
            });
        case 'ADMIN':
            return res.json({
                verify: 'ADMIN',
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
    if (Object.values(request).length === 0) {
        return res.status(400).send('BAD REQUEST');
    }
    const key = request?.key;
    //? KEY값이 존재하는 어드민의 경우
    if (key) {
        const password = request?.password;
        const info = {
            adminId: email,
            adminPw: crypto.createHash('sha256').update(password).digest('base64'),
            adminKey: key,
            ROLE: 2,
        };
        db.query(`SELECT adminId, adminPw, adminKey, ROLE FROM admin`, (err, data) => {
            if (err) return;
            if (data.length === 0) return;
            if (JSON.stringify(info) !== JSON.stringify(data[0])) {
                return null;
            }
            const exp = Date.now() + 60 * 1000;
            const ROLE = data[0].ROLE;

            const token = createToken(email, exp, ROLE);
            res.json({
                token,
                token_type: 'Bearer',
            });
        });
    }

    //? 아이디가 있을 경우
    db.query(`SELECT email, username, ROLE FROM people WHERE email = '${email}'`, (err, data) => {
        if (err) return;
        if (data.length === 0) return;
        console.log('DB ID UPDATE');

        const ROLE = data[0].ROLE;
        const token = createToken(email, expire, ROLE);
        res.json({
            token,
            token_type: 'Bearer',
        });
    });

    //? 아이디가 없을 경우
    db.query(`INSERT INTO people (email, username, exp, ROLE) VALUES ('${email}', '${name}', '${expire}' '${1}')`, (err, data) => {
        if (err) return;
        if (data.length === 0) return;
        console.log('DB ID CREATE');

        const ROLE = data[0].ROLE;
        const token = createToken(email, expire, ROLE);
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

    if (data.ROLE === 1) {
        setTimeout(() => {
            db.query(`SELECT descID, title, description, type, isDone FROM CONTENT WHERE name='${data.user}'`, (err, data) => {
                if (err) return res.sendStatus(400);
                if (data.length === 0) return res.sendStatus(204);
                console.log('데이터 불러오기 성공');
                res.send(data);
            });
        }, 1000);
    }
    if (data.ROLE === 2) {
        setTimeout(() => {
            db.query(`SELECT descID, title, description, type, isDone, name FROM CONTENT`, (err, data) => {
                if (err) return res.sendStatus(400);
                if (data.length === 0) return res.sendStatus(204);
                console.log('데이터 불러오기 성공');
                res.send(data);
            });
        }, 1000);
    }
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
const adminDeleteTask = (user) => {
    db.query(
        `DELETE FROM CONTENT
        WHERE descID = '${user.descID}' AND name = '${user.NAME}'`,
        (err, data) => {
            if (err) return console.log(err);
            if (data.length === 0) return;
            console.log(`DELETE : ${user.NAME} Account by ADMIN`);
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
        case 'ADMIN_DELETE':
            adminDeleteTask(USER);
            return res.sendStatus(200);
        default:
            return res.sendStatus(500);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
