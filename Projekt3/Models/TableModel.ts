
    import mongoose from 'mongoose'
    const TableSchema = new mongoose.Schema({
      name:{
        type:String,
        required:true,
        unique:true,
        min:6,
        max:10,
      },
      numberOfPeople:{
        type:Number,
        required:true
      },
      status:{
        type:String,
        enum:['free','occupied','unavailable'],
        default:'free'
      },
    });
    
    module.exports = mongoose.model('Table',TableSchema);