var express =require('express')
var app=express()
var session=require('express-session')

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 },
                 resave:false,
                 resaveUninitialized:false})


	)
app.use(function(req, res, next) {
   var sess = req.session
   if (sess.views) {
        sess.views++
   } else {
       sess.views = 1
   }
   next()
})
app.get('/',function(req,res){
res.send('<h1>Counter'+req.session.views+'</h1>')

})

app.listen(8000)
console.log('web browser is running')
