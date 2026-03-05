const jwt = require('jsonwebtoken');
const config = require('../config');

const encodePayload = (payload) => {
  let token = jwt.sign(payload, config.jwtSecret, { expiresIn: '3d' });
  return token;
};

const decodePayload = (token) => {
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    return decoded;
  } catch (error) {
    return null;
  }
};

module.exports = {
  encodePayload,
  decodePayload,
};
