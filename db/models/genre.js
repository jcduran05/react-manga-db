'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')

const Genre = db.define('genre', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
})

module.exports = Genre
