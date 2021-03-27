const ip = '10.0.3.125'
const ws = new WebSocket(`ws://${ip}:5000`)
const messages = []

ws.onmessage = ({ data }) => {
  const { initial, message } = JSON.parse(data)
  if (initial) {
    messages.splice(0, messages.length, ...message)
    messages.reverse().forEach(append)
  } else {
    messages.push(message)
    append(message)
  }
}

const chat = document.getElementById('chat')

function append(message) {
  const elem = document.createElement('div')
  elem.className = message.user._id === 1 ? 'admin' : 'user'
  elem.innerText = message.text
  chat.appendChild(elem)
}

function send() {
  const text = document.getElementById('text')
  const message = {
    _id: uuidv4(),
    text: text.value,
    createdAt: new Date(),
    user: {
      _id: 1,
      name: 'Support'
    }
  }
  ws.send(JSON.stringify({ message }))
  append(message)
  text.value = ''
}

function uuidv4() {
  if (window.crypto && window.crypto.getRandomValues) {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
  }

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}