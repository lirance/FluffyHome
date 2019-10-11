/*
*all of the router interface
*/
const users = require('./users');

module.exports = app => {
  app.post('/login', users.login);
  app.post('/logout', users.logout);
  app.post('/register', users.register);
  app.post('/userInfo', users.userInfo);
  app.get('/currentUser', users.currentUser);
};
