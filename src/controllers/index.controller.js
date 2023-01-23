const {response} = require('express')

const renderIndex=(req,res)=>{
	res.render('home')
}
const renderAbout=(req,res)=>{
	res.render('about')
}
module.exports = {
	renderIndex,
	renderAbout
}