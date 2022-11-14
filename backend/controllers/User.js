const { todotask } = require("../model/task");
const _ = require('lodash');
const bcrypt = require('bcrypt');
const { User, validate } = require('../model/user');
const Joi = require('joi');
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const config = require('config');

dotenv.config();

const getusers = async (req, res) => {

  try {
    let users = await User.find().lean();
    let ids = users.map((obj) => {

      return obj._id


    });


    let tasks = await todotask.find({ user_id: { $in: ids } });

    users.forEach((obj) => {

      let task = tasks.find((el) => {
        return el.user_id.equals(obj._id)
      });

      if (task) {
        obj.tasks = task;
      }

    });


    res.json(users);

  } catch (error) {
    res.json({ message: error });
  }
};


const getstatus = async (req, res) => {

  try {
    let userstatus = await User.findById(req.params.userId);
    if (userstatus) return res.status(200).send('User is Active');

  } catch (error) {
    res.json({ message: "User is Not Active" });
  }
};

const getuser = async (req, res) => {

  const user = await User.findById(req.params.id).select('-password');
  const task = await todotask.findOne({ user_id: req.params.id });
  const userData = { "user": user, "task": task };
  res.json(userData);
};


const getusertask = async (req, res) => {

  try {

    const task = await todotask.findOne({ user_id: req.params.id });
    res.json(task);

  } catch (error) {
    res.json({ message: "error" });
  }


};

const createuser = async (req, res) => {
  try{
    const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already register');

  user = new User(_.pick(req.body, ['name', 'email', 'contact', 'username', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt)
  await user.save();
  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));

}catch (error) {
  res.json({ message: error });
}
  }

//login user  

const login = async (req, res) => {
try{
  const { error } = validatelogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('invalid email');

  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword) return res.status(400).send('invalid password');


    const token = jwt.sign({_id:user._id, email: user.email},config.get('jwtPrivateKey'));
    // const token =await  user.generateAuthToken();
    res.json({message:"user logined successfully" ,token:token});
  // const token = user.generateAuthToken();
  //  res.header('x-auth-token',token).send(_.pick(user, ['_id', 'name', 'email']))

}catch (error) {
  console.log(error)
  res.json({ message: "error" });
}
};

function validatelogin(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  };

  return Joi.validate(req, schema);
}


// Update user
const userupdate = async (req, res) => {
  try {
    const user = {
      name: req.body.name,
      email: req.body.email,
      contact: req.body.contact,
      username: req.body.username,
      password: req.body.password,
    };

    const updateduser = await User.findByIdAndUpdate(
      { _id: req.params.userId },
      user
    );
    if (!updateduser) return res.status(404).send('The user with the given ID was not found.');

    res.send(user);
  } catch (error) {
    res.json({ message: error });
  }
};

// Delete user and Task
const deleteuser = async (req, res) => {
  try {
    const removeuser = await User.findByIdAndDelete(req.params.userId);
    const task = await todotask.findOneAndDelete({ user_id: req.params.userId });
    const userDelete = { "user": removeuser, "task": task };

    if (!removeuser) return res.status(404).send('The user with the given ID was not found.');


    res.json(userDelete);
  } catch (error) {
    res.json({ message: error });
  }
};

module.exports = {
  getuser,
  createuser,
  login,
  userupdate,
  deleteuser,
  getusertask,
  getusers,
  getstatus
}