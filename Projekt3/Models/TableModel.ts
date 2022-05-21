
    import mongoose from 'mongoose'
    const TableSchema = new mongoose.Schema({
      name:{
        type:String,
        required:true,
        unique:true
      },
      numberOfPeople:{
        type:Number,
        required:true
      },
      status:{
        type:String,
        enum:['wolny','zajety','niedostepny'],
        default:'wolny'
      },
    });
    
    module.exports = mongoose.model('Table',TableSchema);