'use strict';
module.exports = function (app) {
  var user = require('../controllers/userController');

  // User Routes
  app.route('/users')
    .get(user.list_all_users);

  app.route('/user/:userId')
    .get(user.read_a_user)
    .delete(user.deleteUser)
    ;

  app.route('/newuser')
    .post(user.create_a_user);

  app.route('/jobs')
    .get(user.getJobss);
};
