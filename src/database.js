const mongoose = require('mongoose')
MONGODB_URL='mongodb://localhost/notas-app'
mongoose.set('strictQuery', true);
mongoose.connect(MONGODB_URL)
.then((db)=>{console.log(' database is connected')})
.catch((err)=>{console.log(err)})