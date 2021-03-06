const mongoose = require('mongoose');
const firebase = require('../../firebase');
const Users = mongoose.model('Users');

exports.decodeBasicAuth = (authData) => {
  const header = authData || '';       // get the header
  const token = header.split(/\s+/).pop() || '';           // and the encoded auth token
  const auth = new Buffer.from(token, 'base64').toString();   // convert from base64
  const parts = auth.split(/:/);                         // split on colon
  const username = parts[0];
  const password = parts[1];

  return [username, password];
};

exports.getUserData = async (req, res) => {
  const uid = await firebase.validateToken(req.headers.authorization);

  Users.find({_id: uid}, (err, userData) => {
    err ? res.status(500).send(err) : res.json(userData);
  });
};

exports.setUserData = (req, res) => {
  const new_user = new Users(req.body);
  new_user.save((err, user) => {
    err ? res.status(404).send(err) : res.json(user);
  });
};

exports.updateUserData = async (req, res) => {
  const uid = await firebase.validateToken(req.headers.authorization);

  Users.findOneAndUpdate({_id: uid},
                         req.body,
                         {new: true, upsert: true},
                         (err, task) => {
                           err ? res.status(500).send(err) : res.json(task);
                         });
};

exports.searchUserData = async (req, res) => {
  const uid = await firebase.validateToken(req.headers.authorization);

  Users.find({_id: uid},
             (err, task) => {
               err ? res.status(500).send(err) : res.json(task);
             });
};

exports.delete_a_task = function(req, res) {

  Users.remove({
                 _id: req.params.taskId,
               }, function(err, task) {
    if (err)
      res.send(err);
    res.json({message: 'Users successfully deleted'});
  });
};
