

    import mongoose from 'mongoose'
    const StolikSchema = new mongoose.Schema({
      name:{
        type:String,
        required:true
      },
      numberOfPeople:{
        type:Number,
      },
      status:{
        type:['wolny','zajety','niedostepny'],
        default:'wolny'
      },
    });
    
    module.exports = mongoose.model('Dish',StolikSchema);