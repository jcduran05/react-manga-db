'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')

const Genre = require('./genre')
const Creator = require('./Creator')

const MangaDetail = db.define('manga_detail', {
  synopsis: {
    type: Sequelize.TEXT,
    allowNull: false,
    unique: true
  }
})

module.exports = MangaDetail
