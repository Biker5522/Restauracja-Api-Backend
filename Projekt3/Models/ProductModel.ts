import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
    min:3,
    max:25,
  },
  price:{
    type:String,
    required:true
  },
  quantity:{
    type:Number,
    required:true
  },
  unitOfMeasure:{
    type:String,
    enum:['kg','g','ml','-'],
    default:'-'
  },
});

module.exports = mongoose.model('Product',ProductSchema);