var browserSync = require('browser-sync');
var connectBrowserSync = require('connect-browser-sync');
var express = require('express');
var path = require('path');

var app = express();

var staticSources = path.join(__dirname, 'public');

var bs = browserSync.create();

bs.init({
  files: [staticSources ],
  tunnel: true,
}, function(err, b) {
  if (err) {
    console.error('Error starting BrowserSync', err.stack);
    return;
  }
  console.log('Tunnel:', b.tunnel.url);
});

app.use(connectBrowserSync(bs));

app.use(express.static(staticSources));

var server = app.listen(3000, 'localhost', function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Listening on http://' + host + ':' + port);
});
