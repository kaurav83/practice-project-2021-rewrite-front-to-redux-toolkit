'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ConversationParticipant extends Model {
    static associate(models) {
      ConversationParticipant.belongsTo(models.Conversation, { foreignKey: 'conversationId' });
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
    underscored: true
  });
  return ConversationParticipant;
};