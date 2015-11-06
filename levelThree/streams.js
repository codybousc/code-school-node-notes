
//How to read from the Request object?

http.createServer(function(request, response) {
  response.writeHead(200);
  request.on('readable', function() {
    var chunk = null;
    while (null !==(chunk = request.read())) {
      response.write(chunk);
    }
  });
  request.on('end', function() {
    response.end();
  });
}).listen(8080)


//all of code above can be replaced with one line using pipe helper function
http.createServer(function(request, resposne) {
  response.writehead(200);
  request.pipe(response);
}).listen(8080)


//Reading and Writing a File (Don't get yet)

var fs = require('fs'); //require filesystem module

var file = fs.createReadStream("readme.md");
var newFile = fs.createWriteStream("readme_copy.md");

file.pipe(newFile);


//Upload a File
var fs = require('fs');
var http = require('http');

http.createServer(function(request, response) {
  var newFile = fs.createWriteStream("readme_copy.md");
  request.pipe(newFile);

  request.on('end', function() {
    response.end('uploaded!');
  });
}).listen(8080);

//Upload a file and give progress report throughout upload process

http.createServer(function(request, response) {
  var newFile = fs.createWriteStream("readme_copy.md");
  var fileBytes = request.headers['content-length'];
  var uploadedBytes = 0;
  request.on('readable', function() {
    var chunk = null;
    while(null !==(chunk = request.read())) {
      uploadedBytes += chunk.length;
      var progress = (uploadedBytes /fileBytes) * 100;
      response.write("progress: " + parseInt(progress, 10) + "%\n");
    }
  });
  request.pipe(newFile);
}).listen(8080);



//avoids automatic end call when using pipe
reader.pipe(writer, { end: false });
reader.on('end', function() {
  writer.end('Goodbye\n');
});
