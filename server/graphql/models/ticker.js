const TopedAuthAPI = require('./../../api-consumer/api/Auth/TopedAuthAPI')
const TopedMojitoAPI = require('./../../api-consumer/api/Search/TopedMojitoAPI')

const EMPTY_TICKER = {
  meta: { total_data: 0 },
  tickers: []
}

function getTicker (context) {
  let userID = Promise.resolve(0)
  if (context && context.session.oauth) {
    const tType = context.session.oauth.token['token_type']
    const token = context.session.oauth.token['access_token']

    const authConsumer = new TopedAuthAPI(token, tType)
    userID = authConsumer.getUserInfo().then(user => user['user_id'])
  }

  const api = new TopedMojitoAPI()

  return userID.then(uid => {
    return api.getTickers(uid, 50, 'mobile', 'data_source_filter').then(response => {
      if (!response['data']) {
        return EMPTY_TICKER
      }

      const responseMeta = response['meta']
      const resultMeta = (Object.keys(responseMeta).length > 0 && responseMeta.constructor === Object)
        ? responseMeta
        : { total_data: response['data']['tickers'].length }

      return { meta: resultMeta, tickers: response['data']['tickers'] }
    })
  })
}

module.exports = getTicker
