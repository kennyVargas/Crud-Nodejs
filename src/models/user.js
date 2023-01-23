const {Schema,model}= require('mongoose')
const bcrypt =  require('bcryptjs')

const UserShema = new Schema({
	name:{type:String,required:true},
	email:{type:String,required:true,unique:true},
	password:{type:String,required:true}
},{timestamps:true})

UserShema.methods.encryPassword= async password=>{
	const salt =  await bcrypt.genSalt(10)
	return await bcrypt.hash(password,salt)
}

UserShema.methods.matchPassword = async function(password){
	return await bcrypt.compare(password,this.password)
}

module.exports = model('user',UserShema)