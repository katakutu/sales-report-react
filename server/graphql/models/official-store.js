const TopedMojitoAPI = require('./../../api-consumer/api/Search/TopedMojitoAPI')

const EMPTY_OFFICIAL_STORE = []

function getOfficialStores () {
  const api = new TopedMojitoAPI()

  return api.getOfficialStores().then(response => {
    if (!response['data']) {
      const raw = JSON.stringify(response)
      console.error(`[Mojito][OfficialStore] Official Store API calls returns no usual data. Raw data: ${raw}`)

      return EMPTY_OFFICIAL_STORE
    }

    return response['data'].map(data => {
      return {
        'id': data['shop_id'],
        'name': data['shop_name'],
        'url': data['shop_mobile_url'],
        'logo_url': data['logo_url']
      }
    })
  })
    .catch(err => {
      console.error(`[TopPicks] Top Picks API call faield. Cause: ${err.message}`)

      return EMPTY_OFFICIAL_STORE
    })
}

module.exports = getOfficialStores
