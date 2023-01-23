const Note = require('../models/Notas')
const renderNoteForm = (req,res)=>{
	res.render('notes/add_notes')
} 

const createNewNote = async(req,res)=>{
	const {title,description} = req.body
	try{
		const user = req.user.id
		const newNota = new Note({title,description,user})
		await newNota.save()
		req.flash('success_msg','Note create successfully')
		res.redirect('/notes')
	}catch(err){
		res.send('error: '+err)
	}
}

const renderNotes = async(req,res)=>{
	const _id = req.user.id
	const notes =  await Note.find({user:_id})
	res.render('notes/all_Notes',{notes:notes})
}

const renderEditForm = async(req,res)=>{
	try{
		const note = await Note.findById(req.params.id)
		if(note.user!=req.user.id){
			req.flash('error_msg','Not Autorized')
			return res.redirect('/notes')
		}
		res.render('notes/edit_Notes',{note:note})
	}
	catch(err){
		res.redirect('/notes')
	}
	
}

const updateNote = async(req,res)=>{
	
	try{
		const {title,description} = req.body
		await Note.findByIdAndUpdate(req.params.id,{title,description})
		req.flash('success_msg','Note update successfully')
		res.redirect('/notes')
	}
	catch(err){
		//alerta de error 
		res.redirect('/notes')
	}
}

const deleteNote = async(req,res)=>{
	try{
		await Note.findByIdAndDelete(req.params.id)
		req.flash('success_msg','Note delete successfully')
		res.redirect('/notes')
	}
	catch(err){
		res.send('delete note '+err)
	}
}

module.exports = {
	renderNoteForm,
	createNewNote,
	renderNotes,
	renderEditForm,
	updateNote,
	deleteNote
}