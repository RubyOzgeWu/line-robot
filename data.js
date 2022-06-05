import axios from 'axios'
import cheerio from 'cheerio'
import template from './template.js'

const restaurants=[]
const fetchData=async()=>{
    try{
        const {data}=await axios.get('https://www.taiwan.net.tw/m1.aspx?sNo=0020118&page=1')
        const $=cheerio.load(data)
        $('.muslimDataTable tbody').each(function(){
            restaurants.push($(this).text().replace(/^(\r\n|\n|\r|\t| )+/gm, "").replace('+','').split(/\n/).filter(text => text.length > 0))
        })
        console.log(restaurants);

    }catch(error){
        console.log(error);
    }
}

// template
const replyRestaurants=(event)=>{
    const bubbles=restaurants.map(restaurant=>{
        const bubble = JSON.parse(JSON.stringify(template))
        bubble.body.contents[0].text=restaurant[0]
        bubble.body.contents[1].contents[0].contents[1].text=restaurant[6]
        bubble.body.contents[1].contents[1].contents[1].text=restaurant[5]
        return bubble
    })
    fs.writeFileSync('bubbles.json', JSON.stringify(bubbles, null, 2))
    event.reply([
        {
          type: 'flex',
          altText: '穆斯林友善餐廳',
          contents: {
            type: 'bubble',
            contents: bubbles.slice(0, 6)
          }
        }
      ])
}


export default {
    fetchData,
    restaurants,
    replyRestaurants

  }