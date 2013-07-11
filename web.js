var http = require("http");
var fs = require("fs");

var port = process.env.PORT || 5000;
var pageIndex = "";

pageIndex = fs.readFileSync("index.html");

http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(pageIndex);
  response.end();
}).listen(port);
