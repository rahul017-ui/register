const { todotask, validate } = require("../model/task");
const _ = require('lodash');
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
    const {_id: user_id} = req.user;
  
   // console.log('userinfor', user_id)
    if (error) return res.status(400).send(error.details[0].message);

    const  user = new todotask(
      {
        user_id:user_id,
        pincode:req.body.pincode,
        task:req.body.task
      }
    );
   // console.log("user",user)
    await user.save();
    res.json(user);

  } catch (error) {
    console.log("error",error)
    res.json({ message: "error" })

  }
};
// const createtask = async (req, res) => {
//   try {
//     const { error } = validate(req.body);
//     const {_id: user_id} = req.user;
  
//     console.log('userinfor', user_id)
//     if (error) return res.status(400).send(error.details[0].message);

//     user = new todotask(_.pick(user_id,req.body, ['pincode', 'task']));
// console.log("user",user)
//     await user.save();
//     res.json(user);

//   } catch (error) {
//     console.log("error",error)
//     res.json({ message: "error" })

//   }
// };

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

const deletetask = async (req, res) => {
  try {
    const {_id: user_id} = req.user;

    const task = await todotask.findOneAndDelete({ user_id:user_id });
    res.json(task);
  } catch (error) {
    res.json({ message: error });
  }
};

module.exports = {
  updatetask,
  createtask,
  gettask,
  gettasks,
  deletetask
};
