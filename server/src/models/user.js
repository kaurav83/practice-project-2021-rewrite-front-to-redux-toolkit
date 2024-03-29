const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate ({ Offer, Contest, Rating, Message, Conversation, ConversationParticipant, Catalog }) {
      User.hasMany(Offer, { foreignKey: 'userId', targetKey: 'id' });
      User.hasMany(Contest, { foreignKey: 'userId', targetKey: 'id' });
      User.hasMany(Rating, { foreignKey: 'userId', targetKey: 'id' });
      User.hasMany(Message, { foreignKey: 'sender', targetKey: 'id' });
      User.belongsToMany(Conversation, { through: ConversationParticipant, foreignKey: 'participantId' });
      User.hasMany(ConversationParticipant, {foreignKey: 'participantId', as: 'participantDetails'});
    }
  }

  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      displayName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'anon.png',
      },
      role: {
        type: DataTypes.ENUM('customer', 'creator', 'moderator'),
        allowNull: false,
      },
      balance: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
      accessToken: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'User',
      timestamps: false,
    }
  );

  return User;
};