var request = require('request');
var rp = require('request-promise');

var cheerio = require('cheerio');
var Promise = require('bluebird');
// Example of author links
// https://myanimelist.net/people/1117/Makoto_Shinkai
// https://myanimelist.net/people/12086/Ranmaru_Kotone


var fetchAuthorData = function(url) {
    rp(url)
    .then(function (html) {
        var $ = cheerio.load(html);
        //console.log(html);

        // Laying out data that I will be scraping for
        var author = {
            first_name: '',
            last_name: '',
            jp_first_name: '',
            jp_last_name: '',
            birthday: '',
            website: '',
        };

        var works = {};

        // Need to work on this. Text isn't in tags
        // which makes it tricky to work with
        $('.spaceit_pad').each(function(idx, elem) {
            var author_data = $(this).contents();
            // if (author_data.includes('Given name:')) {
            //     author[first_name] = author_data.replace('Given name: ', '');
            // }
        });

        // Looks for links that have a pattern
        // /manga/[digits]/[name of comic]
        // If they exist in the DB add data to pivot table
        $('a').each(function(idx, elem) {
            var link = $(elem).attr('href');
            var mangaRegex = /\/manga\/\d*\/\w*/g;

            if (mangaRegex.test(link)) {
                console.log(link);
                var title = $(elem).text();
                if (title.length) {
                    works[title] = title;
                }
            }
        });

        return [author, works];
    })
    .then(function(authorData) {
        //console.log('Author table was updated successfully.');
        return authorData[1];
    })
    .then(function(authorData) {
        console.log('Pviot table was updated successfully.');
        return;
    })
    .catch(errorFunc);
};

var errorFunc = function(err) {
  // console.log(err);
}

fetchAuthorData('https://myanimelist.net/people/1117/Makoto_Shinkai')

module.exports.fetchAuthorData = fetchAuthorData;