const path = require('path');
const http = require('http')
const fs = require('mz/fs');
const guestsPath = path.join(__dirname, 'guests.json');

const server = http.createServer (function (req, res) {
    if (req.method === 'GET' && req.url === '/guests') {

      fs.readFile(guestsPath, 'utf8')
        .then(function(guestsJSON) {
          res.setHeader('Content-Type', 'application/json')
          res.end(guestsJSON)
        })
          .catch(function(err) {
            console.error(err.stack);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/plain');
            return res.end('Internal Server Error');
          })
    } else {
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/plain')
        res.end('Not found')
    }
})

server.listen(8000, function() {
  console.log('Listening at localhost:8000')
});
