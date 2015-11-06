Node is low level. You'll want a web framework if you're going to build a
web app. Express is a web framework that 'sits on top of' node.
Express gives you:
Easy route URLs to callbacks
Middleware (from Connect)
Environment based configuration
Redirection helpers
File Uploads


//first step
npm install --save express //installs the module and adds to package.json

var express = require('express');

var app = express();


//Start defining endpoints

app.get('/', function(request, response) {
  response.sendFile(__dirname + "/index.html"); //__dirname is the local directory
});

app.listen(8080);
//code above explanation
if someone does a get request, it will call the callback we're sending in
we call the response.sendFile which will read in a file from our file system
(__dirname is the current directory) and send it back with the response
lastly, you tell it to listen on port 8080
to run the code:
node app.js (or name of file)
curl http://localhost:8080/

============================================================
//Twitter Example
var request = require('request');
var url = require('url');

app.get('/tweets/:username', function(request, response) {
  var username = request.params.username;

  options = {
    protocol: "http:",
    host: 'api.twitter.com',
    pathname: '/1/statuses/user_timeline.json',
    query: {screen_name: username, count: 10}
  }

  var twitterUrl = url.format(options);
  request(twitterUrl).pipe(response);
});

//doesn't work because of twitter's new authentication requirement


to run:
1) start node server (node app.js)
2) hit the url
curl -s http://localhost:8080/tweets/codisimus_deux
3) this outpust a messy response of json. To format this, use a moduel called pretty json
4) install pretty json
npm install prettyjson -g
5) call curl again but pipe pretty json
curl -s http://localhost:8080/tweets/codisimus_deux | prettyjson

Instead of piping the json through, you can pull the info into your brwoser using templates
This example uses a templating library called "ejs" (which stands for embedded JS)
1) install ejs
npm install ejs (installs the module and adds to package.json)
2) by defualt, it will look for templates under the views directory
Home/cody/my_app/views

//back in app.js

instead of using pipe, we're going to send a request and give it a callback so that
we have access to the errors, response and body.

app.get('/tweets/:username', function(req, response) {
  ...(past code)
  request(url, function(err, res, body) {
    var tweets = JSON.parse(body);
    response.locals = {tweets: tweets, name: username};
    response.render('tweets.ejs');
  });
});
