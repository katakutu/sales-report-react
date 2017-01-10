const TopedMojitoAPI = require('./../../api-consumer/api/Search/TopedMojitoAPI')
const common = require('./common')

const EMPTY_TICKER = {
  meta: { total_data: 0 },
  tickers: []
}

function getTicker (context) {
  const userID = common.getUserID(context)
  const api = new TopedMojitoAPI()

  return userID.then(uid => {
    return api.getTickers(uid || 0, 50, 'mobile', 'data_source_filter')
      .then(response => {
        if (!response['data']) {
          return EMPTY_TICKER
        }

        const responseMeta = response['meta']
        const resultMeta = (Object.keys(responseMeta).length > 0 && responseMeta.constructor === Object)
          ? responseMeta
          : { total_data: response['data']['tickers'].length }

        return { meta: resultMeta, tickers: response['data']['tickers'] }
      })
      .catch(error => {
        console.log(`Error getting tickers: ${error.message}`)

        return EMPTY_TICKER
      })
  }).catch(error => {
    console.log(`Error getting user data for tickers: ${error.message}`)

    return EMPTY_TICKER
  })
}

module.exports = getTicker
