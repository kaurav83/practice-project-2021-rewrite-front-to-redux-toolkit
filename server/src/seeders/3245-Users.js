const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const CONSTANTS = require('../constants');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const passwordModerator = await bcrypt.hash('pass_moder', 10);
    const accessTokenModerator = jwt.sign({
      firstName: 'Moderator',
      userId: 4,
      role: 'moderator',
      lastName: 'Moderatorovich',
      avatar: 'anon.png',
      displayName: 'moder',
      balance: 0,
      email: 'moder@gmail.com',
      rating: 0,
    }, CONSTANTS.JWT_SECRET,
      {
        expiresIn: CONSTANTS.ACCESS_TOKEN_TIME
      });

    return queryInterface.bulkInsert('Users', [
      {
        id: 4,
        firstName: 'Moderator',
        lastName: 'Moderatorovich',
        displayName: 'moder',
        password: passwordModerator,
        email: 'moder@gmail.com',
        avatar: 'anon.png',
        role: 'moderator',
        balance: 0,
        accessToken: accessTokenModerator,
        rating: 0
      }
    ], {});
  },
};