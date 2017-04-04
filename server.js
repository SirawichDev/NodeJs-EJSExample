// load the things we need
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser=require('cookie-parser')
var session=require('express-session')
app.use(bodyParser());
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 },
                 resave:false,
                 resaveUninitialized:false})
	)
app.use(cookieParser('keyboard cat'))
app.post('/ck_get', function(req, res) {
var a = req.cookies.a;
res.render('pages/showCookie',{
	cookie:a,
});
});
app.post('/ck_set', function(req, res) {
res.cookie('a', 10)
res.cookie('foo','bar')
res.send('ok')
})
app.use(function(req, res, next) {
   var sess = req.session
   if (sess.views) {
        sess.views++

   } else {
       sess.views = 1

   }
   next()
})
app.post('/co',function(req,res){
	var count = req.session.views;
res.render('pages/showSession',{
	count:count,
});
});
// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page

app.set('views', __dirname + '/views');
// about page
app.get('/', function(req, res){
  // The form's action is '/' and its method is 'POST',
  // so the `app.post('/', ...` route will receive the
  // result of our form
	var a = res.cookie('a', 10)
	res.cookie('foo','bar')
res.render('pages/home',{
	Status:a,
});
});
app.post('/', function(req, res){
  var num1 = parseInt(req.body.num1)+parseInt(req.body.num2);
	res.render('pages/index', {
    num1: num1,

  });
});
//==========For Cookie==



app.listen(8080);
console.log('8080 is the magic port');
