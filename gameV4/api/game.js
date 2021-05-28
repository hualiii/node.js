let winCount = 0
let userLastAction = null
let userSameAction = 0

const fs = require('fs')
const game = require('../lib/gameLib')
const koa = require('koa')
const mount = require('koa-mount')
const app = new koa()
app.use(
    mount('/favicon.ico', (ctx) => {
        ctx.status = 200
    })
)

const gameKoa = new koa()
gameKoa.use(
    async (ctx, next) => {
        if (winCount > 2) {
            ctx.status = 500
            ctx.body = "500"
            return
        }
        await next()
        if (ctx.win) {
            winCount++
        } else {
            winCount = 0
        }
    }
)
gameKoa.use(
    async (ctx, next) => {
        const query = ctx.query
        const playerAction = query.action
        if (userLastAction === playerAction) {
            userSameAction++
        } else {
            userSameAction = 0
        }
        if (userSameAction > 3) {
            winCount = 8
            ctx.status = 400
            ctx.body = "400"
            return
        }
        userLastAction = playerAction
        ctx.playerAction = playerAction
        await next()
    }
)
gameKoa.use(
    async (ctx) => {
        const playerAction = ctx.playerAction
        const result = game(playerAction)
        await new Promise(resolve => {
            setTimeout(() => {
                ctx.status = 200
                if (result === -1) {
                    ctx.body = "你输了"
                } else if (result === 0) {
                    ctx.body = "平局"
                } else {
                    ctx.win = true
                    ctx.body = "你赢了"
                }
                resolve()
                console.log(winCount)
            }, 1000)
        })
    }
)
app.use(mount('/game', gameKoa))
app.use(
    mount('/', (ctx) => {
        ctx.body = fs.readFileSync(__dirname + '/index.html', 'utf-8')
    })
)
app.listen(3000)
