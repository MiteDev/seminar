const path = require('path');
const express = require('express');
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('./config/sessionConn');

const indexRouter = require('./router/index');
const loginRouter = require('./router/auth');
const userRouter = require('./router/user');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');

app.use(session);

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/auth', loginRouter);
app.use('/users', userRouter);

// app.post('/auth/login', passport.authenticate(
//     'local',
//     {
//         successRedirect: '/welcome',
//         failureRedirect: '/auth/login',
//         failureFlash: false
//     }
// ))

module.exports = app;