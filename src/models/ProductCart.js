const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const ProductCart = sequelize.define('productcart', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    //userId
    //productId
});

module.exports = ProductCart;