var http = require('http'); //How to require modules

http.createServer(function(req, res) {
  res.writeHead(200); //status code in header
  res.write("Hello, there from node!");
  setTimeout(function() {
    res.write("Dog is done");
    res.end(); //Closes the connection
  }, 5000);
}).listen(8080);

console.log("Listening on port 8080 "); //ensures that server's functioning
