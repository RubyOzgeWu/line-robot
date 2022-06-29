import axios from 'axios'
import cheerio from 'cheerio'
import template from './template.js'
import fs from 'fs'
import { Client } from '@googlemaps/google-maps-services-js'


const restaurants = []

const fetchData = async () => {
  try {
    let page = []
    page[0] = await axios.get('https://eng.taiwan.net.tw/m1.aspx?sNo=0020323&page=1')
    page[1] = await axios.get('https://eng.taiwan.net.tw/m1.aspx?sNo=0020323&page=2')
    page[2] = await axios.get('https://eng.taiwan.net.tw/m1.aspx?sNo=0020323&page=3')
    page[3] = await axios.get('https://eng.taiwan.net.tw/m1.aspx?sNo=0020323&page=4')
    page[4] = await axios.get('https://eng.taiwan.net.tw/m1.aspx?sNo=0020323&page=5')
    page[5] = await axios.get('https://eng.taiwan.net.tw/m1.aspx?sNo=0020323&page=6')
    page[6] = await axios.get('https://eng.taiwan.net.tw/m1.aspx?sNo=0020323&page=7')
    page[7] = await axios.get('https://eng.taiwan.net.tw/m1.aspx?sNo=0020323&page=8')
    page[8] = await axios.get('https://eng.taiwan.net.tw/m1.aspx?sNo=0020323&page=9')
    page[9] = await axios.get('https://eng.taiwan.net.tw/m1.aspx?sNo=0020323&page=10')
    page[10] = await axios.get('https://eng.taiwan.net.tw/m1.aspx?sNo=0020323&page=11')
    page[11] = await axios.get('https://eng.taiwan.net.tw/m1.aspx?sNo=0020323&page=12')
    page[12] = await axios.get('https://eng.taiwan.net.tw/m1.aspx?sNo=0020323&page=13')
    page[13] = await axios.get('https://eng.taiwan.net.tw/m1.aspx?sNo=0020323&page=14')
    page[14] = await axios.get('https://eng.taiwan.net.tw/m1.aspx?sNo=0020323&page=15')
    page[15] = await axios.get('https://eng.taiwan.net.tw/m1.aspx?sNo=0020323&page=16')
    page[16] = await axios.get('https://eng.taiwan.net.tw/m1.aspx?sNo=0020323&page=17')
    page[17] = await axios.get('https://eng.taiwan.net.tw/m1.aspx?sNo=0020323&page=18')
    page[18] = await axios.get('https://eng.taiwan.net.tw/m1.aspx?sNo=0020323&page=19')
    page[19] = await axios.get('https://eng.taiwan.net.tw/m1.aspx?sNo=0020323&page=20')
    page[20] = await axios.get('https://eng.taiwan.net.tw/m1.aspx?sNo=0020323&page=21')




    for (let p of page) {
      const $ = cheerio.load(p.data)
      $('.muslimDataTable tbody').each(function () {
        restaurants.push($(this).text().replace(/^(\r\n|\n|\r|\t| )+/gm, "").replace('+', '').split(/\n/).filter(text => text.length > 0))
      })
      console.log(restaurants);
    }


    // google map API
    const geocodingClient = new Client({})


    for (let r of restaurants) {
      const params = {
        // address: r[6].replace('地址：', ''),
        address: r[6].replace('Address:', ''),

        components: 'country:TW',
        key: 'AIzaSyBuR1Uo45nMjeb-PClEjePTzxMEcVosnac'
      }
      geocodingClient.geocode({
        params
      })
        .then((response) => {
          // console.log(response.data.results[0].geometry.location.lat)
          r.push(response.data.results[0].geometry.location.lat)
          r.push(response.data.results[0].geometry.location.lng)
        })
        .catch((error) => {
          // console.log('error')
        })
      }

  } catch (error) {
    console.log(error)
  }
}

// template
const replyRestaurants = (event) => {
  const findRestaurant = restaurants.filter(restaurant => {
    if (restaurant[3] === event.message.text) {
      return restaurant[3] === event.message.text
    }
    if (restaurant[2] === event.message.text) {
      return restaurant[2] === event.message.text
    }
    if (restaurant[0] === event.message.text) {
      return restaurant[0] === event.message.text
    }
  })
  console.log(findRestaurant);

  const bubbles = findRestaurant.map(restaurant => {
    const bubble = JSON.parse(JSON.stringify(template))
    bubble.body.contents[0].text = restaurant[0]
    bubble.body.contents[1].text = restaurant[3]
    bubble.body.contents[2].text = restaurant[6]
    bubble.body.contents[3].text = restaurant[5]
    return bubble
  })
  fs.writeFileSync('bubbles.json', JSON.stringify(bubbles, null, 2))


  event.reply([
    {
      type: 'flex',
      altText: '穆斯林友善餐廳',
      contents: {
        type: 'carousel',
        contents: bubbles.slice(0, 6)
      }
    },

  ])
}

const replyMap = (event) => {
  // const restaurant=restaurants.includes(event.message.text )
  const mapAPI = restaurants.filter(restaurant => {
    if (restaurant[0] === event.message.text) {
      return restaurant
    }
  })
  for (let m of mapAPI) {
    event.reply([
      {
        "type": "location",
        "title": m[0],
        "address": m[6],
        "latitude": m[7],
        "longitude": m[8]
      }
    ])
  }
}

export default {
  fetchData,
  restaurants,
  replyRestaurants,
  replyMap

}
