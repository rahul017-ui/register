const mongoose = require("mongoose");
const Joi = require('joi');


const taskSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  pincode: {
    type: Number,
    required: true
  },
  task: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});


const todotask = mongoose.model('todotask', taskSchema);


function validatetask(task) {
  const schema = {

    user_id: Joi.string().required(),
    pincode: Joi.number().min(5).required(),
    task: Joi.string().min(5).max(255).required(),
  };

  return Joi.validate(task, schema);
}


exports.todotask = todotask;
exports.validate = validatetask;
