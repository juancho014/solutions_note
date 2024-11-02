const {Schema,model}=require('mongoose');
const bcrypt= require('bcrypt');
const User= new Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required:true,
        uniqued: true,
    },
    password:{
        type: String,
        required:true
    }
},{timestamps:true})

User.methods.encryptPassword= async(password)=>{
const salt= await bcrypt.genSalt(10)
return await bcrypt.hashSync(password,salt)
}
User.methods.matchPassword=async function(password){
    return await bcrypt.compare(password,this.password)
}


module.exports= model('Users',User)
