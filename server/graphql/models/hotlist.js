const TopedHotlistAPI = require('./../../api-consumer/api/Hotlist/TopedHotlistAPI')

const HOTLIST_ERROR = {
  message_status: 1,
  success: 0,
  data: []
}

function getHotlists (action) {
  const api = new TopedHotlistAPI()

  return api.getHotlists(action).then(response => {
    if (response['message_error']) {
      return HOTLIST_ERROR
    }

    return {
      message_status: response['message_status'],
      success: response['success'],
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
}

module.exports = getHotlists
