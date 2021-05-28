module.exports = function (playerAction) {
    // get computerAction
    let random = Math.random() * 1
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
        return 0
    } else if (
        playerAction === "rock" && computerAction === "scissor" ||
        playerAction === "scissor" && computerAction === "papers" ||
        playerAction === "papers" && computerAction === "rock"
    ) {
        return 1
    } else if (
        playerAction === "rock" && computerAction === "papers" ||
        playerAction === "scissor" && computerAction === "rock" ||
        playerAction === "papers" && computerAction === "scissor"
    ) {
        return -1
    }
}