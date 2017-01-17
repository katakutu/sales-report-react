const TopedAceAPI = require('./../../api-consumer/api/Search/TopedAceAPI')

const EMPTY_FEED = {
  total_data: 0,
  items: []
}

function getFeeds (ob, rows, start, shopId, uniquedId) {
  const api = new TopedAceAPI()

  return api.getFeed(ob, rows, start, shopId, uniquedId).then(response => {
    if (!response['data']) {
      const raw = JSON.stringify(response)
      console.error(`[Ace][Feed][GetFeed] Feed API calls returns no usual data. Raw data: ${raw}`)

      return EMPTY_FEED
    }

    return {
      total_data: response['header']['total_data'],
      items: response['data']['products']
    }
  })
  .catch(err => {
    console.error(`[Ace][Feed][GetFeed] Feed API call faield. Cause: ${err.message}`)

    return EMPTY_FEED
  })
}

module.exports = {
  getFeeds
}
