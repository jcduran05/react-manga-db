'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')

const Manga = db.define('manga', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  jp_title: {
    type: Sequelize.STRING,
  },
  score: {
    type: Sequelize.FLOAT,
  },
  publication_start: Sequelize.DATE,
  publication_end: Sequelize.DATE,
})

module.exports = Manga
