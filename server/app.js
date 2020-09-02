const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("config");

const PORT = config.get('port') || 3010;


const app = express();
const product = require('./routes/product.route');

app.use(express.json({ extended: true }));//body output

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Connect to MongoDB 
async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
  } catch (e) {
    console.log('server error', e.message);
    process.exit(1);
  }
}
start();

// Enable CORS
app.use((req, res, next) => {
  //to allow cross domain requests to send cookie information.
  res.header('Access-Control-Allow-Credentials', true);
  // origin can not be '*' when crendentials are enabled. so need to set it to the request origin
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  // list of methods that are supported by the server
  res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers" ,"Origin, X-Requested-With, Content-Type, Accept, Authorization"); 
  next();
});


app.use(product);


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
