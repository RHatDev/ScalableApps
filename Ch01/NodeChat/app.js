var express = require('express');
var app = express();
var routes = require('./routes');
var errorHandlers = require('./middleware/errorhandlers');
var log = require('./middleware/log');

app.use(log.logger);
app.use(express.static(__dirname + '/static'));


app.get('/',routes.index);
app.get('/login',routes.login);
app.post('/login',routes.loginProcess);
app.get('/chat',routes.chat);

app.use(errorHandlers.notFound);

app.listen(3000);
console.log("App Server is running on port 3000");
