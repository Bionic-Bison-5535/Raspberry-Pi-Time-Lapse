const fs = require('fs');
const http = require('http');
const shell = require('shelljs');

const directory = "/home/pi/Desktop/Timelapse";
var RES;

var normalDays = {
  list : ["Mon", "Tue", "Wed", "Thu", "Fri"],
  startHour : 17,
  startMin : 0,
  endHour : 20,
  endMin : 0
};
var otherDays = {
  list : ["Sat"],
  startHour : 8,
  startMin : 30,
  endHour : 15,
  endMin : 30
}

var time = {
  hour : parseInt(Date.call().slice(16,18)),
  minute : parseInt(Date.call().slice(19,21)),
  get : 60*parseInt(Date.call().slice(16,18)) + parseInt(Date.call().slice(19,21)),
  a : function(obj) {
    return (60*obj.startHour + obj.startMin);
  },
  b : function(obj) {
    return (60*obj.endHour + obj.endMin);
  },
  name : function() {
    return (Date.call().slice(4, 21)).replaceAll(" ","_");
  }
}

function photo(fileName = "") {
  if (fileName == "") {
    shell.exec("raspistill -o " + directory + "/" + time.name() + ".jpg");
  } else {
    shell.exec("raspistill -o " + directory + "/" + fileName + ".jpg");
  }
}

var running = setInterval(function() {
  if ((normalDays.list.includes(Date.call().slice(0,3)) && time.get() >= time.a(normalDays) && time.get() <= time.b(normalDays)) || (otherDays.list.includes(Date.call().slice(0,3)) && time.get() >= time.a(otherDays) && time.get() <= time.b(otherDays))) {
    photo();
  }
}, 60000);

http.createServer(function (req, res) {
  var dir = req.url;
  if (dir == "live") {
    photo("live");
    res.writeHead(202);
    RES = res;
    setTimeout(function() {
      fs.readFile(directory + "/live.jpg", function (err, data) {
        if (err) {
          RES.writeHead(204);
          RES.end();
        } else {
          RES.writeHead(200);
          RES.end(data);
        }
      });
    }, 2000);
  } else {
    if (dir.length < 3) {
      dir = "/home/pi/index.html";
    } else {
      dir = directory + dir;
    }
    fs.readFile(dir, function (err, data) {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end("<body style='text-align:center;background-color:black'><h1 style='color:cyan'><b>404</b></h1><h2 style='color:red'>File not found.</h2><h1 style='font-size:200px;color:white'>):</h1></body>");
      } else {
        res.writeHead(200);
        res.end(data);
      }
    });
  }
  if (dir.indexOf('#') != -1) {
    if (dir.toLowerCase().indexOf("#stop") != -1) {
      clearInterval(running);
    }
    if (dir.toLowerCase().indexOf("#start") != -1) {
      clearInterval(running);
      var running = setInterval(function() {
        if ((normalDays.list.includes(Date.call().slice(0,3)) && time.get() > time.a(normalDays) && time.get() < time.b(normalDays)) || (otherDays.list.includes(Date.call().slice(0,3)) && time.get() > time.a(otherDays) && time.get() < time.b(otherDays))) {
          photo();
        }
      }, 60000);
    }
  }
}).listen(8000);
