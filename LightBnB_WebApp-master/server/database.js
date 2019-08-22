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
  return pool
    .query(
      `
  select p.id, p.title, p.cost_per_night, r.start_date, avg(pr.rating) as average_rating
  from properties p join reservations r
  on p.id = r.property_id
  join property_reviews pr
  on p.id = pr.property_id
  where r.guest_id = $1
  and r.end_date < now()::date
  group by p.id, r.id
  order by r.start_date
  limit $2`,
      [guest_id, limit]
    )
    .then(res => {
      return res.rows;
    })
    .catch(err => err);
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
  // testing data
  // options.city = 'Paradise';
  // options.owner_id = 391;
  // options.minimum_price_per_night = 10;
  // options.maximum_price_per_night = 100000;
  // options.minimum_rating = 1;

  const queryParams = [];

  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  try{
    `${options.city ? (queryParams.push(`${options.city}`), queryString += `WHERE properties.city LIKE $${queryParams.length} `) : ''}`;
    `${options.owner_id ? (queryParams.push(`${options.owner_id}`), queryString +=  `AND properties.owner_id = $${queryParams.length}`) : ''}`;
    `${options.minimum_price_per_night ? (queryParams.push(`${options.minimum_price_per_night}`), queryString +=  ` AND properties.cost_per_night >= $${queryParams.length}`) : ''}`;
    `${options.maximum_price_per_night ? (queryParams.push(`${options.maximum_price_per_night}`), queryString +=  ` AND properties.cost_per_night <= $${queryParams.length}`) : ''}`;
    `${options.maximum_price_per_night ? (queryParams.push(`${options.maximum_price_per_night}`), queryString +=  ` AND properties.cost_per_night <= $${queryParams.length}`) : ''}`;
    `${options.minimum_rating ? (queryParams.push(`${options.minimum_rating}`), queryString +=  ` AND property_reviews.rating >= $${queryParams.length}`) : ''}`;
  } catch(error){
    throw new Error('SQL Query Syntax Error ' + error);
  }
  
  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  return pool.query(queryString, queryParams)
  .then(res => res.rows)
  .catch(err => err);
};
exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const values = [property.owner_id, property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url, property.cost_per_night, property.street, property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms, property.country, property.city, property.province, property.post_code];
  const queryStr = `insert into properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, street, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, city, province, post_code) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) returning *`;
  return pool.query(queryStr, values)
    .then(res => res.rows)
    .catch(err => err);
};
exports.addProperty = addProperty;
