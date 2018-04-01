var request = require('request');
var rp = require('request-promise');

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

module.exports = function(num, start) {
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