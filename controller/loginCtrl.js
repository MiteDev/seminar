const asd = require('pbkdf2-password');
const hasher = asd();

const loginRoot = (req, res) => {
    res.render('login');
}

const users = [{
    username: 'jiwon',
    password: 'tNaFKAHT6ox6q9WMqxNPnaPBZvDMiANsAjwYrretETo0ZjPiktszG0E0BzX11GWDENJbqaiFamBQmhLDMOKY2uDGs5MjuJE0Xj/xQ11kZei6iWPcPB7mBrMgY8xrh0R5RxxuQAUCiKT81LEX15oAphHJHylmhaGdTc+gKy9SZgM=',
    displayName: 'JiwonMan',
    salt: '0FwZG6t0PX9sLitMUNvCHWNix/G4yJpUT+39bY6MRsUbRjRlfEDxUSNdRiQEyo0N3riD9t7b+zYT6gz5M7TXgw=='
}]

const loginAction =  {
    successRedirect : '/auth/welcome',
    failureRedirect : '/auth/login',
    failureFlash : '/false'
}

const logout = (req, res) => {
    delete req.session.displayName;
    res.redirect('/auth/welcome');
}

const Welcome = (req, res) => {
    if (req.session.displayName) {
        res.send(`<h1>Hello, ${req.session.displayName}<h1><a href = "/auth/logout">logout</a>`);
    } else {
        res.send(`<h1>Welcome</h1><a href = "/auth/login">Login</a><br><a href = "/auth/register">register</a>`);
    }
}

const Register = (req, res) => {
    res.render('register');
}

const RegisterAction = (req, res) => {
    hasher({ password: req.body.password }, (err, pass, salt, hash) => {
        const user = {
            username: req.body.username,
            password: hash,
            salt: salt,
            displayName: req.body.displayName
        };

        users.push(user);
        req.session.displayName = req.body.displayName;
        req.session.save(() => {
            res.redirect('/auth/welcome');
        })
    })
}

const Passport = (username, password, done) => {
    const uname = username;
    const pwd = password;
    for (let i = 0; i < users.length; i++) {
        let user = users[i];
        if (uname === user.username) {
            return hasher({ password: pwd, salt: user.salt }, (err, pass, salt, hash) => {
                if (hash === user.password) {
                    console.log('LoclaStrategy', user);
                    done(null, user);               //로그인 절차가 끝냈는데 성공(user는 객체로 사용)
                    // req.session.displayName = user.displayName;
                    // req.session.save(() => {
                    //     res.redirect('/auth/welcome');
                    // })
                } else {
                    done(null, false, user, { message: 'Incorrect password.' });        //로그인 절차가 끝났는데 실패 null : (err)
                    // res.send('<p>잘못 입력하셨습니다</p><a href="/auth/login">login</a>');
                }
            });
        }
    }
}

const serialize = (user, done) => {
    console.log('serializeUser', user);
    done(null, user.username);
}

const deserialize = (id, done) => {
    console.log('deserialize', id);
    let user;
    for(let i = 0; i < users.length; i++) {
        user = users[i];
        if(user.username === id) {
            return done(null, user)
        }
    }
}

module.exports = {
    loginRoot,
    loginAction,
    logout,
    Welcome,
    Register,
    RegisterAction,
    Passport,
    serialize,
    deserialize
}