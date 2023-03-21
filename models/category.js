// // Define the schema for a category
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const categorySchema = new mongoose.Schema({
//     name:{
//         type:String,
        
//     },
//     description:{
//         type:String,
//     },
//     book: [
//         {
//           type: Schema.Types.ObjectId,
//           ref: 'Addbook'
//         }
//       ]
// })


// const categories= mongoose.model('Category',categorySchema);
// module.exports = {categories}