const path = require('path')
const WebSocket = require('ws')
const { v4: uuidv4 } = require('uuid')

const messages = []

const wss = new WebSocket.Server({ port: 5000 })
// Подключаем библиотеку для работы с Telegram API в переменную
var TelegramBot = require('node-telegram-bot-api');

// Устанавливаем токен, который выдавал нам бот
var token = '1745049044:AAFGx-9AyDi3P1v28SKMpLYrpI50uttlGfA';
// Включить опрос сервера. Бот должен обращаться к серверу Telegram, чтобы получать актуальную информацию
// Подробнее: https://core.telegram.org/bots/api#getupdates
var bot = new TelegramBot(token, { polling: true });

// Простая команда без параметров
wss.on('connection', (ws) => {
  let stateAnswer = false
  bot.on('callback_query', function () {
    stateAnswer = true;
  });
  bot.on('message', function (msg) { // Берем ID чата (не отправителя)
    var answer = msg.text; // Делим ответ на две части, превратив в массив. Первый элемент номер вопроса, второй будет вариант ответа.
    if(stateAnswer){
      const message = {
        _id: uuidv4(),
        text: answer,
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'Support'
        }
      }
      ws.send(JSON.stringify({ message }))
    }
    
    stateAnswer = false;
  });

  ws.on('message', (data) => {
    const { message } = JSON.parse(data)
    var options = {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: 'Ответить', callback_data: message._id }]
        ]
      })
    };
    bot.sendMessage(60206119, message.text, options);
    messages.unshift(message)
  })

  ws.send(JSON.stringify({ initial: true, message: messages }))
})