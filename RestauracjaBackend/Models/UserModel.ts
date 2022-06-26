import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
    min:3
  },
  email:{
    type:String,
    required:true,
    min:5,
    
  },
  password:{
    type:String,
    required:true,
    min:5,
   
  },
  date:{
    type:Date,
    default:Date.now
  },
});

module.exports = mongoose.model('User',UserSchema);