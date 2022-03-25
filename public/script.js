const output = document.getElementById('output')
const input = document.getElementById('input')
const sendButton = document.getElementById('sendButton')

const username = prompt('Digite seu nome de usuário')

const socket = io()

socket.on('connect', () => {
    console.log(`> Connected with id: ${socket.id}`)
    socket.emit('requestChatMessage')
})

socket.on('sendTextForClient', (message) => {
    output.innerHTML = output.innerHTML == '' ? message : output.innerHTML + '<br>' + message
})

socket.on('sendChatMessageForClient', (chatMessage) => {
    output.innerHTML = ''
    
    for (const message of chatMessage) {
        output.innerHTML = output.innerHTML == '' ? message : output.innerHTML + '<br>' + message
    }
})

sendButton.addEventListener('click', send)

function send() {
    const message = username + ': ' + input.value

    input.value = ''

    socket.emit('sendMessageForServer', message)
}