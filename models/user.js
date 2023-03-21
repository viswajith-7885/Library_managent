const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const userSchema =new mongoose.Schema({
name: {
    type: String

},
email: {
    type: String
},

password: {
    type:String,
    min: 4
}
})
userSchema.pre('save', function(next) {
    const user = this;
    if (!user.isModified('password')) {
      return next();
    }
  
    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        return next(err);
      }
  
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          return next(err);
        }
  
        user.password = hash;
        next();
      });
    });
  });
  
  
  

module.exports =mongoose.model("User",userSchema);