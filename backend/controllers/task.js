const { todotask, validate } = require("../model/task");
const _ = require('lodash');


// Single task
const getTask = async (req, res) => {
  try {
    const user = await todotask.findById(req.params.taskId);
    res.json(user);
  } catch (error) {
    res.json({ message: error });
  }
};


const createTask = async (req, res) => {
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


// Update task
const updateTask = async (req, res) => {
  try {
    const {error}=validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    const task = {
      pincode: req.body.pincode,
      task: req.body.task,
    };

    const updatedtask = await todotask.findByIdAndUpdate(
      req.params.taskId,
      task);
    res.json(updatedtask);
  } catch (error) {
    res.json({ message: error });
  }
};

const deleteTask = async (req, res) => {
  try {

    const task = await todotask.findOneAndDelete(req.params.taskId);
    res.json(task);
  } catch (error) {
    res.json({ message: error });
  }
};






const getAllTasks =async(req,res)=>{
  try {
    const {_id: user_id} = req.user;
   // console.log(user_id)

    const alltask=await todotask.find({user_id:user_id});
    res.json(alltask);
  }catch(error){
    res.json({message:"error"})
  }
}


module.exports = {
  updateTask,
  createTask,
  getTask,
  deleteTask,
  getAllTasks
};
