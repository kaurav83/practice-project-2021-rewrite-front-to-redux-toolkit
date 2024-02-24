'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    static associate({ ConversationParticipant, CatalogConversation, Catalog }) {
      Conversation.hasMany(ConversationParticipant, { foreignKey: 'conversationId' });
      ConversationParticipant.belongsTo(Conversation, { foreignKey: 'conversationId' });
      Conversation.belongsToMany(Catalog, { through: CatalogConversation, foreignKey: 'conversationId' });
      Catalog.belongsToMany(Conversation, { through: CatalogConversation, foreignKey: 'catalogId' });
    }
  };
  Conversation.init({
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updated_at'
    }
  }, {
    sequelize,
    modelName: 'Conversation',
    tableName: 'conversations',
    underscored: true
  });
  return Conversation;
};