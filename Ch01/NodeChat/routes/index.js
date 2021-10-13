module.exports.index = index;
module.exports.login = login;
module.exports.loginProcess = loginProcess;
module.exports.chat = chat;

function index(req,res){
  res.cookie('IndexCookie','This is set from Index');
  res.render('index',{
    title: 'Index', 
    cookie: JSON.stringify(req.cookies), 
    signedCookie: JSON.stringify(req.signedCookies),
    session: JSON.stringify(req.session)});
};

function login(req,res){
  res.render('login', {title: 'Login'});
};

function loginProcess(req,res){
  console.log(req.body);
  res.send(req.body.username + ' ' + req.body.password);
};

function chat(req,res){
  res.render('chat', {title: 'Chat'});
};
