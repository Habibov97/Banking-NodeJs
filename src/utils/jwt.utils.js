const jwt = require('jsonwebtoken');
const config = require('../config');

const encodePayload = (payload) => {
  let token = jwt.sign(payload, config.jwtSecret, { expiresIn: '3d' });
  return token;
};

const decodePayload = (token) => {};

module.exports = {
  encodePayload,
  decodePayload,
};
