const http = require('http')
const url = require('url')
const fs = require('fs')
const queryString = require('querystring')
const game = require('../lib/game')
let winCount = 0
let userLastAction = null
let userSameAction = 0
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
        if (winCount > 2) {
            res.writeHead(500)
            res.end("500")
        }
        if (userLastAction === playerAction) {
            userSameAction++
        } else {
            userSameAction = 0
        }
        if (userSameAction > 2) {
            res.writeHead(400)
            res.end("400")
        }
        userLastAction = playerAction
        res.writeHead(200)
        if (result === -1) {
            res.end("你输了")
            winCount = 0
        } else if (result === 0) {
            winCount = 0
            res.end("平局")
        } else {
            winCount++
            res.end("你赢了")
        }
    }
}).listen(3000)