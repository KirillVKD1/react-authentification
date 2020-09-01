const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {debugger
   //console.log(`!!!!!!!!!!!!!!!${req.headers.authorization}`)

  if (req.method === 'OPTIONS') {
    return next();
  }

  try {debugger
    const token = req.headers.authorization; // Bearer TOKEN   
    //console.log(`@@@@@@@@@@@@${token}`)

    if (!token) {
      console.log("ne", token);
      return res.status(401).json({ message: 'not authorized!' });

    }
    //console.log(token);
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded;

    next();

  } catch (e) {
    res.status(401).json({ message: 'not authorized!!!' });

  }
};
