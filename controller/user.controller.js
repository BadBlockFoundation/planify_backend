const UserService = require("../services/user.service");
const db = require("../models/index");
const User = db.users;
const Bcrypt = require("bcrypt");
const userService = new UserService(User, Bcrypt);


/**
 * getAll - description
 *
 * @param  {type} req  description
 * @param  {type} res  description
 * @param  {type} next description
 * @return {type}      description
 */
async function getAll(req, res, next) {
  try {
    let data = await userService.getAll();
    res.status(200).send({
      success: true,
      payload: data
    })
  } catch (e) {
    res.status(500).send({
      success: false,
      payload: e
    })
  }
};


/**
 * findById - description
 *
 * @param  {type} req  description
 * @param  {type} res  description
 * @param  {type} next description
 * @return {type}      description
 */
async function findById(req, res, next) {
  try {
    let data = await userService.findById(req.params.id);
    res.status(200).send({
      success: true,
      payload: data
    })
    console.log("Find By id call : " + data);

  } catch (e) {
    res.status(500).send({
      success: false,
      payload: e
    })
  }

}

async function createUser(req, res, next) {
  try {
    let data = await userService.createUser(req.body);
    res.status(200).send({
      success: true,
      payload: data
    })

  } catch (e) {
    res.status(500).send({
      success: false,
      payload: e
    })
  }
}


module.exports = {
  getAll,
  findById,
  createUser
};
