const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const addbookSchema = new mongoose.Schema({
    bookname:{
        type:String,
        require:true
    },
    authername:{
        type:String,
        require:true
    },
    category:{
        type:String,
        require:true
    
    },
    image:{
        type:String,
      
    },
 
     price:{
        type:Number,
        require:true

    }


})





module.exports = mongoose.model("Addbook",addbookSchema);
