//suppose this funcion is in file named custom_hello.js
var hello = function() {
  console.log("hello!");
}

//in order to make this function public we need to use module.exports

module.exports = hello;

//goodbye module explicitly sets goodby to an export

exports.goodbye = function() {
  console.log("bye!");
}

//if we wanted to use this function/module in app.js, we'd need to write:
//app.js file
var hello = require('./custom_hello');

hello();

var gb = require('./custom_goodbye');

gb.goodbye();

//one liner for goodbye
require('./custom_goodbye').goodbye();

====================================================

//my_module.js
var foo = function() {}
var bar = function() {}
var baz = function() {}

exports.foo = foo;
exports.bar = bar;


//app.js
var myMod = require('./my_module');
myMod.foo();
myMod.bar();

=====================================================================
//http request
//make_request.js

var http = require('http');
var message = "Here's looking at you, kid";
var options = {
  host: 'localhost', port: 8080, path: '/', method: 'POST'
}

var request = http.request(options, function(response) {
  response.on('data', function(data) {
    console.log(data); //logs resposne body
  });
});

request.write(message); begins request
request.end();


//request encapsulated as function

var makeRequest = function(message) {
  var http = require('http');
  var message = "Here's looking at you, kid";
  var options = {
    host: 'localhost', port: 8080, path: '/', method: 'POST'
  }

  var request = http.request(options, function(response) {
    response.on('data', function(data) {
      console.log(data); //logs resposne body
    });
  });

  request.write(message); begins request
  request.end();
}

makeRequest("Here's looking at you, kid.");


//make this function a module

module.exports = makeRequest;


//app.js

var makeRequest = require('./make_request');

makeRequest("Here's looking at you, kid");
makeRequest("Hello, there dog");

===================================================
Requiring modules
var make_request = require('./make_request') looks in same directory
var make_request = require('../make_request') looks in parent directory

========================
NPM
Comes with node
module respository
dependency management
easily publish modules

npmjs.org

in/Home/my_app
npm install request

Installs into local node_modules directory
Home/my_app/node_modules/request


Local vs Global

Install modules with executables globally
npm install coffee-script -g

GLOBALLY nmp module cant be required
must be installed locally in your application

var coffee = require('coffee-script'); DOES NOT WORK
npm install coffee-script PROPER WAY
var coffee = require('coffee-script');
