const net = require("net")
const socket = new net.Socket({})

socket.connect({
    host: "127.0.0.1",
    port: 3000
})

const lessonIds = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"]
let seq = 0

function encode(index) {
    let buffer = Buffer.alloc(4)
    buffer.writeInt16BE(seq)
    buffer.writeInt16BE(
        lessonIds[index], 2
    )
    console.log(seq, lessonIds[index])
    seq++
    return buffer
}

setInterval(() => {
    let lessonId = Math.floor(Math.random() * lessonIds.length)
    socket.write(encode(lessonId))
}, 50)

socket.on("data", buffer => {
    const seqBuffer = buffer.slice(0, 2)
    const title = buffer.slice(2)
    console.log(seqBuffer.readInt16BE(), title.toString())
})
