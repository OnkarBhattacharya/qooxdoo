var fs = require('fs');
var util = require("util");
var static = require('node-static');
var url = require('url');

var http = require("http").createServer(handleFunction);
http.listen(8000);

var fileServer = new static.Server('../');

var reporter = null;
var clients = [];

function handleFunction(request, response) {
  console.log(request.url);
  
  // if(request.url === "/") {
  //   response.writeHead(302, {location: "/server/index.html"});
  //   response.end();
  // }
  
  if(request.url == "/master") {
    setUpResponseForSSE(response);
    reporter = response;
  }
  
  else if(request.url == "/results") {
    //Check if it really is a POST-request
    if (request.method == "POST") {

      var fullBody = '';

      // as long as data come in, append the current
      // chunk of data to the fullBody variable
      request.on('data', function(chunk) {
          fullBody += chunk.toString();
        });

      // request finished, so close it and
      // report results to the reporter
      request.on('end', function() {
        response.writeHead(200);
        response.end();
        
        reporter.write('event:results' + '\n' +
                       'data:' + fullBody + '\n\n'); 
      });
    }
  }
  
  else if(url.parse(request.url).pathname == "/push") {
    
    request.on('end', function() {
      response.writeHead(200);
      response.end();
    });

    var buildTests = "../component/testrunner/build/script/tests.js";
    var sourceTests = "../component/testrunner/source/script/tests-source.js";
    
    if (url.parse(request.url).search == "?Suite3") {
      fs.readFile(buildTests, function (err, data) {
        if (err) throw err;
      
        var sseData = String(data).replace(/(\r\n|\n|\r)/gm, "\ndata:");
    
        //console.log(fileName, "changed");
    
        var responseText = [
            'event:' + 'autCode',
            'data:' + sseData
          ].join("\n") + "\n\n";
        
        clients.forEach(function(res){
          res.write(responseText);
        });
        //console.log(sseData);
        console.log("Pushed!");
      });
    }
    
    // fs.watchFile(buildTests, function (curr, prev) {
    // 
    // });
    
    // fs.watchFile(sourceTests, function(curr, prev) {
    //   var responseText = [
    //       'event:' + 'autUri',
    //       'data:' + "../source/html/tests-source.html"
    //       // 'data:' + "./html/tests-source.html"
    //     ].join("\n") + "\n\n";
    // 
    //   response.write(responseText);
    //   
    // });
  }
  
  else if(request.url == "/events") {
    //console.log(request.headers["user-agent"]);
    
    
    var client = {};
    
    // in case of reconnection, keep the old client.id
    if (request.headers['last-event-id']) {
      var lastId = parseInt(request.headers['last-event-id'])-1;
      client.id = lastId;
    }
    else {
      // save the response in clients-array
      clients.push(response);
      
      // clientId - 1 = index in clients[]
      client.id = clients.indexOf(response)+1;
    }
    
    setUpResponseForSSE(response);
    
    if(reporter != null) {
      
      // extract platform an OS-Version
      client.device = detectDevice(request.headers["user-agent"]);
      
      // client gets his ID
      response.write('event:clientId' + '\n' +
                     'data:' + client.id + '\n\n'); 
      
      // reporter gets notified about new client
      reporter.write('event:clientJoined' + '\n' +
                     'data:' + JSON.stringify(client) + '\n\n');
                     
    }
    
    else {
      /*
        TODO: Fix this. Causes a reconnection-loop if master is not available
      */
      response.end();
    }
    
    //client left!
    request.on('close', function () {
      
      // remove it from clients-array
      var clientId = clients.indexOf(response);
      delete clients[clientId];
      
      // notify reporter about it
      if(reporter != null) {
        reporter.write('event:clientLeft' + '\n' +
                       'data:' + (clientId+1) + '\n\n'); 
      }
    });

  }
  // requests to every other URL are interpreted as requests
  // for files
  else {
    request.addListener('end', function () {
      fileServer.serve(request, response, function (err, result) {
        // there was an error serving the file
        if (err) {
          // report the error to the console 
          util.error("Error serving " + request.url + " - " + err.message);
    
          // respond to the client with 404
          response.writeHead(err.status, err.headers);
          response.end();
        }
      });
    });
  }
}

function setUpResponseForSSE (response) {
  response.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    //neccessary for IE
    "Access-Control-Allow-Origin": "*"
  });
    
  //2kb padding for IE
  response.write(':' + Array(2049).join(' ') + '\n');
  
  /**
   * sending a periodic comment for keeping connection alive
   * is recommended especially for IE 
   */
  setInterval(function () {
    response.write(':\n');
  } , 15000); 
}

function detectDevice(userAgentString){
  var reg = /(iP(?:hone|od|ad))(?:.*?)( [1-6](_[0-9])+)|Android [0-9](\.[0-9])+|Windows Phone OS [7-9]\.[0-9]/ig;
  var match = reg.exec(userAgentString);
  
  if (!match) {
    return "Other";
  }
  
  else if (match[1] && match[2]) {
    //doesnt work with 5.1.1. shows: 5.1_1
    // return match[1] + String(match[2]).replace(/_/,".");
    return match[1] + match[2];
  } 
  
  else {
    return match[0];
  }

}
 

// var io = require('socket.io').listen(http);
// 
// io.sockets.on('connection', function (socket) {
// 
//   var fileName = "component/testrunner/source/script/tests-source.js";
// 
//   fs.watchFile(fileName, function (curr, prev) {
//     
//     fs.readFile(fileName, function (err, data) {
//       if (err) throw err;
//       //console.log(data);
//       socket.emit('testsuitechange', data.toString());
//     });
//   });
//   
//   socket.on('callback', function(data) {
//     console.log("What came back: " + data.toString());
//   });
// });