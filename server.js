const fs = require('fs');
const http = require('http');

var timeLapseDirectory = "/home/pi/Desktop";

http.createServer(function (req, res) {
  fs.readFile("/home/pi/index.html", function (err, data) {
    if (err) {
      console.log("404: HTML file does not exist or is not where it needs to be!");
      console.log("Make sure that index.html is located in the /home/pi directory.");
      console.log();
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("<body style='text-align: center'><h1 style='color: aqua'><b><u>404</u></b></h1><h2>File not found.<br><b>:(</b><br>If you are the server owner, please ensure that index.html is located in the /home/pi directory.</h2></body>");
    } else {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end();
    }
  });
}).listen(8000);

http.createServer(function (req, res) {
  fs.readFile(timeLapseDirectory + req.url, function (err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("<body style='text-align: center'><h1 style='color: aqua'><b><u>404</u></b></h1><h2>File not found.<br><b>:(</b></h2></body>");
    } else {
      res.writeHead(200);
      res.write(data);
      return res.end();
    }
  });
}).listen(7777);