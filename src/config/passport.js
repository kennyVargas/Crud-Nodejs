const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User =require('../models/user')

//passport nos guarda la session del usuario 

//LocalStrategy captura los datos envios por el form de lognin POST (email, password) 
passport.use(new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password'
}, async (email,password,done)=>{
	try{
		const user = await User.findOne({email})
		if(!user){ //existe el usurio no/si
			return done(null,false,{message:'not user found'})
		}
		else
		{
			//compara el password ingresado con el del usuarioBD
			const match = await user.matchPassword(password)
			if(match)
				return done(null,user)
			else{
				return done(null,false,{message:'incorrect password'})
			}
		}
	}
	catch(err){
		return done(null,false,{message:'error server conection'})
	}
}))

//no se que hace CALLBACK???
passport.serializeUser((user,done)=>{
	done(null,user.id)
})

passport.deserializeUser((id,done)=>{
	User.findById(id,(err,user)=>{
		done(err,user)
	})
})

