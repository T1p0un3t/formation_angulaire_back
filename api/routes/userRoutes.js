'use strict';
module.exports = function (app) {
  var user = require('../controllers/userController');

  // User Routes
  app.route('/users')
    .get(user.list_all_users);

  app.route('/user/:userId')
    .get(user.read_a_user)
    ;

  app.route('/newuser')
    .post(user.create_a_user);

  app.route('/jobs')
    .get(user.getJobss);

  app.route('/user/:userId').delete(user.deleteUser);
};
