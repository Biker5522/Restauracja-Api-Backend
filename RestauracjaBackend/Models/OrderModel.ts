import mongoose from 'mongoose'
const OrderSchema = new mongoose.Schema({
  table:{
    type: mongoose.Schema.Types.ObjectId, ref:'Table',
    required:true
  },
  employee:{
    type: mongoose.Schema.Types.ObjectId, ref:'Employee',
    required:true
  },
  status:{
    type:String,
    enum:['submitted','processed','completed','bill'],
    default:'submitted'
  },
  price:{
    type:Number,
    default:0
  },
  positions:[{
        type: mongoose.Schema.Types.ObjectId, ref:'Dish',
  }],
  date:{
    type:Date,
    default:Date.now()
  }
  });

module.exports = mongoose.model('Order',OrderSchema);