const fs = require('fs');
const http = require('http');

var timeLapseDirectory = "/home/pi/Desktop/BisonTimeLapse";

http.createServer((req, res) => {
  fs.readFile("/home/pi/index.html", function (err, data) {
    if (err) {
      console.log("404: HTML file does not exist or is not where it needs to be!");
      console.log("Make sure that index.html is located in the /home/pi directory.");
      console.log();
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("<body style='text-align: center'><h1><b><u>404 Error</u></b></h1><h2>Page not found.  :(<br>If you are the server owner, please ensure that index.html is located in the /home/pi directory.</h2></body>");
    } else {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end();
    }
  });
}).listen(80);

http.createServer((req, res) => {
  fs.readFile(timeLapseDirectory + req.url, function (err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("<body style='text-align: center'><h1><b><u>404 Error</u></b></h1><h2>The image you have requested does not exist.  :(</h2></body>");
    } else {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end();
    }
  });
}).listen(8000);
