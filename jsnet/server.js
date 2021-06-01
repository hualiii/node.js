const net = require("net")

const server = net.createServer(socket => {
    socket.on('data', buffer => {
        const lessonId = buffer.readInt16BE(2)
        const seq = buffer.slice(0, 2)
        setTimeout(() => {
            const buf = Buffer.concat([seq, Buffer.from(data[lessonId])])
            socket.write(
                buf
            )
        }, 10 + Math.random() * 1000)
    })
})

server.listen(3000)

const data = {
    "1": "1||lesson 1",
    "2": "2||lesson 2",
    "3": "3||lesson 3",
    "4": "4||lesson 4",
    "5": "5||lesson 5",
    "6": "6||lesson 6",
    "7": "7||lesson 7",
    "8": "8||lesson 8",
    "9": "9||lesson 9",
    "10": "10||lesson 10",
    "11": "11||lesson 11",
    "12": "12||lesson 12",
    "13": "13||lesson 13",
}