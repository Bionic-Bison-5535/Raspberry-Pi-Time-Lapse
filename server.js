const fs = require('fs');
const http = require('http');
const shell = require('shelljs');

const user = "pi";
const directory = "/home/" + user + "/Desktop/Timelapse";
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
  get : function() {
    return 60*parseInt(Date.call().slice(16,18)) + parseInt(Date.call().slice(19,21));
  },
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
  if (dir == "/live.jpg") {
    photo("live");
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
    }, 3500);
  } else {
    if (dir.indexOf("/home") != -1) {
      dir = "/home/" + user + "/Raspberry-Pi-Time-Lapse/index.html";
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
  if (req.url.indexOf('?') != -1) {
    if (req.url.toLowerCase().indexOf("?stop") != -1) {
      clearInterval(running);
    }
    if (req.url.toLowerCase().indexOf("?start") != -1) {
      clearInterval(running);
      running = setInterval(function() {
        if ((normalDays.list.includes(Date.call().slice(0,3)) && time.get() > time.a(normalDays) && time.get() < time.b(normalDays)) || (otherDays.list.includes(Date.call().slice(0,3)) && time.get() > time.a(otherDays) && time.get() < time.b(otherDays))) {
          photo();
        }
      }, 60000);
    }
    if (req.url.toLowerCase().indexOf("?shutdown"+shutdownpassword) != -1) {
      shell.exec("sudo shutdown -h now");
    }
    if (req.url.toLowerCase().indexOf("?reboot") != -1) {
      shell.exec("sudo reboot");
    }
    if (req.url.toLowerCase().indexOf("?pic") != -1) {
      photo();
    }
  }
}).listen(8000);

var shutdownpassword = "";