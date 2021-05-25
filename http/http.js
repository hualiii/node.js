const http = require("http")
const fs = require("fs")

http.createServer(function (req, res) {
  if (req.url === '/favicon.ico') {
    res.writeHead(200)
    res.end()
    return
  }
  res.writeHead(200)
  console.log(__dirname + '/html/index.html')
  fs.createReadStream(__dirname + '/html/index.html').pipe(res)
}).listen(3000)