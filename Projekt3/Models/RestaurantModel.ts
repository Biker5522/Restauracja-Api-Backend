
    import mongoose from 'mongoose'

    const RestaurantSchema = new mongoose.Schema({
      name:{
        type:String,
        required:true
      },
      adres:{
        type:String,
        required:true
      },
      phone:{
        type:Number,
        required:true
      },
      nip:{
        type:Number,
        required:true
      },
      email:{
        type:String,
        required:true
      },
      www:{
        type:String,
        required:true
      },
    });
    
    module.exports = mongoose.model('Restaurant',RestaurantSchema);
