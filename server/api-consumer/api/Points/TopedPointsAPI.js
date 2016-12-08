const TopedAPI = require('../TopedAPI')
const HMACToped = require('../../hmac/HMACToped')
const GlobalConfig = require('../../../GlobalConfig')
const URL = require('url')

const HOSTNAME = GlobalConfig['Points']['Hostname']
const POINTS_SERVICES = {
  Get: `${HOSTNAME}/v2`
}

const DEFAULT_POINTS_DATA = {
  data: {
    attributes: {
      amount_formatted: 'ERROR FAIL'
    }
  }
}

class TopedPointsAPI {
  constructor (oauthToken, oauthTokenType) {
    this.api = new TopedAPI()
    this.token = oauthToken
    this.tokenType = oauthTokenType
  }

  getPoints (userID) {
    let url = URL.parse(POINTS_SERVICES.Get)
    const pointsReqTime = new Date()
    const prtUnix = Math.floor(pointsReqTime.getTime() / 1000).toString()
    const pointsParams = `shop_id=&user_id=${userID}&ut=${prtUnix}`
    const pointsSig = HMACToped.generateForPoints(
        GlobalConfig['Points']['Secret'],
        'GET',
        '/v2',
        pointsReqTime,
        pointsParams,
        userID + '~b',
        userID
    )
    const token = `Tokopedia Clover:${pointsSig}`

    const content = {
      'shop_id': '',
      'user_id': userID,
      'ut': prtUnix,
      'token': token
    }

    return this.api.consume(url, 'GET', content, true)
        .catch(err => {
          console.error(`Failed to fetch ${url.format()}. Returning default value. Error: `, err)

          return DEFAULT_POINTS_DATA
        })
  }
}

module.exports = TopedPointsAPI
