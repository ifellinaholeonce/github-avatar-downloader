var request = require('request');
var fs = require('fs');
var GITHUB_TOKEN = require('./secrets.js').GITHUB_TOKEN;


var getRepoContributors = function(repoOwner, repoName, callback) {
  var options = {
    url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${GITHUB_TOKEN}`
    }
};

  request(options, function(err, res, body) {
    body = JSON.parse(body);
    callback(err, body);
  });
};

getRepoContributors("jquery", "jquery", function(err, res) {
  if (err) {
    console.log("Errors:", err);
  }
  res.forEach(function(user) {
    console.log("Downloading:", user.login, user.avatar_url);
    downloadImageByUrl(user.avatar_url, `./avatars/${user.login}`);
  });
});

var downloadImageByUrl = function(url, filePath) {
  request(url)
    .on('error', function(err) {
      console.log("There was an error", err);
    })
    .on('response', function (res) {
      console.log(url, res.statusCode, res.statusMessage);
    })
    .pipe(fs.createWriteStream(filePath));
};

