const fs = require('fs');
const http = require('http');
const ws = require('ws');
const wss = new ws.Server({noServer: true});

var timeLapseDirectory = "/home/pi/Desktop";
var enableFileRights = true;

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

http.createServer(function (req, res) {
  wss.handleUpgrade(req, req.socket, Buffer.alloc(0), function onSocketConnect(ws) {
    ws.on('message', function(message) {
      var DATA = "" + message;
      var DATAlist = eval(DATA);
      if (DATAlist[0] == "getMostRecent") {
        ws.send(mostRecentPhotoNumber(DATAlist[1], DATAlist[2]));
      }
      if (DATAlist[1] == "writeToFile") {
        if (DATAlist[2] == "𝚙𝚊𝚜𝚜𝚠𝚘𝚛𝚍 ") {
          writeToFile(DATAlist[3], DATAlist[4]);
        } else {
          console.log("HACKER ALERT! Someone incorrectly guessed the password for file writing to be:  " + DATAlist[2].toString());
          enableFileRights = false;
          setTimeout(function() {
            enableFileRights = true;
          }, 3000000);
          console.log("File writing has been shut down for the next 50 minutes.");
          console.log("");
        }
      }
    });
  });
}).listen(8001);

function four(Num) {
    var newNum = Num;
    while (newNum.length < 4) {
        newNum = "0" + newNum;
    }
    return newNum;
}

function mostRecentPhotoNumber(basePhotoName, folderOfPhoto) {
  var i = 0;
  var thisWorked = false;
  while (thisWorked == false && i < 10000) {
    fs.readFile(timeLapseDirectory + "/" + folderOfPhoto + "/" + basePhotoName + four(i.toString()) + ".jpg", function (err, data) {
      if (err) {
        i++;
      } else {
        thisWorked = true;
      }
    });
  }
  if (thisWorked) {
    return i;
  } else {
    return 0;
  }
}

function writeToFile(fileDirectory, fileNewData) {
  if (enableFileRights) {
    fs.writeFile(fileDirectory, fileNewData, function(err) {
      if (err) {
        console.log("An error occured while trying to save a file: ");
        console.log(err);
        console.log("");
      } else {
        console.log("File updated: " + fileDirectory);
        console.log("");
      }
    }); 
  } else {
    console.log("Someone tried to write to a file while file writing was disabled!  Only the disabler of file rights was there to protect your system!");
    console.log("  -  Attempted to access: " + fileDirectory);
    console.log("  -  Attempted to write:  " + fileNewData);
    console.log("");
  }
}
