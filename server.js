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
//call cookie
app.post('/ck_set', function(req, res) {
res.cookie('a', 10)
res.cookie('foo','bar')
res.send('ok')
})

//session by counter
app.use(function(req, res, next) {
   var sess = req.session

   if (sess.views) {

        sess.views++

   } else{
       sess.views = 1
     }
 next()
})
//call session
app.post('/co',function(req,res){
	var count = req.session.views;
res.render('pages/showSession',{
	count:count,
});
});

// set the view engine to ejs
app.set('view engine', 'ejs');

// set init path at views
app.set('views', __dirname + '/views');

app.get('/', function(req, res){
	var a = res.cookie('a', 10)

  req.session.views=0;
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

app.get('/endses',function(req,res){
  req.session.destroy();
  res.send('OK');
     // cannot access session here

});


app.listen(8080);
console.log('8080 is the magic port');
