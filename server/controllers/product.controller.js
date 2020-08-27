const Product = require("../models/product.model");

exports.product_create = function (req, res) {
    let product = new Product(
        {
            input: req.body.input,
            checked: req.body.checked
        }
    );

    product.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Product Created successfully')
    });
}; 

exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
}; 

exports.product_update = function (req, res) {
    Product.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
        if (err) return next(err);
        res.send('Product udpated.');
    });
};  

exports.product_delete = function (req, res) {
    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};