const User = require("../models/user.model");


exports.create_user = (req, res) => {
    
    User.deleteMany({email:1,password:1}, { multi: true });
    //User.create(data); 
  

};
