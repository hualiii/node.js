const game = require('./lib/game')
// get playerAction
let playerAction = process.argv[process.argv.length - 1]
let result = game(playerAction)
switch (result){
    case -1:
        console.log("你输了")
        break
    case 0:
        console.log("平局")
        break
    case 1:
        console.log("你赢了")
        break
    default:
        console.log("出bug了")
}
