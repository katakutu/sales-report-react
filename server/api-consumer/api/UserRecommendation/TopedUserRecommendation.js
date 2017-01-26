const TopedAPI = require('../TopedAPI')
const GlobalConfig = require('../../../GlobalConfig')
const URL = require('url')

const USER_RECOMMENDATION_SERVICES = {
  Recommendation: `${GlobalConfig.Recommendation.Hostname}/r3/v2/user/recommendation?device=mobile&source=skipper
&user_id=:user_id&recommendation_source=:recommendation_source&recommendation_size=:recommendation_size`
}

class TopedUserRecommendationAPI {
  constructor () {
    this.api = new TopedAPI()
  }

  /**
   * Gather all recommendation from user
   */
  getRecommendation (userID, recommendationSource, recommendationSize) {
    const endpoint = USER_RECOMMENDATION_SERVICES.Recommendation
                                 .replace(':user_id', userID)
                                 .replace(':recommendation_source', recommendationSource)
                                 .replace(':recommendation_size', recommendationSize)

    const url = URL.parse(endpoint)

    return this.api.consume(url, 'GET', {})
  }
}

module.exports = TopedUserRecommendationAPI
