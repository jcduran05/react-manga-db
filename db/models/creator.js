'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')

const Creator = db.define('creator', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  jp_name: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Creator
