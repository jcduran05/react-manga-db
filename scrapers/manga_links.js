var request = require('request');
var rp = require('request-promise');

var cheerio = require('cheerio');
var Promise = require('bluebird');
// Example of links that will be generateed
// rp('https://myanimelist.net/topmanga.php'), // 1 - 50
// rp('https://myanimelist.net/topmanga.php?limit=50'), // 51 - 100
// rp('https://myanimelist.net/topmanga.php?limit=100'), // 101 - 150
// rp('https://myanimelist.net/topmanga.php?limit=150'), // 151 - 200
// rp('https://myanimelist.net/topmanga.php?limit=200'), // 201 - 250
// rp('https://myanimelist.net/topmanga.php?limit=250'), // 251 - 300
// rp('https://myanimelist.net/topmanga.php?limit=300'), // 301 - 350
// rp('https://myanimelist.net/topmanga.php?limit=350'), // 351 - 400
// rp('https://myanimelist.net/topmanga.php?limit=400'), // 401 - 450
// rp('https://myanimelist.net/topmanga.php?limit=450'), // 451 - 500
// rp('https://myanimelist.net/topmanga.php?limit=500'), // 550

// Num will be the quantity of items that we are looking for
// Start will be where we are starting from to slowly collect data
// Because of filtering, there may be less than the num passed

var generateUrls = function(num, start) {
  var linksArr = [];
  
  if (num > 100) {
    var quantity = num / 50;
    linksArr.push(rp(`https://myanimelist.net/topmanga.php`));
    for (var i = start; i < num; i+= 50) {
      linksArr.push(rp(`https://myanimelist.net/topmanga.php?limit=${i}`));
    }
  } else {
    linksArr.push(rp('https://myanimelist.net/topmanga.php')); // 1 - 50
  }

  return linksArr;
};

var processUrlsAndGetComics = function(pagesOfTableData) {
  var manga_links = [];
  var manga = [];
  return Promise.all(pagesOfTableData)
  .then(function (htmlArr) {
    htmlArr.forEach(function(htmlObj, idx) {
      var $ = cheerio.load(htmlObj);

      //console.log(htmlObj);
      // Process html to get top manga
      $('.ranking-list').each(function(idx, elem) {
        // Analyzing text to make sure it's a manga and not a novel
        var text = $(this).find('.title .detail .information').text();

        // This table also includes books. Seaching for manga
        // before adding is to our list
        if (text.includes('Manga')) {
          var mangaTitleLink = $(this).find('.hoverinfo_trigger');
          var manga_title = $(mangaTitleLink).text();
          var manga_link = $(mangaTitleLink).attr('href');

          var score = $(this).find('.score .text').text();
          score = score ? score : 0;

          manga.push({ title: manga_title, score: score });
          manga_links.push(manga_link);
        }
      });
    });

    // Populate db with manga data
    // var mangaPromise = Manga.bulkCreate(manga);
    //return mangaPromise;
    return [manga, manga_links];
  })
  .then(function(createdMangaArr) {
    console.log('Seeded manga table successfully.');
    // return processMangaLinks();
    return createdMangaArr;
  })
  .catch(errorFunc);
};

var errorFunc = function(err) {
  // console.log(err);
}

module.exports.generateUrls = generateUrls;
module.exports.processUrlsAndGetComics = processUrlsAndGetComics;