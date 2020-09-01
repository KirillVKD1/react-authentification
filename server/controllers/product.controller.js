const Product = require("../models/product.model");



exports.product_get = async (req, res) => {
    try {
        console.log(req.user.userId);
        const tasks = await Product.find({ owner: req.user.userId });
        res.json(tasks);
    } catch (e) {
        res.status(500).json({ message: "something goes wrong" });

    }
};

exports.create_update = (req, res) => { 

    Product.findOne({ _id: req.body.id, owner: req.user.userId }, (err, post) => {
        if (post) { 
            console.log(`@@@@@@@@@@@@${post}`) 
            console.log(`@@@@@@@@@@@@${req.body.id}`)
            post.updateOne({ _id: req.body.id, owner: req.user.userId }, { $set: { _id: req.body.id, input: req.body.input, checked: req.body.checked } }, { multi: true });

        } else {

            const task = new Product({
                _id: req.body.id,
                input: req.body.input,
                checked: req.body.checked,
                owner: req.user.userId
            });
            task.save();
        }
    });
};
exports.delete_one = async (req, res) => {

    await Product.findOneAndDelete({ _id: req.params.id, owner: req.user.userId });
};
exports.check_all = async (req, res) => {
    Product.updateMany({ checked: !req.body.checked, owner: req.user.userId }, { $set: { checked: req.body.checked } }, { multi: true }, (err, result) => {

        if (err) {
            res.status(500).send(err);
        }

        res.send(result)
    });
};
exports.delete_all = async (req, res) => {

    Product.deleteMany({ checked: true, owner: req.user.userId }, { multi: true }, (err, result) => {

        if (err) {
            res.status(500).send(err);
        }

        res.send(result)
    });
};



