var path = require('path');
var express = require('express')
var bodyParser = require('body-parser');

var app = express();
app.listen(3000); // 监听端口3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// get: /
app.get('/', function (req, res) {
    return res.send('hello world');
});
// get: /index
app.get('/index', function (req, res) {
    return res.sendFile(path.join(__dirname, 'index.html'));
});
// get: /login
app.get('/login', function (req, res) {
    return res.sendFile(path.join(__dirname, 'login.html'));
});
// post: /login
app.post('/login', function (req, res) {
    if (req.body.userName === 'admin' && req.body.password === '123')
        return res.send('ok');
    else
        return res.send('no');
});