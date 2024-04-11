const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const CONSTANTS = require('../constants');
const config = require(configPath)[env];


const env = process.env.NODE_ENV || 'development';
const configPath = env === 'production' ? path.join(__dirname, '..', '..', '..',
	'src/server/config/postgresConfig.json') : path.join(__dirname, '..',
		'/config/postgresConfig.json');

const sequelize = new Sequelize(config.database, config.username, config.password, config);

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await sequelize.query(`
            ALTER TYPE "enum_Users_role" ADD VALUE 'moderator';
        `);
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