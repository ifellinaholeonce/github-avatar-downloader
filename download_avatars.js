var request = require('request');
var fs = require('fs');
var GITHUB_TOKEN = require('./secrets.js').GITHUB_TOKEN;
var repoOwner = process.argv[2];
var repoName = process.argv[3];

//Make command line repoOwner and repoName mandatory
var checkArguments = function (repoOwner, repoName) {
  if (repoOwner === undefined || repoOwner === '' || repoOwner === ' ') {
    console.log("Please input a Repo Owner");
    return false;
  }

  if (repoName === undefined || repoName === '' || repoName === ' ') {
    console.log("Please input a Repo Name");
    return false;
  }
  return true;
};



//HTTP request
var getRepoContributors = function(repoOwner, repoName, callback) {
  //HTTP Options - repoOwner and repoName input into URL
  var options = {
    url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${GITHUB_TOKEN}`
    }
  };

  //Make the request call
  request(options, function(err, res, body) {
    body = JSON.parse(body);
    callback(err, body);
  });
};

//Initiate the request function and set the callback function to handle the response
  //Run the check against the inputs
if (checkArguments(repoOwner, repoName)) {
  getRepoContributors(repoOwner, repoName, function(err, res) {
    if (err) {
      console.log("Errors:", err);
    }
    res.forEach(function(user) {
      console.log("Downloading:", user.login, user.avatar_url);
      //Download avatars to directory /avatars/ and name each file the user login
      downloadImageByUrl(user.avatar_url, `./avatars/${user.login}`);
    });
  });
}
//Take the avatar URL from the request and save to filepath
var downloadImageByUrl = function(url, filePath) {
  request(url)
    .on('error', function(err) {
      console.log("There was an error", err);
    })
    .on('response', function (res) {
      console.log(url, res.statusCode, res.statusMessage);
    })
    .pipe(fs.createWriteStream(filePath)); //Save the actual file to disc
};

