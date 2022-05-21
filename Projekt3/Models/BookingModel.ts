import { table } from 'console';
import mongoose from 'mongoose'
const BookingSchema = new mongoose.Schema({
  table:{
    type: mongoose.Schema.Types.ObjectId, ref:'Table',
    required:true
  },
  start:{
    type:Date,
    required:true
  },
  end:{
    type:Date,
    required:true
  },
  client:{
    type:{
        name:{type:String},
        surname:{type:String}
    } 
    },
  });

module.exports = mongoose.model('Booking',BookingSchema);