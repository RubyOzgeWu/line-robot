// import 'dotenv/config'
// import linebot from 'linebot'

// import data from './data.js'

// data.fetchData()


// const bot = linebot({
//   channelId: process.env.CHANNEL_ID,
//   channelSecret: process.env.CHANNEL_SECRET,
//   channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
// })

// bot.on('message', (event) => {
//   if (data.restaurants.length === 0) {
//     event.reply('資料讀取中，請稍後再試')
//   } else if (event.message.type == 'text') {
//     if (event.message.text === '餐廳') {
//       data.replyRestaurants(event)
//     }
//   }
// })

// bot.listen('/', process.env.PORT || 3000, () => {
//   console.log('機器人啟動123456')
// })

import 'dotenv/config'
import linebot from 'linebot'

import data from './data.js'

data.fetchData()


const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.on('message', (event) => {
  if (data.restaurants.length === 0) {
    event.reply('資料讀取中，請稍後再試')
  } else if (event.message.type == 'text') {
    // 之後再看怎麼簡化48行
    if (event.message.text === '印度料理'|event.message.text === '印尼料理'|event.message.text === '中式料理'|event.message.text === '異國料理'|event.message.text === '泰式料理'|event.message.text === '摩洛哥料理'|event.message.text === '土耳其料理'|event.message.text === '義大利料理') {
      data.replyRestaurants(event)
    }
  }
})

bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動123456')
})