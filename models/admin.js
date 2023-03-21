const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const adminSchema =new mongoose.Schema({

email: {
    type: String
},

password: {
    type:String,
    min: 4
}
})
adminSchema.pre('save', function(next) {
    const admin = this;
    if (!admin.isModified('password')) {
      return next();
    }
  
    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        return next(err);
      }
  
      bcrypt.hash(admin.password, salt, function(err, hash) {
        if (err) {
          return next(err);
        }
  
        admin.password = hash;
        next();
      });
    });
  });
  
  
  var Admin = mongoose.model("admin",adminSchema);

module.exports = {Admin}