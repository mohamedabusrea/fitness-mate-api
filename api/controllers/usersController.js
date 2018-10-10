const mongoose = require('mongoose'),
    Users = mongoose.model('Users');

exports.decodeBasicAuth = (authData) => {
  const header = authData || '';       // get the header
  const token = header.split(/\s+/).pop() || '';           // and the encoded auth token
  const auth = new Buffer.from(token, 'base64').toString();   // convert from base64
  const parts = auth.split(/:/);                         // split on colon
  const username = parts[0];
  const password = parts[1];

  return [username, password];
};

exports.getUserData = (req, res) => {
  // const basicAuthData = this.decodeBasicAuth(req.headers['authorization']);

  Users.findById(req.params.userId, (err, userData) => {
    err ? res.send(err) : res.json(userData);
  });
};

exports.setUserData = (req, res) => {
  /*console.log(req.params);
   Users.findOneAndUpdate({_id: req.params.userId}, req.body,
   (err, task) => {
   err ? res.send(err) : res.json(task);
   });*/
  const new_user = new Users(req.body);
  new_user.save((err, user) => {
    err ? res.send(err) : res.json(user);
  });
};

exports.updateUserData = (req, res) => {
  Users.findOneAndUpdate({_id: req.params.userId},
                         req.body,
                         {new: true, upsert: true},
                         (err, task) => {
                           err ? res.send(err) : res.json(task);
                         });
};

exports.list_all_tasks = function(req, res) {
  Users.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.create_a_task = function(req, res) {
  const new_task = new Users(req.body);
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.read_a_task = function(req, res) {
  Users.findById(req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.test = function(req, res) {
  res.json('sssssssssss');
};

exports.update_a_task = function(req, res) {
  Users.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
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
