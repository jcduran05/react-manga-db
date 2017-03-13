var fs = require('fs');
var request = require('request');
var path = require('path');

var rp = require('request-promise');
var cheerio = require('cheerio');
var Promise = require('bluebird');

var db = require('APP/db');
var Genre = require('APP/db/models/genre');
var Manga = require('APP/db/models/manga');
var MangaDetails = require('APP/db/models/manga_detail');
var MangaGenre = require('APP/db/models/manga_genre');

var genres = [];
var genrePagePromise = rp('https://myanimelist.net/manga.php');

// ////////////////////////////////////////////
// // Scrape genres
// ////////////////////////////////////////////
module.exports = {
  fetchGenresPromise:
    Promise.all([genrePagePromise])
    .then(function (htmlArr) {
      var $$ = cheerio.load(htmlArr[0]);

      // Process html to get manga genres
      $$('.genre-link .genre-list-col .genre-list').each(function(idx, elem) {
        if (idx <= 44) {
          var genre_name = $$(this).find('.genre-name-link').text().toLowerCase().replace(/ \((.+?)\)/g, '');

          if (genre_name != 'hentai' && genre_name != 'gender bender' &&
              genre_name != 'yaoi' && genre_name != 'yuri') {
              var genreObj = { name: genre_name }
              genres.push(genreObj);
          }
        }
      });

      // Recreate tables
      return db.sync({force: true});
    })
    .then(function() {
      var genrePromise = Genre.bulkCreate(genres);
      // Populate db with genre data
      return genrePromise;
    })
    .catch(function(err) {
      console.log(err);
    })
}
