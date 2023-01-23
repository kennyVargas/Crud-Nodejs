const User = require('../models/user')
const passport = require('passport')

//renderizar formulario
const renderSignUpForm = (req,res)=>{
	res.render('users/signup')
}
//registrar los datos del formulario
const signup = async (req,res)=>{
	let errors =[]
	const {name,email,password,confirm_password} = req.body
	if(password!=confirm_password)
		errors.push({text:'password do not match'})
	if(password.length<4)
		errors.push({text:'password must be at least 4 character'})
	if(errors.length>0)
		res.render('users/signup',{errors,user:{name,email}})
	else{
		try{
			const emailUser =  await User.findOne({email:email})
			if(emailUser){
				req.flash('error_msg','the email is already in use')
				res.redirect('/signup')
			}
			else{
				const newUser =  new User({name,email,password})
				newUser.password =await newUser.encryPassword(password)
				await newUser.save()
				req.flash('error_msg','register successful')
				res.redirect('/signin')
			}
		}
		catch(err){
			es.redirect('/signup')
		}
		
	}
}
//entrar al server
const renderSignInForm = (req,res)=>{
	res.render('users/signin')
}
const signin = passport.authenticate('local',{
	failureRedirect:'/signin',
	successRedirect:'/notes',
	failureFlash:true
})

const logout = (req,res,next)=>{
	
	req.logout((err)=>{
		if(err){return next(err)}
		req.flash('error_msg','closed session')
		res.redirect('/signin')
	})
}
module.exports={
	renderSignUpForm,
	signup,
	renderSignInForm,
	signin,
	logout
}