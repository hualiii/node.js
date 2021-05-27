const http = require('http')
const url = require('url')
const fs = require('fs')
const queryString = require('querystring')
const game = require('../lib/game')
http.createServer(function (req, res) {
    const parseUrl = url.parse(req.url)
    if (parseUrl.pathname === '/favicon.ico') {
        res.writeHead(200)
        res.end()
        return
    }
    if (parseUrl.pathname === '/') {
        fs.createReadStream('../index.html').pipe(res)
    }
    if (parseUrl.pathname === '/game') {
        const query = queryString.parse((parseUrl.query))
        const playerAction = query.action
        const result = game(playerAction)
        res.writeHead(200)
        switch (result) {
            case -1:
                res.end("你输了")
                break
            case 0:
                res.end("平局")
                break
            case 1:
                res.end("你赢了")
                break
        }
    }
}).listen(3000)