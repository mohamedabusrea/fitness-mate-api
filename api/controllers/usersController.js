const mongoose = require('mongoose'),
    Users = mongoose.model('Users');

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
