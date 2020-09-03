const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("config"); 
const cors = require('cors');

const PORT = config.get('port') || 3010;

const app = express();
const task = require('./routes/task.route'); 
const user = require('./routes/user.route');

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
app.use(cors())

app.use(task);  
app.use(user);


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
