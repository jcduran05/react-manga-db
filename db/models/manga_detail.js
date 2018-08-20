'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')

const MangaDetail = db.define('manga_detail', {
  synopsis: {
    type: Sequelize.TEXT,
    allowNull: false,
    unique: true
  }
})

module.exports = MangaDetail
