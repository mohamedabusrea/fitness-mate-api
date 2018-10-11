module.exports = function(app) {
  const users = require('../controllers/usersController');

  // users Routes
  app.route('/setUserData')
     .post(users.setUserData);

  app.route('/updateUserData/:userId')
     .post(users.updateUserData);

  app.route('/getUserData/:userId')
     .get(users.getUserData);
};
