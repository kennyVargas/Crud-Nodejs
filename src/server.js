const express = require('express')
const path = require('path')
require('./database')
const flash = require('connect-flash') 
const session = require('express-session')
const methodOverride = require('method-override')
const passport = require('passport')

require('./config/passport')
//init
const app = express()
//setting
app.set('view engine','ejs')
app.set('port',process.env.PORT || 4000)
app.set('views',path.join(__dirname,'views'))
app.use(express.urlencoded({extended:false}))
//middlewares
app.use(methodOverride('_method'))//permite manejar Method=PUT DELETE ALL
app.use(session({
	secret: 'keyboard dog',
	resave: true,
	saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

//global variables
app.use((req,res,next)=>{
	res.locals.success_msg = req.flash('success_msg')
	res.locals.error_msg = req.flash('error_msg')
	res.locals.error = req.flash('error')
	res.locals.oneuser = req.user || null
	next()
})
//routes
app.use(require('./routes/routes'))
app.use(require('./routes/notes.router'))
app.use(require('./routes/users.routes'))
app.use(require('./routes/foundError.router'))
//static files
app.use(express.static(path.join(__dirname,'public')))

module.exports = app