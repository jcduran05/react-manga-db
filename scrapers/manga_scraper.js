var fs = require('fs');
var request = require('request');
var path = require('path');

var rp = require('request-promise');
var cheerio = require('cheerio');
var Promise = require('bluebird');
var moment = require('moment');

var db = require('APP/db');
var Genre = require('APP/db/models/genre');
var Manga = require('APP/db/models/manga');
var MangaDetails = require('APP/db/models/manga_detail');
var MangaGenre = require('APP/db/models/manga_genre');


// ////////////////////////////////////////////
var manga_links = [
  // 'https://myanimelist.net/manga/25/Fullmetal_Alchemist',
  'https://myanimelist.net/manga/2/Berserk',
  'https://myanimelist.net/manga/656/Vagabond'
  ];
var manga = [];
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
      var manga_authors = [];


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
        } else if (publish_data.includes('Authors:')) {
          publish_data = publish_data.replace('Authors:\n', '');
          publish_data = publish_data.replace(/\(.*?\)/g, '$%&');
          publish_data = publish_data.split('$%&,');
          publish_data.forEach(a => {
            var author = a.replace('$%&', '').trim().split(',');

            var authorObj = {
              given_name: author[1].trim(),
              family_name: author[0].trim()
            };

            manga_authors.push(authorObj);
          });
          console.log(manga_authors);
        } else if (publish_data.includes('Serialization:')) {
          console.log(publish_data);
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
      // console.log('===========');
      // console.log(result[1]);
      // console.log('===========');
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
      // return MangaGenre.bulkCreate(mangaGenresArr);
      return;
    })

    // Scraping and updating db complete
    .then(function() {
      console.log('Process complete.');
      process.exit(0);
      // return;
    })
    .catch(function(err) {
      // console.log(err);
      process.exit(0);
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

processMangaLinks();
