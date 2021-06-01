module.exports = app => {
  app.use('/users', require('./user.routes'));
  //app.use('/clients', require('./collections/clients'));

}
