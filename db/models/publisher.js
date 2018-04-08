'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')

const Publisher = db.define('publisher', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    summary: {
        type: Sequelize.STRING,
    },
    website: {
        type: Sequelize.STRING,
    },
})

module.exports = Publisher