module.exports = function(app) {
  const users = require('../controllers/usersController');

  // users Routes
  app.route('/setUserData')
     .post(users.setUserData);

  app.route('/updateUserData/:userId')
     .post(users.updateUserData);

  app.route('/getUserData/:userId')
     .get(users.getUserData)
     .post(users.create_a_task);

  app.route('/tasks/:taskId')
     .get(users.read_a_task)
     .put(users.update_a_task)
     .delete(users.delete_a_task);
};
