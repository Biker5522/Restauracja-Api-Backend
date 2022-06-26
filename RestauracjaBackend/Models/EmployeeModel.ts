import mongoose from 'mongoose'

const EmployeeSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
    min:3,
    max:15,
  },
  surname:{
    type:String,
    required:true,
    min:3,
    max:15,
  },
  position:{
    type:String,
    required:false,
    min:3,
    max:10,
  },
});

module.exports = mongoose.model('Employee',EmployeeSchema);


