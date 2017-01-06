const TopedAceAPI = require('./../../api-consumer/api/Search/TopedAceAPI')

const HOTLIST_ERROR = {
  curr_page: 0,
  max_page: 0,
  per_page: 0,
  items: []
}

function getHotProductHome () {
  const api = new TopedAceAPI()

  return api.getHotProductHome()
    .then(response => {
      return {
        curr_page: response['curr_page'],
        max_page: response['total_page'],
        per_page: response['per_page'],
        items: response['list'].slice(0, 2).map(data => {
          return {
            title: data['title'],
            price_start_from: data['price_start_from'],
            image_url: data['img_square'] || data['img'],
            url: data['url']
          }
        })
      }
    })
    .catch(error => {
      console.log(`Error getting hotlist: ${error.message}`)

      return HOTLIST_ERROR
    })
}

function getHotProductList (page, perPage) {
  const api = new TopedAceAPI()

  return api.getHotProductList(page, perPage)
    .then(response => {
      return {
        curr_page: response['curr_page'],
        per_page: response['per_page'],
        max_page: response['total_page'],
        items: response['list'].map(data => {
          return {
            title: data['title'],
            price_start_from: data['price_start_from'],
            image_url: data['img'] || data['img_uri'],
            url: data['url']
          }
        })
      }
    })
    .catch(error => {
      console.log(`Error getting hotlist: ${error.message}`)

      return HOTLIST_ERROR
    })
}

module.exports = {
  getHotProductHome: getHotProductHome,
  getHotProductList: getHotProductList
}
