const TopedHotlistAPI = require('./../../api-consumer/api/Hotlist/TopedHotlistAPI')

const HOTLIST_ERROR = {
  message_status: 1,
  success: 0,
  data: []
}

function getHotProductHome () {
  const api = new TopedHotlistAPI()

  return api.getHotProductHome()
    .then(response => {
      if (response['message_error'] || !response['data']) {
        return HOTLIST_ERROR
      }

      return {
        message_status: response['message_status'],
        success: response['success'],
        max_page: 1,
        data: response['data'].map(data => {
          return {
            title_enc: data['title_enc'],
            price_start_from: data['price_start_from'],
            image_url: data['img_uri'],
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
  const api = new TopedHotlistAPI()

  return api.GetHotProductList(page, perPage)
    .then(response => {
      if (response['message_error'] || !response['data']) {
        return HOTLIST_ERROR
      }

      return {
        message_status: response['message_status'],
        success: response['success'],
        max_page: response['data']['paging']['max'],
        data: response['data']['list'].map(data => {
          return {
            title_enc: data['title'],
            price_start_from: data['price_start_from'],
            image_url: data['img_uri'],
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
