'use strict'
const debug = require('debug')('sql')
const chalk = require('chalk')
const Sequelize = require('sequelize')
const app = require('APP')

if (process.env.NODE_ENV !== 'production') require('../secrets')

const name = process.env.DATABASE_NAME
const username = (process.env.DATABASE_USERNAME ? process.env.DATABASE_USERNAME : '')
const password = (process.env.DATABASE_PASSWORD ? process.env.DATABASE_PASSWORD : '')
const url = process.env.DATABASE_URL || (name && username && password ?
    `postgres://${username}:${password}@localhost:5432/${name}` : `postgres://localhost:5432/boilermaker`)

console.log(chalk.yellow(`Opening database connection to ${url}`));

// create the database instance
const db = module.exports = new Sequelize(url, {
  logging: true, //debug, // export DEBUG=sql in the environment to get SQL queries
  define: {
    underscored: true,       // use snake_case rather than camelCase column names
    freezeTableName: true,   // don't change table names from the one specified
    timestamps: true,        // automatically include timestamp columns
  }
})

// pull in our models
require('./models')

// sync the db, creating it if necessary
function sync(force=app.isTesting, retries=0, maxRetries=5) {
  return db.sync({force})
    .then(ok => console.log(`Synced models to db ${url}`))
    .catch(fail => {
      // Don't do this auto-create nonsense in prod, or
      // if we've retried too many times.
      if (app.isProduction || retries > maxRetries) {
        console.error(chalk.red(`********** database error ***********`))
        console.error(chalk.red(`    Couldn't connect to ${url}`))
        console.error()
        console.error(chalk.red(fail))
        console.error(chalk.red(`*************************************`))
        return
      }
      // Otherwise, do this autocreate nonsense
      console.log(`${retries ? `[retry ${retries}]` : ''} Creating database ${name}...`)
      return new Promise((resolve, reject) =>
        require('child_process').exec(`createdb "${name}"`, resolve)
      ).then(() => sync(true, retries + 1))
    })
}

db.didSync = sync()
