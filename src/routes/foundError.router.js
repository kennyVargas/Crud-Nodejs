
const PageNotFound =(req,res,next)=>{
	res.status(404).render('404found')
}
module.exports = PageNotFound