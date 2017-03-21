const db = require('APP/db')

const seedUsers = () => db.Promise.map([
  {name: 'Juan', email: 'user@test.com', password: 'password'},
  {name: 'John', email: 'user2@test.com', password: 'password'},
], user => db.model('users').create(user))

db.didSync
  .then(() => db.sync({force: false}))
  .then(seedUsers)
  .then(users => console.log(`Seeded ${users.length} users OK`))
  .catch(error => console.error(error))
  .finally(() => db.close())
