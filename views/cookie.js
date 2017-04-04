var express =require('express')
var app=express()
var cookieParser=require('cookie-parser')

app.use(cookieParser('keyboard cat'))

app.get('/ck_get', function(req, res) {
res.send(req.cookies.a)
})
app.get('/ck_set', function(req, res) {
res.cookie('a', 10)
res.cookie('foo','bar')
res.send('ok')
})

app.listen(8000)
console.log('web browser is running')
