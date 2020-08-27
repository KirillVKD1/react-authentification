const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); 

const app = express();
const product = require('./routes/product.route')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Connect to MongoDB
mongoose.connect(
  "mongodb://localhost:27017/tasksdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

// Enable CORS
app.use((req, res, next) => {
   
  //to allow cross domain requests to send cookie information.
  res.header('Access-Control-Allow-Credentials', true);

  // origin can not be '*' when crendentials are enabled. so need to set it to the request origin
  res.header('Access-Control-Allow-Origin', req.headers.origin);

  // list of methods that are supported by the server
  res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE');

  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, X-XSRF-TOKEN');

  next();
});


app.use(product);

app.listen(3001, () => console.log("Server is running on port 3001"));
