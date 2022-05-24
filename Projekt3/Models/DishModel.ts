   import mongoose from 'mongoose'

    const DishSchema = new mongoose.Schema({
      name:{
        type:String,
        required:true,
        min:3,
        max:15,
      },
      category:{
        type:String,
        required:true,
        min:3,
        max:15,
      },
      price:{
        type:Number,
        required:true,
        default:0
      },
    });
    
    module.exports = mongoose.model('Dish',DishSchema);