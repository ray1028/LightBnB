const properties = require("./json/properties.json");
const users = require("./json/users.json");

const { Pool } = require("pg");
const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "lightbnb"
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return pool
    .query(`select * from users where email = $1 limit 1;`, [email])
    .then(res => {
      if (res.rowCount !== 1) {
        throw new Error(`The email ${email} does not exist`);
      } else {
        return res.rows[0];
      }
    })
    .catch(err => err);
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool
    .query(`select * from users where id = $1`, [id])
    .then(res => {
      if (res.rowCount !== 1) {
        throw new Error(`The id ${id} does not exist`);
      } else {
        return res.rows[0];
      }
    })
    .catch(err => err);
};
exports.getUserWithId = getUserWithId;

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function(user) {
  const newUser = { ...user };
  const values = [newUser.name, newUser.email, newUser.password];
  const queryStr = `insert into users (name, email, password) values ($1, $2, $3) returning *`;
  return pool
    .query(queryStr, values)
    .then(res => {
      if (res.rowCount !== 1) {
        throw new Error("Create new user failed");
      } else {
        return res.rows[0];
      }
    })
    .catch(err => err);
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return getAllProperties(null, 2);
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  return pool
    .query(
      `
  SELECT * FROM properties
  LIMIT $1
  `,
      [limit]
    )
    .then(res => res.rows);
};
exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
};
exports.addProperty = addProperty;
