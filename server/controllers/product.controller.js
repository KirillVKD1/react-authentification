const Product = require("../models/product.model");

exports.product_get = (req, res) => {
    Product.find(function (err, arr) {
        console.log('err', err)
        res.json(arr)
    });
};


exports.create_update = (req, res) => {
    const data = {
        id: req.body.id,
        input: req.body.input,
        checked: req.body.checked,
    };
    Product.findOne({ _id: req.body.id }, (err, post) => {
        if (post) {
            Product.findByIdAndUpdate(req.body.id, data, { upsert: false }).then(
                updated => {
                    res.json(updated);
                }
            );
        } else {
            Product.create(data).then(created => {
                res.json(created);
            });
        }
    });
};

exports.delete_one = (req, res) => {

    Product.findByIdAndDelete(req.params.id).then(post => {
        res.json({ message: "Your post was deleted!" });
    });
};

exports.check_all = (req, res) => {
    Product.updateMany({ checked: !req.body.checked }, { $set: { checked: req.body.checked } }, { multi: true }, (err, result) => {

        if (err) {
            res.status(500).send(err);
        }

        res.send(result)
    });
};

exports.delete_all = (req, res) => {

    Product.deleteMany({ checked: true }, { multi: true }, (err, result) => {

        if (err) {
            res.status(500).send(err);
        }

        res.send(result)
    });
};



