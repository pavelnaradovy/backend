const jwt = require('jsonwebtoken');

const SECRET = 'mySuperSecretKey123'; // Захардкоджений секретний ключ

const generateToken = (user) => {
  return jwt.sign({ id: user.id }, SECRET, { expiresIn: '1h' });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    throw new Error('Недійсний токен');
  }
};

module.exports = { generateToken, verifyToken };