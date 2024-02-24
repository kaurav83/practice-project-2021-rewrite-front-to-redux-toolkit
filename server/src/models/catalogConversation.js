'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CatalogConversation extends Model {
    static associate(models) {

    }
  };
  CatalogConversation.init({
    catalogId: {
      field: 'catalog_id',
      type: DataTypes.INTEGER,
      allowNull: false
    },
    conversationId: {
      field: 'conversation_id',
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'CatalogConversation',
    tableName: 'catalog_conversations',
    underscored: true
  });
  return CatalogConversation;
};