var express = require('express');
var app = express();
var routes = require('./routes');
var errorHandlers = require('./middleware/errorhandlers');
var log = require('./middleware/log');
var partials = require('express-partials');
var cookieParser = require('cookie-parser');
var redis = require('redis');

//variable declarations
var bodyParser = require('body-parser');
var csrf = require('csurf');
var util = require('./middleware/utilities');


var session = require('express-session');
var RedisStore = require('connect-redis')(session);

const redisClient = redis.createClient({
    host: 'redis',
    port: 6379,
    no_ready_check: true,
    auth_pass: process.env.REDIS_PASSWORD
});

redisClient.on('error', function (err) {
    console.log('Could not establish a connection with redis. ' + err);
});

redisClient.on('connect', function (err) {
    console.log('Connected to redis successfully');
});


app.set('view engine', 'ejs');
app.set('view options', {defaultLayout: 'layout'});




app.use(partials());
app.use(log.logger);
app.use(express.static(__dirname + '/static'));
app.use(cookieParser());


app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true,
  store: new RedisStore({ client: redisClient })
  }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(csrf());
app.use(util.csrf);
app.use(util.authenticated);

app.get('/',routes.index);
app.get('/login',routes.login);
app.post('/login',routes.loginProcess);
app.get('/chat', [util.requireAuthentication], routes.chat);


app.get('/error', function(req, res, next){
  next(new Error('A contrived error'));
});

app.use(errorHandlers.error);
app.use(errorHandlers.notFound);

app.listen(3000);
console.log("App Server is running on port 3000");
