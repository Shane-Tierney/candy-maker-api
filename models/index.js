const Sequelize = require('sequelize')
const manufacturersModel = require('./manufacturers')
const productsModel = require('./products')
const allConfigs = require('../configs/sequelize')

const environment = process.env.NODE_ENV || 'development'
const { username, password, database, host, dialect } = allConfigs[environment]

const connection = new Sequelize(database, username, password, {
  host: host, dialect: dialect
})

const manufacturers = manufacturersModel(connection, Sequelize)
const products = productsModel(connection, Sequelize, manufacturers)

manufacturers.hasMany(products)
products.belongsTo(manufacturers)

module.exports = { manufacturers, products }
