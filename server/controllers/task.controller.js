const Task = require("../models/task.model");

exports.get_all_tasks = async (req, res) => {
    try {
        const tasks = await Task.find({ owner: req.user.userId });
        res.send(tasks)

    } catch (e) {
        res.status(500).json({ message: "something goes wrong" });

    }
};

exports.create_task = async (req, res) => {

    const task = new Task({
        _id: req.body.id,
        input: req.body.input,
        checked: req.body.checked,
        owner: req.user.userId
    });

    task.save();
    res.send(task)
};

exports.update_task = async (req, res) => {

    await Task.findOneAndUpdate({ _id: req.body.id, owner: req.user.userId }, { $set: { input: req.body.input, checked: req.body.checked } }, { useFindAndModify: false },
        (err, result) => {
            if (err) {
                throw err;
            }
            res.send(result);
            return result;
        });
};

exports.delete_task = async (req, res) => {

    await Task.findOneAndDelete({ _id: req.params.id, owner: req.user.userId });
};

exports.check_all_tasks = async (req, res) => {

    await Task.updateMany({ checked: !req.body.checked, owner: req.user.userId }, { $set: { checked: req.body.checked } }, { multi: true }, (err, result) => {

        if (err) {
            res.status(500).send(err);
        }

        res.send(result)
    });
};
exports.delete_all_tasks = async (req, res) => {

    await Task.deleteMany({ checked: true, owner: req.user.userId }, { multi: true }, (err, result) => {

        if (err) {
            res.status(500).send(err);
        }

        res.send(result)
    });
};



