// export default {
//   type: 'bubble',
//   body: {
//     type: 'box',
//     layout: 'vertical',
//     contents: [
//       {
//         type: 'text',
//         text: 'Brown Cafe',
//         weight: 'bold',
//         size: 'xl'
//       },
//       {
//         type: 'text',
//         text: 'dishes'
//       },
//       {
//         type: 'text',
//         text: 'address'
//       },
//       {
//         type: 'text',
//         text: 'tel'
//       }
//     ]
//   }
// }

export default {
  type: 'bubble',
  body: {
    type: 'box',
    layout: 'vertical',
    contents: [
      {
        type: 'text',
        text: 'Brown Cafe',
        weight: 'bold',
        size: 'xl'
      },
      {
        type: 'text',
        text: 'dishes'
      },
      {
        type: 'text',
        text: 'address'
      },
      {
        type: 'text',
        text: 'tel'
      },
      {
        "type": "button",
        "style": "link",
        "height": "sm",
        "action": {
          "type": "location",
          "label": "Google map"
        }
      }
    ]
  }
}



