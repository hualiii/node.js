// get playerAction
const playerAction = process.argv[process.argv.length - 1]
// get computerAction
let random = Math.random() * 3
let computerAction = undefined
if (random < 1) {
    computerAction = "rock"
} else if (random < 2) {
    computerAction = "scissor"
} else {
    computerAction = "papers"
}
// get game result
if (playerAction === computerAction) {
    console.log("平局")
} else if (
    playerAction === "rock" && computerAction === "scissor" ||
    playerAction === "scissor" && computerAction === "papers" ||
    playerAction === "papers" && computerAction === "rock"
) {
    console.log("你赢了")
} else if (
    playerAction === "rock" && computerAction === "papers" ||
    playerAction === "scissor" && computerAction === "rock" ||
    playerAction === "papers" && computerAction === "scissor"
) {
    console.log("你输了")
}