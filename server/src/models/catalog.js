'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Catalog extends Model {
    static associate({ CatalogConversation, User }) {
      Catalog.hasMany(CatalogConversation, {
        foreignKey: 'catalogId',
        as: 'CatalogConversations',
        onDelete: 'CASCADE'
      });
      CatalogConversation.belongsTo(Catalog, { foreignKey: 'catalogId' });
      Catalog.belongsTo(User, { foreignKey: 'userId' });
    }
  };
  Catalog.init({
    userId: {
      field: 'user_id',
      type: DataTypes.INTEGER,
      allowNull: false
    },
    catalogName: {
      field: 'catalog_name',
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Catalog',
    tableName: 'catalogs',
    underscored: true
  });
  return Catalog;
};