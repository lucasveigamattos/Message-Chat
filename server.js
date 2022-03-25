import http from 'http'
import express from 'express'
import * as sockets from 'socket.io'

const app = express()
const port = 3000

const server = http.createServer(app)
const io = new sockets.Server(server)

const chatMessage = []

app.use(express.static('public'))

server.listen(port, () => {
    console.log(`> Server running on port: ${port}`)
})

io.on('connection', (socket) => {
    console.log(`> ${socket.id} connected!`)

    socket.on('sendMessageForServer', (message) => {
        io.emit('sendTextForClient', message)

        chatMessage.push(message)
    })

    socket.on('requestChatMessage', () => {
        io.emit('sendChatMessageForClient', chatMessage)
    })
})