import mongoose from 'mongoose'

const EmployeeSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  surname:{
    type:String,
    required:true
  },
  position:{
    type:String,
    required:false
  },
});

module.exports = mongoose.model('Employee',EmployeeSchema);


