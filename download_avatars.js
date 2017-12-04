var request = require('request');
var GITHUB_TOKEN = require('./secrets.js');

var getRepoContributors = function(repoOwner, repoName, callback) {
  var options = {
    url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
    headers: {
      'User-Agent': 'request',
      'Authorization': GITHUB_TOKEN
    }
};

  request(options, function(err, res, body) {
    callback(err, body);
  });
};

getRepoContributors("jquery", "jquery", function(err, res) {
  console.log("Errors:", err);
  console.log("Result:", res);
});