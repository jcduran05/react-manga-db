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

////////////////////////////////////////////
// Setup
////////////////////////////////////////////
var generateComicsUrls = require('./manga_links.js').generateUrls;
// var fetchGenresPromise = require('./genres_scraper').fetchGenresPromise;

//'https://myanimelist.net/manga/55215/Utsuro_no_Hako_to_Zero_no_Maria'

////////////////////////////////////////////
// Scrape Process
////////////////////////////////////////////
// Step 1
// Run function that generate links and wraps
// them in a request that can be processed
// Array of request objects 
var getUrls = generateComicsUrls(0, 0);
// Step 2
// Process the links from step 1 to add comics to
// database and return individual links to each comic
var getComics = require('./manga_links.js').processUrlsAndGetComics;
// var processUrlsAndGetComics = function(pagesOfTableData) {
//   var manga_links = [];
//   var manga = [];
//   return Promise.all(pagesOfTableData)
//   .then(function (htmlArr) {
//     htmlArr.forEach(function(htmlObj, idx) {
//       var $ = cheerio.load(htmlObj);

//       // Process html to get top manga
//       $('.ranking-list .title .detail').each(function(idx, elem) {
//         // Analyzing text to make sure it's a manga and not a novel
//         var text = $(this).find('.information').text();
//         if (text.includes('Manga')) {
//           var mangaTitleLink = $(this).find('.hoverinfo_trigger');
//           var manga_title = $(mangaTitleLink).text();
//           var manga_link = $(mangaTitleLink).attr('href');

//           manga.push({ title: manga_title });
//           manga_links.push(manga_link);
//         }
//       });
//     });

//     // Populate db with manga data
//     // var mangaPromise = Manga.bulkCreate(manga);
//     //return mangaPromise;
//     return [manga, manga_links];
//   })
//   .then(function(createdMangaArr) {
//     console.log('Seeded manga table successfully.');
//     // return processMangaLinks();
//     return createdMangaArr;
//   })
//   .catch(errorFunc);
// };

console.log(getComics);

var errorFunc = function(err) {
  // console.log(err);
}

getComics(getUrls)
.then(function(createdMangaArr) {
  console.log(createdMangaArr);
  return;
});
// ////////////////////////////////////////////

// fetchGenresPromise
// .then(function(sequelizeObj) {
//   return fetchTopMangaPromise();
// })
// .catch(errorFunc);

// var errorFunc = function(err) {
//   // console.log(err);
// }

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
      var manga_authors = {};
      var manga_publishers = [];

      //console.log(manga_title);


      // Creating array of genres
      $('.spaceit a').each(function(idx, elem) {
        var genre_href = $(this).attr('href').split('/');
        if (genre_href.indexOf('genre') > 0) {
            var genre = $(this).text().toLowerCase();
            manga_genres.push(genre);
        }
      });

      // Creating array of authors
      $('a').each(function(idx, elem) {
        var authorRegex = /\/people\/\d*\/\w*/g;
        var publisherRegex = /\/manga\/magazine\/\d*\/\w*/g;
        var link = $(this).attr('href');
        //console.log(authorRegex.exec(authors_href));

        var dbMainUrl = 'https://myanimelist.net';
        if (authorRegex.test(link)) {
          manga_authors[authors_href] = dbMainUrl+link;
        } else if (publisherRegex.test(link)) {
          manga_publishers.push(dbMainUrl+link)
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
      //var findMangaPromise = Manga.findOne({ where: { title: manga_title } });
      //return Promise.all([manga_genres, findMangaPromise, manga_table, manga_details]);
      return;
    })
    .then(function(result) {
      // console.log('===========');
      // console.log(result[1]);
      // console.log('===========');
      // var manga_genres = result[0];
      // var mangaId = result[1].dataValues.id;
      // var manga_details = result[3];
      // manga_details.manga_id = mangaId;

      // var updateMangaTable = result[1].update({
      //   jp_title: result[2].jp_title,
      //   publication_start: result[2].publication_start,
      //   publication_end: result[2].publication_end,
      // });

      // // Get all the genre ids
      // var findGenrePromise = Genre.findAll({
      //   where: {
      //     name: manga_genres
      //   }
      // });

      // var createMangaDetailsPromise = MangaDetails.findOrCreate({where: manga_details});
      // return Promise.all([findGenrePromise, mangaId, createMangaDetailsPromise, updateMangaTable]);
      return;
    })
    .then(function(results) {
      // var mangaId = results[1];
      // var genres_results = results[0];
      // var manga_details = results[2];

      // var mangaGenresArr = [];
      // genres_results.forEach(function(resultObj, idx) {
      //   var genre_id = resultObj.dataValues.id;
      //   var mangaGenre = {
      //     manga_id: mangaId,
      //     genre_id: genre_id
      //   };

      //    mangaGenresArr.push(mangaGenre);
      // });

      // // var createMangaGenresPromise = MangaGenre.bulkCreate(mangaGenresArr);
      // return MangaGenre.bulkCreate(mangaGenresArr);
      return;
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

//processMangaLinks();

// Function to download an image based on a url provided
// and place the image in the public/images directory
var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    request(uri).pipe(fs.createWriteStream('./public/images/' + filename)).on('close', function() { console.log('Finished downloading image.') });
  });
};
