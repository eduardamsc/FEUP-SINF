module.exports = (sequelize, type) => {
    return sequelize.define('product', {
      id: { type: type.INTEGER, primaryKey: true, autoIncrement: true },
      id_salesOrder: { type: type.INTEGER, allowNull: false },
      product: { type: type.STRING, allowNull: false },
      quantity: { type: type.INTEGER, allowNull: false },
      location: { type: type.INTEGER, allowNull: false },
      notEnoughQuantity: { type: type.BOOLEAN, allowNull: false },
      date: { type: type.DATE, allowNull: false }
    })
  }
