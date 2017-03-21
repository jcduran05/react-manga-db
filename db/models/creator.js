'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')

const Creator = db.define('creator', {
  given_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  family_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  jp_given_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  jp_family_name: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Creator
