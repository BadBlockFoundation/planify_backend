const express = require('express');
const router = express.Router();
const passport = require('../middleware/auth/auth.middleware');
const userController = require("../controller/user.controller");


/**
 * GET Routes
 */
router.route('/all').get(
  passport.authenticate('jwt', {
    session: false
  }), userController.getAll);
router.route('/:id').get(userController.findById);


/**
 * POST Routes
 */
router.route('/signup').post(
  passport.authenticate('signup', {
    session: false
  }),
  userController.signupUser);

router.route('/login').post(
  passport.authenticate('login', {
    session: false
  }),
  userController.loginUser);


/**
 * UPDATES Routes
 */

/**
 * DELETE Routes
 */

module.exports = router;
