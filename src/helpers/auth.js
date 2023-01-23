//existe lognin guardado => 
//milderwerls
const isAuthenticated = (req,res,next)=>{
	if(req.isAuthenticated()){
		return next()
	}
	req.flash('error_msg','not Autorizad')
	res.redirect('/signin')
}

module.exports = {isAuthenticated}
