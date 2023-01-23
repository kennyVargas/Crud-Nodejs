require('dotenv').config()
const app = require('./server')
app.listen(4000,()=>
	{console.log('run server port 4000')})