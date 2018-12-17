module.exports = (sequelize, type) => {
    return sequelize.define('assignSalesOrder', {
      id: { type: type.INTEGER, primaryKey: true, autoIncrement: true },
      username_picker: { type: type.STRING, allowNull: false },
      id_salesOrder: { type: type.INTEGER, allowNull: false },
    })
  }
