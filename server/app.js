const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Import Model
const Post = require("./models/product.model");

// Connect to MongoDB
mongoose.connect(
  "mongodb://localhost:27017/tasksdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

// Enable CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  //to allow cross domain requests to send cookie information.
  res.header('Access-Control-Allow-Credentials', true);

  // origin can not be '*' when crendentials are enabled. so need to set it to the request origin
  res.header('Access-Control-Allow-Origin', req.headers.origin);

  // list of methods that are supported by the server
  res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE');

  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, X-XSRF-TOKEN');

  next();
});

// Get all of our posts
app.get("/api/posts/", (req, res) => {
  Post.find(function (err, arr) {
    console.log('err', err)
    res.json(arr)
  });
  // .then(posts => {
  // res.json(posts);
  // });
});


// Get One of Our posts
app.get("/api/posts/:id", (req, res) => {
  Post.findOne({ _id: req.params.id }).then(post => {
    res.json(post);
  });
});


// Create and Update post
app.post("/api/posts", (req, res) => {
  const data = {
    id: req.body.id,
    input: req.body.input,
    checked: req.body.checked,
  };
  Post.findOne({ _id: req.body.id }, (err, post) => {
    if (post) {
      Post.findByIdAndUpdate(req.body.id, data, { upsert: false }).then(
        updated => {
          res.json(updated);
        }
      );
    } else {
      Post.create(data).then(created => {
        res.json(created);
      });
    }
  });
});

// Delete selected post
app.post("/api/posts/:id", (req, res) => {

  Post.findByIdAndDelete(req.params.id).then(post => {
    res.json({ message: "Your post was deleted!" });
  });
});

app.put("/api/posts", (req, res) => {
  debugger
  Post.updateMany({ checked: !req.body.checked }, { $set: { checked: req.body.checked } }, { multi: true }, (err, result) => {

    if (err) {
      res.status(500).send(err);
    }

    res.send(result)
  });
});

app.put("/api/posts/delete", (req, res) => {

  Post.deleteMany({ checked: true }, { multi: true }, (err, result) => {

    if (err) {
      res.status(500).send(err);
    }

    res.send(result)
  });
});






app.listen(3001, () => console.log("Server is running on port 3001"));