var request = require('request');
var rp = require('request-promise');

// Num will be the quantity of items that we are looking for
// Because of filtering, there may be less than the num passed
module.exports = function(num) {
  var linksArr = [];

  if (num > 100) {
    var quantity = num / 50;
    linksArr.push(rp(`https://myanimelist.net/topmanga.php`));
    for (var i = 50; i < num; i+= 50) {
      linksArr.push(rp(`https://myanimelist.net/topmanga.php?limit=${i}`));
    }
  } else {
    linksArr.push(rp('https://myanimelist.net/topmanga.php')); // 1 - 50
  }

  console.log(linksArr);
  return linksArr;
};