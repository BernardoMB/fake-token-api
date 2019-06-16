const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv-flow').config({
  node_env: process.env.NODE_ENV || 'development'
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.get('/ping', (req, res, next) => {
  console.log('Get /ping ');
  res.status(200).json('pong!');
});

app.post('/register', (req, res, next) => {
  console.log('POST /register ');
  if (req.body.email === 'test@test.com') {
    res.status(201).json({
      status: 'success',
      token: '1234567'
    });
  } else {
    res.status(400).json({
      status: 'error'
    });
  }
});

app.post('/login', (req, res, next) => {
  console.log('POST /login ');
  if (req.body.email === 'test@test.com') {
    res.status(200).json({
      status: 'success',
      token: '1234567'
    });
  } else {
    res.status(400).json({
      status: 'error'
    });
  }
});

app.post('/login-with-token', (req, res, next) => {
  console.log('POST /login-with-token ');
  const token = req.body.token;
  const isValidToken = true;
  
  const seconds = 5;
  for (let i = 1; i <= seconds; i++) {
    setTimeout(() => {
      console.log(i);
    }, i * 1000);
  }
  setTimeout(() => {
    if (isValidToken) {
      res.status(200).json({
        email: 'test@test.com',
        token: '1234567'
      });
    } else {
      res.status(401).json({
        status: 'error'
      });
    }
  }, seconds * 1000);
});

app.get('/status', (req, res, next) => {
  console.log('GET /status ');
  if (!(req.headers && req.headers.authorization)) {
    return res.status(400).json({
      status: 'error'
    });
  }
  // simulate token decoding
  const header = req.headers.authorization.split(' ');
  const token = header[ 1 ];
  if (token === '1234567') {
    res.status(200).json({
      status: 'success',
    });
  } else {
    res.status(401).json({
      status: 'error'
    });
  }
});

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    status: 'error',
    error: err
  });
});

app.listen(1337, () => {
  console.log('App listening on port 1337!');
});
