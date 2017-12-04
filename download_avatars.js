var request = require('request');
var GITHUB_TOKEN = require('./secrets.js').GITHUB_TOKEN;


var getRepoContributors = function(repoOwner, repoName, callback) {
  var options = {
    url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + GITHUB_TOKEN
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
    console.log("Avatar:", user.avatar_url);
  });
});