var express  = require('express');
const path = require('path'); 
var app      = express();   
const bodyParser = require('body-parser');
var macAddr = require('node-getmac');
const axios = require('axios');
const helmet = require('helmet');
const multer = require('multer');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cookie = require('cookie');

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))
app.use(cookieParser());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer().array()); 

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function(req, res) {
    // res.send(macAddr)
    res.sendFile(path.join(__dirname, 'build', 'index.html'), function(err) {
        if (err) {
            res.status(500).send(err);          
        }
    });
    res.status(500).end();
});

app.get('/getMac', function(req, res) {
    res.send(macAddr)
    res.status(200).end();
});

app.post('/login', function(req, res) {
    console.log(req.body.firstName)
    // axios.get('https://lap55.com/json/api/sl/leon/home_spotlight')
    // .then(function (response) {
    //   console.log(response);
    //   res.status(200).end();
    // })
    // .catch(function (error) {
    //   console.log(error);
    // }); 
    res.setHeader('Set-Cookie', cookie.serialize('memclid', String(req.body.firstName), {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7 // 1 week 
    }));
});

app.listen(80); 