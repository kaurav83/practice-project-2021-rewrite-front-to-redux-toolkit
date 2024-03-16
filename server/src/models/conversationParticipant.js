'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ConversationParticipant extends Model {
    static associate(models) {
      ConversationParticipant.belongsTo(models.Conversation, { foreignKey: 'conversationId' });
      ConversationParticipant.belongsTo(models.User, {foreignKey: 'participantId', as: 'userDetails'});
    }
  };
  ConversationParticipant.init({
    conversationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'conversation_id'
    },
    participantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'participant_id'
    },
    blacklisted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    favorited: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'ConversationParticipant',
    tableName: 'conversation_participants',
    timestamps: false,
    underscored: true
  });
  return ConversationParticipant;
};