'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')

const scrapedUrls = db.define('scraped_urls', {
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false,
    },
})

module.exports = scrapedUrls