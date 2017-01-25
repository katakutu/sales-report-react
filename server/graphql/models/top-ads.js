const TopedAdsAPI = require('./../../api-consumer/api/TopAds/TopedAdsAPI')
const GlobalConfig = require('./../../GlobalConfig')

const EMPTY_TOPADS = {
  total_data: 0,
  display: '',
  items: []
}

function getTopsAds (userID, ep, src, item, page, q, context) {
  const sessID = context.cookies[GlobalConfig['Cookie']['SessionID']] || 'lite-cookie-not-found'
  const api = new TopedAdsAPI()
  return api.getTopAds(userID, ep, src, item, page, q, sessID).then(response => {
    if (!response['data']) {
      const raw = JSON.stringify(response)
      console.error(`[TopAds][TopAds][Display] TopAds API calls returns no usual data. Raw data: ${raw}`)

      return EMPTY_TOPADS
    }

    return {
      total_data: response['header']['total_data'],
      display: response['header']['meta']['display'],
      items: response['data']
    }
  })
  .catch(err => {
    console.error(`[TopAds][TopAds][Display] TopAds API call faield. Cause: ${err.message}`)

    return EMPTY_TOPADS
  })
}

module.exports = getTopsAds
