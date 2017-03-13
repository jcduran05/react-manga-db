var fs = require('fs');
var request = require('request');
var path = require('path');

var rp = require('request-promise');
var cheerio = require('cheerio');
var Promise = require('bluebird');
var moment = require('moment');

var db = require('../db');
var Genre = require('../db/models/genre');
var Manga = require('../db/models/manga');
var MangaDetails = require('../db/models/manga_detail');
var MangaGenre = require('../db/models/manga_genre');

var fetchGenresPromise = require('./genres_scraper').fetchGenresPromise;

// Should be less as some of their data includes
// novels and there is a check to prevent those
// items from being added to the db
var topMangaPromise = [
  rp('https://myanimelist.net/topmanga.php'), // 50
  rp('https://myanimelist.net/topmanga.php?limit=50'), // 100
  rp('https://myanimelist.net/topmanga.php?limit=100'), // 150
  rp('https://myanimelist.net/topmanga.php?limit=150'), // 200
  // rp('https://myanimelist.net/topmanga.php?limit=200'), // 250
  // rp('https://myanimelist.net/topmanga.php?limit=250'), // 300
  // rp('https://myanimelist.net/topmanga.php?limit=300'), // 350
  // rp('https://myanimelist.net/topmanga.php?limit=350'), // 400
  // rp('https://myanimelist.net/topmanga.php?limit=400'), // 450
  // rp('https://myanimelist.net/topmanga.php?limit=450'), // 500
  // rp('https://myanimelist.net/topmanga.php?limit=500'), // 550
  ];

// ////////////////////////////////////////////
// // Scrape top manga and genres
// ////////////////////////////////////////////
var manga_links = [];
var manga = [];

var fetchTopMangaPromise = function() {
Promise.all(topMangaPromise)
.then(function (htmlArr) {
  htmlArr.forEach(function(htmlObj, idx) {
    var $ = cheerio.load(htmlObj);

    // Process html to get top manga
    $('.ranking-list .title .detail').each(function(idx, elem) {
      // Analyzing text to make sure it's a manga and not a novel
      var text = $(this).find('.information').text();
      if (text.includes('Manga')) {
        var mangaTitleLink = $(this).find('.hoverinfo_trigger');
        var manga_title = $(mangaTitleLink).text();
        var manga_link = $(mangaTitleLink).attr('href');

        manga.push({ title: manga_title });
        manga_links.push(manga_link);
      }
    });
  });

  // Populate db with manga data
  var mangaPromise = Manga.bulkCreate(manga);
  return mangaPromise;
})
.then(function(createdManga) {
  console.log('Seeded manga table successfully.');
  return processMangaLinks();
})
.catch(errorFunc);
}

var errorFunc = function(err) {
  console.log(err);
}
// ////////////////////////////////////////////

fetchGenresPromise
.then(function(sequelizeObj) {
  return fetchTopMangaPromise();
})
.catch(errorFunc);

var errorFunc = function(err) {
  // console.log(err);
}

// ////////////////////////////////////////////

var processMangaLinks = function() {
  manga_links.forEach(function(url) {
    rp(url)
    .then(function (html) {
      var $ = cheerio.load(html);

      var manga_details = {};
      var manga_title = $('h1 span').text();
      var manga_table = {}
      var manga_genres = [];

      console.log(manga_title);


      // Creating array of genres
      $('.spaceit a').each(function(idx, elem) {
        var genre_href = $(this).attr('href').split('/');
        if (genre_href.indexOf('genre') > 0) {
            var genre = $(this).text().toLowerCase();
            manga_genres.push(genre);
        }
      });

      // Published data
      $('.dark_text').each(function(idx, elem) {
        var publish_data = $(this).parent().text();
        if (publish_data.includes('Published:')) {
          publish_data = publish_data.replace('Published: ', '');
          publish_data = publish_data.split(' to ');
          manga_table.publication_start = moment(publish_data[0], 'MMM DD,YYYY').format();
          if (publish_data[1] != '?') {
            manga_table.publication_end = moment(publish_data[1], 'MMM DD,YYYY').format();
          }
        }
      });

      // Japanese title
      $('.spaceit_pad').each(function(idx, elem) {
          var info_text = $(this).text();
          if (info_text.includes("Japanese:")) {
            manga_table.jp_title = info_text.replace('Japanese:', '');
          }
      });

      // Manga synopsis
      $('.js-scrollfix-bottom-rel table').find('span').each(function(idx, elem) {
        if (idx == 8) {
          manga_details.synopsis = $(this).text();
        }
      });

      // Manga image
      // var manga_img_url = $('.js-scrollfix-bottom').find('img').attr('src');
      // var downloadImagePromise = download(manga_img_url, manga_title.toLowerCase() + '_details_img.jpg');

      // Return promise with various info
      var findMangaPromise = Manga.findOne({ where: { title: manga_title } });
      return Promise.all([manga_genres, findMangaPromise, manga_table, manga_details]);
    })
    .then(function(result) {
      console.log('===========');
      console.log(result[1]);
      console.log('===========');
      var manga_genres = result[0];
      var mangaId = result[1].dataValues.id;
      var manga_details = result[3];
      manga_details.manga_id = mangaId;

      var updateMangaTable = result[1].update({
        jp_title: result[2].jp_title,
        publication_start: result[2].publication_start,
        publication_end: result[2].publication_end,
      });

      // Get all the genre ids
      var findGenrePromise = Genre.findAll({
        where: {
          name: manga_genres
        }
      });

      var createMangaDetailsPromise = MangaDetails.findOrCreate({where: manga_details});
      return Promise.all([findGenrePromise, mangaId, createMangaDetailsPromise, updateMangaTable]);
    })
    .then(function(results) {
      var mangaId = results[1];
      var genres_results = results[0];
      var manga_details = results[2];

      var mangaGenresArr = [];
      genres_results.forEach(function(resultObj, idx) {
        var genre_id = resultObj.dataValues.id;
        var mangaGenre = {
          manga_id: mangaId,
          genre_id: genre_id
        };

         mangaGenresArr.push(mangaGenre);
      });

      // var createMangaGenresPromise = MangaGenre.bulkCreate(mangaGenresArr);
      return MangaGenre.bulkCreate(mangaGenresArr);
    })

    // Scraping and updating db complete
    .then(function() {
      console.log('Process complete.');
      return;
    })
    .catch(function(err) {
      // console.log(err);
    })

  })
}

// Function to download an image based on a url provided
// and set to place the image in the public/images directory
var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    request(uri).pipe(fs.createWriteStream('./public/images/' + filename)).on('close', function() { console.log('Finished downloading image.') });
  });
};
