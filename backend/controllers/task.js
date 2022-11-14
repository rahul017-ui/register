const { todotask, validate } = require("../model/task");
const _ = require('lodash');
const { raw } = require("body-parser");
// Get All tasks
const gettasks = async (req, res) => {

  try {
    const task = await todotask.find();
    res.json(task);
  } catch (error) {
    res.json({ message: error });
  }
};

// Single task
const gettask = async (req, res) => {
  try {
    const user = await todotask.findById(req.params.taskId);
    res.json(user);
  } catch (error) {
    res.json({ message: error });
  }
};


const createtask = async (req, res) => {
  try {
    const { error } = validate(req.body);
    // const {_id: id} = req.user;
  
    // console.log('userinfor', id)
    if (error) return res.status(400).send(error.details[0].message);

    user = new todotask(_.pick(req.body, ['pincode', 'task']));
  

    await user.save();
    res.json(user)

  } catch (error) {
    res.json({ message: error })

  }
};

// Update task
const updatetask = async (req, res) => {
  try {
    const task = {
      pincode: req.body.pincode,
      task: req.body.task,
    };

    const updatedtask = await todotask.findByIdAndUpdate(
      { _id: req.params.taskId },
      task
    );
    res.json(updatedtask);
  } catch (error) {
    res.json({ message: error });
  }
};

module.exports = {
  updatetask,
  createtask,
  gettask,
  gettasks
};
