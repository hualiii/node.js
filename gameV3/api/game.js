let winCount = 0
let userLastAction = null
let userSameAction = 0

const express = require('express')
const fs = require('fs')
const game = require('../lib/game')

const app = express()
app.get('/favicon.ico', (req, res) => {
    res.writeHead(200)
    res.end()
})
app.get('/', ((req, res) => {
    fs.createReadStream(__dirname + '/index.html').pipe(res)
}))
app.get('/game', (req, res, next) => {
    if (winCount > 2) {
        res.writeHead(500)
        res.end("500")
    }
    next()
    if (res.win) {
        winCount++
    } else {
        winCount = 0
    }
}, (req, res, next) => {
    const query = req.query
    const playerAction = query.action

    if (userLastAction === playerAction) {
        userSameAction++
    } else {
        userSameAction = 0
    }
    if (userSameAction > 3) {
        res.writeHead(400)
        winCount = 8
        res.end("400")
    }
    userLastAction = playerAction
    res.playerAction = playerAction
    next()

}, function (req, res) {
    const playerAction = res.playerAction
    const result = game(playerAction)
    res.writeHead(200)
    if (result === -1) {
        res.end("你输了")
    } else if (result === 0) {
        res.end("平局")
    } else {
        res.win = true
        res.end("你赢了")
    }
})
app.listen(3000)

