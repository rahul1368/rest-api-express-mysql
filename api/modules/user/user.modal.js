/**
 * Service function to fetch all users from database
 * @param {Object} db : Database connection object
 */
const getUsers = db =>
  db.query('select id,first_name,last_name,city_name,email from users', []);

/**
 * Service function to create a new user
 * @param {Object} db : Database connection object
 * @param {Object} user : new user object
 */
const createUser = (db, user) =>
  db.query(
    'insert into users(first_name,last_name,city_name,email,password) values(?,?,?,?,?)',
    user,
  );

/**
 * Service function to delete user by id
 * @param {Object} db : Database connection object
 * @param {Number} id : user id to be deleted
 */
const deleteUser = (db, id) => db.query('delete from users where id=?', [id]);

/**
 * Service function to fetch user by email
 * @param {Object} db :  Database connection object
 * @param {*} email : user email
 */
const getUserByEmail = (db, email) =>
  db.query('select * from users where email=?', [email]);
module.exports = {
  getUsers,
  createUser,
  deleteUser,
  getUserByEmail,
};
