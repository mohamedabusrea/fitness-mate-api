module.exports = function(app) {
  const users = require('../controllers/usersController');

  // users Routes
  app.route('/setUserData')
     .post(users.setUserData);

  app.route('/updateUserData')
     .post(users.updateUserData);

  app.route('/getUserData')
     .get(users.getUserData);

  app.route('/searchUserData')
     .post(users.searchUserData);
};
