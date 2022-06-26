import mongoose from 'mongoose'
const BookingSchema = new mongoose.Schema({
  start:{
    type:Date,
    required:true,
    default:Date.now()

  },
  end:{
    type:Date,
    required:true,
    default:Date.now()
  },
  client:{
    type:{
        name:{type:String,min:3},
        surname:{type:String,min:3}
    } 
    },
    table:{
      type: mongoose.Schema.Types.ObjectId, ref:'Table',
      required:true
    },
  });

module.exports = mongoose.model('Booking',BookingSchema);