const path = require('path')
const WebSocket = require('ws')
const { v4: uuidv4 } = require('uuid')
const { createServer } = require('./createServer')

const app = createServer(path.resolve(__dirname, './public'), 3000)

const messages = [{
  _id: uuidv4(),
  text: 'Hello! How can I help you?',
  createdAt: new Date(),
  user: {
    _id: 1,
    name: 'Support'
  }
}]

const wss = new WebSocket.Server({ port: 5000 })
wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    const { message } = JSON.parse(data)
    messages.unshift(message)
    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data)
      }
    })
  })

  ws.send(JSON.stringify({ initial: true, message: messages }))
})