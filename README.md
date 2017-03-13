## How to install

Short and sweet:

```
npm install
npm run dev
```

Check the `package.json` file for various scripts that you can run.

`npm run dev` will run the server and watch files.

## My anatomy

`/app` has the React/Redux setup. `main.jsx` is the entry point.

`/db` has the Sequelize models and database setup. It'll create the database for you if it doesn't exist,
assuming you're using postgres.

`/server` has the Express server and routes. `start.js` is the entry point.

`/scrapers` has the scrapers that will make requests to specific webpages and use the data to populate the database and download images.

`/bin` has scripts.

## Todos

1. Create new tables and relations for artists and publishers.
2. Extend scrapers to collect data on the artists that made the manga and publishers. 
3. Pages for the new data and add the information to each manga similar to how genres is displayed.
3. Finish implementing login system.
4. Allow users to create a favorites list.
5. Search by title functionality.

