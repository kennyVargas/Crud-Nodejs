const {Router} = require('express')
const {renderNoteForm,
	createNewNote,
	renderNotes,
	renderEditForm,
	updateNote,
	deleteNote
} = require('../controllers/notes.controller')

const {isAuthenticated} = require('../helpers/auth')
//isAuthenticad = veridica si estas login
const router = Router()


router.get('/notes/add_notes',isAuthenticated,renderNoteForm)

router.post('/notes/new_notes',isAuthenticated,createNewNote)

router.get('/notes',isAuthenticated,renderNotes)


router.get('/notes/edit/:id',isAuthenticated,renderEditForm)

router.put('/notes/edit/:id',isAuthenticated,updateNote)

router.delete('/notes/delete/:id',isAuthenticated,deleteNote)

module.exports=router