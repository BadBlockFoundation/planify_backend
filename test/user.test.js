const chai = require('chai');
const request = require('supertest');
//const assert = require('assert');
const bcrypt = require('bcrypt');
const app = require('../app');

const UserService = require("../services/user.service");
const db = require("../models/index");
const User = db.users;

const userService = new UserService(User);

describe('Users', () => {
  const user = User.build({
    'email': 'a.pinier.rafer@gmail.com',
    'password': '0123456789'
  })

  it('should get post a user', (done) => {
    var user = {
      'email': 'a.pinier.rafercom',
      'password': '0123456789'
    }
    request(app)
      .post('/users/')
      .send(user)
      .expect(200)
      .end(async (err, res) => {
        var assert = chai.assert;
        let usrInsert = await User.findByPk(res.body.payload.id)

        assert.equal(usrInsert.email, user.email);
        let goodHash = bcrypt.compareSync(usrInsert.password, user.password);
        assert.equal(goodHash, false);

        console.log(usrInsert.dataValues)
        done()
      })
  });

  it('should get All users', (done) => {
    request(app)
      .get('/users/all')
      .expect(200, done)
  });

});
