const { genSaltSync, hashSync, compareSync } = require('bcrypt');

const { sign } = require('jsonwebtoken');
const {
  getUsers,
  createUser,
  deleteUser,
  getUserByEmail,
} = require('./user.modal');

/**
 * It will fetch all users details
 * @param {Object} req
 * @param {Object} res
 * @returns {List<Object>} : list of users
 */
const getUsersController = async (req, res) => {
  try {
    const users = await getUsers(req.app.get('db'));
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e,
    });
  }
};

/**
 * It will create new user
 * @param {Object} req
 * @param {Object} res
 */
const createUserController = async (req, res) => {
  try {
    // Do validation
    const passwordSalt = genSaltSync(10);
    const hashedPassword = hashSync(req.body.password, passwordSalt);
    const user = [
      req.body.first_name,
      req.body.last_name,
      req.body.city_name,
      req.body.email,
      hashedPassword,
    ];
    // console.log('user: ', user);

    const result = await createUser(req.app.get('db'), user);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e,
    });
  }
};

/**
 * It will delete user by id
 * @param {Object} req
 * @param {Object} res
 */
const deleteUserController = async (req, res) => {
  try {
    const db = req.app.get('db');
    const { id } = req.body;
    const result = await deleteUser(db, id);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e,
    });
  }
};

/**
 * It will login the user
 * @param {Object} req
 * @param {Object} res
 */
const loginController = async (req, res) => {
  try {
    const db = req.app.get('db');
    const { email, password } = req.body;
    const result = await getUserByEmail(db, email);
    if (!result || !result[0]) {
      return res.status(200).json({
        success: false,
        message: 'User not found',
      });
    }
    // Compare password
    const isPasswordValid = compareSync(password, result[0].password);
    if (isPasswordValid) {
      // Create a token
      result[0].password = null;
      const jwtToken = sign({ ...result[0] }, process.env.JWT_KEY);
      return res.status(200).json({
        success: true,
        message: 'Login Successfull',
        token: jwtToken,
      });
    }
    return res.status(200).json({
      success: false,
      message: 'Email or Password is not correct',
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e,
    });
  }
};
module.exports = {
  getUsersController,
  createUserController,
  deleteUserController,
  loginController,
};
