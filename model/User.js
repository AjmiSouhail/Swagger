const mongoose = require('mongoose');
const User= mongoose.model("User",{
    name  : { type : String,required : true},
    prenom  : {type : String,required : true},
    age  : { type : Number, required : true },
})
module.exports = User;